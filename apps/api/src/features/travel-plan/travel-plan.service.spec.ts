import { NotFoundException } from '@nestjs/common';
import { TravelPlanService } from './travel-plan.service';

describe('TravelPlanService', () => {
  it('creates an owned plan with nested festival items', async () => {
    const prisma = {
      $transaction: jest.fn(async (callback: (client: typeof tx) => unknown) => callback(tx)),
    };
    const tx = {
      travelPlan: {
        create: jest
          .fn()
          .mockResolvedValue({ id: 'plan-1', userId: 'user-1', items: [] }),
      },
      festival: {
        findMany: jest.fn().mockResolvedValue([]),
      },
    };
    const service = new TravelPlanService(prisma as never);

    await expect(
      service.create('user-1', {
        title: 'Java trip',
        province: 'Jawa Barat',
        dateRange: '12-14 Aug',
      }),
    ).resolves.toEqual({ id: 'plan-1', userId: 'user-1', items: [] });
    expect(tx.travelPlan.create).toHaveBeenCalledWith({
      data: {
        userId: 'user-1',
        title: 'Java trip',
        province: 'Jawa Barat',
        dateRange: '12-14 Aug',
        items: { create: [] },
      },
      include: {
        items: {
          include: { festival: true },
          orderBy: { festival: { startDate: 'asc' } },
        },
      },
    });
  });

  it('rejects duplicate festivals before starting a transaction', async () => {
    const prisma = { $transaction: jest.fn() };
    const service = new TravelPlanService(prisma as never);

    await expect(
      service.create('user-1', {
        title: 'Java trip',
        province: 'Jawa Barat',
        dateRange: '12-14 Aug',
        festivalIds: ['festival-1', 'festival-1'],
      }),
    ).rejects.toBeInstanceOf(NotFoundException);
    expect(prisma.$transaction).not.toHaveBeenCalled();
  });

  it('rejects missing festivals without creating a partial plan', async () => {
    const tx = {
      travelPlan: { create: jest.fn() },
      festival: { findMany: jest.fn().mockResolvedValue([{ id: 'festival-1' }]) },
    };
    const prisma = {
      $transaction: jest.fn((callback: (client: typeof tx) => unknown) => callback(tx)),
    };
    const service = new TravelPlanService(prisma as never);

    await expect(
      service.create('user-1', {
        title: 'Java trip',
        province: 'Jawa Barat',
        dateRange: '12-14 Aug',
        festivalIds: ['festival-1', 'missing'],
      }),
    ).rejects.toBeInstanceOf(NotFoundException);
    expect(tx.travelPlan.create).not.toHaveBeenCalled();
  });

  it("does not add a festival to another user's plan", async () => {
    const tx = {
      travelPlan: { findFirst: jest.fn().mockResolvedValue(null) },
      festival: { findUnique: jest.fn() },
    };
    const prisma = {
      $transaction: jest.fn((callback: (client: typeof tx) => unknown) => callback(tx)),
    };
    const service = new TravelPlanService(prisma as never);

    await expect(
      service.addItem('user-1', 'plan-1', 'festival-1'),
    ).rejects.toBeInstanceOf(NotFoundException);
    expect(tx.festival.findUnique).not.toHaveBeenCalled();
  });

  it('performs ownership, festival lookup, and item upsert in one transaction', async () => {
    const tx = {
      travelPlan: { findFirst: jest.fn().mockResolvedValue({ id: 'plan-1' }) },
      festival: { findUnique: jest.fn().mockResolvedValue({ id: 'festival-1' }) },
      travelPlanItem: { upsert: jest.fn().mockResolvedValue({ id: 'item-1' }) },
    };
    const prisma = {
      travelPlan: { findFirst: jest.fn().mockResolvedValue({ id: 'plan-1', items: [] }) },
      $transaction: jest.fn((callback: (client: typeof tx) => unknown) => callback(tx)),
    };
    const service = new TravelPlanService(prisma as never);

    await service.addItem('user-1', 'plan-1', 'festival-1');

    expect(prisma.$transaction).toHaveBeenCalledTimes(1);
    expect(tx.travelPlan.findFirst).toHaveBeenCalledWith({
      where: { id: 'plan-1', userId: 'user-1' },
      select: { id: true },
    });
    expect(tx.festival.findUnique).toHaveBeenCalledWith({
      where: { id: 'festival-1' },
    });
    expect(tx.travelPlanItem.upsert).toHaveBeenCalled();
  });
});

import { VacationPlanService } from './vacation-plan.service';

describe('VacationPlanService', () => {
  it('does not broaden deletion when item type is omitted', async () => {
    const prisma = {
      vacationPlanItem: { deleteMany: jest.fn().mockResolvedValue({ count: 2 }) },
    };
    const service = new VacationPlanService(prisma as never);

    await service.remove('user-1', 'same-id');

    expect(prisma.vacationPlanItem.deleteMany).toHaveBeenCalledWith({
      where: { userId: 'user-1', itemId: 'same-id' },
    });
  });

  it('removes only the requested composite vacation identity', async () => {
    const prisma = {
      vacationPlanItem: { deleteMany: jest.fn().mockResolvedValue({ count: 1 }) },
    };
    const service = new VacationPlanService(prisma as never);

    await service.remove('user-1', 'same-id', 'festival');

    expect(prisma.vacationPlanItem.deleteMany).toHaveBeenCalledWith({
      where: { userId: 'user-1', itemId: 'same-id', itemType: 'festival' },
    });
  });
});

import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService, PrismaTransactionClient } from '../../database/prisma.service';
import type {
  CreateTravelPlanDto,
  UpdateTravelPlanDto,
} from './travel-plan.dto';

const planInclude = {
  items: {
    include: { festival: true },
    orderBy: { festival: { startDate: 'asc' as const } },
  },
};

@Injectable()
export class TravelPlanService {
  constructor(private readonly prisma: PrismaService) {}

  findAll(userId: string) {
    return this.prisma.travelPlan.findMany({
      where: { userId },
      include: planInclude,
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(userId: string, id: string) {
    const plan = await this.prisma.travelPlan.findFirst({
      where: { id, userId },
      include: planInclude,
    });
    if (!plan)
      throw new NotFoundException(`Travel plan with id ${id} not found`);
    return plan;
  }

  async create(userId: string, dto: CreateTravelPlanDto) {
    const { festivalIds = [], ...planData } = dto;
    if (festivalIds.length !== new Set(festivalIds).size) {
      throw new NotFoundException('Festival duplikat tidak diperbolehkan');
    }
    const plan = await this.prisma.$transaction(async (tx) => {
      const festivals = festivalIds.length
        ? await tx.festival.findMany({ where: { id: { in: festivalIds } }, select: { id: true } })
        : [];
      if (festivals.length !== festivalIds.length) {
        throw new NotFoundException('Satu atau lebih festival tidak ditemukan');
      }
      return tx.travelPlan.create({
        data: {
          userId,
          ...planData,
          items: { create: festivals.map(({ id }) => ({ festivalId: id })) },
        },
        include: planInclude,
      });
    });
    return plan;
  }

  async update(userId: string, id: string, dto: UpdateTravelPlanDto) {
    await this.assertOwned(userId, id);
    return this.prisma.travelPlan.update({
      where: { id },
      data: dto,
      include: planInclude,
    });
  }

  async remove(userId: string, id: string) {
    await this.assertOwned(userId, id);
    await this.prisma.travelPlan.delete({ where: { id } });
    return { success: true };
  }

  async addItem(userId: string, travelPlanId: string, festivalId: string) {
    await this.prisma.$transaction(async (tx) => {
      await this.assertOwned(userId, travelPlanId, tx);
      const festival = await tx.festival.findUnique({
        where: { id: festivalId },
      });
      if (!festival)
        throw new NotFoundException(`Festival with id ${festivalId} not found`);

      await tx.travelPlanItem.upsert({
        where: { travelPlanId_festivalId: { travelPlanId, festivalId } },
        update: {},
        create: { travelPlanId, festivalId },
      });
    });
    return this.findOne(userId, travelPlanId);
  }

  async removeItem(userId: string, travelPlanId: string, festivalId: string) {
    await this.prisma.$transaction(async (tx) => {
      await this.assertOwned(userId, travelPlanId, tx);
      await tx.travelPlanItem.deleteMany({
        where: { travelPlanId, festivalId },
      });
    });
    return this.findOne(userId, travelPlanId);
  }

  private async assertOwned(
    userId: string,
    id: string,
    client: Pick<PrismaService | PrismaTransactionClient, 'travelPlan'> = this.prisma,
  ) {
    const plan = await client.travelPlan.findFirst({
      where: { id, userId },
      select: { id: true },
    });
    if (!plan)
      throw new NotFoundException(`Travel plan with id ${id} not found`);
  }
}

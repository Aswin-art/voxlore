import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';

export interface VacationPlanInput {
  id: string;
  type: string;
  title: string;
  location: string;
  date?: string;
  image?: string;
}

@Injectable()
export class VacationPlanService {
  constructor(private readonly prisma: PrismaService) {}

  findAll(userId: string) {
    return this.prisma.vacationPlanItem.findMany({
      where: { userId },
      orderBy: { addedAt: 'asc' },
    });
  }

  async add(userId: string, input: VacationPlanInput) {
    return this.prisma.vacationPlanItem.upsert({
      where: { userId_itemType_itemId: { userId, itemType: input.type, itemId: input.id } },
      update: {},
      create: {
        userId,
        itemId: input.id,
        itemType: input.type,
        title: input.title,
        location: input.location,
        date: input.date,
        image: input.image,
      },
    });
  }

  remove(userId: string, itemId: string, itemType?: string) {
    return this.prisma.vacationPlanItem.deleteMany({
      where: { userId, itemId, ...(itemType && { itemType }) },
    });
  }

  clear(userId: string) {
    return this.prisma.vacationPlanItem.deleteMany({ where: { userId } });
  }
}

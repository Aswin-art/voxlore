import { Test, TestingModule } from '@nestjs/testing';
import { PackagesService } from './packages.service';
import { PrismaService } from '../../database/prisma.service';
import { NotFoundException } from '@nestjs/common';

describe('PackagesService', () => {
  let service: PackagesService;

  const mockPackage = {
    id: 'monthly-destinasi-pass',
    name: 'Monthly Destinasi Pass',
    subtitle: 'Untuk digital nomad',
    price: 'Rp 59.000',
    numericPrice: 59000,
    period: 'bulan',
    bestSeller: true,
    features: ['Akses Tanpa Batas'],
  };

  const mockWeeklyPackage = {
    id: 'weekly-vacation-pass',
    name: 'Weekly Vacation Pass',
    subtitle: 'Untuk turis',
    price: 'Rp 29.000',
    numericPrice: 29000,
    period: 'minggu',
    bestSeller: false,
    features: ['Akses 7 Hari'],
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PackagesService,
        {
          provide: PrismaService,
          useValue: {
            user: {
              findUnique: jest.fn().mockResolvedValue({ id: 'user-uuid-1', createdAt: new Date() }),
            },
            subscriptionPackage: {
              findMany: jest.fn().mockResolvedValue([mockPackage, mockWeeklyPackage]),
              findUnique: jest.fn().mockImplementation(({ where }) => {
                if (where.id === 'monthly-destinasi-pass') return Promise.resolve(mockPackage);
                if (where.id === 'weekly-vacation-pass') return Promise.resolve(mockWeeklyPackage);
                return Promise.resolve(null);
              }),
            },
            userSubscription: {
              findFirst: jest.fn().mockResolvedValue({
                id: 'sub-1',
                userId: 'user-uuid-1',
                planId: 'monthly-destinasi-pass',
                status: 'Aktif • Akses Penuh',
                createdAt: new Date(),
                package: mockPackage,
              }),
              create: jest.fn().mockResolvedValue({
                id: 'sub-2',
                userId: 'user-uuid-1',
                planId: 'weekly-vacation-pass',
                status: 'Aktif • Akses Penuh',
                createdAt: new Date(),
                package: mockWeeklyPackage,
              }),
            },
          },
        },
      ],
    }).compile();

    service = module.get<PackagesService>(PackagesService);
  });

  it('should list all packages', async () => {
    const packages = await service.getAllPackages();
    expect(packages.length).toBeGreaterThan(0);
    expect(packages[0]).toHaveProperty('id');
    expect(packages[0]).toHaveProperty('price');
  });

  it('should find a package by id', async () => {
    const pkg = await service.getPackageById('monthly-destinasi-pass');
    expect(pkg.name).toBe('Monthly Destinasi Pass');
  });

  it('should throw NotFoundException for unknown package id', async () => {
    await expect(service.getPackageById('invalid-tier')).rejects.toThrow(NotFoundException);
  });

  it('should return subscription details for user', async () => {
    const sub = await service.getMySubscription('user-uuid-1');
    expect(sub.userId).toBe('user-uuid-1');
    expect(sub.activePackage.id).toBe('monthly-destinasi-pass');
  });

  it('should subscribe user to selected plan', async () => {
    const res = await service.subscribe('user-uuid-1', { planId: 'weekly-vacation-pass' });
    expect(res.success).toBe(true);
    expect(res.subscription.planId).toBe('weekly-vacation-pass');
  });
});

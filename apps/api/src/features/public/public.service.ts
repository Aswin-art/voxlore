import { Injectable, NotFoundException } from '@nestjs/common';
import { PublicStore } from './public.store';
import type { Destination, CulturalFestival } from './catalog.types';

export interface DestinationFilters {
  province?: string;
  region?: string;
  category?: string;
  search?: string;
}

export interface FestivalFilters {
  province?: string;
  region?: string;
  type?: string;
  search?: string;
  start?: string;
  end?: string;
}

const toLower = (s?: string) => (s ? s.toLowerCase() : '');

@Injectable()
export class PublicService {
  constructor(private readonly store: PublicStore) {}

  getAllDestinations(filters: DestinationFilters = {}): Destination[] {
    let list = this.store.destinations;

    if (filters.province) {
      const p = toLower(filters.province);
      list = list.filter((d) => toLower(d.province) === p);
    }
    if (filters.region) {
      const r = toLower(filters.region);
      list = list.filter((d) => toLower(d.region) === r);
    }
    if (filters.category) {
      const c = toLower(filters.category);
      list = list.filter((d) => toLower(d.category) === c);
    }
    if (filters.search) {
      const q = toLower(filters.search);
      list = list.filter(
        (d) =>
          toLower(d.title).includes(q) ||
          toLower(d.city).includes(q) ||
          toLower(d.province).includes(q) ||
          toLower(d.category).includes(q),
      );
    }

    return list;
  }

  getDestinationById(id: string): Destination {
    const dest = this.store.destinations.find((d) => d.id === id);
    if (!dest) {
      throw new NotFoundException(`Destination with id ${id} not found`);
    }
    return dest;
  }

  getFestivals(filters: FestivalFilters = {}): CulturalFestival[] {
    let list = this.store.festivals;

    if (filters.province) {
      const p = toLower(filters.province);
      list = list.filter((f) => toLower(f.province) === p);
    }
    if (filters.region) {
      const r = toLower(filters.region);
      list = list.filter((f) => toLower(f.region) === r);
    }
    if (filters.type) {
      const t = toLower(filters.type);
      list = list.filter((f) => toLower(f.type) === t);
    }
    if (filters.search) {
      const q = toLower(filters.search);
      list = list.filter(
        (f) =>
          toLower(f.title).includes(q) ||
          toLower(f.city).includes(q) ||
          toLower(f.province).includes(q) ||
          toLower(f.type).includes(q),
      );
    }
    if (filters.start || filters.end) {
      const start = filters.start ?? '0000-00-00';
      const end = filters.end ?? '9999-99-99';
      list = list.filter(
        (f) => f.startDate <= end && f.endDate >= start,
      );
    }

    return list;
  }

  getFestivalById(id: string): CulturalFestival {
    const fest = this.store.festivals.find((f) => f.id === id);
    if (!fest) {
      throw new NotFoundException(`Festival with id ${id} not found`);
    }
    return fest;
  }

  getProvinces(): string[] {
    const set = new Set<string>();
    for (const d of this.store.destinations) set.add(d.province);
    for (const f of this.store.festivals) set.add(f.province);
    return Array.from(set).sort();
  }
}
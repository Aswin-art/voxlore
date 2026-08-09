import { Injectable } from '@nestjs/common';
import {
  PUBLIC_DESTINATIONS,
  PUBLIC_FESTIVALS,
} from './catalog.data';
import type { Destination, CulturalFestival } from './catalog.types';

/**
 * In-memory store untuk katalog publik.
 * Data diisi secara MANUAL (sinkron manual) dari catalog.data.ts yang
 * mencerminkan apps/web/lib/data (ALL_DESTINATIONS / ALL_FESTIVALS).
 */
@Injectable()
export class PublicStore {
  readonly destinations: Destination[] = PUBLIC_DESTINATIONS;
  readonly festivals: CulturalFestival[] = PUBLIC_FESTIVALS;
}
import { Injectable } from '@nestjs/common';

export class Destination {
  id!: string;
  name!: string;
  location!: string;
  category!: string;
  audioCount!: number;
  passPrice!: string;
  status!: string;
  listeners!: string;
  rating!: number;
  image!: string;
}

export class CulturalEvent {
  id!: string;
  title!: string;
  date!: string;
  location!: string;
  organizer!: string;
  status!: string;
  attendees!: string;
}

export class Review {
  id!: string;
  user!: string;
  destination!: string;
  rating!: number;
  comment!: string;
  time!: string;
  status!: string;
}

export class AdminUser {
  id!: string;
  username!: string;
  email!: string;
  role!: string;
}

@Injectable()
export class AdminStore {
  private adminUser: AdminUser = {
    id: 'admin-1',
    username: 'admin',
    email: 'admin@voxlore.id',
    role: 'SUPER_ADMIN',
  };

  private destinations: Destination[] = [];
  private events: CulturalEvent[] = [];
  private reviews: Review[] = [];

  constructor() {
    this.seedDefaultData();
  }

  seedDefaultData() {
    this.adminUser = {
      id: 'admin-1',
      username: 'admin',
      email: 'admin@voxlore.id',
      role: 'SUPER_ADMIN',
    };

    this.destinations = [
      {
        id: 'prambanan',
        name: 'Candi Prambanan',
        location: 'Sleman, DI Yogyakarta',
        category: 'Candi & Situs Bersejarah',
        audioCount: 12,
        passPrice: 'Rp 25.000',
        status: 'Aktif',
        listeners: '1.2k+',
        rating: 4.9,
        image: '/images/prambanan-hero.png',
      },
      {
        id: 'borobudur',
        name: 'Candi Borobudur',
        location: 'Magelang, Jawa Tengah',
        category: 'Candi & Situs Bersejarah',
        audioCount: 18,
        passPrice: 'Rp 25.000',
        status: 'Aktif',
        listeners: '2.4k+',
        rating: 5.0,
        image: '/images/hero-background.png',
      },
      {
        id: 'uluwatu',
        name: 'Tari Kecak Uluwatu',
        location: 'Badung, Bali',
        category: 'Pertunjukan & Seni Tari',
        audioCount: 6,
        passPrice: 'Rp 35.000',
        status: 'Aktif',
        listeners: '980+',
        rating: 4.8,
        image: '/images/bali-culture.png',
      },
      {
        id: 'wayang',
        name: 'Wayang Kulit Purwa',
        location: 'Surakarta, Jawa Tengah',
        category: 'Seni Pertunjukan Bayangan',
        audioCount: 8,
        passPrice: 'Rp 20.000',
        status: 'Draft Review',
        listeners: '650+',
        rating: 4.9,
        image: '/images/about-culture.png',
      },
      {
        id: 'toraja',
        name: 'Situs Rante Tana Toraja',
        location: 'Tana Toraja, Sulawesi Selatan',
        category: 'Desa Adat & Warisan',
        audioCount: 10,
        passPrice: 'Rp 30.000',
        status: 'Aktif',
        listeners: '420+',
        rating: 4.7,
        image: '/images/prambanan-hero.png',
      },
    ];

    this.events = [
      {
        id: '1',
        title: 'Upacara Yadnya Kasada Bromo',
        date: '14 - 16 Agustus 2026',
        location: 'Kawasan Laut Pasir Bromo',
        organizer: 'Dinas Kebudayaan Probolinggo',
        status: 'Mendatang',
        attendees: '1,500+',
      },
      {
        id: '2',
        title: 'Festival Sekaten Surakarta',
        date: '20 - 27 September 2026',
        location: 'Alun-Alun Keraton Surakarta',
        organizer: 'Keraton Kasunanan Surakarta',
        status: 'Mendatang',
        attendees: '3,200+',
      },
      {
        id: '3',
        title: 'Pekan Seni Budaya Bali 2026',
        date: '05 - 12 Oktober 2026',
        location: 'Taman Budaya Art Center Denpasar',
        organizer: 'Pemprov Bali',
        status: 'Persiapan',
        attendees: '5,000+',
      },
    ];

    this.reviews = [
      {
        id: 'rev-1',
        user: 'Budi Santoso',
        destination: 'Candi Prambanan',
        rating: 5,
        comment:
          'Panduan audio legenda Roro Jonggrang sangat imersif! Efek suara musik etniknya bikin merinding.',
        time: '10 menit lalu',
        status: 'Perlu Moderasi',
      },
      {
        id: 'rev-2',
        user: 'Siti Rahmawati',
        destination: 'Tari Kecak Uluwatu',
        rating: 4,
        comment:
          'Narator dwibahasa sangat jelas, suara latar Ombak Uluwatu pas banget dengan dramatisasi pertunjukan.',
        time: '45 menit lalu',
        status: 'Perlu Moderasi',
      },
    ];
  }

  getAdminUser(): AdminUser {
    return this.adminUser;
  }

  getDestinations(): Destination[] {
    return this.destinations;
  }

  getDestinationById(id: string): Destination | undefined {
    return this.destinations.find((d) => d.id === id);
  }

  addDestination(destination: Destination): Destination {
    this.destinations.push(destination);
    return destination;
  }

  updateDestination(id: string, update: Partial<Destination>): Destination | null {
    const idx = this.destinations.findIndex((d) => d.id === id);
    if (idx === -1) return null;
    const current = this.destinations[idx];
    if (!current) return null;
    const updated: Destination = { ...current, ...update };
    this.destinations[idx] = updated;
    return updated;
  }

  deleteDestination(id: string): boolean {
    const initialLen = this.destinations.length;
    this.destinations = this.destinations.filter((d) => d.id !== id);
    return this.destinations.length < initialLen;
  }

  getEvents(): CulturalEvent[] {
    return this.events;
  }

  getEventById(id: string): CulturalEvent | undefined {
    return this.events.find((e) => e.id === id);
  }

  addEvent(event: CulturalEvent): CulturalEvent {
    this.events.push(event);
    return event;
  }

  updateEvent(id: string, update: Partial<CulturalEvent>): CulturalEvent | null {
    const idx = this.events.findIndex((e) => e.id === id);
    if (idx === -1) return null;
    const current = this.events[idx];
    if (!current) return null;
    const updated: CulturalEvent = { ...current, ...update };
    this.events[idx] = updated;
    return updated;
  }

  deleteEvent(id: string): boolean {
    const initialLen = this.events.length;
    this.events = this.events.filter((e) => e.id !== id);
    return this.events.length < initialLen;
  }

  getReviews(): Review[] {
    return this.reviews;
  }

  getReviewById(id: string): Review | undefined {
    return this.reviews.find((r) => r.id === id);
  }

  updateReviewStatus(id: string, status: string): Review | null {
    const idx = this.reviews.findIndex((r) => r.id === id);
    if (idx === -1) return null;
    const current = this.reviews[idx];
    if (!current) return null;
    current.status = status;
    return current;
  }

  deleteReview(id: string): boolean {
    const initialLen = this.reviews.length;
    this.reviews = this.reviews.filter((r) => r.id !== id);
    return this.reviews.length < initialLen;
  }
}

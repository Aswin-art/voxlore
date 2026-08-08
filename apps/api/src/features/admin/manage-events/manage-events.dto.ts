export class CreateEventDto {
  title!: string;
  date!: string;
  location!: string;
  organizer!: string;
  status?: string;
  attendees?: string;
}

export class UpdateEventDto {
  title?: string;
  date?: string;
  location?: string;
  organizer?: string;
  status?: string;
  attendees?: string;
}

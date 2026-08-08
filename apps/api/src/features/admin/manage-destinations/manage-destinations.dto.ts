export class CreateDestinationDto {
  name!: string;
  location!: string;
  category!: string;
  audioCount?: number;
  passPrice?: string;
  status?: string;
  listeners?: string;
  rating?: number;
  image?: string;
}

export class UpdateDestinationDto {
  name?: string;
  location?: string;
  category?: string;
  audioCount?: number;
  passPrice?: string;
  status?: string;
  listeners?: string;
  rating?: number;
  image?: string;
}

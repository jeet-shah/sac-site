export interface ActivityTiming {
  dayOfWeek: number;
  openTime: string;
  closeTime: string;
  label?: string;
}

export interface Activity {
  id: number;
  name: string;
  slug: string;
  description?: string;
  category: string;
  coverImageUrl: string;
  timings: ActivityTiming[];
}
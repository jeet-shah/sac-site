export interface Event {
  id: number;
  title: string;
  slug: string;
  description?: string;
  startDate: string;
  endDate?: string;
  venue?: string;
  isFeatured: boolean;
  coverImageUrl: string;
}
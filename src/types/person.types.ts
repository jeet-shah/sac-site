export type PersonRole = "INCHARGE" | "COMMITTEE";

export interface Person {
  id: number;
  name: string;
  personRole: PersonRole;
  designation: string;
  department?: string;
  email?: string;
  phone?: string;
  photoUrl: string;
}
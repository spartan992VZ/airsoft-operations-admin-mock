export type FieldStatus = "Activo" | "Inactivo" | "Mantenimiento";
export type FieldAvailability = "Disponible" | "Reservado" | "Ocupado por evento";

export interface FieldEvent {
  fieldId: number;
  eventId: number;
  name: string;
  date: string;
  enrolled: number;
  capacity: number;
}

export interface Field {
  id: number;
  name: string;
  slug: string;
  location: string;
  city: string;
  region: string;
  status: FieldStatus;
  availability: FieldAvailability;
  capacity: number;
  modalities: string[];
  events: number;
  upcomingEvent: FieldEvent | null;
  managerId: number;
  manager: string;
  managerPhone: string;
  managerEmail: string;
  area: string;
  founded: string;
  description: string;
  img: string;
  reservations: number;
}

export interface FieldFilters {
  status: string;
  availability: string;
  region: string;
  search: string;
}

export type EventStatus = "Publicado" | "Borrador" | "Finalizado" | "Cancelado";
export type EventType = "Milsim" | "CQB" | "Woodland" | "Speedsoft" | "Nocturno" | "Scenario" | "Team deathmatch";
export type EventLevel = "Principiante" | "Intermedio" | "Avanzado" | "Todos los niveles";

export interface Event {
  id: number;
  name: string;
  description: string;
  type: EventType;
  level: EventLevel;
  coverImage: string | null;
  date: string;
  dateSort: string;
  startTime: string;
  endTime: string;
  fieldId: number;
  field: string;
  city: string;
  modality: string;
  equipment: string[];
  rules: string;
  additionalInfo: string;
  price: number;
  maxCapacity: number;
  minPlayers: number;
  status: EventStatus;
  enrolled: number;
  revenue: number;
  img: string;
}

export interface EventFilters {
  status: string;
  field: string;
  modality: string;
  search: string;
}

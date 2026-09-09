export type TeamStatus = "Activo" | "Inactivo" | "Pendiente";

export interface TeamMember {
  id: number;
  teamId: number;
  playerId: number;
  name: string;
  role: string;
  initials: string;
  color: string;
  joinedDate: string;
}

export interface TeamEvent {
  teamId: number;
  eventId: number;
  name: string;
  date: string;
  result: "Victoria" | "Derrota" | "Participante" | "Cancelado";
}

export interface Team {
  id: number;
  name: string;
  acronym: string;
  color: string;
  location: string;
  region: string;
  captainId: number;
  captain: string;
  captainInitials: string;
  captainColor: string;
  totalMembers: number;
  events: number;
  status: TeamStatus;
  founded: string;
  modality: string;
  contact: {
    phone: string;
    email: string;
  };
  description: string;
  wins: number;
  members: TeamMember[];
  recentEvents: TeamEvent[];
}

export interface TeamFilters {
  status: string;
  modality: string;
  region: string;
  search: string;
}

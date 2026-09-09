export type RegistrationStatus = "Confirmada" | "Pendiente" | "Rechazada" | "Cancelada";
export type PaymentStatus = "Pagado" | "Pendiente" | "Reembolsado" | "Exento";

export interface Registration {
  id: number;
  playerId: number;
  player: string;
  initials: string;
  avatarColor: string;
  teamId: number | null;
  team: string;
  eventId: number;
  event: string;
  eventDate: string;
  registrationDate: string;
  paymentStatus: PaymentStatus;
  status: RegistrationStatus;
  phone: string;
  email: string;
  notes?: string;
}

export interface RegistrationFilters {
  event: string;
  team: string;
  status: RegistrationStatus | string;
  paymentStatus: PaymentStatus | string;
  search: string;
}

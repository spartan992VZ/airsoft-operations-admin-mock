import { Event, Registration } from "../../types";

export interface DashboardSummary {
  eventCount: number;
  publishedEventCount: number;
  registrationCount: number;
  enrolledCount: number;
  capacityCount: number;
  pendingRegistrationCount: number;
  pendingPaymentCount: number;
  revenue: number;
}

export function selectDashboardSummary(events: Event[], registrations: Registration[]): DashboardSummary {
  return {
    eventCount: events.length,
    publishedEventCount: events.filter((event) => event.status === "Publicado").length,
    registrationCount: registrations.length,
    enrolledCount: events.reduce((total, event) => total + event.enrolled, 0),
    capacityCount: events.reduce((total, event) => total + event.maxCapacity, 0),
    pendingRegistrationCount: registrations.filter((registration) => registration.status === "Pendiente").length,
    pendingPaymentCount: registrations.filter((registration) => registration.paymentStatus === "Pendiente").length,
    revenue: events.reduce((total, event) => total + event.revenue, 0),
  };
}

export function selectUpcomingEvents(events: Event[], limit = 3): Event[] {
  return [...events]
    .filter((event) => event.status === "Publicado" || event.status === "Borrador")
    .sort((first, second) => first.dateSort.localeCompare(second.dateSort))
    .slice(0, limit);
}

export function selectRecentRegistrations(registrations: Registration[], limit = 5): Registration[] {
  return [...registrations]
    .sort((first, second) => second.registrationDate.localeCompare(first.registrationDate))
    .slice(0, limit);
}

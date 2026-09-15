import {
  BarChart2,
  CalendarDays,
  ClipboardList,
  LayoutDashboard,
  MapPin,
  MessageSquare,
  PlusCircle,
  Settings,
  TrendingUp,
  Users,
} from "lucide-react";

export const navigationIcons: Record<string, React.ElementType> = {
  Dashboard: LayoutDashboard,
  "Mis eventos": CalendarDays,
  "Crear evento": PlusCircle,
  Inscripciones: ClipboardList,
  Equipos: Users,
  Campos: MapPin,
  Mensajes: MessageSquare,
  Reportes: BarChart2,
  Estadísticas: TrendingUp,
  Configuración: Settings,
};

export const navigationRoutes: Record<string, string> = {
  Dashboard: "/",
  "Mis eventos": "/events",
  "Crear evento": "/events/create",
  Inscripciones: "/registrations",
  Equipos: "/teams",
  Campos: "/fields",
};

export const pageTitles: Record<string, { title: string; sub: string }> = {
  Dashboard: { title: "Dashboard", sub: "Resumen general de tus eventos y operaciones" },
  "Mis eventos": { title: "Mis eventos", sub: "Gestiona tus operaciones y eventos" },
  "Crear evento": { title: "Crear evento", sub: "Crea y configura una nueva operación de Airsoft." },
  Inscripciones: { title: "Inscripciones", sub: "Gestiona las inscripciones y pagos" },
  Equipos: { title: "Equipos", sub: "Gestiona los equipos y miembros" },
  Campos: { title: "Campos", sub: "Gestiona los campos de juego" },
};

export function getActivePage(path: string): string {
  if (path === "/") return "Dashboard";
  if (path === "/events") return "Mis eventos";
  if (path === "/events/create") return "Crear evento";
  if (path === "/registrations") return "Inscripciones";
  if (path === "/teams") return "Equipos";
  if (path === "/fields") return "Campos";
  return "Dashboard";
}

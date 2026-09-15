import {
  BarChart2,
  CalendarDays,
  ClipboardList,
  FileText,
  MapPin,
  PlusCircle,
  Send,
  Shield,
  Target,
  TrendingUp,
  UserCheck,
  Users,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import { LIME } from "../../shared";

export const dashboardQuickActions = [
  { icon: PlusCircle, label: "Crear nuevo evento", desc: "Publicar en minutos", route: "/events/create" },
  { icon: ClipboardList, label: "Gestionar inscripciones", desc: "Aprobar pendientes", route: "/registrations" },
  { icon: Send, label: "Enviar anuncio", desc: "A todos los inscritos", route: "/events" },
  { icon: BarChart2, label: "Ver reportes", desc: "Análisis detallado", route: "/events" },
  { icon: TrendingUp, label: "Ver estadísticas", desc: "Métricas del mes", route: "/" },
  { icon: MapPin, label: "Gestionar campos", desc: "Disponibilidad", route: "/fields" },
];

export const dashboardRecentActivity = [
  { icon: UserCheck, text: "Nueva inscripción: RaiderX", sub: "Operación Black Hawk", time: "hace 10 min", color: LIME },
  { icon: Shield, text: "Nueva cuenta: OperativeLegend", sub: "Se registró como jugador", time: "hace 25 min", color: "#60a5fa" },
  { icon: CheckCircle2, text: "Cargo aprobado: Campo Omega", sub: "Pago de $ 85.000 confirmado", time: "hace 1 hora", color: LIME },
  { icon: FileText, text: "Registro recibido", sub: "campo@operaciones-airsoft.com.ar", time: "hace 2 horas", color: "#f59e0b" },
  { icon: Users, text: "Equipo creado: Delta Force", sub: "12 miembros activos", time: "hace 3 horas", color: "#a78bfa" },
  { icon: AlertCircle, text: "Campo sin confirmar", sub: "Asalto al Fuerte – La Plata", time: "hace 5 horas", color: "#f87171" },
];

export const dashboardChartFallback = [
  { mes: "Dic", inscritos: 22, asistencia: 19 },
  { mes: "Ene", inscritos: 38, asistencia: 32 },
  { mes: "Feb", inscritos: 45, asistencia: 41 },
  { mes: "Mar", inscritos: 52, asistencia: 48 },
  { mes: "Abr", inscritos: 61, asistencia: 55 },
  { mes: "May", inscritos: 78, asistencia: 71 },
  { mes: "Jun", inscritos: 48, asistencia: 43 },
];

export const dashboardMonthlyRevenue = [
  { mes: "Ene", ingresos: 210000 },
  { mes: "Feb", ingresos: 340000 },
  { mes: "Mar", ingresos: 290000 },
  { mes: "Abr", ingresos: 480000 },
  { mes: "May", ingresos: 560000 },
  { mes: "Jun", ingresos: 390000 },
  { mes: "Jul", ingresos: 180000 },
];

export const dashboardFields = [
  { name: "Campo Delta, La Plata", eventos: 8, pct: 100 },
  { name: "Campo Alpha, Córdoba", eventos: 6, pct: 75 },
  { name: "Campo Omega, Rosario", eventos: 4, pct: 50 },
  { name: "Campo Base Sur, Mendoza", eventos: 3, pct: 37 },
];

export const dashboardFeaturedEvents = [
  { name: "Operación Black Hawk", field: "Campo Delta, La Plata", date: "24 OCT", enrolled: 48, capacity: 60, status: "Publicado", img: "https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?w=280&h=160&fit=crop&auto=format" },
  { name: "Misión Red Dawn", field: "Campo Alpha, Córdoba", date: "31 OCT", enrolled: 35, capacity: 50, status: "Publicado", img: "https://images.unsplash.com/photo-1579656381254-20f2f7b4c7b5?w=280&h=160&fit=crop&auto=format" },
  { name: "Asalto al Fuerte", field: "Campo Delta, La Plata", date: "07 NOV", enrolled: 20, capacity: 40, status: "Borrador", img: "https://images.unsplash.com/photo-1550684376-efcbd6e3f031?w=280&h=160&fit=crop&auto=format" },
  { name: "Venganza", field: "Campo Omega, Rosario", date: "21 NOV", enrolled: 15, capacity: 30, status: "Borrador", img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=280&h=160&fit=crop&auto=format" },
  { name: "Blackout", field: "Campo Base Sur, Mendoza", date: "05 DIC", enrolled: 0, capacity: 50, status: "Borrador", img: "https://images.unsplash.com/photo-1465447142348-e9952c393450?w=280&h=160&fit=crop&auto=format" },
];

export const dashboardEventStateColors = [
  { name: "Publicados", status: "Publicado", color: LIME },
  { name: "Borradores", status: "Borrador", color: "#404040" },
  { name: "Finalizados", status: "Finalizado", color: "#60a5fa" },
  { name: "Cancelados", status: "Cancelado", color: "#f87171" },
];

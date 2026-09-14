import { useMemo, useState } from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard, CalendarDays, PlusCircle, ClipboardList,
  Users, MapPin, MessageSquare, BarChart2, TrendingUp,
  Settings, LogOut, HelpCircle, Bell, ChevronDown,
  ArrowUpRight, MoreHorizontal, Calendar, Shield,
  Crosshair, Target, Radio, ChevronRight, ChevronLeft,
  Clock, Banknote, UserCheck, AlertCircle, CheckCircle2,
  XCircle, FileText, Send, Eye,
} from "lucide-react";
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, PieChart, Pie, Cell,
} from "recharts";
import { LIME, LIME_DIM, NAV_ITEMS, CHART_TOOLTIP, formatARS } from "./shared";
import { StatusBadge } from "./components/shared";
import { useEventStore, useRegistrationStore } from "./stores";
import MisEventos from "./pages/MisEventos";
import CrearEvento from "./pages/CrearEvento";
import EventoDetalle from "./pages/EventoDetalle";
import Inscripciones from "./pages/Inscripciones";
import Equipos from "./pages/Equipos";
import Campos from "./pages/Campos";

// ─── Nav icon map ─────────────────────────────────────────────────────────────
const NAV_ICONS: Record<string, React.ElementType> = {
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

// ─── Route mapping ─────────────────────────────────────────────────────────────
const ROUTE_MAP: Record<string, string> = {
  "Dashboard": "/",
  "Mis eventos": "/events",
  "Crear evento": "/events/create",
  "Inscripciones": "/registrations",
  "Equipos": "/teams",
  "Campos": "/fields",
};

// ─── Dashboard data ───────────────────────────────────────────────────────────
const kpis = [
  { label: "Eventos creados", value: "8", sub: "Ver todos", icon: CalendarDays, trend: "+2 este mes", up: true },
  { label: "Inscripciones totales", value: "356", sub: "Ver detalle", icon: ClipboardList, trend: "+34 esta semana", up: true },
  { label: "Asistencia promedio", value: "92%", sub: "Ver detalle", icon: UserCheck, trend: "+3% vs anterior", up: true },
  { label: "Ingresos totales", value: "$1.240.000", sub: "Ver detalle", icon: Banknote, trend: "Resumen demo", up: true },
  { label: "Campos utilizados", value: "4", sub: "Ver detalle", icon: Target, trend: "Sin cambios", up: false },
];

const upcomingEvents = [
  {
    id: 1, name: "Operación Black Hawk", field: "Campo Delta, La Plata",
    date: "24", month: "OCT", enrolled: 48, capacity: 60, income: "$720.000", status: "Publicado",
    img: "https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?w=120&h=80&fit=crop&auto=format",
  },
  {
    id: 2, name: "Misión Red Dawn", field: "Campo Alpha, Córdoba",
    date: "31", month: "OCT", enrolled: 35, capacity: 50, income: "$525.000", status: "Publicado",
    img: "https://images.unsplash.com/photo-1579656381254-20f2f7b4c7b5?w=120&h=80&fit=crop&auto=format",
  },
  {
    id: 3, name: "Asalto al Fuerte", field: "Campo Delta, Valencia",
    date: "07", month: "NOV", enrolled: 20, capacity: 40, income: "$300.000", status: "Borrador",
    img: "https://images.unsplash.com/photo-1550684376-efcbd6e3f031?w=120&h=80&fit=crop&auto=format",
  },
];

const quickActions = [
  { icon: PlusCircle, label: "Crear nuevo evento", desc: "Publicar en minutos", route: "/events/create" },
  { icon: ClipboardList, label: "Gestionar inscripciones", desc: "Aprobar pendientes", route: "/registrations" },
  { icon: Send, label: "Enviar anuncio", desc: "A todos los inscritos", route: "/events" },
  { icon: BarChart2, label: "Ver reportes", desc: "Análisis detallado", route: "/events" },
  { icon: TrendingUp, label: "Ver estadísticas", desc: "Métricas del mes", route: "/" },
  { icon: MapPin, label: "Gestionar campos", desc: "Disponibilidad", route: "/fields" },
];

const recentActivity = [
  { icon: UserCheck, text: "Nueva inscripción: RaiderX", sub: "Operación Black Hawk", time: "hace 10 min", color: LIME },
  { icon: Shield, text: "Nueva cuenta: OperativeLegend", sub: "Se registró como jugador", time: "hace 25 min", color: "#60a5fa" },
  { icon: CheckCircle2, text: "Cargo aprobado: Campo Omega", sub: "Pago de $85.000 confirmado", time: "hace 1 hora", color: LIME },
  { icon: FileText, text: "Registro recibido", sub: "campo@titanes-airsoft.es", time: "hace 2 horas", color: "#f59e0b" },
  { icon: Users, text: "Equipo creado: Delta Force", sub: "12 miembros activos", time: "hace 3 horas", color: "#a78bfa" },
  { icon: AlertCircle, text: "Campo sin confirmar", sub: "Asalto al Fuerte – Valencia", time: "hace 5 horas", color: "#f87171" },
];

const inscriptions = [
  { player: "RaiderX", avatar: "RX", event: "Operación Black Hawk", date: "24/05/2024", status: "Confirmada" },
  { player: "Ghost_7", avatar: "G7", event: "Misión Red Dawn", date: "31/05/2024", status: "Confirmada" },
  { player: "Viper45", avatar: "V4", event: "Asalto al Fuerte", date: "07/06/2024", status: "Pendiente" },
  { player: "HunterK", avatar: "HK", event: "Operación Black Hawk", date: "24/05/2024", status: "Confirmada" },
  { player: "TacticalOne", avatar: "T1", event: "Misión Red Dawn", date: "31/05/2024", status: "Pendiente" },
];

const chartData = [
  { mes: "Dic", inscritos: 22, asistencia: 19 },
  { mes: "Ene", inscritos: 38, asistencia: 32 },
  { mes: "Feb", inscritos: 45, asistencia: 41 },
  { mes: "Mar", inscritos: 52, asistencia: 48 },
  { mes: "Abr", inscritos: 61, asistencia: 55 },
  { mes: "May", inscritos: 78, asistencia: 71 },
  { mes: "Jun", inscritos: 48, asistencia: 43 },
];

const ingresosMes = [
  { mes: "Ene", ingresos: 210 },
  { mes: "Feb", ingresos: 340 },
  { mes: "Mar", ingresos: 290 },
  { mes: "Abr", ingresos: 480 },
  { mes: "May", ingresos: 560 },
  { mes: "Jun", ingresos: 390 },
  { mes: "Jul", ingresos: 180 },
];

const eventosPorEstado = [
  { name: "Publicados", value: 4, color: LIME },
  { name: "Borradores", value: 2, color: "#404040" },
  { name: "Finalizados", value: 1, color: "#60a5fa" },
  { name: "Cancelados", value: 1, color: "#f87171" },
];

const campos = [
  { name: "Campo Delta, La Plata", eventos: 8, pct: 100 },
  { name: "Campo Alpha, Córdoba", eventos: 6, pct: 75 },
  { name: "Campo Omega, Rosario", eventos: 4, pct: 50 },
  { name: "Campo Base Sur, Valencia", eventos: 3, pct: 37 },
];

const destacados = [
  {
    name: "Operación Black Hawk", field: "Campo Delta, La Plata", date: "24 OCT",
    enrolled: 48, capacity: 60, status: "Publicado",
    img: "https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?w=280&h=160&fit=crop&auto=format",
  },
  {
    name: "Misión Red Dawn", field: "Campo Alpha, Córdoba", date: "31 OCT",
    enrolled: 35, capacity: 50, status: "Publicado",
    img: "https://images.unsplash.com/photo-1579656381254-20f2f7b4c7b5?w=280&h=160&fit=crop&auto=format",
  },
  {
    name: "Asalto al Fuerte", field: "Campo Delta, Valencia", date: "07 JUN",
    enrolled: 20, capacity: 40, status: "Borrador",
    img: "https://images.unsplash.com/photo-1550684376-efcbd6e3f031?w=280&h=160&fit=crop&auto=format",
  },
  {
    name: "Venganza", field: "Campo Omega, Rosario", date: "21 NOV",
    enrolled: 15, capacity: 30, status: "Borrador",
    img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=280&h=160&fit=crop&auto=format",
  },
  {
    name: "Blackout", field: "Campo Base Sur, Valencia", date: "05 JUL",
    enrolled: 0, capacity: 50, status: "Borrador",
    img: "https://images.unsplash.com/photo-1465447142348-e9952c393450?w=280&h=160&fit=crop&auto=format",
  },
];

// ─── Dashboard component ──────────────────────────────────────────────────────
function Dashboard() {
  const { events } = useEventStore();
  const { registrations } = useRegistrationStore();
  const [featuredPage, setFeaturedPage] = useState(0);
  const perPage = 4;

  const publishedEvents = useMemo(
    () => [...events].filter((event) => event.status === "Publicado").sort((a, b) => a.dateSort.localeCompare(b.dateSort)),
    [events]
  );

  const upcomingEvents = useMemo(
    () =>
      [...events]
        .filter((event) => event.status === "Publicado" || event.status === "Borrador")
        .sort((a, b) => a.dateSort.localeCompare(b.dateSort))
        .slice(0, 3),
    [events]
  );

  const dashboardKpis = useMemo(() => {
    const totalEnrolled = events.reduce((sum, event) => sum + event.enrolled, 0);
    const totalCapacity = events.reduce((sum, event) => sum + event.maxCapacity, 0);
    const pendingInscripciones = registrations.filter((registration) => registration.status === "Pendiente").length;
    const pendingPayments = registrations.filter((registration) => registration.paymentStatus === "Pendiente").length;
    const totalRevenue = events.reduce((sum, event) => sum + event.revenue, 0);

    return [
      { label: "Eventos creados", value: String(events.length), sub: "Ver todos", icon: CalendarDays, trend: `${publishedEvents.length} publicados`, up: true },
      { label: "Inscripciones", value: String(registrations.length), sub: "Ver detalle", icon: ClipboardList, trend: `${pendingInscripciones} pendientes`, up: pendingInscripciones <= 5 },
      { label: "Capacidad / asistencia", value: `${totalEnrolled}/${totalCapacity}`, sub: "Ver detalle", icon: UserCheck, trend: `${totalCapacity ? Math.round((totalEnrolled / totalCapacity) * 100) : 0}%`, up: true },
      { label: "Ingresos totales", value: formatARS(totalRevenue), sub: "Ver detalle", icon: Banknote, trend: `${publishedEvents.length} eventos activos`, up: true },
      { label: "Operaciones", value: String(pendingInscripciones + pendingPayments), sub: "Revisión", icon: Target, trend: `${pendingPayments} pagos`, up: pendingInscripciones + pendingPayments === 0 },
    ];
  }, [events, registrations, publishedEvents.length]);

  const recentRegistrations = useMemo(
    () => [...registrations].sort((a, b) => b.registrationDate.localeCompare(a.registrationDate)).slice(0, 5),
    [registrations]
  );

  const dashboardChartData = useMemo(() => {
    const monthMap = new Map<string, { mes: string; inscritos: number; asistencia: number }>();

    events.forEach((event) => {
      const date = new Date(`${event.dateSort || event.date}T12:00:00`);
      if (Number.isNaN(date.getTime())) return;
      const mes = new Intl.DateTimeFormat("es-ES", { month: "short" })
        .format(date)
        .replace(".", "")
        .slice(0, 3)
        .toUpperCase();
      const current = monthMap.get(mes) ?? { mes, inscritos: 0, asistencia: 0 };
      current.inscritos += event.enrolled;
      current.asistencia += Math.min(event.enrolled, Math.max(0, Math.round(event.enrolled * 0.9)));
      monthMap.set(mes, current);
    });

    return Array.from(monthMap.values()).slice(-6);
  }, [events]);

  const totalPages = Math.ceil(destacados.length / perPage);
  const visibleDestacados = destacados.slice(featuredPage * perPage, featuredPage * perPage + perPage);

  return (
    <main className="flex-1 overflow-y-auto p-5" style={{ background: "#080809" }}>
      {/* KPIs */}
      <div className="grid gap-3 mb-5" style={{ gridTemplateColumns: "repeat(5, 1fr)" }}>
        {dashboardKpis.map(({ label, value, sub, icon: Icon, trend, up }) => (
          <div key={label} className="rounded-xl p-4" style={{ background: "#101012", border: "1px solid rgba(255,255,255,0.07)" }}>
            <div className="flex items-start justify-between mb-3">
              <div className="rounded-lg flex items-center justify-center" style={{ width: 34, height: 34, background: "rgba(163,230,53,0.08)", border: "1px solid rgba(163,230,53,0.12)" }}>
                <Icon size={16} strokeWidth={1.5} style={{ color: LIME }} />
              </div>
              <span style={{ fontSize: 10, color: up ? LIME : "#6b7280", fontFamily: "'JetBrains Mono', monospace" }}>{trend}</span>
            </div>
            <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 30, fontWeight: 700, color: "#fff", letterSpacing: "-0.01em", lineHeight: 1 }}>{value}</div>
            <div style={{ fontSize: 11.5, color: "#6b7280", marginTop: 4, marginBottom: 8 }}>{label}</div>
            <button style={{ fontSize: 11, color: LIME, display: "flex", alignItems: "center", gap: 3 }}>
              {sub} <ArrowUpRight size={11} />
            </button>
          </div>
        ))}
      </div>

      {/* Row 2 */}
      <div className="grid gap-3 mb-3" style={{ gridTemplateColumns: "1fr 280px 260px" }}>
        {/* Upcoming events */}
        <div className="rounded-xl" style={{ background: "#101012", border: "1px solid rgba(255,255,255,0.07)" }}>
          <div className="flex items-center justify-between px-4 py-3" style={{ borderBottom: "1px solid rgba(255,255,255,0.055)" }}>
            <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 15, fontWeight: 600, letterSpacing: "0.04em", color: "#e5e7eb" }}>Próximos eventos</h2>
            <button className="flex items-center gap-1.5 rounded px-2.5 py-1" style={{ fontSize: 11, color: LIME, background: "rgba(163,230,53,0.08)", border: "1px solid rgba(163,230,53,0.15)" }}>
              <Calendar size={10} /> Ver calendario
            </button>
          </div>
          {upcomingEvents.map((evt, i) => {
            const date = new Date(`${evt.dateSort || evt.date}T12:00:00`);
            const day = Number.isNaN(date.getTime()) ? "" : String(date.getDate()).padStart(2, "0");
            const month = Number.isNaN(date.getTime()) ? "" : new Intl.DateTimeFormat("es-ES", { month: "short" }).format(date).replace(".", "").slice(0, 3).toUpperCase();
            return (
            <div key={evt.id} className="flex items-center gap-3 px-4 py-3" style={{ borderBottom: i < upcomingEvents.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none" }}>
              <div className="flex flex-col items-center justify-center rounded-lg shrink-0" style={{ width: 44, height: 44, background: "#1a1a1c", border: "1px solid rgba(255,255,255,0.07)" }}>
                <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 20, fontWeight: 700, color: "#fff", lineHeight: 1 }}>{day}</span>
                <span style={{ fontSize: 9, color: LIME, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" }}>{month}</span>
              </div>
              <div className="rounded-md overflow-hidden shrink-0" style={{ width: 72, height: 44, background: "#1a1a1c" }}>
                <img src={evt.img} alt={evt.name} style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.85 }} />
              </div>
              <div className="flex-1 min-w-0">
                <div style={{ fontSize: 13.5, fontWeight: 500, color: "#e5e7eb", marginBottom: 2 }}>{evt.name}</div>
                <div className="flex items-center gap-1" style={{ color: "#6b7280", fontSize: 11 }}>
                  <MapPin size={10} /> {evt.field}, {evt.city}
                </div>
              </div>
              <div className="flex items-center gap-4 shrink-0">
                <div className="text-right">
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, color: "#e5e7eb", fontWeight: 500 }}>{evt.enrolled}/{evt.maxCapacity}</div>
                  <div style={{ fontSize: 10, color: "#6b7280" }}>Inscritos</div>
                </div>
                <div className="text-right">
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, color: LIME, fontWeight: 500 }}>{formatARS(evt.revenue)}</div>
                  <div style={{ fontSize: 10, color: "#6b7280" }}>Ingresos</div>
                </div>
                <StatusBadge status={evt.status} />
                <button style={{ color: "#4b5563" }}><MoreHorizontal size={15} /></button>
              </div>
            </div>
            );
          })}
        </div>

        {/* Quick actions */}
        <div className="rounded-xl" style={{ background: "#101012", border: "1px solid rgba(255,255,255,0.07)" }}>
          <div className="px-4 py-3" style={{ borderBottom: "1px solid rgba(255,255,255,0.055)" }}>
            <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 15, fontWeight: 600, letterSpacing: "0.04em", color: "#e5e7eb" }}>Acciones rápidas</h2>
          </div>
          <div className="p-3 grid grid-cols-2 gap-2">
            {quickActions.map(({ icon: Icon, label, desc, route }) => (
              <Link key={label} to={route} className="flex flex-col items-center justify-center rounded-lg p-3 text-center transition-all" style={{ background: "#141416", border: "1px solid rgba(255,255,255,0.07)", minHeight: 80, textDecoration: "none" }}>
                <div className="rounded-lg flex items-center justify-center mb-2" style={{ width: 32, height: 32, background: "rgba(163,230,53,0.08)", border: "1px solid rgba(163,230,53,0.1)" }}>
                  <Icon size={14} style={{ color: LIME }} strokeWidth={1.5} />
                </div>
                <span style={{ fontSize: 11.5, fontWeight: 500, color: "#d1d5db", lineHeight: 1.2, marginBottom: 2 }}>{label}</span>
                <span style={{ fontSize: 10, color: "#6b7280" }}>{desc}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent activity */}
        <div className="rounded-xl" style={{ background: "#101012", border: "1px solid rgba(255,255,255,0.07)" }}>
          <div className="flex items-center justify-between px-4 py-3" style={{ borderBottom: "1px solid rgba(255,255,255,0.055)" }}>
            <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 15, fontWeight: 600, letterSpacing: "0.04em", color: "#e5e7eb" }}>Actividad reciente</h2>
            <button style={{ fontSize: 11, color: LIME }}>Ver toda</button>
          </div>
          <div className="px-4 py-2">
            {recentActivity.map((a, i) => {
              const Icon = a.icon;
              return (
                <div key={i} className="flex items-start gap-3 py-2.5" style={{ borderBottom: i < recentActivity.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none" }}>
                  <div className="rounded-md flex items-center justify-center shrink-0 mt-0.5" style={{ width: 28, height: 28, background: `${a.color}18`, border: `1px solid ${a.color}22` }}>
                    <Icon size={13} style={{ color: a.color }} strokeWidth={1.5} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div style={{ fontSize: 12, color: "#d1d5db", fontWeight: 500 }}>{a.text}</div>
                    <div style={{ fontSize: 11, color: "#6b7280", marginTop: 1 }}>{a.sub}</div>
                  </div>
                  <div style={{ fontSize: 10, color: "#4b5563", whiteSpace: "nowrap", fontFamily: "'JetBrains Mono', monospace" }}>{a.time}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Row 3 */}
      <div className="grid gap-3 mb-3" style={{ gridTemplateColumns: "320px 1fr 200px" }}>
        {/* Inscripciones recientes */}
        <div className="rounded-xl" style={{ background: "#101012", border: "1px solid rgba(255,255,255,0.07)" }}>
          <div className="flex items-center justify-between px-4 py-3" style={{ borderBottom: "1px solid rgba(255,255,255,0.055)" }}>
            <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 15, fontWeight: 600, letterSpacing: "0.04em", color: "#e5e7eb" }}>Inscripciones recientes</h2>
            <button style={{ fontSize: 11, color: LIME }}>Ver todas</button>
          </div>
          {recentRegistrations.map((ins, i) => (
            <div key={ins.id} className="flex items-center gap-3 px-4 py-2.5" style={{ borderBottom: i < recentRegistrations.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none" }}>
              <div className="rounded-full flex items-center justify-center shrink-0" style={{ width: 30, height: 30, background: "#1e1e22", border: "1px solid rgba(163,230,53,0.15)", fontFamily: "'JetBrains Mono', monospace", fontSize: 10, fontWeight: 700, color: LIME }}>
                {ins.initials}
              </div>
              <div className="flex-1 min-w-0">
                <div style={{ fontSize: 12.5, fontWeight: 500, color: "#e5e7eb" }}>{ins.player}</div>
                <div style={{ fontSize: 11, color: "#6b7280", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{ins.event}</div>
              </div>
              <div className="flex flex-col items-end gap-1">
                <StatusBadge status={ins.status} />
                <span style={{ fontSize: 10, color: "#4b5563", fontFamily: "'JetBrains Mono', monospace" }}>{ins.registrationDate}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Charts */}
        <div className="flex flex-col gap-3">
          <div className="rounded-xl" style={{ background: "#101012", border: "1px solid rgba(255,255,255,0.07)" }}>
            <div className="flex items-center justify-between px-4 py-3" style={{ borderBottom: "1px solid rgba(255,255,255,0.055)" }}>
              <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 15, fontWeight: 600, letterSpacing: "0.04em", color: "#e5e7eb" }}>Gráfico de inscripciones</h2>
              <button style={{ fontSize: 11, color: LIME }}>Ver detalle</button>
            </div>
            <div className="px-2 pt-2 pb-2" style={{ height: 150 }}>
              <ResponsiveContainer width="100%" height={150}>
                <LineChart data={dashboardChartData.length ? dashboardChartData : chartData} margin={{ top: 4, right: 12, left: -20, bottom: 0 }}>
                  <CartesianGrid stroke="rgba(255,255,255,0.04)" strokeDasharray="0" vertical={false} />
                  <XAxis dataKey="mes" tick={{ fill: "#6b7280", fontSize: 10, fontFamily: "'JetBrains Mono', monospace" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: "#6b7280", fontSize: 10, fontFamily: "'JetBrains Mono', monospace" }} axisLine={false} tickLine={false} />
                  <Tooltip {...CHART_TOOLTIP} />
                  <Line type="monotone" dataKey="inscritos" stroke={LIME} strokeWidth={2} dot={{ fill: LIME, r: 3, strokeWidth: 0 }} name="Inscritos" />
                  <Line type="monotone" dataKey="asistencia" stroke="#60a5fa" strokeWidth={2} dot={{ fill: "#60a5fa", r: 3, strokeWidth: 0 }} name="Asistencia" strokeDasharray="4 2" />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="flex gap-4 px-4 pb-3">
              <div className="flex items-center gap-1.5"><div style={{ width: 20, height: 2, background: LIME, borderRadius: 1 }} /><span style={{ fontSize: 10.5, color: "#9ca3af" }}>Inscritos</span></div>
              <div className="flex items-center gap-1.5"><div style={{ width: 20, height: 2, background: "#60a5fa", borderRadius: 1 }} /><span style={{ fontSize: 10.5, color: "#9ca3af" }}>Asistencia</span></div>
            </div>
          </div>
          <div className="rounded-xl" style={{ background: "#101012", border: "1px solid rgba(255,255,255,0.07)" }}>
            <div className="flex items-center justify-between px-4 py-3" style={{ borderBottom: "1px solid rgba(255,255,255,0.055)" }}>
              <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 15, fontWeight: 600, letterSpacing: "0.04em", color: "#e5e7eb" }}>Ingresos por mes</h2>
              <div className="flex items-center gap-1.5 rounded px-2 py-0.5" style={{ fontSize: 11, color: "#9ca3af", background: "#1a1a1c", border: "1px solid rgba(255,255,255,0.07)" }}>
                Este año <ChevronDown size={10} />
              </div>
            </div>
            <div className="px-2 pt-2 pb-3" style={{ height: 130 }}>
              <ResponsiveContainer width="100%" height={130}>
                <BarChart data={ingresosMes} margin={{ top: 4, right: 12, left: -20, bottom: 0 }} barSize={22}>
                  <CartesianGrid stroke="rgba(255,255,255,0.04)" strokeDasharray="0" vertical={false} />
                  <XAxis dataKey="mes" tick={{ fill: "#6b7280", fontSize: 10, fontFamily: "'JetBrains Mono', monospace" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: "#6b7280", fontSize: 10, fontFamily: "'JetBrains Mono', monospace" }} axisLine={false} tickLine={false} />
                  <Tooltip {...CHART_TOOLTIP} formatter={(v: number) => [formatARS(v), "Ingresos"]} />
                  <Bar dataKey="ingresos" fill={LIME} radius={[3, 3, 0, 0]} opacity={0.85} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="flex flex-col gap-3">
          <div className="rounded-xl" style={{ background: "#101012", border: "1px solid rgba(255,255,255,0.07)" }}>
            <div className="px-4 py-3" style={{ borderBottom: "1px solid rgba(255,255,255,0.055)" }}>
              <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 15, fontWeight: 600, letterSpacing: "0.04em", color: "#e5e7eb" }}>Eventos por estado</h2>
            </div>
            <div className="px-3 py-3">
              <div style={{ height: 120, position: "relative" }}>
                <ResponsiveContainer width="100%" height={120}>
                  <PieChart>
                    <Pie data={eventosPorEstado} cx="50%" cy="50%" innerRadius={36} outerRadius={52} paddingAngle={2} dataKey="value" strokeWidth={0}>
                      {eventosPorEstado.map((entry, index) => <Cell key={index} fill={entry.color} />)}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", textAlign: "center" }}>
                  <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 22, fontWeight: 700, color: "#fff", lineHeight: 1 }}>{events.length}</div>
                  <div style={{ fontSize: 9, color: "#6b7280", letterSpacing: "0.05em" }}>Total</div>
                </div>
              </div>
              <div className="mt-2 space-y-1.5">
                {[
                  { name: "Publicados", value: events.filter((event) => event.status === "Publicado").length, color: LIME },
                  { name: "Borradores", value: events.filter((event) => event.status === "Borrador").length, color: "#404040" },
                  { name: "Finalizados", value: events.filter((event) => event.status === "Finalizado").length, color: "#60a5fa" },
                  { name: "Cancelados", value: events.filter((event) => event.status === "Cancelado").length, color: "#f87171" },
                ].map((e) => (
                  <div key={e.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div style={{ width: 7, height: 7, borderRadius: 2, background: e.color }} />
                      <span style={{ fontSize: 11, color: "#9ca3af" }}>{e.name}</span>
                    </div>
                    <span style={{ fontSize: 11, color: "#e5e7eb", fontFamily: "'JetBrains Mono', monospace", fontWeight: 500 }}>{e.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="rounded-xl" style={{ background: "#101012", border: "1px solid rgba(255,255,255,0.07)" }}>
            <div className="flex items-center justify-between px-4 py-3" style={{ borderBottom: "1px solid rgba(255,255,255,0.055)" }}>
              <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 15, fontWeight: 600, letterSpacing: "0.04em", color: "#e5e7eb" }}>Campos más usados</h2>
              <button style={{ fontSize: 11, color: LIME }}>Ver todos</button>
            </div>
            <div className="px-4 py-3 space-y-3">
              {campos.map((c) => (
                <div key={c.name}>
                  <div className="flex justify-between mb-1">
                    <span style={{ fontSize: 11.5, color: "#d1d5db" }}>{c.name}</span>
                    <span style={{ fontSize: 11, color: "#6b7280", fontFamily: "'JetBrains Mono', monospace" }}>{c.eventos} ev.</span>
                  </div>
                  <div style={{ height: 3, borderRadius: 2, background: "rgba(255,255,255,0.06)" }}>
                    <div style={{ height: "100%", borderRadius: 2, width: `${c.pct}%`, background: `linear-gradient(90deg, ${LIME_DIM}, ${LIME})` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Featured events */}
      <div className="rounded-xl" style={{ background: "#101012", border: "1px solid rgba(255,255,255,0.07)" }}>
        <div className="flex items-center justify-between px-4 py-3" style={{ borderBottom: "1px solid rgba(255,255,255,0.055)" }}>
          <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 15, fontWeight: 600, letterSpacing: "0.04em", color: "#e5e7eb" }}>Eventos destacados</h2>
          <div className="flex items-center gap-2">
            <span style={{ fontSize: 11, color: "#6b7280", fontFamily: "'JetBrains Mono', monospace" }}>
              {featuredPage + 1}/{totalPages}
            </span>
            <button onClick={() => setFeaturedPage((p) => Math.max(0, p - 1))} disabled={featuredPage === 0} className="rounded flex items-center justify-center" style={{ width: 26, height: 26, background: "#1a1a1c", border: "1px solid rgba(255,255,255,0.08)", color: featuredPage === 0 ? "#374151" : "#9ca3af" }}>
              <ChevronLeft size={13} />
            </button>
            <button onClick={() => setFeaturedPage((p) => Math.min(totalPages - 1, p + 1))} disabled={featuredPage === totalPages - 1} className="rounded flex items-center justify-center" style={{ width: 26, height: 26, background: "#1a1a1c", border: "1px solid rgba(255,255,255,0.08)", color: featuredPage === totalPages - 1 ? "#374151" : "#9ca3af" }}>
              <ChevronRight size={13} />
            </button>
          </div>
        </div>
        <div className="p-3 grid grid-cols-4 gap-3">
          {visibleDestacados.map((evt, i) => (
            <div key={i} className="rounded-lg overflow-hidden" style={{ background: "#141416", border: "1px solid rgba(255,255,255,0.07)", cursor: "pointer" }}>
              <div style={{ height: 110, background: "#1a1a1c", position: "relative", overflow: "hidden" }}>
                <img src={evt.img} alt={evt.name} style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.75 }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.7))" }} />
                <div style={{ position: "absolute", top: 8, left: 8 }}>
                  <span className="rounded px-1.5 py-0.5" style={{ fontSize: 10, fontWeight: 700, fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "0.06em", background: "rgba(0,0,0,0.7)", color: "#fff" }}>{evt.date}</span>
                </div>
                <div style={{ position: "absolute", top: 8, right: 8 }}><StatusBadge status={evt.status} /></div>
              </div>
              <div className="p-3">
                <div style={{ fontSize: 13, fontWeight: 500, color: "#e5e7eb", marginBottom: 3, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{evt.name}</div>
                <div className="flex items-center gap-1 mb-3" style={{ color: "#6b7280", fontSize: 11 }}><MapPin size={9} /> {evt.field}</div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1" style={{ color: "#9ca3af", fontSize: 11 }}>
                    <Users size={10} />
                    <span style={{ fontFamily: "'JetBrains Mono', monospace" }}>{evt.enrolled}/{evt.capacity}</span>
                    <span style={{ color: "#4b5563" }}>inscritos</span>
                  </div>
                  <button style={{ color: LIME, display: "flex", alignItems: "center", gap: 2, fontSize: 11 }}><Eye size={10} /> Ver</button>
                </div>
                <div style={{ marginTop: 8, height: 2, borderRadius: 1, background: "rgba(255,255,255,0.06)" }}>
                  <div style={{ height: "100%", borderRadius: 1, width: `${(evt.enrolled / evt.capacity) * 100}%`, background: LIME, opacity: 0.7 }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

// ─── App shell ────────────────────────────────────────────────────────────────
function AppShell() {
  const location = useLocation();
  const [featuredPage, setFeaturedPage] = useState(0);

  // Get active page from route
  const getActivePageFromPath = (path: string): string => {
    if (path === "/") return "Dashboard";
    if (path === "/events") return "Mis eventos";
    if (path === "/events/create") return "Crear evento";
    if (path === "/registrations") return "Inscripciones";
    if (path === "/teams") return "Equipos";
    if (path === "/fields") return "Campos";
    return "Dashboard";
  };

  const activePage = getActivePageFromPath(location.pathname);

  const pageTitle: Record<string, { title: string; sub: string }> = {
    Dashboard: { title: "Dashboard", sub: "Resumen general de tus eventos y operaciones" },
    "Mis eventos": { title: "Mis eventos", sub: "Gestiona tus operaciones y eventos" },
    "Crear evento": { title: "Crear evento", sub: "Crea y configura una nueva operación de Airsoft." },
    Inscripciones: { title: "Inscripciones", sub: "Gestiona las inscripciones y pagos" },
    Equipos: { title: "Equipos", sub: "Gestiona los equipos y miembros" },
    Campos: { title: "Campos", sub: "Gestiona los campos de juego" },
  };

  const current = pageTitle[activePage] ?? { title: activePage, sub: "" };

  return (
    <div
      className="flex h-full overflow-hidden"
      style={{ fontFamily: "'Inter', sans-serif", background: "#080809", color: "#e5e7eb" }}
    >
      {/* Sidebar */}
      <aside
        className="flex flex-col shrink-0 h-full"
        style={{ width: 220, background: "#0b0b0d", borderRight: "1px solid rgba(255,255,255,0.055)" }}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-5 py-5" style={{ borderBottom: "1px solid rgba(255,255,255,0.055)" }}>
          <div className="flex items-center justify-center rounded" style={{ width: 34, height: 34, background: LIME }}>
            <Crosshair size={18} color="#000" strokeWidth={2.5} />
          </div>
          <div>
            <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 18, letterSpacing: "0.08em", color: "#fff", lineHeight: 1 }}>AIRSOFT</div>
            <div style={{ fontSize: 9, letterSpacing: "0.15em", color: "#6b7280", textTransform: "uppercase", lineHeight: 1, marginTop: 2 }}>Operations</div>
          </div>
        </div>

        <div className="px-5 pt-4 pb-2">
          <span style={{ fontSize: 9, letterSpacing: "0.18em", color: "#4b5563", textTransform: "uppercase", fontWeight: 600 }}>Organizador</span>
        </div>

        <nav className="flex-1 px-3 pb-3 overflow-y-auto">
          {NAV_ITEMS.map(({ label, badge }) => {
            const Icon = NAV_ICONS[label] ?? LayoutDashboard;
            const route = ROUTE_MAP[label];
            const active = activePage === label;
            if (!route) return null;
            return (
              <Link
                key={label}
                to={route}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-md mb-0.5 text-left transition-all"
                style={{
                  background: active ? "rgba(163,230,53,0.1)" : "transparent",
                  color: active ? LIME : "#9ca3af",
                  fontSize: 13.5,
                  fontWeight: active ? 500 : 400,
                  border: active ? "1px solid rgba(163,230,53,0.15)" : "1px solid transparent",
                  textDecoration: "none",
                }}
              >
                <Icon size={16} strokeWidth={active ? 2 : 1.5} style={{ color: active ? LIME : "#6b7280", flexShrink: 0 }} />
                <span className="flex-1">{label}</span>
                {badge && (
                  <span className="flex items-center justify-center rounded-full" style={{ minWidth: 18, height: 18, background: LIME, color: "#000", fontSize: 10, fontWeight: 700, fontFamily: "'JetBrains Mono', monospace" }}>
                    {badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        <div className="px-3 pb-2" style={{ borderTop: "1px solid rgba(255,255,255,0.055)" }}>
          <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-md mt-2 text-left" style={{ color: "#6b7280", fontSize: 13.5 }}>
            <HelpCircle size={16} strokeWidth={1.5} style={{ color: "#4b5563" }} />
            <span>Centro de ayuda</span>
          </button>
        </div>

        <div className="flex items-center gap-3 p-4" style={{ borderTop: "1px solid rgba(255,255,255,0.055)" }}>
          <div className="rounded-full flex items-center justify-center shrink-0 overflow-hidden" style={{ width: 34, height: 34, background: "#1a1a1a", border: "1px solid rgba(163,230,53,0.2)" }}>
            <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=68&h=68&fit=crop&auto=format" alt="Organizador" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
          <div className="flex-1 min-w-0">
            <div style={{ fontSize: 13, fontWeight: 500, color: "#e5e7eb", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>Organizador_01</div>
            <div style={{ fontSize: 11, color: "#6b7280", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>organizador@email.com</div>
          </div>
          <button style={{ color: "#4b5563" }}><LogOut size={14} strokeWidth={1.5} /></button>
        </div>
      </aside>

      {/* Main area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top header */}
        <header
          className="flex items-center justify-between px-6 shrink-0"
          style={{ height: 56, background: "#0b0b0d", borderBottom: "1px solid rgba(255,255,255,0.055)" }}
        >
          <div>
            <h1 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 22, fontWeight: 700, letterSpacing: "0.04em", color: "#fff", lineHeight: 1 }}>
              {current.title}
            </h1>
            {current.sub && <p style={{ fontSize: 11.5, color: "#6b7280", marginTop: 2 }}>{current.sub}</p>}
          </div>

          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2.5 rounded-lg px-3 py-1.5" style={{ background: "#141416", border: "1px solid rgba(255,255,255,0.07)" }}>
              <div className="rounded-full overflow-hidden" style={{ width: 26, height: 26, background: "#1e1e1e" }}>
                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=52&h=52&fit=crop&auto=format" alt="Organizador" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
              <div className="text-left">
                <div style={{ fontSize: 12, fontWeight: 500, color: "#e5e7eb" }}>Organizador_01</div>
                <div style={{ fontSize: 10, color: "#6b7280" }}>Organizador</div>
              </div>
              <ChevronDown size={13} color="#6b7280" />
            </button>
            <button className="relative flex items-center justify-center rounded-lg" style={{ width: 36, height: 36, background: "#141416", border: "1px solid rgba(255,255,255,0.07)" }}>
              <Bell size={15} color="#9ca3af" strokeWidth={1.5} />
              <span className="absolute flex items-center justify-center rounded-full" style={{ top: -4, right: -4, width: 16, height: 16, background: LIME, fontSize: 9, fontWeight: 700, color: "#000", fontFamily: "'JetBrains Mono', monospace" }}>3</span>
            </button>
            <div className="flex items-center gap-2 rounded-lg px-3 py-1.5" style={{ background: "#141416", border: "1px solid rgba(255,255,255,0.07)" }}>
              <Calendar size={13} color="#6b7280" strokeWidth={1.5} />
              <span style={{ fontSize: 12, color: "#9ca3af", fontFamily: "'JetBrains Mono', monospace" }}>12 sep – 18 sep, 2026</span>
            </div>
          </div>
        </header>

        {/* Page content */}
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/events" element={<MisEventos />} />
          <Route path="/events/create" element={<CrearEvento />} />
          <Route path="/events/:id" element={<EventoDetalle />} />
          <Route path="/registrations" element={<Inscripciones />} />
          <Route path="/teams" element={<Equipos />} />
          <Route path="/fields" element={<Campos />} />
          <Route path="*" element={
            <div className="flex-1 flex items-center justify-center" style={{ background: "#080809" }}>
              <div className="text-center">
                <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 32, fontWeight: 700, color: "#1f2023", letterSpacing: "0.04em" }}>{activePage.toUpperCase()}</div>
                <div style={{ fontSize: 13, color: "#374151", marginTop: 4 }}>Sección en construcción</div>
              </div>
            </div>
          } />
        </Routes>
      </div>
    </div>
  );
}

export default function App() {
  return <AppShell />;
}

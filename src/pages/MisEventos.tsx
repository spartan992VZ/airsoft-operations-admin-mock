import { useState, useMemo } from "react";
import {
  Search, SlidersHorizontal, MapPin, Users, Euro,
  MoreHorizontal, PlusCircle, ChevronDown, Eye,
  Pencil, Trash2, Send, Copy, ChevronLeft, ChevronRight,
  CalendarDays, CheckCircle2, FileText, XCircle, Clock,
  ArrowUpDown, TrendingUp,
} from "lucide-react";
import { StatusBadge, LIME, LIME_DIM, LimeButton, GhostButton } from "../shared";

interface AirsoftEvent {
  id: number;
  name: string;
  field: string;
  city: string;
  date: string;
  dateSort: string;
  enrolled: number;
  capacity: number;
  revenue: number;
  status: "Publicado" | "Borrador" | "Finalizado" | "Cancelado";
  img: string;
  modality: string;
}

const ALL_EVENTS: AirsoftEvent[] = [
  {
    id: 1, name: "Operación Black Hawk", field: "Campo Delta", city: "Madrid",
    date: "24 May 2024", dateSort: "2024-05-24", enrolled: 48, capacity: 60,
    revenue: 720, status: "Publicado", modality: "Milsim",
    img: "https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?w=96&h=64&fit=crop&auto=format",
  },
  {
    id: 2, name: "Misión Red Dawn", field: "Campo Alpha", city: "Barcelona",
    date: "31 May 2024", dateSort: "2024-05-31", enrolled: 35, capacity: 50,
    revenue: 350, status: "Publicado", modality: "CQB",
    img: "https://images.unsplash.com/photo-1579656381254-20f2f7b4c7b5?w=96&h=64&fit=crop&auto=format",
  },
  {
    id: 3, name: "Asalto al Fuerte", field: "Campo Delta", city: "Valencia",
    date: "07 Jun 2024", dateSort: "2024-06-07", enrolled: 20, capacity: 40,
    revenue: 170, status: "Borrador", modality: "Woodland",
    img: "https://images.unsplash.com/photo-1550684376-efcbd6e3f031?w=96&h=64&fit=crop&auto=format",
  },
  {
    id: 4, name: "Venganza", field: "Campo Omega", city: "Toledo",
    date: "21 Jun 2024", dateSort: "2024-06-21", enrolled: 15, capacity: 30,
    revenue: 0, status: "Borrador", modality: "Milsim",
    img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=96&h=64&fit=crop&auto=format",
  },
  {
    id: 5, name: "Blackout", field: "Campo Base Sur", city: "Valencia",
    date: "05 Jul 2024", dateSort: "2024-07-05", enrolled: 0, capacity: 50,
    revenue: 0, status: "Borrador", modality: "Nocturno",
    img: "https://images.unsplash.com/photo-1465447142348-e9952c393450?w=96&h=64&fit=crop&auto=format",
  },
  {
    id: 6, name: "Operación Tormenta", field: "Campo Norte", city: "Bilbao",
    date: "15 Mar 2024", dateSort: "2024-03-15", enrolled: 52, capacity: 60,
    revenue: 1040, status: "Finalizado", modality: "Woodland",
    img: "https://images.unsplash.com/photo-1519689680058-324335c77eba?w=96&h=64&fit=crop&auto=format",
  },
  {
    id: 7, name: "Misión Cobra", field: "Campo Sur", city: "Sevilla",
    date: "02 Feb 2024", dateSort: "2024-02-02", enrolled: 44, capacity: 50,
    revenue: 880, status: "Finalizado", modality: "CQB",
    img: "https://images.unsplash.com/photo-1524230572899-a752b3835840?w=96&h=64&fit=crop&auto=format",
  },
  {
    id: 8, name: "Asedio al Búnker", field: "Campo Delta", city: "Madrid",
    date: "10 Ene 2024", dateSort: "2024-01-10", enrolled: 38, capacity: 40,
    revenue: 570, status: "Finalizado", modality: "Milsim",
    img: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=96&h=64&fit=crop&auto=format",
  },
  {
    id: 9, name: "Operación Fantasma", field: "Campo Alpha", city: "Barcelona",
    date: "18 Abr 2024", dateSort: "2024-04-18", enrolled: 0, capacity: 45,
    revenue: 0, status: "Cancelado", modality: "Woodland",
    img: "https://images.unsplash.com/photo-1533134486753-c833f0ed4866?w=96&h=64&fit=crop&auto=format",
  },
  {
    id: 10, name: "Noche de Lobos", field: "Campo Omega", city: "Toledo",
    date: "28 Abr 2024", dateSort: "2024-04-28", enrolled: 8, capacity: 60,
    revenue: 0, status: "Cancelado", modality: "Nocturno",
    img: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=96&h=64&fit=crop&auto=format",
  },
];

const TABS = [
  { key: "todos", label: "Todos", icon: CalendarDays },
  { key: "proximos", label: "Próximos", icon: Clock },
  { key: "borradores", label: "Borradores", icon: FileText },
  { key: "finalizados", label: "Finalizados", icon: CheckCircle2 },
  { key: "cancelados", label: "Cancelados", icon: XCircle },
];

const STATUSES = ["Todos los estados", "Publicado", "Borrador", "Finalizado", "Cancelado"];
const FIELDS = ["Todos los campos", "Campo Delta", "Campo Alpha", "Campo Omega", "Campo Norte", "Campo Sur", "Campo Base Sur"];
const MODALITIES = ["Todas las modalidades", "Milsim", "CQB", "Woodland", "Nocturno"];

const PER_PAGE = 6;

type SortKey = "date" | "name" | "enrolled" | "revenue";
type SortDir = "asc" | "desc";

function ActionMenu({ onClose }: { onClose: () => void }) {
  const actions = [
    { icon: Eye, label: "Ver evento", color: "#e5e7eb" },
    { icon: Pencil, label: "Editar", color: "#e5e7eb" },
    { icon: Send, label: "Enviar anuncio", color: "#e5e7eb" },
    { icon: Copy, label: "Duplicar", color: "#e5e7eb" },
    { icon: Trash2, label: "Eliminar", color: "#f87171" },
  ];
  return (
    <div
      className="absolute right-0 top-8 z-50 rounded-lg overflow-hidden"
      style={{
        background: "#161618",
        border: "1px solid rgba(255,255,255,0.1)",
        boxShadow: "0 8px 32px rgba(0,0,0,0.6)",
        minWidth: 160,
      }}
      onMouseLeave={onClose}
    >
      {actions.map(({ icon: Icon, label, color }) => (
        <button
          key={label}
          className="flex items-center gap-2.5 w-full px-3.5 py-2.5 text-left transition-all"
          style={{ fontSize: 12.5, color, background: "transparent" }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.05)"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}
          onClick={onClose}
        >
          <Icon size={13} strokeWidth={1.5} />
          {label}
        </button>
      ))}
    </div>
  );
}

export default function MisEventos() {
  const [tab, setTab] = useState("todos");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("Todos los estados");
  const [fieldFilter, setFieldFilter] = useState("Todos los campos");
  const [modalityFilter, setModalityFilter] = useState("Todas las modalidades");
  const [page, setPage] = useState(1);
  const [sortKey, setSortKey] = useState<SortKey>("date");
  const [sortDir, setSortDir] = useState<SortDir>("asc");
  const [openMenu, setOpenMenu] = useState<number | null>(null);

  const filtered = useMemo(() => {
    let list = [...ALL_EVENTS];

    if (tab === "proximos") list = list.filter((e) => e.status === "Publicado" || e.status === "Borrador");
    else if (tab === "borradores") list = list.filter((e) => e.status === "Borrador");
    else if (tab === "finalizados") list = list.filter((e) => e.status === "Finalizado");
    else if (tab === "cancelados") list = list.filter((e) => e.status === "Cancelado");

    if (search) list = list.filter((e) => e.name.toLowerCase().includes(search.toLowerCase()) || e.city.toLowerCase().includes(search.toLowerCase()));
    if (statusFilter !== "Todos los estados") list = list.filter((e) => e.status === statusFilter);
    if (fieldFilter !== "Todos los campos") list = list.filter((e) => e.field === fieldFilter);
    if (modalityFilter !== "Todas las modalidades") list = list.filter((e) => e.modality === modalityFilter);

    list.sort((a, b) => {
      let diff = 0;
      if (sortKey === "date") diff = a.dateSort.localeCompare(b.dateSort);
      else if (sortKey === "name") diff = a.name.localeCompare(b.name);
      else if (sortKey === "enrolled") diff = a.enrolled - b.enrolled;
      else if (sortKey === "revenue") diff = a.revenue - b.revenue;
      return sortDir === "asc" ? diff : -diff;
    });

    return list;
  }, [tab, search, statusFilter, fieldFilter, modalityFilter, sortKey, sortDir]);

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  function toggleSort(key: SortKey) {
    if (sortKey === key) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else { setSortKey(key); setSortDir("asc"); }
    setPage(1);
  }

  const tabCounts: Record<string, number> = {
    todos: ALL_EVENTS.length,
    proximos: ALL_EVENTS.filter((e) => e.status === "Publicado" || e.status === "Borrador").length,
    borradores: ALL_EVENTS.filter((e) => e.status === "Borrador").length,
    finalizados: ALL_EVENTS.filter((e) => e.status === "Finalizado").length,
    cancelados: ALL_EVENTS.filter((e) => e.status === "Cancelado").length,
  };

  const summaryStats = [
    { label: "Total", value: ALL_EVENTS.length, icon: CalendarDays, color: "#9ca3af" },
    { label: "Publicados", value: ALL_EVENTS.filter((e) => e.status === "Publicado").length, icon: CheckCircle2, color: LIME },
    { label: "Borradores", value: ALL_EVENTS.filter((e) => e.status === "Borrador").length, icon: FileText, color: "#9ca3af" },
    { label: "Finalizados", value: ALL_EVENTS.filter((e) => e.status === "Finalizado").length, icon: TrendingUp, color: "#60a5fa" },
    { label: "Cancelados", value: ALL_EVENTS.filter((e) => e.status === "Cancelado").length, icon: XCircle, color: "#f87171" },
    {
      label: "Ingresos totales", icon: Euro, color: LIME,
      value: `€${ALL_EVENTS.reduce((s, e) => s + e.revenue, 0).toLocaleString("es-ES")}`,
    },
  ];

  function SortBtn({ col }: { col: SortKey }) {
    const active = sortKey === col;
    return (
      <button onClick={() => toggleSort(col)} style={{ display: "inline-flex", alignItems: "center", gap: 3, color: active ? LIME : "#6b7280" }}>
        <ArrowUpDown size={11} />
      </button>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Page header */}
      <div
        className="flex items-center justify-between px-6 py-4 shrink-0"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.055)", background: "#0b0b0d" }}
      >
        <div>
          <h1
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: 24,
              fontWeight: 700,
              letterSpacing: "0.04em",
              color: "#fff",
              lineHeight: 1,
            }}
          >
            Mis eventos
          </h1>
          <p style={{ fontSize: 12, color: "#6b7280", marginTop: 3 }}>
            Gestiona tus operaciones y eventos
          </p>
        </div>
        <LimeButton>
          <PlusCircle size={14} /> Crear evento
        </LimeButton>
      </div>

      {/* Scrollable body */}
      <div className="flex-1 overflow-y-auto p-5" style={{ background: "#080809" }}>

        {/* Summary mini-stats */}
        <div className="grid gap-3 mb-4" style={{ gridTemplateColumns: "repeat(6, 1fr)" }}>
          {summaryStats.map(({ label, value, icon: Icon, color }) => (
            <div
              key={label}
              className="rounded-xl px-4 py-3 flex items-center gap-3"
              style={{ background: "#101012", border: "1px solid rgba(255,255,255,0.07)" }}
            >
              <div
                className="rounded-lg flex items-center justify-center shrink-0"
                style={{ width: 30, height: 30, background: `${color}15`, border: `1px solid ${color}22` }}
              >
                <Icon size={14} strokeWidth={1.5} style={{ color }} />
              </div>
              <div>
                <div
                  style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontSize: 22,
                    fontWeight: 700,
                    color: "#fff",
                    lineHeight: 1,
                  }}
                >
                  {value}
                </div>
                <div style={{ fontSize: 11, color: "#6b7280", marginTop: 1 }}>{label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Toolbar */}
        <div
          className="rounded-xl mb-3"
          style={{ background: "#101012", border: "1px solid rgba(255,255,255,0.07)" }}
        >
          {/* Tabs */}
          <div
            className="flex items-center gap-0 px-4"
            style={{ borderBottom: "1px solid rgba(255,255,255,0.055)" }}
          >
            {TABS.map(({ key, label, icon: Icon }) => {
              const active = tab === key;
              return (
                <button
                  key={key}
                  onClick={() => { setTab(key); setPage(1); }}
                  className="flex items-center gap-2 px-4 py-3 text-sm transition-all relative"
                  style={{
                    color: active ? LIME : "#6b7280",
                    fontWeight: active ? 500 : 400,
                    fontSize: 13,
                    borderBottom: active ? `2px solid ${LIME}` : "2px solid transparent",
                    marginBottom: -1,
                  }}
                >
                  <Icon size={13} strokeWidth={active ? 2 : 1.5} />
                  {label}
                  <span
                    className="rounded-full flex items-center justify-center"
                    style={{
                      minWidth: 18, height: 18, fontSize: 10,
                      fontFamily: "'JetBrains Mono', monospace",
                      background: active ? "rgba(163,230,53,0.15)" : "rgba(255,255,255,0.06)",
                      color: active ? LIME : "#6b7280",
                      padding: "0 5px",
                    }}
                  >
                    {tabCounts[key]}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search + filters */}
          <div className="flex items-center gap-3 px-4 py-3">
            {/* Search */}
            <div
              className="flex items-center gap-2 flex-1 rounded-lg px-3"
              style={{
                background: "#141416",
                border: "1px solid rgba(255,255,255,0.07)",
                height: 36,
              }}
            >
              <Search size={14} color="#4b5563" strokeWidth={1.5} />
              <input
                type="text"
                placeholder="Buscar eventos por nombre o ciudad..."
                value={search}
                onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                style={{
                  background: "transparent",
                  border: "none",
                  outline: "none",
                  color: "#e5e7eb",
                  fontSize: 13,
                  flex: 1,
                  fontFamily: "'Inter', sans-serif",
                }}
              />
              {search && (
                <button onClick={() => setSearch("")} style={{ color: "#4b5563" }}>
                  <XCircle size={13} />
                </button>
              )}
            </div>

            {/* Status filter */}
            <div className="relative" style={{ minWidth: 170 }}>
              <select
                value={statusFilter}
                onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
                className="appearance-none w-full rounded-lg pl-3 pr-8"
                style={{
                  background: "#141416",
                  border: "1px solid rgba(255,255,255,0.07)",
                  color: statusFilter !== "Todos los estados" ? LIME : "#9ca3af",
                  fontSize: 12.5,
                  height: 36,
                  outline: "none",
                  fontFamily: "'Inter', sans-serif",
                  cursor: "pointer",
                }}
              >
                {STATUSES.map((s) => <option key={s} value={s} style={{ background: "#161618", color: "#e5e7eb" }}>{s}</option>)}
              </select>
              <ChevronDown size={12} color="#6b7280" style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }} />
            </div>

            {/* Field filter */}
            <div className="relative" style={{ minWidth: 170 }}>
              <select
                value={fieldFilter}
                onChange={(e) => { setFieldFilter(e.target.value); setPage(1); }}
                className="appearance-none w-full rounded-lg pl-3 pr-8"
                style={{
                  background: "#141416",
                  border: "1px solid rgba(255,255,255,0.07)",
                  color: fieldFilter !== "Todos los campos" ? LIME : "#9ca3af",
                  fontSize: 12.5,
                  height: 36,
                  outline: "none",
                  fontFamily: "'Inter', sans-serif",
                  cursor: "pointer",
                }}
              >
                {FIELDS.map((f) => <option key={f} value={f} style={{ background: "#161618", color: "#e5e7eb" }}>{f}</option>)}
              </select>
              <ChevronDown size={12} color="#6b7280" style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }} />
            </div>

            {/* Modality filter */}
            <div className="relative" style={{ minWidth: 170 }}>
              <select
                value={modalityFilter}
                onChange={(e) => { setModalityFilter(e.target.value); setPage(1); }}
                className="appearance-none w-full rounded-lg pl-3 pr-8"
                style={{
                  background: "#141416",
                  border: "1px solid rgba(255,255,255,0.07)",
                  color: modalityFilter !== "Todas las modalidades" ? LIME : "#9ca3af",
                  fontSize: 12.5,
                  height: 36,
                  outline: "none",
                  fontFamily: "'Inter', sans-serif",
                  cursor: "pointer",
                }}
              >
                {MODALITIES.map((m) => <option key={m} value={m} style={{ background: "#161618", color: "#e5e7eb" }}>{m}</option>)}
              </select>
              <ChevronDown size={12} color="#6b7280" style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }} />
            </div>

            <div className="flex items-center gap-1.5 ml-auto" style={{ color: "#6b7280", fontSize: 12 }}>
              <SlidersHorizontal size={13} strokeWidth={1.5} />
              <span>{filtered.length} evento{filtered.length !== 1 ? "s" : ""}</span>
            </div>
          </div>
        </div>

        {/* Table */}
        <div
          className="rounded-xl overflow-hidden"
          style={{ background: "#101012", border: "1px solid rgba(255,255,255,0.07)" }}
        >
          {/* Table header */}
          <div
            className="grid items-center px-4 py-2.5"
            style={{
              gridTemplateColumns: "72px 1fr 140px 160px 140px 120px 110px 44px",
              borderBottom: "1px solid rgba(255,255,255,0.055)",
              background: "#0e0e10",
            }}
          >
            {[
              { label: "Evento", col: null, span: "72px 1fr" },
            ].map(() => null)}
            <div style={{ fontSize: 11, color: "#4b5563", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", gridColumn: "1 / 3" }}>
              Evento
            </div>
            <div className="flex items-center gap-1.5" style={{ fontSize: 11, color: "#4b5563", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" }}>
              Fecha <SortBtn col="date" />
            </div>
            <div style={{ fontSize: 11, color: "#4b5563", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" }}>
              Campo
            </div>
            <div className="flex items-center gap-1.5" style={{ fontSize: 11, color: "#4b5563", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" }}>
              Inscritos <SortBtn col="enrolled" />
            </div>
            <div className="flex items-center gap-1.5" style={{ fontSize: 11, color: "#4b5563", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" }}>
              Ingresos <SortBtn col="revenue" />
            </div>
            <div style={{ fontSize: 11, color: "#4b5563", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" }}>
              Estado
            </div>
            <div />
          </div>

          {/* Rows */}
          {paginated.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16" style={{ color: "#4b5563" }}>
              <Search size={32} strokeWidth={1} style={{ marginBottom: 12, opacity: 0.4 }} />
              <div style={{ fontSize: 14, color: "#6b7280" }}>No se encontraron eventos</div>
              <div style={{ fontSize: 12, color: "#4b5563", marginTop: 4 }}>Prueba a ajustar los filtros</div>
            </div>
          ) : (
            paginated.map((evt, i) => {
              const fillPct = evt.capacity > 0 ? Math.round((evt.enrolled / evt.capacity) * 100) : 0;
              const isLast = i === paginated.length - 1;
              return (
                <div
                  key={evt.id}
                  className="grid items-center px-4 py-3 transition-all relative group"
                  style={{
                    gridTemplateColumns: "72px 1fr 140px 160px 140px 120px 110px 44px",
                    borderBottom: isLast ? "none" : "1px solid rgba(255,255,255,0.04)",
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.018)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}
                >
                  {/* Image */}
                  <div
                    className="rounded-lg overflow-hidden shrink-0"
                    style={{ width: 56, height: 38, background: "#1a1a1c" }}
                  >
                    <img src={evt.img} alt={evt.name} style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.85 }} />
                  </div>

                  {/* Name + modality */}
                  <div className="min-w-0 pl-3">
                    <div style={{ fontSize: 13.5, fontWeight: 500, color: "#e5e7eb", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      {evt.name}
                    </div>
                    <div
                      className="flex items-center gap-1 mt-0.5"
                      style={{ fontSize: 11, color: "#6b7280" }}
                    >
                      <span
                        className="rounded px-1.5 py-0.5"
                        style={{
                          background: "rgba(255,255,255,0.06)",
                          fontSize: 10,
                          color: "#9ca3af",
                          fontFamily: "'JetBrains Mono', monospace",
                        }}
                      >
                        {evt.modality}
                      </span>
                    </div>
                  </div>

                  {/* Date */}
                  <div style={{ fontSize: 12.5, color: "#d1d5db", fontFamily: "'JetBrains Mono', monospace" }}>
                    {evt.date}
                  </div>

                  {/* Field */}
                  <div className="flex items-center gap-1.5 min-w-0">
                    <MapPin size={11} color="#6b7280" strokeWidth={1.5} style={{ shrink: 0 }} />
                    <div style={{ fontSize: 12.5, color: "#9ca3af", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {evt.field}, {evt.city}
                    </div>
                  </div>

                  {/* Enrolled */}
                  <div>
                    <div className="flex items-center gap-2">
                      <Users size={11} color="#6b7280" strokeWidth={1.5} />
                      <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12.5, color: "#e5e7eb" }}>
                        {evt.enrolled}
                        <span style={{ color: "#4b5563" }}>/{evt.capacity}</span>
                      </span>
                    </div>
                    {/* fill bar */}
                    <div style={{ height: 2, borderRadius: 1, background: "rgba(255,255,255,0.06)", marginTop: 5, width: 80 }}>
                      <div
                        style={{
                          height: "100%", borderRadius: 1,
                          width: `${fillPct}%`,
                          background: fillPct >= 80 ? LIME : fillPct >= 50 ? "#fbbf24" : "#4b5563",
                          transition: "width 0.3s ease",
                        }}
                      />
                    </div>
                    <div style={{ fontSize: 10, color: "#4b5563", marginTop: 2, fontFamily: "'JetBrains Mono', monospace" }}>
                      {fillPct}% lleno
                    </div>
                  </div>

                  {/* Revenue */}
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, fontWeight: 500, color: evt.revenue > 0 ? LIME : "#4b5563" }}>
                    {evt.revenue > 0 ? `€${evt.revenue.toLocaleString("es-ES")}` : "—"}
                  </div>

                  {/* Status */}
                  <StatusBadge status={evt.status} />

                  {/* Actions */}
                  <div className="relative flex items-center justify-center">
                    <button
                      onClick={() => setOpenMenu(openMenu === evt.id ? null : evt.id)}
                      className="rounded-md flex items-center justify-center"
                      style={{
                        width: 28, height: 28,
                        background: openMenu === evt.id ? "rgba(255,255,255,0.08)" : "transparent",
                        color: "#6b7280",
                        border: "1px solid transparent",
                      }}
                    >
                      <MoreHorizontal size={15} />
                    </button>
                    {openMenu === evt.id && <ActionMenu onClose={() => setOpenMenu(null)} />}
                  </div>
                </div>
              );
            })
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div
              className="flex items-center justify-between px-4 py-3"
              style={{ borderTop: "1px solid rgba(255,255,255,0.055)", background: "#0e0e10" }}
            >
              <span style={{ fontSize: 12, color: "#6b7280", fontFamily: "'JetBrains Mono', monospace" }}>
                {(page - 1) * PER_PAGE + 1}–{Math.min(page * PER_PAGE, filtered.length)} de {filtered.length} eventos
              </span>
              <div className="flex items-center gap-1.5">
                <button
                  disabled={page === 1}
                  onClick={() => setPage((p) => p - 1)}
                  className="flex items-center justify-center rounded-md"
                  style={{
                    width: 30, height: 30,
                    background: "#141416",
                    border: "1px solid rgba(255,255,255,0.07)",
                    color: page === 1 ? "#2d2d30" : "#9ca3af",
                  }}
                >
                  <ChevronLeft size={14} />
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                  <button
                    key={n}
                    onClick={() => setPage(n)}
                    className="flex items-center justify-center rounded-md"
                    style={{
                      width: 30, height: 30,
                      fontSize: 12,
                      fontFamily: "'JetBrains Mono', monospace",
                      background: n === page ? LIME : "#141416",
                      border: n === page ? "none" : "1px solid rgba(255,255,255,0.07)",
                      color: n === page ? "#000" : "#9ca3af",
                      fontWeight: n === page ? 700 : 400,
                    }}
                  >
                    {n}
                  </button>
                ))}

                <button
                  disabled={page === totalPages}
                  onClick={() => setPage((p) => p + 1)}
                  className="flex items-center justify-center rounded-md"
                  style={{
                    width: 30, height: 30,
                    background: "#141416",
                    border: "1px solid rgba(255,255,255,0.07)",
                    color: page === totalPages ? "#2d2d30" : "#9ca3af",
                  }}
                >
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

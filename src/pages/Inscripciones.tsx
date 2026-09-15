import { useState, useMemo } from "react";
import {
  Search, ChevronDown, Users, CheckCircle2, XCircle,
  Clock, AlertCircle, MoreHorizontal, Eye, Check, X,
  UserCheck, Ban, Filter, ChevronLeft, ChevronRight,
  MapPin, Calendar, CreditCard, ArrowUpDown, Trash2,
  Send, Download, SlidersHorizontal, Shield,
} from "lucide-react";
import { LIME, LIME_DIM, StatusBadge } from "../shared";
import { useRegistrationStore, useEventStore, useTeamStore } from "../stores";

// ─── Types ────────────────────────────────────────────────────────────────────
type InscStatus = "Confirmada" | "Pendiente" | "Rechazada" | "Cancelada";
type PayStatus = "Pagado" | "Pendiente" | "Reembolsado" | "Exento";

interface Registration {
  id: number;
  player: string;
  initials: string;
  avatarColor: string;
  team: string;
  event: string;
  eventDate: string;
  paymentStatus: PayStatus;
  status: InscStatus;
  phone: string;
  email: string;
  notes?: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const STATUS_OPTS: InscStatus[] = ["Confirmada", "Pendiente", "Rechazada", "Cancelada"];
const PAY_OPTS: PayStatus[] = ["Pagado", "Pendiente", "Reembolsado", "Exento"];

const AVATAR_COLORS = ["#1d4ed8","#7c3aed","#be185d","#b45309","#0f766e","#15803d","#c2410c","#4338ca","#0e7490","#9f1239"];

const PER_PAGE = 10;
type SortKey = "player" | "event" | "regDate" | "status" | "payStatus";

// ─── Sub-components ───────────────────────────────────────────────────────────
function PayBadge({ status }: { status: PayStatus }) {
  const cfg: Record<PayStatus, { bg: string; color: string; dot: string }> = {
    Pagado:      { bg: "rgba(163,230,53,0.08)",  color: LIME,      dot: LIME },
    Pendiente:   { bg: "rgba(251,191,36,0.1)",   color: "#fbbf24", dot: "#fbbf24" },
    Reembolsado: { bg: "rgba(96,165,250,0.1)",   color: "#60a5fa", dot: "#60a5fa" },
    Exento:      { bg: "rgba(167,139,250,0.1)",  color: "#a78bfa", dot: "#a78bfa" },
  };
  const c = cfg[status];
  return (
    <span className="inline-flex items-center gap-1.5 rounded px-2 py-0.5"
      style={{ background: c.bg, color: c.color, fontSize: 11, fontFamily: "'JetBrains Mono', monospace", whiteSpace: "nowrap" }}>
      <span style={{ width: 5, height: 5, borderRadius: "50%", background: c.dot, display: "inline-block", flexShrink: 0 }} />
      {status}
    </span>
  );
}

function InscStatusBadge({ status }: { status: InscStatus }) {
  const cfg: Record<InscStatus, { bg: string; color: string }> = {
    Confirmada: { bg: "rgba(163,230,53,0.1)",  color: LIME },
    Pendiente:  { bg: "rgba(251,191,36,0.12)", color: "#fbbf24" },
    Rechazada:  { bg: "rgba(248,113,113,0.1)", color: "#f87171" },
    Cancelada:  { bg: "rgba(100,100,100,0.15)", color: "#6b7280" },
  };
  const c = cfg[status];
  return (
    <span className="rounded px-2 py-0.5"
      style={{ background: c.bg, color: c.color, fontSize: 11, fontFamily: "'JetBrains Mono', monospace", whiteSpace: "nowrap" }}>
      {status}
    </span>
  );
}

function Avatar({ initials, color, size = 30 }: { initials: string; color: string; size?: number }) {
  return (
    <div className="rounded-full flex items-center justify-center shrink-0"
      style={{ width: size, height: size, background: `${color}22`, border: `1px solid ${color}44`,
        fontFamily: "'JetBrains Mono', monospace", fontSize: size < 32 ? 10 : 12, fontWeight: 700, color }}>
      {initials}
    </div>
  );
}

function SelectBox({ checked, indeterminate, onChange }: { checked: boolean; indeterminate?: boolean; onChange: () => void }) {
  return (
    <button onClick={onChange} className="flex items-center justify-center rounded shrink-0 transition-all"
      style={{ width: 16, height: 16, background: checked ? LIME : "transparent",
        border: checked ? "none" : "1px solid rgba(255,255,255,0.15)" }}>
      {checked && !indeterminate && <Check size={10} color="#000" strokeWidth={3} />}
      {indeterminate && <span style={{ width: 8, height: 2, background: "#000", display: "block", borderRadius: 1 }} />}
    </button>
  );
}

interface ActionMenuProps { reg: Registration; onClose: () => void; onConfirm: () => void; onReject: () => void; }
function ActionMenu({ reg, onClose, onConfirm, onReject }: ActionMenuProps) {
  const actions = [
    { icon: Eye,       label: "Ver perfil",             color: "#e5e7eb", onClick: onClose },
    { icon: FileIcon,  label: "Ver inscripción",         color: "#e5e7eb", onClick: onClose },
    ...(reg.status === "Pendiente" ? [
      { icon: CheckCircle2, label: "Confirmar inscripción", color: LIME,      onClick: () => { onConfirm(); onClose(); } },
      { icon: XCircle,      label: "Rechazar inscripción",  color: "#f87171", onClick: () => { onReject(); onClose(); } },
    ] : []),
    { icon: Send,      label: "Enviar mensaje",          color: "#e5e7eb", onClick: onClose },
    { icon: Trash2,    label: "Eliminar inscripción",    color: "#f87171", onClick: onClose },
  ];
  return (
    <div className="absolute right-0 top-8 z-50 rounded-lg overflow-hidden"
      style={{ background: "#161618", border: "1px solid rgba(255,255,255,0.1)", boxShadow: "0 8px 32px rgba(0,0,0,0.6)", minWidth: 190 }}
      onMouseLeave={onClose}>
      {actions.map(({ icon: Icon, label, color, onClick }) => (
        <button key={label} onClick={onClick}
          className="flex items-center gap-2.5 w-full px-3.5 py-2.5 text-left transition-all"
          style={{ fontSize: 12.5, color, background: "transparent" }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.05)"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}>
          <Icon size={13} strokeWidth={1.5} /> {label}
        </button>
      ))}
    </div>
  );
}
function FileIcon(props: any) { return <Eye {...props} />; }

// ─── Main component ───────────────────────────────────────────────────────────
export default function Inscripciones() {
  const { registrations, updateRegistration } = useRegistrationStore();
  const { events } = useEventStore();
  const { teams } = useTeamStore();
  
  const [eventFilter, setEventFilter] = useState("Todos los eventos");
  const [search, setSearch]           = useState("");
  const [statusFilter, setStatusFilter] = useState<InscStatus | "Todos">("Todos");
  const [teamFilter, setTeamFilter]   = useState("Todos los equipos");
  const [payFilter, setPayFilter]     = useState<PayStatus | "Todos">("Todos");
  const [selected, setSelected]       = useState<Set<number>>(new Set());
  const [page, setPage]               = useState(1);
  const [sortKey, setSortKey]         = useState<SortKey>("regDate");
  const [sortDir, setSortDir]         = useState<"asc"|"desc">("desc");
  const [openMenu, setOpenMenu]       = useState<number|null>(null);

  // Dynamic options from stores
  const eventOptions = useMemo(() => {
    const uniqueEvents = [...new Set(registrations.map(r => r.event))];
    return ["Todos los eventos", ...uniqueEvents];
  }, [registrations]);

  const teamOptions = useMemo(() => {
    const uniqueTeams = [...new Set(registrations.map(r => r.team))];
    return ["Todos los equipos", ...uniqueTeams];
  }, [registrations]);

  // Derived
  const eventInfo = useMemo(() => {
    if (eventFilter === "Todos los eventos") {
      return { name: "Todos los eventos", field: "", date: "", enrolled: 0, capacity: 0 };
    }
    const event = events.find(e => e.name === eventFilter);
    return event ? { 
      name: event.name, 
      field: `${event.field}, ${event.city}`, 
      date: event.date, 
      enrolled: event.enrolled, 
      capacity: event.maxCapacity 
    } : { name: "Todos los eventos", field: "", date: "", enrolled: 0, capacity: 0 };
  }, [eventFilter, events]);

  const filtered = useMemo(() => {
    let list = [...registrations];
    if (eventFilter !== "Todos los eventos") list = list.filter((r) => r.event === eventFilter);
    if (search) list = list.filter((r) =>
      r.player.toLowerCase().includes(search.toLowerCase()) ||
      r.team.toLowerCase().includes(search.toLowerCase()) ||
      r.email.toLowerCase().includes(search.toLowerCase())
    );
    if (statusFilter !== "Todos") list = list.filter((r) => r.status === statusFilter);
    if (teamFilter !== "Todos los equipos") list = list.filter((r) => r.team === teamFilter);
    if (payFilter !== "Todos") list = list.filter((r) => r.paymentStatus === payFilter);
    list.sort((a, b) => {
      let diff = 0;
      if (sortKey === "player")   diff = a.player.localeCompare(b.player);
      else if (sortKey === "event")    diff = a.event.localeCompare(b.event);
      else if (sortKey === "regDate")  diff = a.registrationDate.localeCompare(b.registrationDate);
      else if (sortKey === "status")   diff = a.status.localeCompare(b.status);
      else if (sortKey === "payStatus") diff = a.paymentStatus.localeCompare(b.paymentStatus);
      return sortDir === "asc" ? diff : -diff;
    });
    return list;
  }, [registrations, eventFilter, search, statusFilter, teamFilter, payFilter, sortKey, sortDir]);

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paginated  = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const totalEnrolled = eventFilter === "Todos los eventos"
    ? registrations.filter((r) => r.status !== "Cancelada" && r.status !== "Rechazada").length
    : eventInfo.enrolled;
  const cap = eventFilter === "Todos los eventos" ? 0 : eventInfo.capacity;

  const kpiCounts = {
    total:       filtered.length,
    confirmados: filtered.filter((r) => r.status === "Confirmada").length,
    pendientes:  filtered.filter((r) => r.status === "Pendiente").length,
    rechazados:  filtered.filter((r) => r.status === "Rechazada" || r.status === "Cancelada").length,
  };

  function toggleSort(key: SortKey) {
    if (sortKey === key) setSortDir((d) => d === "asc" ? "desc" : "asc");
    else { setSortKey(key); setSortDir("asc"); }
    setPage(1);
  }

  function toggleSelect(id: number) {
    setSelected((s) => { const n = new Set(s); n.has(id) ? n.delete(id) : n.add(id); return n; });
  }

  function toggleAll() {
    const pageIds = paginated.map((r) => r.id);
    const allSel  = pageIds.every((id) => selected.has(id));
    setSelected((s) => { const n = new Set(s); pageIds.forEach((id) => allSel ? n.delete(id) : n.add(id)); return n; });
  }

  function confirmReg(id: number) {
    updateRegistration(id, { status: "Confirmada" });
  }

  function rejectReg(id: number) {
    updateRegistration(id, { status: "Rechazada" });
  }

  function bulkConfirm() {
    selected.forEach(id => {
      const reg = registrations.find(r => r.id === id);
      if (reg && reg.status === "Pendiente") {
        updateRegistration(id, { status: "Confirmada" });
      }
    });
    setSelected(new Set());
  }

  function bulkReject() {
    selected.forEach(id => {
      const reg = registrations.find(r => r.id === id);
      if (reg && reg.status === "Pendiente") {
        updateRegistration(id, { status: "Rechazada" });
      }
    });
    setSelected(new Set());
  }

  const pageIds       = paginated.map((r) => r.id);
  const allPageSel    = pageIds.length > 0 && pageIds.every((id) => selected.has(id));
  const someSel       = pageIds.some((id) => selected.has(id)) && !allPageSel;
  const selectedPending = [...selected].filter((id) => registrations.find((r) => r.id === id)?.status === "Pendiente").length;

  function SortBtn({ col }: { col: SortKey }) {
    const active = sortKey === col;
    return (
      <button onClick={() => toggleSort(col)}
        style={{ display:"inline-flex", alignItems:"center", color: active ? LIME : "#6b7280", marginLeft:4 }}>
        <ArrowUpDown size={10} />
      </button>
    );
  }

  const pendingRegs = registrations.filter((r) => r.status === "Pendiente");

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Page header */}
      <div className="flex items-center justify-between px-6 py-4 shrink-0"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.055)", background: "#0b0b0d" }}>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 rounded-lg px-3 py-2"
            style={{ background:"#141416", border:"1px solid rgba(255,255,255,0.07)", fontSize:12, color:"#9ca3af" }}>
            <Download size={13} strokeWidth={1.5} /> Exportar CSV
          </button>
          <button className="flex items-center gap-2 rounded-lg px-3 py-2"
            style={{ background:"#141416", border:"1px solid rgba(255,255,255,0.07)", fontSize:12, color:"#9ca3af" }}>
            <Send size={13} strokeWidth={1.5} /> Anuncio masivo
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-5" style={{ background:"#080809" }}>

        {/* Pending alert banner */}
        {pendingRegs.length > 0 && (
          <div className="flex items-center justify-between rounded-xl px-4 py-3 mb-4"
            style={{ background:"rgba(251,191,36,0.05)", border:"1px solid rgba(251,191,36,0.2)" }}>
            <div className="flex items-center gap-3">
              <AlertCircle size={16} style={{ color:"#fbbf24", flexShrink:0 }} strokeWidth={1.5} />
              <div>
                <span style={{ fontSize:13, fontWeight:500, color:"#fbbf24" }}>
                  {pendingRegs.length} inscripción{pendingRegs.length !== 1 ? "es" : ""} pendiente{pendingRegs.length !== 1 ? "s" : ""} de revisión
                </span>
                <span style={{ fontSize:12, color:"#92400e", marginLeft:8 }}>
                  Revísalas antes del evento para asegurar la capacidad.
                </span>
              </div>
            </div>
            <button onClick={() => { setStatusFilter("Pendiente"); setPage(1); }}
              className="rounded-lg px-3 py-1.5 text-xs font-medium transition-all"
              style={{ background:"rgba(251,191,36,0.15)", border:"1px solid rgba(251,191,36,0.3)", color:"#fbbf24" }}>
              Ver pendientes
            </button>
          </div>
        )}

        {/* Event selector + capacity bar */}
        <div className="grid gap-3 mb-4" style={{ gridTemplateColumns:"1fr 320px" }}>
          {/* Event selector */}
          <div className="rounded-xl p-4" style={{ background:"#101012", border:"1px solid rgba(255,255,255,0.07)" }}>
            <div style={{ fontSize:11, color:"#6b7280", marginBottom:10, textTransform:"uppercase", letterSpacing:"0.1em", fontWeight:600 }}>
              Filtrar por evento
            </div>
            <div className="flex flex-wrap gap-2">
              {eventOptions.map((e) => {
                const active = eventFilter === e;
                const event = events.find(ev => ev.name === e);
                return (
                  <button key={e} onClick={() => { setEventFilter(e); setPage(1); }}
                    className="flex items-center gap-2 rounded-lg px-3 py-2 transition-all"
                    style={{
                      background: active ? "rgba(163,230,53,0.1)" : "#141416",
                      border: active ? "1px solid rgba(163,230,53,0.25)" : "1px solid rgba(255,255,255,0.07)",
                      color: active ? LIME : "#9ca3af", fontSize:12.5,
                    }}>
                    {active && <Check size={11} />}
                    {e === "Todos los eventos" ? e : (
                      <>
                        <span style={{ fontWeight: active ? 500 : 400 }}>{e}</span>
                        {event && <span style={{ fontSize:10.5, color: active ? "rgba(163,230,53,0.7)" : "#4b5563", fontFamily:"'JetBrains Mono', monospace" }}>{event.date}</span>}
                      </>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Capacity card */}
          <div className="rounded-xl p-4" style={{ background:"#101012", border:"1px solid rgba(255,255,255,0.07)" }}>
            <div className="flex items-center justify-between mb-3">
              <span style={{ fontSize:11, color:"#6b7280", textTransform:"uppercase", letterSpacing:"0.1em", fontWeight:600 }}>
                {eventFilter === "Todos los eventos" ? "Inscritos activos" : "Capacidad del evento"}
              </span>
              {eventFilter !== "Todos los eventos" && eventInfo.field && (
                <span className="flex items-center gap-1" style={{ fontSize:11, color:"#6b7280" }}>
                  <MapPin size={10} /> {eventInfo.field}
                </span>
              )}
            </div>
            <div className="flex items-end gap-2 mb-3">
              <span style={{ fontFamily:"'Barlow Condensed', sans-serif", fontSize:40, fontWeight:700, color:"#fff", lineHeight:1 }}>
                {totalEnrolled}
              </span>
              {cap > 0 && (
                <>
                  <span style={{ fontFamily:"'Barlow Condensed', sans-serif", fontSize:22, color:"#4b5563", lineHeight:1.4 }}>/</span>
                  <span style={{ fontFamily:"'Barlow Condensed', sans-serif", fontSize:22, color:"#6b7280", lineHeight:1.4 }}>{cap}</span>
                  <span style={{ fontSize:12, color:"#6b7280", marginBottom:4 }}>jugadores</span>
                </>
              )}
            </div>
            {cap > 0 && (
              <>
                <div style={{ height:6, borderRadius:3, background:"rgba(255,255,255,0.06)", marginBottom:6 }}>
                  <div style={{ height:"100%", borderRadius:3, transition:"width 0.4s",
                    width:`${Math.min((totalEnrolled/cap)*100,100)}%`,
                    background: totalEnrolled/cap >= 0.9 ? `linear-gradient(90deg,#f59e0b,#ef4444)`
                              : totalEnrolled/cap >= 0.6 ? `linear-gradient(90deg,${LIME_DIM},${LIME})`
                              : `linear-gradient(90deg,${LIME_DIM},${LIME})`,
                    opacity: 0.85,
                  }} />
                </div>
                <div className="flex justify-between">
                  <span style={{ fontSize:11, color:"#6b7280", fontFamily:"'JetBrains Mono', monospace" }}>
                    {Math.round((totalEnrolled/cap)*100)}% ocupado
                  </span>
                  <span style={{ fontSize:11, color: cap - totalEnrolled <= 5 ? "#f87171" : LIME, fontFamily:"'JetBrains Mono', monospace" }}>
                    {cap - totalEnrolled} cupos libres
                  </span>
                </div>
              </>
            )}
          </div>
        </div>

        {/* KPI cards */}
        <div className="grid gap-3 mb-4" style={{ gridTemplateColumns:"repeat(4, 1fr)" }}>
          {[
            { label:"Total inscritos",  value:kpiCounts.total,       icon:Users,       color:"#9ca3af",  border:"rgba(255,255,255,0.07)" },
            { label:"Confirmados",      value:kpiCounts.confirmados,  icon:CheckCircle2,color:LIME,       border:"rgba(163,230,53,0.15)"  },
            { label:"Pendientes",       value:kpiCounts.pendientes,   icon:Clock,       color:"#fbbf24",  border:"rgba(251,191,36,0.2)"   },
            { label:"Rechazados / Cancel.", value:kpiCounts.rechazados, icon:Ban,       color:"#f87171",  border:"rgba(248,113,113,0.15)" },
          ].map(({ label, value, icon:Icon, color, border }) => (
            <div key={label} className="rounded-xl px-4 py-3 flex items-center gap-3"
              style={{ background:"#101012", border:`1px solid ${border}` }}>
              <div className="rounded-lg flex items-center justify-center shrink-0"
                style={{ width:34, height:34, background:`${color}15`, border:`1px solid ${color}22` }}>
                <Icon size={15} strokeWidth={1.5} style={{ color }} />
              </div>
              <div>
                <div style={{ fontFamily:"'Barlow Condensed', sans-serif", fontSize:28, fontWeight:700, color:"#fff", lineHeight:1 }}>{value}</div>
                <div style={{ fontSize:11.5, color:"#6b7280", marginTop:1 }}>{label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Table card */}
        <div className="rounded-xl overflow-hidden" style={{ background:"#101012", border:"1px solid rgba(255,255,255,0.07)" }}>

          {/* Toolbar */}
          <div className="flex items-center gap-3 px-4 py-3" style={{ borderBottom:"1px solid rgba(255,255,255,0.055)", background:"#0e0e10" }}>
            {/* Search */}
            <div className="flex items-center gap-2 rounded-lg px-3 flex-1"
              style={{ background:"#141416", border:"1px solid rgba(255,255,255,0.07)", height:34 }}>
              <Search size={13} color="#4b5563" strokeWidth={1.5} />
              <input type="text" placeholder="Buscar jugador, equipo o email..."
                value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                style={{ background:"transparent", border:"none", outline:"none", color:"#e5e7eb",
                  fontSize:12.5, flex:1, fontFamily:"'Inter', sans-serif" }} />
              {search && <button onClick={() => setSearch("")} style={{ color:"#4b5563" }}><X size={12}/></button>}
            </div>

            {/* Status filter tabs */}
            <div className="flex items-center rounded-lg overflow-hidden" style={{ border:"1px solid rgba(255,255,255,0.07)", background:"#141416" }}>
              {(["Todos","Confirmada","Pendiente","Rechazada","Cancelada"] as const).map((s) => {
                const active = statusFilter === s;
                const dotColors: Record<string,string> = { Confirmada:LIME, Pendiente:"#fbbf24", Rechazada:"#f87171", Cancelada:"#6b7280" };
                return (
                  <button key={s} onClick={() => { setStatusFilter(s as any); setPage(1); }}
                    className="px-3 py-1.5 flex items-center gap-1.5 transition-all"
                    style={{ fontSize:12, background: active ? "rgba(163,230,53,0.1)" : "transparent",
                      color: active ? LIME : "#6b7280", fontWeight: active ? 500 : 400,
                      borderRight: s !== "Cancelada" ? "1px solid rgba(255,255,255,0.07)" : "none" }}>
                    {s !== "Todos" && <span style={{ width:5, height:5, borderRadius:"50%", background: active ? dotColors[s] : "#4b5563", display:"inline-block" }} />}
                    {s}
                  </button>
                );
              })}
            </div>

            {/* Team filter */}
            <div className="relative" style={{ minWidth:155 }}>
              <select value={teamFilter} onChange={(e) => { setTeamFilter(e.target.value); setPage(1); }}
                className="appearance-none w-full rounded-lg pl-3 pr-8"
                style={{ background:"#141416", border:"1px solid rgba(255,255,255,0.07)",
                  color: teamFilter !== "Todos los equipos" ? LIME : "#9ca3af", fontSize:12,
                  height:34, outline:"none", fontFamily:"'Inter', sans-serif", cursor:"pointer" }}>
                {teamOptions.map((t) => <option key={t} value={t} style={{ background:"#161618", color:"#e5e7eb" }}>{t}</option>)}
              </select>
              <ChevronDown size={11} color="#6b7280" style={{ position:"absolute", right:8, top:"50%", transform:"translateY(-50%)", pointerEvents:"none" }} />
            </div>

            {/* Pay filter */}
            <div className="relative" style={{ minWidth:135 }}>
              <select value={payFilter} onChange={(e) => { setPayFilter(e.target.value as any); setPage(1); }}
                className="appearance-none w-full rounded-lg pl-3 pr-8"
                style={{ background:"#141416", border:"1px solid rgba(255,255,255,0.07)",
                  color: payFilter !== "Todos" ? LIME : "#9ca3af", fontSize:12,
                  height:34, outline:"none", fontFamily:"'Inter', sans-serif", cursor:"pointer" }}>
                <option value="Todos" style={{ background:"#161618", color:"#e5e7eb" }}>Todos los pagos</option>
                {PAY_OPTS.map((p) => <option key={p} value={p} style={{ background:"#161618", color:"#e5e7eb" }}>{p}</option>)}
              </select>
              <ChevronDown size={11} color="#6b7280" style={{ position:"absolute", right:8, top:"50%", transform:"translateY(-50%)", pointerEvents:"none" }} />
            </div>

            <div className="flex items-center gap-1.5 ml-auto" style={{ color:"#6b7280", fontSize:12, whiteSpace:"nowrap" }}>
              <SlidersHorizontal size={12} strokeWidth={1.5} />
              {filtered.length} registro{filtered.length !== 1 ? "s" : ""}
            </div>
          </div>

          {/* Bulk action bar */}
          {selected.size > 0 && (
            <div className="flex items-center gap-3 px-4 py-2.5"
              style={{ background:"rgba(163,230,53,0.05)", borderBottom:"1px solid rgba(163,230,53,0.15)" }}>
              <span style={{ fontSize:12.5, color:LIME, fontWeight:500 }}>
                {selected.size} jugador{selected.size !== 1 ? "es" : ""} seleccionado{selected.size !== 1 ? "s" : ""}
              </span>
              {selectedPending > 0 && (
                <>
                  <button onClick={bulkConfirm}
                    className="flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-semibold transition-all"
                    style={{ background:"rgba(163,230,53,0.15)", border:"1px solid rgba(163,230,53,0.3)", color:LIME }}>
                    <CheckCircle2 size={12} /> Confirmar {selectedPending}
                  </button>
                  <button onClick={bulkReject}
                    className="flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-semibold transition-all"
                    style={{ background:"rgba(248,113,113,0.1)", border:"1px solid rgba(248,113,113,0.25)", color:"#f87171" }}>
                    <XCircle size={12} /> Rechazar {selectedPending}
                  </button>
                </>
              )}
              <button onClick={() => setSelected(new Set())}
                className="flex items-center gap-1 rounded-md px-2.5 py-1.5 text-xs ml-auto"
                style={{ background:"transparent", border:"1px solid rgba(255,255,255,0.08)", color:"#6b7280" }}>
                <X size={11} /> Deseleccionar
              </button>
            </div>
          )}

          {/* Table header */}
          <div className="grid items-center px-4 py-2.5"
            style={{ gridTemplateColumns:"20px 36px 1fr 140px 160px 100px 110px 110px 44px",
              background:"#0e0e10", borderBottom:"1px solid rgba(255,255,255,0.055)" }}>
            <SelectBox checked={allPageSel} indeterminate={someSel} onChange={toggleAll} />
            <div />
            <div className="flex items-center pl-2" style={{ fontSize:11, color:"#4b5563", fontWeight:600, letterSpacing:"0.08em", textTransform:"uppercase" }}>
              Jugador <SortBtn col="player" />
            </div>
            <div style={{ fontSize:11, color:"#4b5563", fontWeight:600, letterSpacing:"0.08em", textTransform:"uppercase" }}>Equipo</div>
            <div className="flex items-center" style={{ fontSize:11, color:"#4b5563", fontWeight:600, letterSpacing:"0.08em", textTransform:"uppercase" }}>
              Evento <SortBtn col="event" />
            </div>
            <div className="flex items-center" style={{ fontSize:11, color:"#4b5563", fontWeight:600, letterSpacing:"0.08em", textTransform:"uppercase" }}>
              Fecha <SortBtn col="regDate" />
            </div>
            <div className="flex items-center" style={{ fontSize:11, color:"#4b5563", fontWeight:600, letterSpacing:"0.08em", textTransform:"uppercase" }}>
              Pago <SortBtn col="payStatus" />
            </div>
            <div className="flex items-center" style={{ fontSize:11, color:"#4b5563", fontWeight:600, letterSpacing:"0.08em", textTransform:"uppercase" }}>
              Estado <SortBtn col="status" />
            </div>
            <div />
          </div>

          {/* Rows */}
          {paginated.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16" style={{ color:"#4b5563" }}>
              <Users size={32} strokeWidth={1} style={{ marginBottom:12, opacity:0.3 }} />
              <div style={{ fontSize:14, color:"#6b7280" }}>No se encontraron inscripciones</div>
              <div style={{ fontSize:12, color:"#4b5563", marginTop:4 }}>Ajusta los filtros para ver más resultados</div>
            </div>
          ) : (
            paginated.map((reg, i) => {
              const isSel = selected.has(reg.id);
              const isPending = reg.status === "Pendiente";
              return (
                <div key={reg.id}
                  className="grid items-center px-4 py-2.5 relative transition-all"
                  style={{
                    gridTemplateColumns:"20px 36px 1fr 140px 160px 100px 110px 110px 44px",
                    borderBottom: i < paginated.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none",
                    background: isSel ? "rgba(163,230,53,0.03)" : isPending ? "rgba(251,191,36,0.015)" : "transparent",
                    borderLeft: isPending ? "2px solid rgba(251,191,36,0.35)" : "2px solid transparent",
                  }}
                  onMouseEnter={(e) => { if (!isSel) (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.018)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = isSel ? "rgba(163,230,53,0.03)" : isPending ? "rgba(251,191,36,0.015)" : "transparent"; }}
                >
                  <SelectBox checked={isSel} onChange={() => toggleSelect(reg.id)} />

                  <Avatar initials={reg.initials} color={reg.avatarColor} size={28} />

                  {/* Player */}
                  <div className="min-w-0 pl-2">
                    <div style={{ fontSize:13, fontWeight:500, color:"#e5e7eb", whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>
                      {reg.player}
                    </div>
                    <div style={{ fontSize:11, color:"#4b5563", whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>
                      {reg.email}
                    </div>
                  </div>

                  {/* Team */}
                  <div style={{ fontSize:12, color:"#9ca3af", whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>
                    <div className="flex items-center gap-1.5">
                      <Shield size={10} color="#4b5563" strokeWidth={1.5} style={{ flexShrink:0 }} />
                      {reg.team}
                    </div>
                  </div>

                  {/* Event */}
                  <div style={{ fontSize:11.5, color:"#9ca3af", whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>
                    {reg.event}
                  </div>

                  {/* Reg date */}
                  <div style={{ fontSize:11.5, color:"#6b7280", fontFamily:"'JetBrains Mono', monospace" }}>
                    {reg.registrationDate}
                  </div>

                  {/* Pay status */}
                  <PayBadge status={reg.paymentStatus} />

                  {/* Status + inline quick actions for pending */}
                  <div>
                    {isPending ? (
                      <div className="flex items-center gap-1.5">
                        <button onClick={() => confirmReg(reg.id)}
                          className="rounded flex items-center justify-center transition-all"
                          title="Confirmar"
                          style={{ width:22, height:22, background:"rgba(163,230,53,0.12)", border:"1px solid rgba(163,230,53,0.25)", color:LIME }}>
                          <Check size={11} strokeWidth={2.5} />
                        </button>
                        <button onClick={() => rejectReg(reg.id)}
                          className="rounded flex items-center justify-center transition-all"
                          title="Rechazar"
                          style={{ width:22, height:22, background:"rgba(248,113,113,0.1)", border:"1px solid rgba(248,113,113,0.2)", color:"#f87171" }}>
                          <X size={11} strokeWidth={2.5} />
                        </button>
                      </div>
                    ) : (
                      <InscStatusBadge status={reg.status} />
                    )}
                  </div>

                  {/* Menu */}
                  <div className="relative flex items-center justify-center">
                    <button onClick={() => setOpenMenu(openMenu === reg.id ? null : reg.id)}
                      className="rounded-md flex items-center justify-center"
                      style={{ width:28, height:28, background: openMenu === reg.id ? "rgba(255,255,255,0.08)" : "transparent", color:"#6b7280" }}>
                      <MoreHorizontal size={14} />
                    </button>
                    {openMenu === reg.id && (
                      <ActionMenu reg={reg} onClose={() => setOpenMenu(null)}
                        onConfirm={() => confirmReg(reg.id)}
                        onReject={() => rejectReg(reg.id)} />
                    )}
                  </div>

                  {/* Notes indicator */}
                  {reg.notes && (
                    <div style={{ position:"absolute", top:8, right:52 }}>
                      <div title={reg.notes} style={{ width:6, height:6, borderRadius:"50%", background:"#fbbf24" }} />
                    </div>
                  )}
                </div>
              );
            })
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between px-4 py-3"
              style={{ borderTop:"1px solid rgba(255,255,255,0.055)", background:"#0e0e10" }}>
              <span style={{ fontSize:12, color:"#6b7280", fontFamily:"'JetBrains Mono', monospace" }}>
                {(page-1)*PER_PAGE+1}–{Math.min(page*PER_PAGE, filtered.length)} de {filtered.length}
              </span>
              <div className="flex items-center gap-1.5">
                <button disabled={page===1} onClick={() => setPage((p) => p-1)}
                  className="flex items-center justify-center rounded-md"
                  style={{ width:30, height:30, background:"#141416", border:"1px solid rgba(255,255,255,0.07)", color: page===1 ? "#2d2d30" : "#9ca3af" }}>
                  <ChevronLeft size={13} />
                </button>
                {Array.from({ length: totalPages }, (_, i) => i+1).map((n) => (
                  <button key={n} onClick={() => setPage(n)}
                    className="flex items-center justify-center rounded-md"
                    style={{ width:30, height:30, fontSize:12, fontFamily:"'JetBrains Mono', monospace",
                      background: n===page ? LIME : "#141416",
                      border: n===page ? "none" : "1px solid rgba(255,255,255,0.07)",
                      color: n===page ? "#000" : "#9ca3af", fontWeight: n===page ? 700 : 400 }}>
                    {n}
                  </button>
                ))}
                <button disabled={page===totalPages} onClick={() => setPage((p) => p+1)}
                  className="flex items-center justify-center rounded-md"
                  style={{ width:30, height:30, background:"#141416", border:"1px solid rgba(255,255,255,0.07)", color: page===totalPages ? "#2d2d30" : "#9ca3af" }}>
                  <ChevronRight size={13} />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Legend */}
        <div className="flex items-center gap-4 mt-3 px-1">
          <span style={{ fontSize:11, color:"#4b5563" }}>Leyenda:</span>
          <div className="flex items-center gap-1.5">
            <div style={{ width:10, height:10, borderRadius:2, background:"rgba(251,191,36,0.35)", border:"1px solid rgba(251,191,36,0.4)" }} />
            <span style={{ fontSize:11, color:"#6b7280" }}>Inscripción pendiente de revisión</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div style={{ width:6, height:6, borderRadius:"50%", background:"#fbbf24" }} />
            <span style={{ fontSize:11, color:"#6b7280" }}>Tiene notas del jugador</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="rounded flex items-center justify-center" style={{ width:16, height:16, background:"rgba(163,230,53,0.12)", border:"1px solid rgba(163,230,53,0.25)" }}>
              <Check size={9} color={LIME} strokeWidth={2.5} />
            </div>
            <span style={{ fontSize:11, color:"#6b7280" }}>Confirmación rápida (solo pendientes)</span>
          </div>
        </div>
      </div>
    </div>
  );
}

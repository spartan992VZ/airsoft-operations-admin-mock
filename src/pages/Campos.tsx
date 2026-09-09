import { useState, useMemo } from "react";
import {
  Search, ChevronDown, MapPin, Calendar, Users,
  MoreHorizontal, X, Check, ArrowUpDown, PlusCircle,
  Eye, Pencil, Ban, Phone, Mail, ChevronRight, Clock,
  Crosshair, Shield, Zap, Target, CheckCircle2, AlertCircle,
} from "lucide-react";
import { LIME, LIME_DIM } from "../shared";

// ─── Types ───────────────────────────────────────────────────────────────────
type FieldStatus      = "Activo" | "Inactivo" | "Mantenimiento";
type Availability     = "Disponible" | "Reservado" | "Ocupado por evento";

interface FieldEvent {
  name: string;
  date: string;
  enrolled: number;
  capacity: number;
}

interface Field {
  id: number;
  name: string;
  slug: string;
  location: string;
  city: string;
  region: string;
  status: FieldStatus;
  availability: Availability;
  capacity: number;
  modalities: string[];
  events: number;
  upcomingEvent: FieldEvent | null;
  manager: string;
  managerPhone: string;
  managerEmail: string;
  area: string;
  founded: string;
  description: string;
  img: string;
  reservations: number;
}

// ─── Data ────────────────────────────────────────────────────────────────────
const FIELDS: Field[] = [
  {
    id: 1,
    name: "Black Hawk Field",
    slug: "BHF",
    location: "Carretera A-7, km 42",
    city: "Valencia",
    region: "Levante",
    status: "Activo",
    availability: "Disponible",
    capacity: 40,
    modalities: ["CQB", "Woodland"],
    events: 12,
    reservations: 9,
    upcomingEvent: { name: "Asalto al Fuerte", date: "07 Jun 2024", enrolled: 20, capacity: 40 },
    manager: "Carlos Ortega",
    managerPhone: "+34 612 111 222",
    managerEmail: "carlos@blackhawkfield.es",
    area: "18.000 m²",
    founded: "2020",
    description: "Campo mixto con zona CQB interior y zona Woodland exterior. Instalaciones de primer nivel con vestuarios, área de crónica y parking. Homologado para competición regional.",
    img: "https://images.unsplash.com/photo-1519689680058-324335c77eba?w=400&h=220&fit=crop&auto=format",
  },
  {
    id: 2,
    name: "Delta Base",
    slug: "DB",
    location: "Ctra. M-600, km 12",
    city: "Madrid",
    region: "Centro",
    status: "Activo",
    availability: "Reservado",
    capacity: 60,
    modalities: ["Woodland", "Milsim"],
    events: 8,
    reservations: 6,
    upcomingEvent: { name: "Operación Black Hawk", date: "24 May 2024", enrolled: 48, capacity: 60 },
    manager: "Marta Sánchez",
    managerPhone: "+34 623 333 444",
    managerEmail: "marta@deltabase.es",
    area: "32.000 m²",
    founded: "2019",
    description: "El campo más grande de la Comunidad de Madrid. Terreno natural de bosque mediterráneo con estructuras permanentes para Milsim y grandes operaciones de día completo.",
    img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=220&fit=crop&auto=format",
  },
  {
    id: 3,
    name: "Campo Alpha",
    slug: "CA",
    location: "Polígono Industrial Nord, nave 7",
    city: "Barcelona",
    region: "Cataluña",
    status: "Activo",
    availability: "Ocupado por evento",
    capacity: 50,
    modalities: ["CQB", "Speedsoft"],
    events: 11,
    reservations: 10,
    upcomingEvent: { name: "Misión Red Dawn", date: "31 May 2024", enrolled: 35, capacity: 50 },
    manager: "Pau Ferrer",
    managerPhone: "+34 634 555 666",
    managerEmail: "pau@campoalpha.es",
    area: "4.200 m²",
    founded: "2021",
    description: "Campo indoor de alta especificidad para CQB y Speedsoft. Escenarios modulares intercambiables, iluminación LED táctica y sistema de música ambiental para inmersión total.",
    img: "https://images.unsplash.com/photo-1550684376-efcbd6e3f031?w=400&h=220&fit=crop&auto=format",
  },
  {
    id: 4,
    name: "Campo Omega",
    slug: "CO",
    location: "Finca El Olivar, salida 104",
    city: "Toledo",
    region: "Centro",
    status: "Activo",
    availability: "Disponible",
    capacity: 50,
    modalities: ["Milsim", "Scenario"],
    events: 4,
    reservations: 3,
    upcomingEvent: { name: "Venganza", date: "21 Jun 2024", enrolled: 15, capacity: 30 },
    manager: "Javier Molina",
    managerPhone: "+34 645 777 888",
    managerEmail: "javier@campoOmega.es",
    area: "25.000 m²",
    founded: "2022",
    description: "Campo de Scenario con narrativa ambiental propia. Vehículos militares retirados, estructuras de hormigón y zonas de bosque crean escenarios únicos para operaciones de larga duración.",
    img: "https://images.unsplash.com/photo-1465447142348-e9952c393450?w=400&h=220&fit=crop&auto=format",
  },
  {
    id: 5,
    name: "Campo Norte",
    slug: "CN",
    location: "Polígono Txorierri, carretera BI-3713",
    city: "Bilbao",
    region: "Norte",
    status: "Activo",
    availability: "Disponible",
    capacity: 70,
    modalities: ["Woodland", "Nocturno", "Milsim"],
    events: 6,
    reservations: 4,
    upcomingEvent: null,
    manager: "Ainhoa Etxebarria",
    managerPhone: "+34 656 888 999",
    managerEmail: "ainhoa@camponorte.es",
    area: "28.000 m²",
    founded: "2021",
    description: "Gran campo al norte con terreno variado: zona boscosa densa, pradera abierta y estructuras de madera. Ideal para operaciones nocturnas y eventos de fin de semana.",
    img: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=400&h=220&fit=crop&auto=format",
  },
  {
    id: 6,
    name: "Campo Base Sur",
    slug: "CBS",
    location: "Camino Rural de Coria, km 8",
    city: "Valencia",
    region: "Levante",
    status: "Activo",
    availability: "Disponible",
    capacity: 60,
    modalities: ["CQB", "Milsim", "Nocturno"],
    events: 3,
    reservations: 1,
    upcomingEvent: { name: "Blackout", date: "05 Jul 2024", enrolled: 0, capacity: 50 },
    manager: "Sergio Llopis",
    managerPhone: "+34 667 999 000",
    managerEmail: "sergio@basesurvlc.es",
    area: "20.000 m²",
    founded: "2023",
    description: "Campo reciente con diseño híbrido. Bunkers de hormigón, trincheras excavadas y zona urbana simulada. Especializado en partidas nocturnas con efectos de luz y sonido.",
    img: "https://images.unsplash.com/photo-1533134486753-c833f0ed4866?w=400&h=220&fit=crop&auto=format",
  },
  {
    id: 7,
    name: "Campo Sur",
    slug: "CS",
    location: "Finca La Marisma, carretera SE-3401",
    city: "Sevilla",
    region: "Sur",
    status: "Mantenimiento",
    availability: "Reservado",
    capacity: 45,
    modalities: ["Woodland", "Scenario"],
    events: 7,
    reservations: 0,
    upcomingEvent: null,
    manager: "Antonio Rueda",
    managerPhone: "+34 678 000 111",
    managerEmail: "antonio@camposur.es",
    area: "22.000 m²",
    founded: "2018",
    description: "Campo histórico del sur de España, actualmente en proceso de renovación de infraestructura. Reapertura prevista para septiembre 2024 con nuevas zonas de juego.",
    img: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=220&fit=crop&auto=format",
  },
];

const REGIONS    = ["Todas las regiones",   "Centro","Sur","Cataluña","Levante","Norte"];
const MODALITIES = ["Todas las modalidades","Milsim","CQB","Woodland","Nocturno","Speedsoft","Scenario"];
type SortKey = "name" | "events" | "reservations" | "capacity" | "founded";

// ─── Availability badge ───────────────────────────────────────────────────────
function AvailBadge({ av }: { av: Availability }) {
  const cfg: Record<Availability, { bg: string; color: string; dot: string }> = {
    "Disponible":         { bg:"rgba(163,230,53,0.1)",  color:LIME,      dot:LIME      },
    "Reservado":          { bg:"rgba(251,191,36,0.1)",  color:"#fbbf24", dot:"#fbbf24" },
    "Ocupado por evento": { bg:"rgba(96,165,250,0.1)",  color:"#60a5fa", dot:"#60a5fa" },
  };
  const c = cfg[av];
  return (
    <span className="inline-flex items-center gap-1.5 rounded px-2 py-0.5"
      style={{ background:c.bg, color:c.color, fontSize:11,
               fontFamily:"'JetBrains Mono',monospace", whiteSpace:"nowrap" }}>
      <span style={{ width:5, height:5, borderRadius:"50%", background:c.dot,
                     display:"inline-block", flexShrink:0 }}/>
      {av}
    </span>
  );
}

function FieldStatusBadge({ status }: { status: FieldStatus }) {
  const cfg: Record<FieldStatus, { bg:string; color:string }> = {
    "Activo":        { bg:"rgba(163,230,53,0.1)",  color:LIME      },
    "Inactivo":      { bg:"rgba(100,100,100,0.15)",color:"#6b7280" },
    "Mantenimiento": { bg:"rgba(251,191,36,0.1)",  color:"#fbbf24" },
  };
  const c = cfg[status];
  return (
    <span className="inline-flex items-center gap-1.5 rounded px-2 py-0.5"
      style={{ background:c.bg, color:c.color, fontSize:11,
               fontFamily:"'JetBrains Mono',monospace", whiteSpace:"nowrap" }}>
      <span style={{ width:5, height:5, borderRadius:"50%", background:c.color,
                     display:"inline-block", flexShrink:0 }}/>
      {status}
    </span>
  );
}

// ─── Detail panel ────────────────────────────────────────────────────────────
function FieldDetail({ field, onClose }: { field:Field; onClose:()=>void }) {
  const fillPct = field.upcomingEvent
    ? Math.round((field.upcomingEvent.enrolled / field.upcomingEvent.capacity) * 100) : 0;

  return (
    <div className="flex flex-col h-full" style={{ background:"#0f0f11" }}>

      {/* Image header */}
      <div className="relative shrink-0"
        style={{ height:130, background:"#1a1a1c", overflow:"hidden" }}>
        <img src={field.img} alt={field.name}
          style={{ width:"100%", height:"100%", objectFit:"cover", opacity:0.6 }}/>
        <div style={{ position:"absolute", inset:0,
                      background:"linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(15,15,17,0.95))" }}/>
        <button onClick={onClose}
          className="absolute top-3 right-3 rounded-md flex items-center justify-center"
          style={{ width:26, height:26, background:"rgba(0,0,0,0.6)",
                   border:"1px solid rgba(255,255,255,0.1)", color:"#9ca3af" }}>
          <X size={13}/>
        </button>
        {/* Status overlay */}
        <div className="absolute bottom-3 left-4 flex items-center gap-2">
          <FieldStatusBadge status={field.status}/>
          <AvailBadge av={field.availability}/>
        </div>
      </div>

      {/* Identity */}
      <div className="px-5 pt-4 pb-3 shrink-0"
        style={{ borderBottom:"1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:20, fontWeight:700,
                      letterSpacing:"0.03em", color:"#fff", lineHeight:1, marginBottom:6 }}>
          {field.name}
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          <span className="flex items-center gap-1.5" style={{ fontSize:11.5, color:"#6b7280" }}>
            <MapPin size={10}/> {field.location}, {field.city}
          </span>
          <span style={{ color:"#2d2d30" }}>·</span>
          <span style={{ fontSize:11.5, color:"#6b7280" }}>{field.area}</span>
          <span style={{ color:"#2d2d30" }}>·</span>
          <span style={{ fontSize:11.5, color:"#6b7280" }}>Desde {field.founded}</span>
        </div>
        <p style={{ fontSize:12, color:"#6b7280", lineHeight:1.65, marginTop:10 }}>
          {field.description}
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-2 px-5 py-3 shrink-0"
        style={{ borderBottom:"1px solid rgba(255,255,255,0.06)" }}>
        {[
          { label:"Capacidad",  value:`${field.capacity} jug.`, color:"#e5e7eb" },
          { label:"Eventos",    value:field.events,              color:"#e5e7eb" },
          { label:"Reservas",   value:field.reservations,        color:LIME      },
        ].map(({ label, value, color }) => (
          <div key={label} className="rounded-lg py-2.5 text-center"
            style={{ background:"#141416", border:"1px solid rgba(255,255,255,0.06)" }}>
            <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:22,
                          fontWeight:700, color, lineHeight:1 }}>{value}</div>
            <div style={{ fontSize:10.5, color:"#4b5563", marginTop:2 }}>{label}</div>
          </div>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-5">

        {/* Upcoming event */}
        {field.upcomingEvent ? (
          <div>
            <div style={{ fontSize:10, color:"#4b5563", fontWeight:600, letterSpacing:"0.12em",
                          textTransform:"uppercase", marginBottom:8 }}>Próximo evento</div>
            <div className="rounded-lg p-3"
              style={{ background:"rgba(163,230,53,0.04)", border:"1px solid rgba(163,230,53,0.12)" }}>
              <div className="flex items-start justify-between mb-2">
                <div>
                  <div style={{ fontSize:13, fontWeight:500, color:"#e5e7eb" }}>
                    {field.upcomingEvent.name}
                  </div>
                  <div className="flex items-center gap-1.5 mt-1"
                    style={{ fontSize:11, color:"#6b7280" }}>
                    <Calendar size={10}/> {field.upcomingEvent.date}
                  </div>
                </div>
                <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:12.5,
                               color:LIME, fontWeight:500 }}>
                  {field.upcomingEvent.enrolled}/{field.upcomingEvent.capacity}
                </span>
              </div>
              <div style={{ height:3, borderRadius:2, background:"rgba(255,255,255,0.06)" }}>
                <div style={{ height:"100%", borderRadius:2, width:`${fillPct}%`,
                              background:`linear-gradient(90deg,${LIME_DIM},${LIME})`, opacity:0.8 }}/>
              </div>
              <div className="flex justify-between mt-1">
                <span style={{ fontSize:10, color:"#6b7280" }}>{fillPct}% inscrito</span>
                <span style={{ fontSize:10, color:"#4b5563",
                               fontFamily:"'JetBrains Mono',monospace" }}>
                  {field.upcomingEvent.capacity - field.upcomingEvent.enrolled} cupos libres
                </span>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <div style={{ fontSize:10, color:"#4b5563", fontWeight:600, letterSpacing:"0.12em",
                          textTransform:"uppercase", marginBottom:8 }}>Próximo evento</div>
            <div className="rounded-lg p-3 flex items-center gap-2"
              style={{ background:"#141416", border:"1px solid rgba(255,255,255,0.05)" }}>
              <Calendar size={13} color="#4b5563" strokeWidth={1.5}/>
              <span style={{ fontSize:12, color:"#4b5563" }}>Sin eventos programados</span>
            </div>
          </div>
        )}

        {/* Modalities */}
        <div>
          <div style={{ fontSize:10, color:"#4b5563", fontWeight:600, letterSpacing:"0.12em",
                        textTransform:"uppercase", marginBottom:8 }}>Modalidades</div>
          <div className="flex flex-wrap gap-1.5">
            {field.modalities.map((m) => (
              <span key={m} className="rounded-md px-2.5 py-1"
                style={{ fontSize:12, background:"rgba(255,255,255,0.05)",
                         border:"1px solid rgba(255,255,255,0.08)", color:"#9ca3af" }}>
                {m}
              </span>
            ))}
          </div>
        </div>

        {/* Disponibilidad */}
        <div>
          <div style={{ fontSize:10, color:"#4b5563", fontWeight:600, letterSpacing:"0.12em",
                        textTransform:"uppercase", marginBottom:8 }}>Disponibilidad</div>
          <div className="space-y-1.5">
            {(["Disponible","Reservado","Ocupado por evento"] as Availability[]).map((av) => {
              const active = field.availability === av;
              const icons: Record<string,any> = {
                "Disponible":         CheckCircle2,
                "Reservado":          Clock,
                "Ocupado por evento": AlertCircle,
              };
              const Icon = icons[av];
              const colors: Record<string,string> = {
                "Disponible":         LIME,
                "Reservado":          "#fbbf24",
                "Ocupado por evento": "#60a5fa",
              };
              return (
                <div key={av} className="flex items-center gap-2.5 rounded-lg px-3 py-2"
                  style={{ background: active ? `${colors[av]}10` : "#141416",
                           border: active ? `1px solid ${colors[av]}25` : "1px solid rgba(255,255,255,0.05)" }}>
                  <Icon size={13} style={{ color: active ? colors[av] : "#4b5563" }} strokeWidth={1.5}/>
                  <span style={{ fontSize:12.5, color: active ? "#e5e7eb" : "#6b7280",
                                 fontWeight: active ? 500 : 400 }}>{av}</span>
                  {active && <Check size={11} style={{ color:colors[av], marginLeft:"auto" }}/>}
                </div>
              );
            })}
          </div>
        </div>

        {/* Contact */}
        <div>
          <div style={{ fontSize:10, color:"#4b5563", fontWeight:600, letterSpacing:"0.12em",
                        textTransform:"uppercase", marginBottom:8 }}>Responsable</div>
          <div className="rounded-lg px-3 py-2.5 mb-2"
            style={{ background:"#141416", border:"1px solid rgba(255,255,255,0.05)" }}>
            <div style={{ fontSize:13, fontWeight:500, color:"#d1d5db", marginBottom:1 }}>
              {field.manager}
            </div>
            <div style={{ fontSize:11, color:"#6b7280" }}>Responsable del campo</div>
          </div>
          <div className="space-y-1.5">
            <div className="flex items-center gap-2.5">
              <Phone size={11} color="#4b5563" strokeWidth={1.5}/>
              <span style={{ fontSize:12, color:"#9ca3af",
                             fontFamily:"'JetBrains Mono',monospace" }}>{field.managerPhone}</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Mail size={11} color="#4b5563" strokeWidth={1.5}/>
              <span style={{ fontSize:12, color:"#9ca3af",
                             fontFamily:"'JetBrains Mono',monospace" }}>{field.managerEmail}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="px-5 py-4 space-y-2 shrink-0"
        style={{ borderTop:"1px solid rgba(255,255,255,0.06)" }}>
        <div className="grid grid-cols-2 gap-2">
          <button className="flex items-center justify-center gap-2 rounded-lg py-2.5 font-semibold"
            style={{ background:LIME, color:"#000", fontSize:13 }}>
            <Calendar size={13}/> Gestionar disponibilidad
          </button>
          <button className="flex items-center justify-center gap-2 rounded-lg py-2.5"
            style={{ background:"#1a1a1c", border:"1px solid rgba(255,255,255,0.08)",
                     color:"#9ca3af", fontSize:13 }}>
            <Pencil size={13}/> Editar
          </button>
        </div>
        <button className="w-full flex items-center justify-center gap-2 rounded-lg py-2"
          style={{ background:"rgba(248,113,113,0.06)", border:"1px solid rgba(248,113,113,0.15)",
                   color:"#f87171", fontSize:12.5 }}>
          <Ban size={12}/>
          {field.status === "Activo" ? "Desactivar campo" : "Activar campo"}
        </button>
      </div>
    </div>
  );
}

// ─── Field card ──────────────────────────────────────────────────────────────
function FieldCard({ field, selected, onSelect, onView }: {
  field:Field; selected:boolean; onSelect:()=>void; onView:()=>void;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const fillPct = field.upcomingEvent
    ? Math.round((field.upcomingEvent.enrolled / field.upcomingEvent.capacity) * 100) : 0;

  const avColor: Record<Availability, string> = {
    "Disponible":         LIME,
    "Reservado":          "#fbbf24",
    "Ocupado por evento": "#60a5fa",
  };

  return (
    <div className="rounded-xl overflow-hidden"
      style={{
        background:"#101012",
        border: selected
          ? "1px solid rgba(163,230,53,0.28)"
          : "1px solid rgba(255,255,255,0.07)",
      }}>

      {/* Thumbnail */}
      <div className="relative" style={{ height:90, background:"#1a1a1c", overflow:"hidden" }}>
        <img src={field.img} alt={field.name}
          style={{ width:"100%", height:"100%", objectFit:"cover", opacity:0.6 }}/>
        <div style={{ position:"absolute", inset:0,
                      background:"linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(16,16,18,0.85))" }}/>

        {/* Top-left checkbox */}
        <button onClick={onSelect}
          className="absolute top-2.5 left-2.5 flex items-center justify-center rounded"
          style={{ width:16, height:16, background:selected?LIME:"rgba(0,0,0,0.55)",
                   border:selected?"none":"1px solid rgba(255,255,255,0.25)" }}>
          {selected && <Check size={9} color="#000" strokeWidth={3}/>}
        </button>

        {/* Top-right menu */}
        <div className="absolute top-2 right-2">
          <button onClick={() => setMenuOpen((o) => !o)}
            className="rounded-md flex items-center justify-center"
            style={{ width:24, height:24, background:"rgba(0,0,0,0.55)",
                     border:"1px solid rgba(255,255,255,0.12)", color:"#9ca3af" }}>
            <MoreHorizontal size={13}/>
          </button>
          {menuOpen && (
            <div className="absolute right-0 top-7 z-50 rounded-lg overflow-hidden"
              style={{ background:"#161618", border:"1px solid rgba(255,255,255,0.1)",
                       boxShadow:"0 8px 32px rgba(0,0,0,0.6)", minWidth:165 }}
              onMouseLeave={() => setMenuOpen(false)}>
              {[
                { icon:Eye,      label:"Ver campo",             color:"#e5e7eb", fn:() => { onView(); setMenuOpen(false); } },
                { icon:Calendar, label:"Gestionar disponibil.", color:"#e5e7eb", fn:() => setMenuOpen(false) },
                { icon:Pencil,   label:"Editar",                color:"#e5e7eb", fn:() => setMenuOpen(false) },
                { icon:Ban,      label:field.status==="Activo"?"Desactivar":"Activar",
                                                                color:"#f87171", fn:() => setMenuOpen(false) },
              ].map(({ icon:Icon, label, color, fn }) => (
                <button key={label} onClick={fn}
                  className="flex items-center gap-2.5 w-full px-3.5 py-2.5 text-left"
                  style={{ fontSize:12.5, color }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background="rgba(255,255,255,0.05)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background="transparent"; }}>
                  <Icon size={13} strokeWidth={1.5}/> {label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Bottom status strip */}
        <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between">
          <AvailBadge av={field.availability}/>
          <FieldStatusBadge status={field.status}/>
        </div>
      </div>

      {/* Body */}
      <div className="p-3.5">

        {/* Name + location */}
        <div className="mb-3">
          <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:15.5, fontWeight:700,
                        letterSpacing:"0.02em", color:"#fff", lineHeight:1.1, marginBottom:3,
                        whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>
            {field.name}
          </div>
          <div className="flex items-center gap-1" style={{ fontSize:11.5, color:"#6b7280" }}>
            <MapPin size={9} strokeWidth={1.5}/> {field.city}
            <span style={{ color:"#2d2d30", margin:"0 2px" }}>·</span>
            <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:10.5, color:"#4b5563" }}>
              {field.area}
            </span>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-1.5 mb-3">
          {[
            { label:"Capacidad", value:`${field.capacity}`, suffix:"jug.", color:"#e5e7eb" },
            { label:"Eventos",   value:`${field.events}`,   suffix:"",     color:"#e5e7eb" },
            { label:"Reservas",  value:`${field.reservations}`, suffix:"", color:LIME      },
          ].map(({ label, value, suffix, color }) => (
            <div key={label} className="rounded-md py-1.5 text-center"
              style={{ background:"#141416", border:"1px solid rgba(255,255,255,0.05)" }}>
              <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:17,
                            fontWeight:700, color, lineHeight:1 }}>
                {value}<span style={{ fontSize:10, fontFamily:"'Inter',sans-serif",
                                      color:"#4b5563", fontWeight:400, marginLeft:1 }}>{suffix}</span>
              </div>
              <div style={{ fontSize:9.5, color:"#4b5563", marginTop:1.5 }}>{label}</div>
            </div>
          ))}
        </div>

        {/* Modalities */}
        <div className="flex flex-wrap gap-1 mb-3">
          {field.modalities.map((m) => (
            <span key={m} className="rounded px-1.5 py-0.5"
              style={{ fontSize:10.5, background:"rgba(255,255,255,0.05)",
                       border:"1px solid rgba(255,255,255,0.07)", color:"#6b7280" }}>
              {m}
            </span>
          ))}
        </div>

        {/* Upcoming event */}
        {field.upcomingEvent ? (
          <div className="rounded-lg px-3 py-2 mb-3"
            style={{ background:"rgba(163,230,53,0.04)", border:`1px solid ${avColor[field.availability]}20` }}>
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-1.5">
                <Crosshair size={10} style={{ color:LIME }} strokeWidth={1.5}/>
                <span style={{ fontSize:11.5, color:"#d1d5db", fontWeight:500,
                               whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis",
                               maxWidth:130 }}>
                  {field.upcomingEvent.name}
                </span>
              </div>
              <span style={{ fontSize:10.5, color:"#6b7280",
                             fontFamily:"'JetBrains Mono',monospace", flexShrink:0 }}>
                {field.upcomingEvent.date}
              </span>
            </div>
            <div style={{ height:2.5, borderRadius:1.5, background:"rgba(255,255,255,0.06)" }}>
              <div style={{ height:"100%", borderRadius:1.5, width:`${fillPct}%`,
                            background:`linear-gradient(90deg,${LIME_DIM},${LIME})`, opacity:0.75 }}/>
            </div>
            <div className="flex justify-between mt-1">
              <span style={{ fontSize:10, color:"#6b7280",
                             fontFamily:"'JetBrains Mono',monospace" }}>
                {field.upcomingEvent.enrolled}/{field.upcomingEvent.capacity}
              </span>
              <span style={{ fontSize:10, color:"#4b5563" }}>{fillPct}%</span>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2 rounded-lg px-3 py-2 mb-3"
            style={{ background:"#141416", border:"1px solid rgba(255,255,255,0.05)" }}>
            <Calendar size={11} color="#3d3d3d" strokeWidth={1.5}/>
            <span style={{ fontSize:11.5, color:"#4b5563" }}>Sin próximos eventos</span>
          </div>
        )}

        {/* CTA */}
        <button onClick={onView}
          className="w-full flex items-center justify-center gap-1.5 rounded-lg py-1.5 transition-all"
          style={{ background:"transparent", border:"1px solid rgba(255,255,255,0.07)",
                   color:"#6b7280", fontSize:12 }}>
          <Eye size={11} strokeWidth={1.5}/> Ver campo
          <ChevronRight size={10} color="#3d3d3d"/>
        </button>
      </div>
    </div>
  );
}

// ─── Main ────────────────────────────────────────────────────────────────────
export default function Campos() {
  const [search,          setSearch]          = useState("");
  const [statusFilter,    setStatusFilter]    = useState<FieldStatus|"Todos">("Todos");
  const [regionFilter,    setRegionFilter]    = useState("Todas las regiones");
  const [modalityFilter,  setModalityFilter]  = useState("Todas las modalidades");
  const [sortKey,         setSortKey]         = useState<SortKey>("events");
  const [sortDir,         setSortDir]         = useState<"asc"|"desc">("desc");
  const [selected,        setSelected]        = useState<Set<number>>(new Set());
  const [detailField,     setDetailField]     = useState<Field|null>(null);

  const filtered = useMemo(() => {
    let list = [...FIELDS];
    if (search) list = list.filter((f) =>
      f.name.toLowerCase().includes(search.toLowerCase()) ||
      f.city.toLowerCase().includes(search.toLowerCase()) ||
      f.region.toLowerCase().includes(search.toLowerCase())
    );
    if (statusFilter !== "Todos") list = list.filter((f) => f.status === statusFilter);
    if (regionFilter !== "Todas las regiones")    list = list.filter((f) => f.region === regionFilter);
    if (modalityFilter !== "Todas las modalidades")
      list = list.filter((f) => f.modalities.includes(modalityFilter));
    list.sort((a,b) => {
      let d = 0;
      if (sortKey==="name")         d = a.name.localeCompare(b.name);
      if (sortKey==="events")       d = a.events - b.events;
      if (sortKey==="reservations") d = a.reservations - b.reservations;
      if (sortKey==="capacity")     d = a.capacity - b.capacity;
      if (sortKey==="founded")      d = a.founded.localeCompare(b.founded);
      return sortDir==="asc" ? d : -d;
    });
    return list;
  }, [search, statusFilter, regionFilter, modalityFilter, sortKey, sortDir]);

  function toggleSort(k: SortKey) {
    if (sortKey===k) setSortDir((d) => d==="asc"?"desc":"asc");
    else { setSortKey(k); setSortDir("desc"); }
  }

  function toggleSelect(id:number) {
    setSelected((s) => { const n=new Set(s); n.has(id)?n.delete(id):n.add(id); return n; });
  }

  const kpis = [
    { label:"Campos activos",       value:FIELDS.filter((f)=>f.status==="Activo").length,               color:LIME      },
    { label:"Campos registrados",   value:FIELDS.length,                                                  color:"#9ca3af" },
    { label:"Reservas próximas",    value:FIELDS.filter((f)=>f.upcomingEvent!==null).length,             color:"#fbbf24" },
    { label:"Eventos programados",  value:FIELDS.reduce((s,f)=>s+(f.upcomingEvent?1:0),0),               color:"#a78bfa" },
  ];

  const statusList: FieldStatus[] = ["Activo","Inactivo","Mantenimiento"];
  const dotColors: Record<string,string> = { Activo:LIME, Inactivo:"#6b7280", Mantenimiento:"#fbbf24" };

  function SortPill({ col, label }: { col:SortKey; label:string }) {
    const active = sortKey===col;
    return (
      <button onClick={() => toggleSort(col)}
        className="flex items-center gap-1.5 rounded-md px-2.5 py-1 transition-all"
        style={{ fontSize:11.5,
                 background:active?"rgba(163,230,53,0.08)":"#141416",
                 border:active?"1px solid rgba(163,230,53,0.2)":"1px solid rgba(255,255,255,0.07)",
                 color:active?LIME:"#6b7280" }}>
        <ArrowUpDown size={10}/>{label}
        {active && <span style={{ fontSize:9 }}>{sortDir==="asc"?"↑":"↓"}</span>}
      </button>
    );
  }

  return (
    <div className="flex-1 flex overflow-hidden">
      {/* Main panel */}
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 shrink-0"
          style={{ borderBottom:"1px solid rgba(255,255,255,0.055)", background:"#0b0b0d" }}>
          <div>
            <h1 style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:24, fontWeight:700,
                         letterSpacing:"0.04em", color:"#fff", lineHeight:1 }}>Campos</h1>
            <p style={{ fontSize:12, color:"#6b7280", marginTop:3 }}>
              Gestiona los campos y sus disponibilidades
            </p>
          </div>
          <button className="flex items-center gap-2 rounded-lg px-4 py-2.5 font-semibold"
            style={{ background:LIME, color:"#000", fontSize:13 }}>
            <PlusCircle size={14}/> Crear campo
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5" style={{ background:"#080809" }}>

          {/* KPIs */}
          <div className="grid gap-3 mb-4" style={{ gridTemplateColumns:"repeat(4,1fr)" }}>
            {kpis.map(({ label, value, color }) => (
              <div key={label} className="rounded-xl px-4 py-3 flex items-center gap-3"
                style={{ background:"#101012", border:"1px solid rgba(255,255,255,0.07)" }}>
                <div className="rounded-full shrink-0"
                  style={{ width:8, height:8, background:color, boxShadow:`0 0 8px ${color}66` }}/>
                <div>
                  <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:26,
                                fontWeight:700, color:"#fff", lineHeight:1 }}>{value}</div>
                  <div style={{ fontSize:11.5, color:"#6b7280", marginTop:1 }}>{label}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Toolbar */}
          <div className="rounded-xl mb-4"
            style={{ background:"#101012", border:"1px solid rgba(255,255,255,0.07)" }}>
            <div className="flex items-center gap-3 px-4 py-3">
              {/* Search */}
              <div className="flex items-center gap-2 rounded-lg px-3 flex-1"
                style={{ background:"#141416", border:"1px solid rgba(255,255,255,0.07)", height:34 }}>
                <Search size={13} color="#4b5563" strokeWidth={1.5}/>
                <input type="text" placeholder="Buscar por campo, ubicación..."
                  value={search} onChange={(e) => setSearch(e.target.value)}
                  style={{ background:"transparent", border:"none", outline:"none", color:"#e5e7eb",
                           fontSize:12.5, flex:1, fontFamily:"'Inter',sans-serif" }}/>
                {search && <button onClick={() => setSearch("")} style={{ color:"#4b5563" }}><X size={12}/></button>}
              </div>

              {/* Status tabs */}
              <div className="flex items-center rounded-lg overflow-hidden"
                style={{ border:"1px solid rgba(255,255,255,0.07)", background:"#141416" }}>
                {(["Todos",...statusList] as const).map((s,i,arr) => {
                  const active = statusFilter===s;
                  return (
                    <button key={s} onClick={() => setStatusFilter(s as any)}
                      className="px-3 py-1.5 flex items-center gap-1.5 transition-all"
                      style={{ fontSize:12, background:active?"rgba(163,230,53,0.1)":"transparent",
                               color:active?LIME:"#6b7280", fontWeight:active?500:400,
                               borderRight:i<arr.length-1?"1px solid rgba(255,255,255,0.07)":"none" }}>
                      {s!=="Todos" && (
                        <span style={{ width:5, height:5, borderRadius:"50%",
                          background:active?dotColors[s]:"#4b5563", display:"inline-block" }}/>
                      )}
                      {s}
                    </button>
                  );
                })}
              </div>

              {/* Region */}
              <div className="relative" style={{ minWidth:155 }}>
                <select value={regionFilter} onChange={(e) => setRegionFilter(e.target.value)}
                  className="appearance-none w-full rounded-lg pl-3 pr-7"
                  style={{ background:"#141416", border:"1px solid rgba(255,255,255,0.07)",
                           color:regionFilter!=="Todas las regiones"?LIME:"#9ca3af",
                           fontSize:12, height:34, outline:"none", fontFamily:"'Inter',sans-serif", cursor:"pointer" }}>
                  {REGIONS.map((r) => <option key={r} value={r} style={{ background:"#161618",color:"#e5e7eb" }}>{r}</option>)}
                </select>
                <ChevronDown size={11} color="#6b7280"
                  style={{ position:"absolute",right:8,top:"50%",transform:"translateY(-50%)",pointerEvents:"none" }}/>
              </div>

              {/* Modality */}
              <div className="relative" style={{ minWidth:175 }}>
                <select value={modalityFilter} onChange={(e) => setModalityFilter(e.target.value)}
                  className="appearance-none w-full rounded-lg pl-3 pr-7"
                  style={{ background:"#141416", border:"1px solid rgba(255,255,255,0.07)",
                           color:modalityFilter!=="Todas las modalidades"?LIME:"#9ca3af",
                           fontSize:12, height:34, outline:"none", fontFamily:"'Inter',sans-serif", cursor:"pointer" }}>
                  {MODALITIES.map((m) => <option key={m} value={m} style={{ background:"#161618",color:"#e5e7eb" }}>{m}</option>)}
                </select>
                <ChevronDown size={11} color="#6b7280"
                  style={{ position:"absolute",right:8,top:"50%",transform:"translateY(-50%)",pointerEvents:"none" }}/>
              </div>

              <span style={{ fontSize:12, color:"#4b5563", whiteSpace:"nowrap", marginLeft:"auto" }}>
                {filtered.length} campo{filtered.length!==1?"s":""}
              </span>
            </div>

            {/* Sort + bulk */}
            <div className="flex items-center gap-2 px-4 pb-3">
              <span style={{ fontSize:11, color:"#4b5563" }}>Ordenar:</span>
              <SortPill col="events"       label="Próximos eventos"/>
              <SortPill col="reservations" label="Reservas"/>
              <SortPill col="name"         label="Nombre"/>
              <SortPill col="capacity"     label="Capacidad"/>
              {selected.size>0 && (
                <div className="flex items-center gap-3 ml-auto rounded-lg px-3 py-1.5"
                  style={{ background:"rgba(163,230,53,0.05)", border:"1px solid rgba(163,230,53,0.15)" }}>
                  <span style={{ fontSize:12, color:LIME }}>
                    {selected.size} campo{selected.size!==1?"s":""} seleccionado{selected.size!==1?"s":""}
                  </span>
                  <button style={{ fontSize:12, color:"#f87171" }}>Desactivar</button>
                  <button onClick={() => setSelected(new Set())} style={{ color:"#6b7280" }}>
                    <X size={11}/>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Grid or empty */}
          {filtered.length===0 ? (
            <div className="flex flex-col items-center justify-center py-20 rounded-xl"
              style={{ background:"#101012", border:"1px solid rgba(255,255,255,0.07)" }}>
              <div className="rounded-full flex items-center justify-center mb-5"
                style={{ width:64, height:64, background:"rgba(163,230,53,0.05)",
                         border:"1px solid rgba(163,230,53,0.1)" }}>
                <Target size={28} strokeWidth={1} style={{ color:"#2d2d30" }}/>
              </div>
              <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:20, fontWeight:700,
                            color:"#4b5563", marginBottom:6, letterSpacing:"0.04em" }}>
                Sin campos registrados
              </div>
              <p style={{ fontSize:13, color:"#374151", textAlign:"center", maxWidth:320, marginBottom:20 }}>
                Registra tu primer campo para comenzar a gestionar disponibilidades y eventos.
              </p>
              <button className="flex items-center gap-2 rounded-lg px-5 py-2.5 font-semibold"
                style={{ background:LIME, color:"#000", fontSize:13 }}>
                <PlusCircle size={14}/> Crear campo
              </button>
            </div>
          ) : (
            <div className="grid gap-3"
              style={{ gridTemplateColumns:detailField?"repeat(2,1fr)":"repeat(3,1fr)" }}>
              {filtered.map((field) => (
                <FieldCard key={field.id} field={field}
                  selected={selected.has(field.id)}
                  onSelect={() => toggleSelect(field.id)}
                  onView={() => setDetailField(field)}/>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Detail panel */}
      {detailField && (
        <div className="shrink-0 overflow-hidden"
          style={{ width:348, borderLeft:"1px solid rgba(255,255,255,0.07)" }}>
          <FieldDetail field={detailField} onClose={() => setDetailField(null)}/>
        </div>
      )}
    </div>
  );
}

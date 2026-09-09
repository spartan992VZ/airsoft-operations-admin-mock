import { useState, useMemo } from "react";
import {
  Search, ChevronDown, Users, MapPin, Calendar,
  MoreHorizontal, X, Check, ArrowUpDown,
  PlusCircle, Eye, Pencil, MessageSquare, Ban, Star,
  Phone, Mail, ChevronRight, Crosshair, Hash,
} from "lucide-react";
import { LIME, LIME_DIM } from "../shared";

// ─── Types ──────────────────────────────────────────────────────────────────
type TeamStatus = "Activo" | "Inactivo" | "Pendiente";

interface Member { name: string; role: string; initials: string; color: string; joined: string; }
interface TeamEvent { name: string; date: string; result: "Victoria" | "Derrota" | "Participante" | "Cancelado"; }

interface Team {
  id: number; name: string; acronym: string; color: string;
  location: string; region: string;
  captain: string; captainInitials: string; captainColor: string;
  members: Member[]; totalMembers: number; events: number;
  status: TeamStatus; founded: string; modality: string;
  contact: { phone: string; email: string };
  recentEvents: TeamEvent[]; description: string; wins: number;
}

// ─── Data ───────────────────────────────────────────────────────────────────
const TEAMS: Team[] = [
  { id:1, name:"Escuadrón Alpha", acronym:"EΑ", color:"#1d4ed8", location:"Madrid", region:"Centro",
    captain:"RaiderX", captainInitials:"RX", captainColor:"#1d4ed8",
    totalMembers:12, events:8, status:"Activo", founded:"2021", modality:"Milsim",
    contact:{ phone:"+34 612 345 678", email:"alpha@airsoft.es" },
    description:"Equipo de élite especializado en operaciones Milsim de alta intensidad. Participan en los principales eventos nacionales con uniformes y equipo de nivel profesional.",
    wins:5,
    recentEvents:[
      { name:"Operación Black Hawk", date:"24 May 2024", result:"Victoria" },
      { name:"Misión Red Dawn",      date:"31 May 2024", result:"Victoria" },
      { name:"Asalto al Fuerte",     date:"07 Jun 2024", result:"Participante" },
    ],
    members:[
      { name:"RaiderX",        role:"Capitán",       initials:"RX", color:"#1d4ed8", joined:"Ene 2021" },
      { name:"OperativeLegend",role:"Suboficial",     initials:"OL", color:"#15803d", joined:"Mar 2021" },
      { name:"ReconAlpha",     role:"Francotirador",  initials:"RA", color:"#0f766e", joined:"Jun 2021" },
      { name:"StormBreaker",   role:"Médico",         initials:"SB", color:"#4338ca", joined:"Sep 2021" },
    ],
  },
  { id:2, name:"Tácticos del Sur", acronym:"TS", color:"#7c3aed", location:"Sevilla", region:"Sur",
    captain:"CobaltMike", captainInitials:"CM", captainColor:"#4338ca",
    totalMembers:9, events:5, status:"Activo", founded:"2022", modality:"CQB",
    contact:{ phone:"+34 623 456 789", email:"tacticos@airsoft.es" },
    description:"Especialistas en combate urbano y CQB. Equipo dinámico con enfoque en partidas rápidas y alta rotación táctica.",
    wins:3,
    recentEvents:[
      { name:"Misión Cobra",        date:"02 Feb 2024", result:"Victoria" },
      { name:"Operación Black Hawk", date:"24 May 2024", result:"Derrota" },
    ],
    members:[
      { name:"CobaltMike", role:"Capitán", initials:"CM", color:"#4338ca", joined:"Feb 2022" },
      { name:"Viper45",    role:"Asalto",  initials:"V4", color:"#be185d", joined:"Abr 2022" },
      { name:"DarkMatter", role:"Apoyo",   initials:"DM", color:"#c2410c", joined:"Jul 2022" },
    ],
  },
  { id:3, name:"Airsoft Brothers", acronym:"AB", color:"#be185d", location:"Barcelona", region:"Cataluña",
    captain:"Ghost_7", captainInitials:"G7", captainColor:"#7c3aed",
    totalMembers:15, events:11, status:"Activo", founded:"2019", modality:"Woodland",
    contact:{ phone:"+34 634 567 890", email:"brothers@airsoft.es" },
    description:"Uno de los equipos más veteranos de Cataluña. Con más de 5 años de experiencia en Woodland y Milsim, compiten regularmente en las ligas autonómicas.",
    wins:7,
    recentEvents:[
      { name:"Misión Red Dawn",     date:"31 May 2024", result:"Victoria" },
      { name:"Asedio al Búnker",    date:"10 Ene 2024", result:"Participante" },
      { name:"Operación Tormenta",  date:"15 Mar 2024", result:"Victoria" },
    ],
    members:[
      { name:"Ghost_7",  role:"Capitán",       initials:"G7", color:"#7c3aed", joined:"Mar 2019" },
      { name:"NightOwl", role:"Explorador",    initials:"NO", color:"#0e7490", joined:"Jun 2019" },
      { name:"PhantomX", role:"Asalto",        initials:"PX", color:"#1d4ed8", joined:"Ago 2019" },
      { name:"IronBull", role:"Soporte pesado",initials:"IB", color:"#7c3aed", joined:"Ene 2020" },
    ],
  },
  { id:4, name:"Delta Force", acronym:"DF", color:"#15803d", location:"Madrid", region:"Centro",
    captain:"HunterK", captainInitials:"HK", captainColor:"#b45309",
    totalMembers:11, events:7, status:"Activo", founded:"2020", modality:"Milsim",
    contact:{ phone:"+34 645 678 901", email:"deltaforce@airsoft.es" },
    description:"Equipo madrileño con fuerte disciplina táctica. Se especializan en operaciones nocturnas y escenarios de infiltración.",
    wins:4,
    recentEvents:[
      { name:"Operación Black Hawk", date:"24 May 2024", result:"Victoria" },
      { name:"Noche de Lobos",       date:"28 Abr 2024", result:"Participante" },
    ],
    members:[
      { name:"HunterK",     role:"Capitán",      initials:"HK", color:"#b45309", joined:"Ene 2020" },
      { name:"TacticalOne", role:"Médico",        initials:"T1", color:"#0f766e", joined:"Mar 2020" },
      { name:"ViperStrike", role:"Francotirador", initials:"VS", color:"#15803d", joined:"May 2020" },
      { name:"ZeroKelvin",  role:"Explorador",   initials:"ZK", color:"#9f1239", joined:"Ago 2020" },
    ],
  },
  { id:5, name:"Operative Legion", acronym:"OL", color:"#b45309", location:"Valencia", region:"Levante",
    captain:"OperativeLegend", captainInitials:"OL", captainColor:"#15803d",
    totalMembers:18, events:13, status:"Activo", founded:"2018", modality:"Scenario",
    contact:{ phone:"+34 656 789 012", email:"operative@airsoft.es" },
    description:"El equipo más grande y activo de la plataforma. Especializados en partidas de Scenario con narrativa compleja y uniformes personalizados.",
    wins:9,
    recentEvents:[
      { name:"Asalto al Fuerte",   date:"07 Jun 2024", result:"Victoria" },
      { name:"Venganza",            date:"21 Jun 2024", result:"Victoria" },
      { name:"Operación Tormenta", date:"15 Mar 2024", result:"Derrota" },
    ],
    members:[
      { name:"OperativeLegend", role:"Capitán",        initials:"OL", color:"#15803d", joined:"May 2018" },
      { name:"Sniper_44",       role:"Francotirador",  initials:"S4", color:"#c2410c", joined:"Jul 2018" },
      { name:"EchoTango",       role:"Comunicaciones", initials:"ET", color:"#b45309", joined:"Sep 2018" },
      { name:"Bravo_Six",       role:"Asalto",         initials:"B6", color:"#9f1239", joined:"Ene 2019" },
    ],
  },
  { id:6, name:"Shadow Wolves", acronym:"SW", color:"#0e7490", location:"Bilbao", region:"Norte",
    captain:"NightOwl", captainInitials:"NO", captainColor:"#0e7490",
    totalMembers:7, events:4, status:"Pendiente", founded:"2023", modality:"Nocturno",
    contact:{ phone:"+34 667 890 123", email:"shadow@airsoft.es" },
    description:"Equipo emergente del norte especializado en operaciones nocturnas. Su solicitud de membresía está pendiente de verificación.",
    wins:1,
    recentEvents:[{ name:"Blackout", date:"05 Jul 2024", result:"Participante" }],
    members:[
      { name:"NightOwl", role:"Capitán",    initials:"NO", color:"#0e7490", joined:"Feb 2023" },
      { name:"PhantomX", role:"Asalto",     initials:"PX", color:"#1d4ed8", joined:"Feb 2023" },
      { name:"Ghost_7",  role:"Explorador", initials:"G7", color:"#7c3aed", joined:"Mar 2023" },
    ],
  },
  { id:7, name:"Iron Snakes", acronym:"IS", color:"#9f1239", location:"Toledo", region:"Centro",
    captain:"Viper45", captainInitials:"V4", captainColor:"#be185d",
    totalMembers:6, events:3, status:"Inactivo", founded:"2021", modality:"CQB",
    contact:{ phone:"+34 678 901 234", email:"ironsnakes@airsoft.es" },
    description:"Equipo con actividad reducida. Tres de sus miembros principales están en proceso de reorganización. Se espera reactivación para otoño.",
    wins:1,
    recentEvents:[{ name:"Operación Fantasma", date:"18 Abr 2024", result:"Cancelado" }],
    members:[
      { name:"Viper45", role:"Capitán", initials:"V4", color:"#be185d", joined:"Mar 2021" },
      { name:"IronBull", role:"Soporte", initials:"IB", color:"#7c3aed", joined:"May 2021" },
    ],
  },
];

const REGIONS    = ["Todas las regiones",   "Centro","Sur","Cataluña","Levante","Norte"];
const MODALITIES = ["Todas las modalidades","Milsim","CQB","Woodland","Nocturno","Scenario"];
const STATUS_LIST: TeamStatus[] = ["Activo","Inactivo","Pendiente"];
type SortKey = "name"|"members"|"events"|"founded";

// ─── Micro-components ────────────────────────────────────────────────────────
function TeamStatusBadge({ status }: { status: TeamStatus }) {
  const cfg: Record<TeamStatus, { bg: string; color: string }> = {
    Activo:    { bg:"rgba(163,230,53,0.1)",   color: LIME      },
    Inactivo:  { bg:"rgba(100,100,100,0.15)", color:"#6b7280"  },
    Pendiente: { bg:"rgba(251,191,36,0.1)",   color:"#fbbf24"  },
  };
  const c = cfg[status];
  return (
    <span className="inline-flex items-center gap-1.5 rounded px-2 py-0.5"
      style={{ background:c.bg, color:c.color, fontSize:11,
               fontFamily:"'JetBrains Mono',monospace", whiteSpace:"nowrap" }}>
      <span style={{ width:5, height:5, borderRadius:"50%", background:c.color,
                     display:"inline-block", flexShrink:0 }} />
      {status}
    </span>
  );
}

function TeamLogo({ acronym, color, size=44 }: { acronym:string; color:string; size?:number }) {
  return (
    <div className="flex items-center justify-center rounded-xl shrink-0"
      style={{ width:size, height:size, background:`${color}18`, border:`1.5px solid ${color}35` }}>
      <span style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:size*0.38,
                     fontWeight:700, color, letterSpacing:"0.02em" }}>
        {acronym}
      </span>
    </div>
  );
}

function Avatar({ initials, color, size=24 }: { initials:string; color:string; size?:number }) {
  return (
    <div className="rounded-full flex items-center justify-center shrink-0"
      style={{ width:size, height:size, background:`${color}22`, border:`1px solid ${color}44`,
               fontFamily:"'JetBrains Mono',monospace", fontSize:size<28?9:11, fontWeight:700, color }}>
      {initials}
    </div>
  );
}

function ResultTag({ result }: { result: string }) {
  const map: Record<string,{bg:string;color:string}> = {
    Victoria:    { bg:"rgba(163,230,53,0.1)",  color:LIME      },
    Derrota:     { bg:"rgba(248,113,113,0.1)", color:"#f87171" },
    Participante:{ bg:"rgba(100,100,100,0.12)",color:"#9ca3af" },
    Cancelado:   { bg:"rgba(100,100,100,0.1)", color:"#6b7280" },
  };
  const c = map[result] ?? map.Participante;
  return (
    <span className="rounded px-1.5 py-0.5"
      style={{ fontSize:10.5, background:c.bg, color:c.color,
               fontFamily:"'JetBrains Mono',monospace", whiteSpace:"nowrap" }}>
      {result}
    </span>
  );
}

// ─── Detail panel ────────────────────────────────────────────────────────────
function TeamDetail({ team, onClose }: { team:Team; onClose:()=>void }) {
  return (
    <div className="flex flex-col h-full" style={{ background:"#0f0f11" }}>

      {/* Identity */}
      <div className="px-5 pt-5 pb-4 shrink-0"
        style={{ borderBottom:"1px solid rgba(255,255,255,0.06)" }}>
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <TeamLogo acronym={team.acronym} color={team.color} size={46} />
            <div>
              <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:19, fontWeight:700,
                            letterSpacing:"0.03em", color:"#fff", lineHeight:1 }}>
                {team.name}
              </div>
              <div className="flex items-center gap-3 mt-1.5">
                <span className="flex items-center gap-1" style={{ fontSize:11.5, color:"#6b7280" }}>
                  <MapPin size={10}/> {team.location}
                </span>
                <span style={{ fontSize:11.5, color:"#4b5563" }}>·</span>
                <span style={{ fontSize:11.5, color:"#6b7280" }}>{team.modality}</span>
                <span style={{ fontSize:11.5, color:"#4b5563" }}>·</span>
                <span style={{ fontSize:11.5, color:"#6b7280" }}>Desde {team.founded}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <TeamStatusBadge status={team.status}/>
            <button onClick={onClose}
              className="rounded-md flex items-center justify-center"
              style={{ width:26, height:26, background:"#1a1a1c",
                       border:"1px solid rgba(255,255,255,0.07)", color:"#6b7280" }}>
              <X size={13}/>
            </button>
          </div>
        </div>
        <p style={{ fontSize:12, color:"#6b7280", lineHeight:1.65 }}>{team.description}</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-2 px-5 py-3 shrink-0"
        style={{ borderBottom:"1px solid rgba(255,255,255,0.06)" }}>
        {[
          { label:"Miembros", value:team.totalMembers, color:"#9ca3af" },
          { label:"Eventos",  value:team.events,       color:"#9ca3af" },
          { label:"Victorias",value:team.wins,          color:LIME      },
        ].map(({ label, value, color }) => (
          <div key={label} className="rounded-lg px-3 py-2.5 text-center"
            style={{ background:"#141416", border:"1px solid rgba(255,255,255,0.06)" }}>
            <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:24,
                          fontWeight:700, color, lineHeight:1 }}>{value}</div>
            <div style={{ fontSize:10.5, color:"#4b5563", marginTop:2 }}>{label}</div>
          </div>
        ))}
      </div>

      {/* Scrollable body */}
      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-5">

        {/* Captain */}
        <div>
          <div style={{ fontSize:10, color:"#4b5563", fontWeight:600, letterSpacing:"0.12em",
                        textTransform:"uppercase", marginBottom:8 }}>Capitán</div>
          <div className="flex items-center gap-3 rounded-lg px-3 py-2.5"
            style={{ background:"rgba(163,230,53,0.05)", border:"1px solid rgba(163,230,53,0.12)" }}>
            <Avatar initials={team.captainInitials} color={team.captainColor} size={32}/>
            <div className="flex-1">
              <div style={{ fontSize:13, fontWeight:500, color:"#e5e7eb" }}>{team.captain}</div>
              <div style={{ fontSize:11, color:"#6b7280" }}>Capitán del equipo</div>
            </div>
            <Star size={12} style={{ color:LIME }}/>
          </div>
        </div>

        {/* Members */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <div style={{ fontSize:10, color:"#4b5563", fontWeight:600, letterSpacing:"0.12em", textTransform:"uppercase" }}>
              Miembros ({team.members.length} de {team.totalMembers})
            </div>
            {team.totalMembers > team.members.length && (
              <span style={{ fontSize:11, color:LIME, cursor:"pointer" }}>Ver todos</span>
            )}
          </div>
          <div className="space-y-1">
            {team.members.map((m) => (
              <div key={m.name} className="flex items-center gap-2.5 rounded-lg px-3 py-2"
                style={{ background:"#141416", border:"1px solid rgba(255,255,255,0.05)" }}>
                <Avatar initials={m.initials} color={m.color} size={24}/>
                <span className="flex-1" style={{ fontSize:12.5, color:"#d1d5db" }}>{m.name}</span>
                <span className="rounded px-1.5 py-0.5"
                  style={{ fontSize:10, background:"rgba(255,255,255,0.05)",
                           color:"#6b7280", border:"1px solid rgba(255,255,255,0.06)" }}>
                  {m.role}
                </span>
                <span style={{ fontSize:10, color:"#4b5563", fontFamily:"'JetBrains Mono',monospace" }}>
                  {m.joined}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent events */}
        <div>
          <div style={{ fontSize:10, color:"#4b5563", fontWeight:600, letterSpacing:"0.12em",
                        textTransform:"uppercase", marginBottom:8 }}>Eventos recientes</div>
          <div className="space-y-1">
            {team.recentEvents.map((e) => (
              <div key={e.name} className="flex items-center gap-2.5 rounded-lg px-3 py-2"
                style={{ background:"#141416", border:"1px solid rgba(255,255,255,0.05)" }}>
                <div className="rounded flex items-center justify-center shrink-0"
                  style={{ width:24, height:24, background:"rgba(255,255,255,0.04)",
                           border:"1px solid rgba(255,255,255,0.07)" }}>
                  <Crosshair size={11} color="#6b7280" strokeWidth={1.5}/>
                </div>
                <div className="flex-1 min-w-0">
                  <div style={{ fontSize:12.5, color:"#d1d5db", whiteSpace:"nowrap",
                                overflow:"hidden", textOverflow:"ellipsis" }}>{e.name}</div>
                  <div style={{ fontSize:10, color:"#4b5563",
                                fontFamily:"'JetBrains Mono',monospace" }}>{e.date}</div>
                </div>
                <ResultTag result={e.result}/>
              </div>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div>
          <div style={{ fontSize:10, color:"#4b5563", fontWeight:600, letterSpacing:"0.12em",
                        textTransform:"uppercase", marginBottom:8 }}>Contacto</div>
          <div className="space-y-2">
            <div className="flex items-center gap-2.5">
              <Phone size={12} color="#4b5563" strokeWidth={1.5}/>
              <span style={{ fontSize:12, color:"#9ca3af", fontFamily:"'JetBrains Mono',monospace" }}>
                {team.contact.phone}
              </span>
            </div>
            <div className="flex items-center gap-2.5">
              <Mail size={12} color="#4b5563" strokeWidth={1.5}/>
              <span style={{ fontSize:12, color:"#9ca3af", fontFamily:"'JetBrains Mono',monospace" }}>
                {team.contact.email}
              </span>
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
            <MessageSquare size={13}/> Contactar
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
          {team.status === "Activo" ? "Desactivar equipo" : "Activar equipo"}
        </button>
      </div>
    </div>
  );
}

// ─── Team card ───────────────────────────────────────────────────────────────
function TeamCard({ team, selected, onSelect, onView }: {
  team:Team; selected:boolean; onSelect:()=>void; onView:()=>void;
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="rounded-xl overflow-hidden"
      style={{
        background:"#101012",
        border: selected
          ? "1px solid rgba(163,230,53,0.28)"
          : "1px solid rgba(255,255,255,0.07)",
      }}>
      {/* Top accent */}
      <div style={{ height:2.5, background:`linear-gradient(90deg,${team.color}cc,${team.color}22)` }}/>

      <div className="p-4">

        {/* Row 1 — Logo + identity + menu */}
        <div className="flex items-start gap-3 mb-4">
          {/* Checkbox */}
          <button onClick={onSelect}
            className="flex items-center justify-center rounded shrink-0 mt-0.5"
            style={{ width:15, height:15, background:selected ? LIME:"transparent",
                     border:selected?"none":"1px solid rgba(255,255,255,0.15)", marginTop:2 }}>
            {selected && <Check size={9} color="#000" strokeWidth={3}/>}
          </button>

          <TeamLogo acronym={team.acronym} color={team.color} size={42}/>

          <div className="flex-1 min-w-0">
            <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:16, fontWeight:700,
                          letterSpacing:"0.02em", color:"#fff", lineHeight:1.1,
                          whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>
              {team.name}
            </div>
            <div className="flex items-center gap-1 mt-1" style={{ fontSize:11.5, color:"#6b7280" }}>
              <MapPin size={9} strokeWidth={1.5}/> {team.location}
              <span style={{ color:"#2d2d30", margin:"0 2px" }}>·</span>
              <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:10.5, color:"#4b5563" }}>
                {team.modality}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <TeamStatusBadge status={team.status}/>
            <div className="relative">
              <button onClick={() => setMenuOpen((o) => !o)}
                className="rounded-md flex items-center justify-center"
                style={{ width:24, height:24, color:"#4b5563" }}>
                <MoreHorizontal size={14}/>
              </button>
              {menuOpen && (
                <div className="absolute right-0 top-7 z-50 rounded-lg overflow-hidden"
                  style={{ background:"#161618", border:"1px solid rgba(255,255,255,0.1)",
                           boxShadow:"0 8px 32px rgba(0,0,0,0.6)", minWidth:165 }}
                  onMouseLeave={() => setMenuOpen(false)}>
                  {[
                    { icon:Eye,          label:"Ver equipo",  color:"#e5e7eb", fn:() => { onView(); setMenuOpen(false); } },
                    { icon:Pencil,       label:"Editar",      color:"#e5e7eb", fn:() => setMenuOpen(false) },
                    { icon:MessageSquare,label:"Contactar",   color:"#e5e7eb", fn:() => setMenuOpen(false) },
                    { icon:Ban,          label:team.status==="Activo"?"Desactivar":"Activar",
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
          </div>
        </div>

        {/* Row 2 — stats */}
        <div className="grid grid-cols-3 gap-2 mb-3">
          {[
            { label:"Miembros", value:team.totalMembers, color:"#e5e7eb" },
            { label:"Eventos",  value:team.events,       color:"#e5e7eb" },
            { label:"Victorias",value:team.wins,          color:LIME      },
          ].map(({ label, value, color }) => (
            <div key={label} className="rounded-lg py-2 text-center"
              style={{ background:"#141416", border:"1px solid rgba(255,255,255,0.05)" }}>
              <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:20,
                            fontWeight:700, color, lineHeight:1 }}>{value}</div>
              <div style={{ fontSize:10, color:"#4b5563", marginTop:1.5 }}>{label}</div>
            </div>
          ))}
        </div>

        {/* Row 3 — captain */}
        <div className="flex items-center gap-2 rounded-lg px-2.5 py-2 mb-3"
          style={{ background:"#141416", border:"1px solid rgba(255,255,255,0.05)" }}>
          <Avatar initials={team.captainInitials} color={team.captainColor} size={22}/>
          <span className="flex-1 min-w-0" style={{ fontSize:11.5, color:"#9ca3af",
            whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>
            {team.captain}
          </span>
          <span className="flex items-center gap-1" style={{ fontSize:10, color:"#6b7280", flexShrink:0 }}>
            <Star size={9} style={{ color:LIME }} strokeWidth={2}/> Capitán
          </span>
        </div>

        {/* Row 4 — stacked avatars */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center">
            {team.members.slice(0,4).map((m,i) => (
              <div key={m.name} style={{ marginLeft:i===0?0:-7, zIndex:4-i }}>
                <Avatar initials={m.initials} color={m.color} size={20}/>
              </div>
            ))}
            {team.totalMembers > 4 && (
              <div className="rounded-full flex items-center justify-center"
                style={{ width:20, height:20, marginLeft:-7, zIndex:0, background:"#1e1e22",
                         border:"1px solid rgba(255,255,255,0.1)", fontSize:8.5,
                         color:"#6b7280", fontFamily:"'JetBrains Mono',monospace" }}>
                +{team.totalMembers-4}
              </div>
            )}
            <span style={{ fontSize:11, color:"#4b5563", marginLeft:8 }}>
              {team.totalMembers} miembro{team.totalMembers!==1?"s":""}
            </span>
          </div>
          <span style={{ fontSize:10.5, color:"#4b5563", fontFamily:"'JetBrains Mono',monospace" }}>
            {team.founded}
          </span>
        </div>

        {/* CTA */}
        <button onClick={onView}
          className="w-full flex items-center justify-center gap-1.5 rounded-lg py-1.5 transition-all"
          style={{ background:"transparent", border:"1px solid rgba(255,255,255,0.07)",
                   color:"#6b7280", fontSize:12 }}>
          <Eye size={11} strokeWidth={1.5}/> Ver equipo
          <ChevronRight size={10} color="#3d3d3d"/>
        </button>
      </div>
    </div>
  );
}

// ─── Main ────────────────────────────────────────────────────────────────────
export default function Equipos() {
  const [search,          setSearch]          = useState("");
  const [statusFilter,    setStatusFilter]    = useState<TeamStatus|"Todos">("Todos");
  const [regionFilter,    setRegionFilter]    = useState("Todas las regiones");
  const [modalityFilter,  setModalityFilter]  = useState("Todas las modalidades");
  const [sortKey,         setSortKey]         = useState<SortKey>("events");
  const [sortDir,         setSortDir]         = useState<"asc"|"desc">("desc");
  const [selected,        setSelected]        = useState<Set<number>>(new Set());
  const [detailTeam,      setDetailTeam]      = useState<Team|null>(null);

  const filtered = useMemo(() => {
    let list = [...TEAMS];
    if (search) list = list.filter((t) =>
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.captain.toLowerCase().includes(search.toLowerCase()) ||
      t.location.toLowerCase().includes(search.toLowerCase())
    );
    if (statusFilter   !== "Todos")                list = list.filter((t) => t.status   === statusFilter);
    if (regionFilter   !== "Todas las regiones")   list = list.filter((t) => t.region   === regionFilter);
    if (modalityFilter !== "Todas las modalidades")list = list.filter((t) => t.modality === modalityFilter);
    list.sort((a,b) => {
      let d = 0;
      if (sortKey==="name")    d = a.name.localeCompare(b.name);
      if (sortKey==="members") d = a.totalMembers - b.totalMembers;
      if (sortKey==="events")  d = a.events - b.events;
      if (sortKey==="founded") d = a.founded.localeCompare(b.founded);
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
    { label:"Equipos activos",     value:TEAMS.filter((t)=>t.status==="Activo").length,   color:LIME      },
    { label:"Equipos registrados", value:TEAMS.length,                                     color:"#9ca3af" },
    { label:"Jugadores asociados", value:TEAMS.reduce((s,t)=>s+t.totalMembers,0),          color:"#60a5fa" },
    { label:"Eventos con equipos", value:TEAMS.reduce((s,t)=>s+t.events,0),               color:"#a78bfa" },
  ];

  const dotColors: Record<string,string> = { Activo:LIME, Inactivo:"#6b7280", Pendiente:"#fbbf24" };

  function SortPill({ col, label }: { col:SortKey; label:string }) {
    const active = sortKey===col;
    return (
      <button onClick={() => toggleSort(col)}
        className="flex items-center gap-1.5 rounded-md px-2.5 py-1 transition-all"
        style={{ fontSize:11.5,
                 background:active?"rgba(163,230,53,0.08)":"#141416",
                 border:active?"1px solid rgba(163,230,53,0.2)":"1px solid rgba(255,255,255,0.07)",
                 color:active?LIME:"#6b7280" }}>
        <ArrowUpDown size={10}/>
        {label}
        {active && <span style={{ fontSize:9 }}>{sortDir==="asc"?"↑":"↓"}</span>}
      </button>
    );
  }

  return (
    <div className="flex-1 flex overflow-hidden">
      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 shrink-0"
          style={{ borderBottom:"1px solid rgba(255,255,255,0.055)", background:"#0b0b0d" }}>
          <div>
            <h1 style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:24, fontWeight:700,
                         letterSpacing:"0.04em", color:"#fff", lineHeight:1 }}>Equipos</h1>
            <p style={{ fontSize:12, color:"#6b7280", marginTop:3 }}>
              Gestiona los equipos y sus participantes
            </p>
          </div>
          <button className="flex items-center gap-2 rounded-lg px-4 py-2.5 font-semibold"
            style={{ background:LIME, color:"#000", fontSize:13 }}>
            <PlusCircle size={14}/> Crear equipo
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5" style={{ background:"#080809" }}>

          {/* KPIs */}
          <div className="grid gap-3 mb-4" style={{ gridTemplateColumns:"repeat(4,1fr)" }}>
            {kpis.map(({ label, value, color }) => (
              <div key={label} className="rounded-xl px-4 py-3 flex items-center gap-3"
                style={{ background:"#101012", border:"1px solid rgba(255,255,255,0.07)" }}>
                <div className="rounded-full flex items-center justify-center shrink-0"
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
                <input type="text" placeholder="Buscar por equipo, capitán o ciudad..."
                  value={search} onChange={(e) => setSearch(e.target.value)}
                  style={{ background:"transparent", border:"none", outline:"none", color:"#e5e7eb",
                           fontSize:12.5, flex:1, fontFamily:"'Inter',sans-serif" }}/>
                {search && <button onClick={() => setSearch("")} style={{ color:"#4b5563" }}><X size={12}/></button>}
              </div>

              {/* Status pills */}
              <div className="flex items-center rounded-lg overflow-hidden"
                style={{ border:"1px solid rgba(255,255,255,0.07)", background:"#141416" }}>
                {(["Todos",...STATUS_LIST] as const).map((s,i,arr) => {
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
              <div className="relative" style={{ minWidth:170 }}>
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
                {filtered.length} equipo{filtered.length!==1?"s":""}
              </span>
            </div>

            {/* Sort + bulk */}
            <div className="flex items-center gap-2 px-4 pb-3">
              <span style={{ fontSize:11, color:"#4b5563" }}>Ordenar:</span>
              <SortPill col="events"  label="Eventos"/>
              <SortPill col="members" label="Miembros"/>
              <SortPill col="name"    label="Nombre"/>
              <SortPill col="founded" label="Antigüedad"/>
              {selected.size>0 && (
                <div className="flex items-center gap-3 ml-auto rounded-lg px-3 py-1.5"
                  style={{ background:"rgba(163,230,53,0.05)", border:"1px solid rgba(163,230,53,0.15)" }}>
                  <span style={{ fontSize:12, color:LIME }}>
                    {selected.size} seleccionado{selected.size!==1?"s":""}
                  </span>
                  <button style={{ fontSize:12, color:"#9ca3af" }}>Contactar</button>
                  <button style={{ fontSize:12, color:"#f87171" }}>Desactivar</button>
                  <button onClick={() => setSelected(new Set())} style={{ color:"#6b7280" }}>
                    <X size={11}/>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Grid */}
          {filtered.length===0 ? (
            <div className="flex flex-col items-center justify-center py-20">
              <Hash size={36} strokeWidth={1} style={{ marginBottom:12, color:"#2d2d30" }}/>
              <div style={{ fontSize:14, color:"#6b7280" }}>No se encontraron equipos</div>
              <div style={{ fontSize:12, color:"#4b5563", marginTop:4 }}>
                Ajusta los filtros o crea un nuevo equipo
              </div>
            </div>
          ) : (
            <div className="grid gap-3"
              style={{ gridTemplateColumns:detailTeam?"repeat(2,1fr)":"repeat(3,1fr)" }}>
              {filtered.map((team) => (
                <TeamCard key={team.id} team={team}
                  selected={selected.has(team.id)}
                  onSelect={() => toggleSelect(team.id)}
                  onView={() => setDetailTeam(team)}/>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Detail panel */}
      {detailTeam && (
        <div className="shrink-0 overflow-hidden"
          style={{ width:348, borderLeft:"1px solid rgba(255,255,255,0.07)" }}>
          <TeamDetail team={detailTeam} onClose={() => setDetailTeam(null)}/>
        </div>
      )}
    </div>
  );
}

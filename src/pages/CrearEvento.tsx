import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Check, ChevronRight, ChevronLeft, Upload, MapPin,
  Calendar, Clock, Users, Banknote, Shield, FileText,
  Info, Crosshair, AlertCircle, CheckCircle2, Eye,
  PlusCircle, X, Image as ImageIcon, Zap, Target,
  BookOpen, Megaphone,
} from "lucide-react";
import { LIME, LIME_DIM, StatusBadge } from "../shared";
import { useEventStore, useFieldStore } from "../stores";
import { Event, EventStatus, EventType, EventLevel } from "../types";

// ─── Types ────────────────────────────────────────────────────────────────────
interface FormData {
  // Step 1
  nombre: string;
  descripcion: string;
  tipoPartida: string;
  nivel: string;
  coverImage: string | null;
  // Step 2
  fecha: string;
  horaInicio: string;
  horaFin: string;
  campo: string;
  // Step 3
  modalidad: string;
  equipamiento: string[];
  reglas: string;
  infoAdicional: string;
  // Step 4
  precio: string;
  capacidadMax: string;
  minJugadores: string;
  // Step 5
  estado: EventStatus;
}

const INITIAL: FormData = {
  nombre: "", descripcion: "", tipoPartida: "", nivel: "", coverImage: null,
  fecha: "", horaInicio: "", horaFin: "", campo: "",
  modalidad: "", equipamiento: [], reglas: "", infoAdicional: "",
  precio: "", capacidadMax: "", minJugadores: "", estado: "Borrador",
};

const TIPOS = ["Milsim", "CQB", "Woodland", "Speedsoft", "Nocturno", "Scenario", "Team deathmatch"];
const NIVELES = ["Principiante", "Intermedio", "Avanzado", "Todos los niveles"];
const CAMPOS = [
  { name: "Campo Delta", city: "La Plata", available: true, cap: 80 },
  { name: "Campo Alpha", city: "Córdoba", available: true, cap: 60 },
  { name: "Campo Omega", city: "Rosario", available: false, cap: 50 },
  { name: "Campo Norte", city: "Santa Fe", available: true, cap: 70 },
  { name: "Campo Base Sur", city: "Mendoza", available: true, cap: 60 },
  { name: "Campo Sur", city: "Mar del Plata", available: false, cap: 45 },
];
const EQUIPAMIENTO_OPTS = [
  "Réplica homologada", "Cargador de gas", "Protección ocular obligatoria",
  "Casco recomendado", "Guantes tácticos", "Rodilleras", "Radio/walkie talkie",
  "Uniforme militar", "Chaleco táctico", "Botiquín básico",
];
const MODALIDADES_DETAIL = [
  { key: "Milsim", desc: "Simulación militar realista con reglas de combate estrictas y objetivos tácticos." },
  { key: "CQB", desc: "Combate en espacios cerrados de alta intensidad. Partidas rápidas y dinámicas." },
  { key: "Woodland", desc: "Combate en terreno boscoso. Énfasis en camuflaje y movimiento táctico." },
  { key: "Nocturno", desc: "Operaciones bajo oscuridad total. Uso de visión nocturna y luces tácticas." },
];

const EVENT_STATUS_OPTIONS: EventStatus[] = ["Borrador", "Publicado", "Finalizado", "Cancelado"];

function formatEventDate(value: string) {
  if (!value) return "Sin fecha";
  const date = new Date(`${value}T12:00:00`);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("es-ES", { day: "2-digit", month: "short", year: "numeric" }).format(date);
}

const STEPS = [
  { n: 1, label: "Información básica", icon: FileText },
  { n: 2, label: "Fecha y ubicación", icon: MapPin },
  { n: 3, label: "Configuración", icon: Shield },
  { n: 4, label: "Precio y cupos", icon: Banknote },
  { n: 5, label: "Publicar", icon: Zap },
];

// ─── Reusable input components ────────────────────────────────────────────────
function Label({ children, required }: { children: React.ReactNode; required?: boolean }) {
  return (
    <label style={{ fontSize: 12, fontWeight: 500, color: "#9ca3af", display: "block", marginBottom: 6, letterSpacing: "0.02em" }}>
      {children}
      {required && <span style={{ color: LIME, marginLeft: 3 }}>*</span>}
    </label>
  );
}

function Helper({ children }: { children: React.ReactNode }) {
  return <p style={{ fontSize: 11, color: "#4b5563", marginTop: 5 }}>{children}</p>;
}

function Input({
  value, onChange, placeholder, type = "text",
}: {
  value: string; onChange: (v: string) => void; placeholder?: string; type?: string;
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      style={{
        width: "100%", background: "#141416", border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: 8, padding: "9px 12px", color: "#e5e7eb", fontSize: 13,
        outline: "none", fontFamily: "'Inter', sans-serif",
      }}
      onFocus={(e) => { (e.target as HTMLInputElement).style.borderColor = "rgba(163,230,53,0.4)"; }}
      onBlur={(e) => { (e.target as HTMLInputElement).style.borderColor = "rgba(255,255,255,0.08)"; }}
    />
  );
}

function Textarea({
  value, onChange, placeholder, rows = 4,
}: {
  value: string; onChange: (v: string) => void; placeholder?: string; rows?: number;
}) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={rows}
      style={{
        width: "100%", background: "#141416", border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: 8, padding: "9px 12px", color: "#e5e7eb", fontSize: 13,
        outline: "none", fontFamily: "'Inter', sans-serif", resize: "vertical",
        lineHeight: 1.6,
      }}
      onFocus={(e) => { (e.target as HTMLTextAreaElement).style.borderColor = "rgba(163,230,53,0.4)"; }}
      onBlur={(e) => { (e.target as HTMLTextAreaElement).style.borderColor = "rgba(255,255,255,0.08)"; }}
    />
  );
}

function Select({
  value, onChange, options, placeholder,
}: {
  value: string; onChange: (v: string) => void; options: string[]; placeholder?: string;
}) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          width: "100%", background: "#141416", border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: 8, padding: "9px 12px", color: value ? "#e5e7eb" : "#6b7280",
          fontSize: 13, outline: "none", fontFamily: "'Inter', sans-serif",
          appearance: "none", cursor: "pointer",
        }}
      >
        {placeholder && <option value="" style={{ background: "#161618" }}>{placeholder}</option>}
        {options.map((o) => <option key={o} value={o} style={{ background: "#161618", color: "#e5e7eb" }}>{o}</option>)}
      </select>
      <ChevronRight size={12} color="#6b7280" style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%) rotate(90deg)", pointerEvents: "none" }} />
    </div>
  );
}

function SectionCard({ title, icon: Icon, children, hint }: {
  title: string; icon: React.ElementType; children: React.ReactNode; hint?: string;
}) {
  return (
    <div className="rounded-xl" style={{ background: "#101012", border: "1px solid rgba(255,255,255,0.07)" }}>
      <div className="flex items-center gap-2.5 px-5 py-3.5" style={{ borderBottom: "1px solid rgba(255,255,255,0.055)" }}>
        <div className="rounded-md flex items-center justify-center" style={{ width: 28, height: 28, background: "rgba(163,230,53,0.08)", border: "1px solid rgba(163,230,53,0.12)" }}>
          <Icon size={14} style={{ color: LIME }} strokeWidth={1.5} />
        </div>
        <div>
          <h3 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 15, fontWeight: 600, letterSpacing: "0.04em", color: "#e5e7eb" }}>{title}</h3>
          {hint && <p style={{ fontSize: 11, color: "#6b7280", marginTop: 1 }}>{hint}</p>}
        </div>
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
}

// ─── Step components ──────────────────────────────────────────────────────────
function Step1({ data, set }: { data: FormData; set: (k: keyof FormData, v: any) => void }) {
  const [dragging, setDragging] = useState(false);

  return (
    <div className="grid gap-4" style={{ gridTemplateColumns: "1fr 340px" }}>
      <div className="flex flex-col gap-4">
        <SectionCard title="Nombre e identidad del evento" icon={FileText} hint="Información principal que verán los jugadores">
          <div className="mb-4">
            <Label required>Nombre del evento</Label>
            <Input value={data.nombre} onChange={(v) => set("nombre", v)} placeholder="Ej: Operación Black Hawk II" />
            <Helper>Usa un nombre táctico memorable. Máx. 60 caracteres.</Helper>
          </div>
          <div>
            <Label required>Descripción</Label>
            <Textarea value={data.descripcion} onChange={(v) => set("descripcion", v)} rows={5}
              placeholder="Describe el escenario, el contexto narrativo y el objetivo de la operación. Ej: Dos facciones se enfrentan en el perímetro del Campo Delta en una batalla por el control del suministro de munición..." />
            <Helper>Describe el escenario, objetivo y contexto narrativo del evento.</Helper>
          </div>
        </SectionCard>

        <SectionCard title="Tipo y nivel" icon={Target} hint="Clasifica el evento para que los jugadores sepan qué esperar">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label required>Tipo de partida</Label>
              <Select value={data.tipoPartida} onChange={(v) => set("tipoPartida", v)} options={TIPOS} placeholder="Seleccionar modalidad..." />
            </div>
            <div>
              <Label required>Nivel recomendado</Label>
              <Select value={data.nivel} onChange={(v) => set("nivel", v)} options={NIVELES} placeholder="Seleccionar nivel..." />
            </div>
          </div>
          {data.tipoPartida && (
            <div className="mt-3 rounded-lg p-3 flex items-start gap-2.5" style={{ background: "rgba(163,230,53,0.05)", border: "1px solid rgba(163,230,53,0.1)" }}>
              <Info size={13} style={{ color: LIME, marginTop: 1, flexShrink: 0 }} />
              <p style={{ fontSize: 12, color: "#9ca3af", lineHeight: 1.5 }}>
                {MODALIDADES_DETAIL.find((m) => m.key === data.tipoPartida)?.desc ?? `Modalidad ${data.tipoPartida} seleccionada.`}
              </p>
            </div>
          )}
        </SectionCard>
      </div>

      {/* Cover image */}
      <SectionCard title="Imagen de portada" icon={ImageIcon} hint="Imagen principal del evento">
        <div
          className="rounded-xl flex flex-col items-center justify-center text-center cursor-pointer transition-all"
          style={{
            height: 220, border: `2px dashed ${dragging ? LIME : "rgba(255,255,255,0.1)"}`,
            background: dragging ? "rgba(163,230,53,0.04)" : "#0e0e10",
          }}
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={(e) => {
            e.preventDefault(); setDragging(false);
            const file = e.dataTransfer.files[0];
            if (file) set("coverImage", URL.createObjectURL(file));
          }}
          onClick={() => document.getElementById("cover-upload")?.click()}
        >
          {data.coverImage ? (
            <div className="relative w-full h-full rounded-xl overflow-hidden">
              <img src={data.coverImage} alt="Cover" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              <button
                className="absolute top-2 right-2 rounded-full flex items-center justify-center"
                style={{ width: 26, height: 26, background: "rgba(0,0,0,0.7)", color: "#fff" }}
                onClick={(e) => { e.stopPropagation(); set("coverImage", null); }}
              >
                <X size={13} />
              </button>
            </div>
          ) : (
            <>
              <div className="rounded-full flex items-center justify-center mb-3" style={{ width: 48, height: 48, background: "rgba(163,230,53,0.08)", border: "1px solid rgba(163,230,53,0.15)" }}>
                <Upload size={20} style={{ color: LIME }} strokeWidth={1.5} />
              </div>
              <p style={{ fontSize: 13, color: "#9ca3af", marginBottom: 4 }}>Arrastra una imagen o haz clic</p>
              <p style={{ fontSize: 11, color: "#4b5563" }}>PNG, JPG, WEBP · Recomendado 1280×720</p>
            </>
          )}
        </div>
        <input id="cover-upload" type="file" accept="image/*" className="hidden"
          onChange={(e) => { const f = e.target.files?.[0]; if (f) set("coverImage", URL.createObjectURL(f)); }} />

        <div className="mt-4 p-3 rounded-lg" style={{ background: "#0e0e10", border: "1px solid rgba(255,255,255,0.06)" }}>
          <p style={{ fontSize: 11.5, color: "#6b7280", lineHeight: 1.6 }}>
            <span style={{ color: "#9ca3af", fontWeight: 500 }}>Consejo:</span> Usa imágenes con ambiente táctico real. Evita capturas de videojuegos o imágenes de baja resolución.
          </p>
        </div>

        <div className="mt-4">
          <Label>Imágenes de referencia</Label>
          <div className="grid grid-cols-3 gap-2 mt-1">
            {[
              "https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?w=120&h=80&fit=crop&auto=format",
              "https://images.unsplash.com/photo-1579656381254-20f2f7b4c7b5?w=120&h=80&fit=crop&auto=format",
              "https://images.unsplash.com/photo-1550684376-efcbd6e3f031?w=120&h=80&fit=crop&auto=format",
            ].map((src, i) => (
              <div key={i} className="rounded-lg overflow-hidden cursor-pointer relative group"
                style={{ height: 60, background: "#1a1a1c" }}
                onClick={() => set("coverImage", src)}
              >
                <img src={src} alt="ref" style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.7 }} />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all" style={{ background: "rgba(163,230,53,0.2)" }}>
                  <Check size={14} color={LIME} />
                </div>
              </div>
            ))}
          </div>
          <p style={{ fontSize: 10.5, color: "#4b5563", marginTop: 6 }}>Haz clic en una imagen para usarla como portada</p>
        </div>
      </SectionCard>
    </div>
  );
}

function Step2({ data, set }: { data: FormData; set: (k: keyof FormData, v: any) => void }) {
  const { fields } = useFieldStore();
  const fieldChoices = fields.length > 0 ? fields : CAMPOS.map((c) => ({ id: c.name, name: c.name, city: c.city, available: c.available, capacity: c.cap }));

  return (
    <div className="grid gap-4" style={{ gridTemplateColumns: "1fr 1fr" }}>
      <div className="flex flex-col gap-4">
        <SectionCard title="Fecha y horario" icon={Calendar} hint="Define cuándo se celebrará la operación">
          <div className="mb-4">
            <Label required>Fecha del evento</Label>
            <Input type="date" value={data.fecha} onChange={(v) => set("fecha", v)} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label required>Hora de inicio</Label>
              <Input type="time" value={data.horaInicio} onChange={(v) => set("horaInicio", v)} />
            </div>
            <div>
              <Label required>Hora de finalización</Label>
              <Input type="time" value={data.horaFin} onChange={(v) => set("horaFin", v)} />
            </div>
          </div>
          {data.horaInicio && data.horaFin && (
            <div className="mt-3 rounded-lg p-2.5 flex items-center gap-2" style={{ background: "rgba(163,230,53,0.05)", border: "1px solid rgba(163,230,53,0.1)" }}>
              <Clock size={12} style={{ color: LIME }} />
              <span style={{ fontSize: 12, color: "#9ca3af" }}>
                Duración estimada: {(() => {
                  const [sh, sm] = data.horaInicio.split(":").map(Number);
                  const [eh, em] = data.horaFin.split(":").map(Number);
                  const mins = (eh * 60 + em) - (sh * 60 + sm);
                  if (mins <= 0) return "–";
                  return `${Math.floor(mins / 60)}h ${mins % 60}min`;
                })()}
              </span>
            </div>
          )}
        </SectionCard>
      </div>

      <div className="flex flex-col gap-4">
        <SectionCard title="Selección de campo" icon={MapPin} hint="Elige el campo donde se celebrará el evento">
          <div className="flex flex-col gap-2">
            {fieldChoices.map((c) => {
              const selected = data.campo === c.name;
              const available = "available" in c ? c.available : true;
              const cap = "capacity" in c ? c.capacity : c.capacity ?? 0;
              return (
                <button
                  key={c.name}
                  onClick={() => available && set("campo", c.name)}
                  disabled={!available}
                  className="flex items-center gap-3 rounded-lg p-3 text-left transition-all"
                  style={{
                    background: selected ? "rgba(163,230,53,0.08)" : "#141416",
                    border: selected ? `1px solid rgba(163,230,53,0.3)` : "1px solid rgba(255,255,255,0.07)",
                    opacity: available ? 1 : 0.45,
                    cursor: available ? "pointer" : "not-allowed",
                  }}
                >
                  <div className="rounded-md flex items-center justify-center shrink-0" style={{ width: 32, height: 32, background: selected ? "rgba(163,230,53,0.12)" : "#1e1e20", border: `1px solid ${selected ? "rgba(163,230,53,0.2)" : "rgba(255,255,255,0.06)"}` }}>
                    <MapPin size={14} style={{ color: selected ? LIME : "#6b7280" }} strokeWidth={1.5} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div style={{ fontSize: 13, fontWeight: 500, color: selected ? "#fff" : "#d1d5db" }}>{c.name}</div>
                    <div style={{ fontSize: 11, color: "#6b7280" }}>{c.city} · Cap. {cap} jugadores</div>
                  </div>
                  <div>
                    {available ? (
                      <span className="rounded px-2 py-0.5" style={{ fontSize: 10, background: "rgba(163,230,53,0.1)", color: LIME, fontFamily: "'JetBrains Mono', monospace" }}>Disponible</span>
                    ) : (
                      <span className="rounded px-2 py-0.5" style={{ fontSize: 10, background: "rgba(248,113,113,0.1)", color: "#f87171", fontFamily: "'JetBrains Mono', monospace" }}>Ocupado</span>
                    )}
                  </div>
                  {selected && <Check size={14} style={{ color: LIME, flexShrink: 0 }} />}
                </button>
              );
            })}
          </div>
        </SectionCard>
      </div>
    </div>
  );
}

function Step3({ data, set }: { data: FormData; set: (k: keyof FormData, v: any) => void }) {
  function toggleEquip(item: string) {
    const cur = data.equipamiento;
    set("equipamiento", cur.includes(item) ? cur.filter((e) => e !== item) : [...cur, item]);
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="grid gap-4" style={{ gridTemplateColumns: "1fr 1fr" }}>
        <SectionCard title="Modalidad y reglas" icon={Shield} hint="Define cómo se jugará el evento">
          <div className="mb-4">
            <Label required>Modalidad principal</Label>
            <Select value={data.modalidad} onChange={(v) => set("modalidad", v)} options={TIPOS} placeholder="Seleccionar modalidad..." />
          </div>
          <div>
            <Label required>Reglas e instrucciones</Label>
            <Textarea value={data.reglas} onChange={(v) => set("reglas", v)} rows={6}
              placeholder={`Ej:\n- Velocidad máxima permitida: 350 FPS en campo abierto, 280 FPS en CQB\n- El árbitro es la autoridad máxima en campo\n- Obligatorio anunciar baja con brazo en alto y decir "hit"\n- Prohibido el uso de granadas eléctricas en zona CQB\n- Respawn cada 10 minutos en punto designado`} />
            <Helper>Especifica FPS máximos, sistema de bajas, respawns y normas de fair play.</Helper>
          </div>
        </SectionCard>

        <div className="flex flex-col gap-4">
          <SectionCard title="Equipamiento requerido" icon={Target} hint="Marca el equipo necesario para participar">
            <div className="grid grid-cols-1 gap-1.5">
              {EQUIPAMIENTO_OPTS.map((item) => {
                const checked = data.equipamiento.includes(item);
                return (
                  <button
                    key={item}
                    onClick={() => toggleEquip(item)}
                    className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-all"
                    style={{
                      background: checked ? "rgba(163,230,53,0.06)" : "#141416",
                      border: checked ? "1px solid rgba(163,230,53,0.2)" : "1px solid rgba(255,255,255,0.06)",
                    }}
                  >
                    <div className="flex items-center justify-center rounded shrink-0" style={{ width: 16, height: 16, background: checked ? LIME : "transparent", border: checked ? "none" : "1px solid rgba(255,255,255,0.15)" }}>
                      {checked && <Check size={10} color="#000" strokeWidth={3} />}
                    </div>
                    <span style={{ fontSize: 12.5, color: checked ? "#e5e7eb" : "#9ca3af" }}>{item}</span>
                  </button>
                );
              })}
            </div>
          </SectionCard>
        </div>
      </div>

      <SectionCard title="Información adicional para jugadores" icon={BookOpen} hint="Detalles logísticos, acceso y recomendaciones">
        <Textarea value={data.infoAdicional} onChange={(v) => set("infoAdicional", v)} rows={4}
          placeholder="Ej: Parking disponible en la entrada principal. Llevar comida y agua para el día completo. No se admiten menores de 18 años sin acompañante. Acceso por la A-4 salida 42, coordenadas de punto de encuentro: 40.4168° N, 3.7038° O." />
        <Helper>Esta información aparecerá en el correo de confirmación de los jugadores inscritos.</Helper>
      </SectionCard>
    </div>
  );
}

function Step4({ data, set }: { data: FormData; set: (k: keyof FormData, v: any) => void }) {
  const precio = parseFloat(data.precio) || 0;
  const cap = parseInt(data.capacidadMax) || 0;
  const minJ = parseInt(data.minJugadores) || 0;
  const ingresosPot = precio * cap;
  const ingresosMin = precio * minJ;

  return (
    <div className="grid gap-4" style={{ gridTemplateColumns: "1fr 360px" }}>
      <div className="flex flex-col gap-4">
        <SectionCard title="Precio de inscripción" icon={Banknote} hint="Define el valor por jugador">
          <div className="mb-5">
            <Label required>Precio por jugador (ARS)</Label>
            <div className="relative">
              <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "#6b7280", fontSize: 14 }}>$</span>
              <input
                type="number"
                min="0"
                step="0.5"
                value={data.precio}
                onChange={(e) => set("precio", e.target.value)}
                placeholder="0.00"
                style={{
                  width: "100%", background: "#141416", border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: 8, padding: "9px 12px 9px 28px", color: "#e5e7eb", fontSize: 16,
                  outline: "none", fontFamily: "'JetBrains Mono', monospace", fontWeight: 600,
                }}
                onFocus={(e) => { e.target.style.borderColor = "rgba(163,230,53,0.4)"; }}
                onBlur={(e) => { e.target.style.borderColor = "rgba(255,255,255,0.08)"; }}
              />
            </div>
            <Helper>Precio final que paga cada jugador al inscribirse. Puedes ajustarlo antes de publicar.</Helper>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {[10, 15, 20, 25, 30, 35].map((p) => (
              <button
                key={p}
                onClick={() => set("precio", String(p))}
                className="rounded-lg py-2 text-center transition-all"
                style={{
                  background: data.precio === String(p) ? "rgba(163,230,53,0.1)" : "#141416",
                  border: data.precio === String(p) ? "1px solid rgba(163,230,53,0.3)" : "1px solid rgba(255,255,255,0.07)",
                  color: data.precio === String(p) ? LIME : "#9ca3af",
                  fontSize: 13,
                  fontFamily: "'JetBrains Mono', monospace",
                  fontWeight: 500,
                }}
              >
                ${p.toLocaleString("es-AR")}
              </button>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Cupos y capacidad" icon={Users} hint="Límites de participación para el evento">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <Label required>Capacidad máxima</Label>
              <Input type="number" value={data.capacidadMax} onChange={(v) => set("capacidadMax", v)} placeholder="Ej: 60" />
              <Helper>Número máximo de jugadores permitidos.</Helper>
            </div>
            <div>
              <Label required>Mínimo de jugadores</Label>
              <Input type="number" value={data.minJugadores} onChange={(v) => set("minJugadores", v)} placeholder="Ej: 20" />
              <Helper>Mínimo para que el evento no se cancele.</Helper>
            </div>
          </div>

          {cap > 0 && minJ > 0 && (
            <div className="rounded-lg p-3" style={{ background: "#0e0e10", border: "1px solid rgba(255,255,255,0.06)" }}>
              <div style={{ fontSize: 11.5, color: "#6b7280", marginBottom: 8 }}>Vista previa de ocupación</div>
              <div style={{ height: 6, borderRadius: 3, background: "rgba(255,255,255,0.06)", marginBottom: 6 }}>
                <div style={{ height: "100%", borderRadius: 3, width: `${Math.min((minJ / cap) * 100, 100)}%`, background: `linear-gradient(90deg, ${LIME_DIM}, ${LIME})`, opacity: 0.5 }} />
              </div>
              <div className="flex justify-between">
                <span style={{ fontSize: 11, color: "#6b7280", fontFamily: "'JetBrains Mono', monospace" }}>Mín. {minJ}</span>
                <span style={{ fontSize: 11, color: "#9ca3af", fontFamily: "'JetBrains Mono', monospace" }}>Máx. {cap}</span>
              </div>
            </div>
          )}
        </SectionCard>
      </div>

      {/* Revenue preview */}
      <div className="flex flex-col gap-4">
        <SectionCard title="Estimación de ingresos" icon={Zap} hint="Proyección económica del evento">
          <div className="space-y-3">
            <div className="rounded-xl p-4 text-center" style={{ background: "#0e0e10", border: "1px solid rgba(163,230,53,0.1)" }}>
              <div style={{ fontSize: 11, color: "#6b7280", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.1em" }}>Ingresos máximos</div>
              <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 38, fontWeight: 700, color: LIME, lineHeight: 1 }}>
                {ingresosPot > 0 ? `$${ingresosPot.toLocaleString("es-AR")}` : "—"}
              </div>
              <div style={{ fontSize: 11.5, color: "#6b7280", marginTop: 4 }}>Con {cap || "?"} jugadores a ${precio ? precio.toLocaleString("es-AR") : "??"}/jugador</div>
            </div>
            <div className="rounded-xl p-4 text-center" style={{ background: "#0e0e10", border: "1px solid rgba(255,255,255,0.06)" }}>
              <div style={{ fontSize: 11, color: "#6b7280", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.1em" }}>Ingresos mínimos</div>
              <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 28, fontWeight: 700, color: "#9ca3af", lineHeight: 1 }}>
                {ingresosMin > 0 ? `$${ingresosMin.toLocaleString("es-AR")}` : "—"}
              </div>
              <div style={{ fontSize: 11.5, color: "#6b7280", marginTop: 4 }}>Con {minJ || "?"} jugadores (mínimo)</div>
            </div>
          </div>

          <div className="mt-4 p-3 rounded-lg" style={{ background: "rgba(163,230,53,0.04)", border: "1px solid rgba(163,230,53,0.1)" }}>
            <div className="flex items-start gap-2">
              <Info size={13} style={{ color: LIME, marginTop: 1, flexShrink: 0 }} />
              <p style={{ fontSize: 11.5, color: "#9ca3af", lineHeight: 1.6 }}>
                Los ingresos se liberan 48h después de finalizado el evento, una vez confirmada la asistencia mínima.
              </p>
            </div>
          </div>
        </SectionCard>

        <div className="rounded-xl p-4" style={{ background: "#101012", border: "1px solid rgba(255,255,255,0.07)" }}>
          <div style={{ fontSize: 12, fontWeight: 500, color: "#9ca3af", marginBottom: 12 }}>Resumen del evento</div>
          <div className="space-y-2.5">
            {[
              { label: "Precio", val: precio > 0 ? `$${precio.toLocaleString("es-AR")}` : "—" },
              { label: "Capacidad", val: cap > 0 ? `${cap} jugadores` : "—" },
              { label: "Mínimo", val: minJ > 0 ? `${minJ} jugadores` : "—" },
              { label: "Cupos disp.", val: cap > 0 ? `${cap} disponibles` : "—" },
            ].map(({ label, val }) => (
              <div key={label} className="flex justify-between items-center">
                <span style={{ fontSize: 12, color: "#6b7280" }}>{label}</span>
                <span style={{ fontSize: 12.5, color: "#e5e7eb", fontFamily: "'JetBrains Mono', monospace", fontWeight: 500 }}>{val}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Step5({ data }: { data: FormData }) {
  const { fields } = useFieldStore();
  const selectedField = fields.find((field) => field.name === data.campo) ?? null;

  const checks = [
    { label: "Nombre del evento", ok: !!data.nombre },
    { label: "Descripción", ok: !!data.descripcion },
    { label: "Tipo de partida", ok: !!data.tipoPartida },
    { label: "Fecha y horario", ok: !!(data.fecha && data.horaInicio && data.horaFin) },
    { label: "Campo seleccionado", ok: !!data.campo },
    { label: "Precio por jugador", ok: !!data.precio && parseFloat(data.precio) > 0 },
    { label: "Capacidad máxima", ok: !!data.capacidadMax },
    { label: "Mínimo de jugadores", ok: !!data.minJugadores },
  ];
  const allOk = checks.every((c) => c.ok);

  return (
    <div className="grid gap-4" style={{ gridTemplateColumns: "1fr 320px" }}>
      {/* Preview card */}
      <div className="flex flex-col gap-4">
        <div className="rounded-xl overflow-hidden" style={{ background: "#101012", border: "1px solid rgba(255,255,255,0.07)" }}>
          {/* Event header */}
          <div
            className="relative flex items-end p-5"
            style={{ height: 200, background: "#1a1a1c" }}
          >
            {data.coverImage && (
              <img src={data.coverImage} alt="cover" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.6 }} />
            )}
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.85), transparent 60%)" }} />
            <div style={{ position: "relative", zIndex: 1 }}>
              {data.tipoPartida && <span className="inline-flex rounded px-2 py-0.5 mb-2" style={{ fontSize: 10, fontFamily: "'JetBrains Mono', monospace", background: "rgba(163,230,53,0.2)", color: LIME, border: "1px solid rgba(163,230,53,0.3)" }}>{data.tipoPartida.toUpperCase()}</span>}
              <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 28, fontWeight: 700, color: "#fff", letterSpacing: "0.02em", lineHeight: 1 }}>
                {data.nombre || "Nombre del evento"}
              </h2>
              <div className="flex items-center gap-3 mt-2">
                {data.fecha && (
                  <span className="flex items-center gap-1.5" style={{ fontSize: 12, color: "#9ca3af" }}>
                    <Calendar size={11} /> {data.fecha}
                  </span>
                )}
                {data.horaInicio && (
                  <span className="flex items-center gap-1.5" style={{ fontSize: 12, color: "#9ca3af" }}>
                    <Clock size={11} /> {data.horaInicio} – {data.horaFin}
                  </span>
                )}
                {data.campo && (
                  <span className="flex items-center gap-1.5" style={{ fontSize: 12, color: "#9ca3af" }}>
                    <MapPin size={11} /> {data.campo}, {selectedField?.city ?? "campo"}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="p-5">
            {data.descripcion ? (
              <p style={{ fontSize: 13, color: "#9ca3af", lineHeight: 1.7, marginBottom: 16 }}>{data.descripcion}</p>
            ) : (
              <p style={{ fontSize: 13, color: "#374151", fontStyle: "italic", marginBottom: 16 }}>Sin descripción añadida.</p>
            )}

            <div className="grid grid-cols-4 gap-3">
              {[
                { icon: Banknote, label: "Precio", val: data.precio ? `$${Number(data.precio).toLocaleString("es-AR")}` : "—" },
                { icon: Users, label: "Capacidad", val: data.capacidadMax ? `${data.capacidadMax} jug.` : "—" },
                { icon: Target, label: "Nivel", val: data.nivel || "—" },
                { icon: Shield, label: "Modalidad", val: data.modalidad || data.tipoPartida || "—" },
              ].map(({ icon: Icon, label, val }) => (
                <div key={label} className="rounded-lg p-3 text-center" style={{ background: "#141416", border: "1px solid rgba(255,255,255,0.06)" }}>
                  <Icon size={14} style={{ color: LIME, marginBottom: 4 }} strokeWidth={1.5} />
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, fontWeight: 600, color: "#e5e7eb" }}>{val}</div>
                  <div style={{ fontSize: 10.5, color: "#6b7280", marginTop: 2 }}>{label}</div>
                </div>
              ))}
            </div>

            {data.equipamiento.length > 0 && (
              <div className="mt-4">
                <div style={{ fontSize: 12, color: "#6b7280", marginBottom: 8 }}>Equipamiento requerido</div>
                <div className="flex flex-wrap gap-2">
                  {data.equipamiento.map((e) => (
                    <span key={e} className="rounded-md px-2.5 py-1" style={{ fontSize: 11.5, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", color: "#9ca3af" }}>{e}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {!allOk && (
          <div className="rounded-xl p-4 flex items-start gap-3" style={{ background: "rgba(251,191,36,0.06)", border: "1px solid rgba(251,191,36,0.2)" }}>
            <AlertCircle size={16} style={{ color: "#fbbf24", marginTop: 1, flexShrink: 0 }} />
            <div>
              <div style={{ fontSize: 13, fontWeight: 500, color: "#fbbf24", marginBottom: 4 }}>Formulario incompleto</div>
              <p style={{ fontSize: 12, color: "#9ca3af", lineHeight: 1.5 }}>Completa todos los campos requeridos antes de publicar. Puedes guardar como borrador mientras tanto.</p>
            </div>
          </div>
        )}
      </div>

      {/* Checklist */}
      <div className="flex flex-col gap-4">
        <SectionCard title="Checklist de publicación" icon={CheckCircle2} hint="Verifica que todo esté completo">
          <div className="space-y-2">
            {checks.map(({ label, ok }) => (
              <div key={label} className="flex items-center gap-3 rounded-lg px-3 py-2.5" style={{ background: ok ? "rgba(163,230,53,0.04)" : "#141416", border: `1px solid ${ok ? "rgba(163,230,53,0.1)" : "rgba(255,255,255,0.06)"}` }}>
                <div className="rounded-full flex items-center justify-center shrink-0" style={{ width: 20, height: 20, background: ok ? LIME : "rgba(255,255,255,0.06)", border: ok ? "none" : "1px solid rgba(255,255,255,0.1)" }}>
                  {ok ? <Check size={11} color="#000" strokeWidth={3} /> : <span style={{ fontSize: 8, color: "#4b5563" }}>–</span>}
                </div>
                <span style={{ fontSize: 12.5, color: ok ? "#d1d5db" : "#6b7280" }}>{label}</span>
              </div>
            ))}
          </div>

          <div className="mt-4 rounded-lg p-3" style={{ background: "#0e0e10", border: "1px solid rgba(255,255,255,0.06)" }}>
            <div className="flex justify-between mb-2">
              <span style={{ fontSize: 11.5, color: "#6b7280" }}>Completado</span>
              <span style={{ fontSize: 11.5, color: LIME, fontFamily: "'JetBrains Mono', monospace" }}>
                {checks.filter((c) => c.ok).length}/{checks.length}
              </span>
            </div>
            <div style={{ height: 4, borderRadius: 2, background: "rgba(255,255,255,0.06)" }}>
              <div style={{ height: "100%", borderRadius: 2, width: `${(checks.filter((c) => c.ok).length / checks.length) * 100}%`, background: `linear-gradient(90deg, ${LIME_DIM}, ${LIME})`, transition: "width 0.4s ease" }} />
            </div>
          </div>
        </SectionCard>

        <div className="rounded-xl p-4" style={{ background: "#101012", border: "1px solid rgba(255,255,255,0.07)" }}>
          <div style={{ fontSize: 12, fontWeight: 500, color: "#9ca3af", marginBottom: 10 }}>Estado de publicación</div>
          <div className="flex flex-col gap-3">
            <Label>Estado y publicación</Label>
            <select
              value={data.estado}
              onChange={(e) => set("estado", e.target.value as EventStatus)}
              style={{
                width: "100%", background: "#141416", border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 8, padding: "9px 12px", color: "#e5e7eb", fontSize: 13,
                outline: "none", fontFamily: "'Inter', sans-serif",
              }}
            >
              {EVENT_STATUS_OPTIONS.map((status) => (
                <option key={status} value={status} style={{ background: "#161618", color: "#e5e7eb" }}>{status}</option>
              ))}
            </select>
            <div className="flex items-center justify-between">
              <span style={{ fontSize: 13, color: "#e5e7eb" }}>Vista previa</span>
              <StatusBadge status={data.estado} />
            </div>
          </div>
          <p style={{ fontSize: 11.5, color: "#4b5563", marginTop: 8, lineHeight: 1.5 }}>
            {allOk
              ? "El evento quedará con este estado una vez se guarde."
              : "Guarda como borrador para completarlo más tarde."}
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function CrearEvento() {
  const navigate = useNavigate();
  const { addEvent, setSelectedEvent } = useEventStore();
  const { fields } = useFieldStore();
  const [step, setStep] = useState(1);
  const [data, setData] = useState<FormData>(INITIAL);

  function set(key: keyof FormData, value: any) {
    setData((d) => ({ ...d, [key]: value }));
  }

  function handleSave(nextStatus: EventStatus = data.estado) {
    const trimmedName = data.nombre.trim();
    if (!trimmedName) return;

    const selectedField = fields.find((field) => field.name === data.campo) ?? null;
    const nextId = Date.now();
    const eventToCreate: Event = {
      id: nextId,
      name: trimmedName,
      description: data.descripcion.trim() || "Sin descripción añadida.",
      type: (data.tipoPartida as EventType) || "Milsim",
      level: (data.nivel as EventLevel) || "Todos los niveles",
      coverImage: data.coverImage,
      date: formatEventDate(data.fecha),
      dateSort: data.fecha || "",
      startTime: data.horaInicio || "09:00",
      endTime: data.horaFin || "18:00",
      fieldId: selectedField?.id ?? 1,
      field: selectedField?.name ?? (data.campo || "Campo sin asignar"),
      city: selectedField?.city ?? "",
      modality: data.modalidad || data.tipoPartida || "Milsim",
      equipment: data.equipamiento,
      rules: data.reglas || "Reglas estándar del campo.",
      additionalInfo: data.infoAdicional || "",
      price: Number(data.precio) || 0,
      maxCapacity: Number(data.capacidadMax) || 0,
      minPlayers: Number(data.minJugadores) || 0,
      status: nextStatus,
      enrolled: 0,
      revenue: 0,
      img: data.coverImage || selectedField?.img || "https://images.unsplash.com/photo-1519689680058-324335c77eba?w=1200&h=800&fit=crop&auto=format",
    };

    addEvent(eventToCreate);
    setSelectedEvent(eventToCreate);

    if (nextStatus === "Publicado") {
      navigate(`/events/${eventToCreate.id}`);
      return;
    }

    navigate("/events");
  }

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Page header */}
      <div className="flex items-center justify-between px-6 py-4 shrink-0" style={{ borderBottom: "1px solid rgba(255,255,255,0.055)", background: "#0b0b0d" }}>
        <button className="rounded-lg px-3 py-2 text-sm transition-all" style={{ background: "#141416", border: "1px solid rgba(255,255,255,0.07)", color: "#9ca3af", fontSize: 12 }}>
          <span>Guardar borrador</span>
        </button>
      </div>

      {/* Stepper */}
      <div className="shrink-0 px-6 py-4" style={{ background: "#0b0b0d", borderBottom: "1px solid rgba(255,255,255,0.055)" }}>
        <div className="flex items-center gap-0">
          {STEPS.map(({ n, label, icon: Icon }, i) => {
            const done = step > n;
            const active = step === n;
            return (
              <div key={n} className="flex items-center">
                <button
                  onClick={() => done && setStep(n)}
                  className="flex items-center gap-2.5 rounded-lg px-3 py-2 transition-all"
                  style={{
                    background: active ? "rgba(163,230,53,0.08)" : "transparent",
                    border: active ? "1px solid rgba(163,230,53,0.15)" : "1px solid transparent",
                    cursor: done ? "pointer" : "default",
                  }}
                >
                  <div
                    className="rounded-full flex items-center justify-center shrink-0"
                    style={{
                      width: 26, height: 26,
                      background: done ? LIME : active ? "rgba(163,230,53,0.15)" : "#1a1a1c",
                      border: done ? "none" : active ? `1px solid ${LIME}` : "1px solid rgba(255,255,255,0.1)",
                    }}
                  >
                    {done
                      ? <Check size={13} color="#000" strokeWidth={3} />
                      : <span style={{ fontSize: 11, fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, color: active ? LIME : "#4b5563" }}>{n}</span>
                    }
                  </div>
                  <div>
                    <div style={{ fontSize: 10, color: done ? "#6b7280" : active ? LIME : "#4b5563", letterSpacing: "0.08em", textTransform: "uppercase", fontWeight: 600 }}>
                      Paso {n}
                    </div>
                    <div style={{ fontSize: 12.5, color: done ? "#6b7280" : active ? "#e5e7eb" : "#4b5563", fontWeight: active ? 500 : 400, lineHeight: 1.2 }}>
                      {label}
                    </div>
                  </div>
                </button>
                {i < STEPS.length - 1 && (
                  <div style={{ width: 32, height: 1, background: step > n ? `linear-gradient(90deg, ${LIME}, rgba(163,230,53,0.3))` : "rgba(255,255,255,0.07)", margin: "0 4px" }} />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Step content */}
      <div className="flex-1 overflow-y-auto p-5" style={{ background: "#080809" }}>
        {step === 1 && <Step1 data={data} set={set} />}
        {step === 2 && <Step2 data={data} set={set} />}
        {step === 3 && <Step3 data={data} set={set} />}
        {step === 4 && <Step4 data={data} set={set} />}
        {step === 5 && <Step5 data={data} />}
      </div>

      {/* Footer nav */}
      <div
        className="flex items-center justify-between px-6 py-4 shrink-0"
        style={{ background: "#0b0b0d", borderTop: "1px solid rgba(255,255,255,0.055)" }}
      >
        <div className="flex items-center gap-3">
          <button
            className="rounded-lg px-4 py-2 text-sm transition-all"
            style={{ background: "#141416", border: "1px solid rgba(255,255,255,0.07)", color: "#9ca3af", fontSize: 12 }}
          >
            Guardar borrador
          </button>
          <span style={{ fontSize: 12, color: "#4b5563", fontFamily: "'JetBrains Mono', monospace" }}>
            Paso {step} de {STEPS.length}
          </span>
        </div>
        <div className="flex items-center gap-3">
          {step > 1 && (
            <button
              onClick={() => setStep((s) => s - 1)}
              className="flex items-center gap-2 rounded-lg px-4 py-2.5 transition-all"
              style={{ background: "#141416", border: "1px solid rgba(255,255,255,0.07)", color: "#9ca3af", fontSize: 13 }}
            >
              <ChevronLeft size={14} /> Anterior
            </button>
          )}
          {step < 5 ? (
            <button
              onClick={() => setStep((s) => s + 1)}
              className="flex items-center gap-2 rounded-lg px-5 py-2.5 transition-all"
              style={{ background: LIME, color: "#000", fontSize: 13, fontWeight: 600 }}
            >
              Continuar <ChevronRight size={14} />
            </button>
          ) : (
            <button
              onClick={() => handleSave(data.estado === "Publicado" ? "Publicado" : data.estado)}
              className="flex items-center gap-2 rounded-lg px-6 py-2.5 transition-all"
              style={{ background: LIME, color: "#000", fontSize: 13, fontWeight: 700 }}
            >
              <Zap size={14} /> {data.estado === "Publicado" ? "Publicar evento" : "Guardar evento"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

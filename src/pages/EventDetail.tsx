import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  ArrowLeft, MapPin, Calendar, Clock, Users, Banknote,
  Shield, Target, FileText, Eye, Pencil, Trash2, Send,
  CheckCircle2, XCircle, AlertCircle, ChevronRight,
} from "lucide-react";
import { LIME, LIME_DIM, StatusBadge, formatARS } from "../shared";
import { useEventStore, useFieldStore, useRegistrationStore } from "../stores";
import { Event } from "../types";

export default function EventDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { events, updateEvent, deleteEvent } = useEventStore();
  const { fields } = useFieldStore();
  const { registrations } = useRegistrationStore();
  const [event, setEvent] = useState<Event | null>(null);
  const [openMenu, setOpenMenu] = useState<boolean>(false);

  useEffect(() => {
    if (id) {
      const foundEvent = events.find((e) => e.id === Number(id));
      setEvent(foundEvent || null);
    }
  }, [id, events]);

  if (!event) {
    return (
      <div className="flex-1 flex items-center justify-center" style={{ background: "#080809" }}>
        <div className="text-center">
          <div style={{ fontSize: 48, color: "#1f2023", marginBottom: 16 }}>⚠️</div>
          <div style={{ fontSize: 18, color: "#374151", marginBottom: 8 }}>Evento no encontrado</div>
          <div style={{ fontSize: 13, color: "#4b5563", marginBottom: 16 }}>
            El evento que buscas no existe o ha sido eliminado.
          </div>
          <button
            onClick={() => navigate("/events")}
            className="rounded-lg px-4 py-2 transition-all"
            style={{ background: LIME, color: "#000", fontSize: 13, fontWeight: 600 }}
          >
            Volver a Mis eventos
          </button>
        </div>
      </div>
    );
  }

  const field = fields.find((f) => f.id === event.fieldId);
  const eventRegistrations = registrations.filter((r) => r.event === event.name);
  const confirmedRegistrations = eventRegistrations.filter((r) => r.status === "Confirmada");
  const currentEvent = event;

  function handleDelete() {
    if (window.confirm("¿Estás seguro de que quieres eliminar este evento?")) {
      deleteEvent(currentEvent.id);
      navigate("/events");
    }
  }

  function handleUpdateStatus(newStatus: "Publicado" | "Borrador" | "Finalizado" | "Cancelado") {
    updateEvent(currentEvent.id, { status: newStatus });
  }

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 shrink-0" style={{ borderBottom: "1px solid rgba(255,255,255,0.055)", background: "#0b0b0d" }}>
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/events")}
            className="rounded-lg flex items-center justify-center transition-all"
            style={{ width: 32, height: 32, background: "#141416", border: "1px solid rgba(255,255,255,0.07)", color: "#9ca3af" }}
          >
            <ArrowLeft size={14} />
          </button>
          <div>
            <div style={{ fontSize: 16, fontWeight: 600, color: "#e5e7eb" }}>{event.name}</div>
            <div style={{ fontSize: 11, color: "#6b7280", marginTop: 2 }}>Detalle del evento</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <StatusBadge status={event.status} />
          <div className="relative">
            <button
              onClick={() => setOpenMenu(!openMenu)}
              className="rounded-lg flex items-center justify-center transition-all"
              style={{ width: 32, height: 32, background: openMenu ? "rgba(255,255,255,0.08)" : "transparent", color: "#6b7280", border: "1px solid transparent" }}
            >
              <Pencil size={14} />
            </button>
            {openMenu && (
              <div
                className="absolute right-0 top-full mt-1 rounded-lg py-1 z-50"
                style={{ background: "#161618", border: "1px solid rgba(255,255,255,0.08)", minWidth: 160, boxShadow: "0 4px 12px rgba(0,0,0,0.4)" }}
                onMouseLeave={() => setOpenMenu(false)}
              >
                <button
                  onClick={() => { handleUpdateStatus("Publicado"); setOpenMenu(false); }}
                  className="flex items-center gap-2.5 w-full px-3.5 py-2.5 text-left transition-all"
                  style={{ fontSize: 12.5, color: "#e5e7eb", background: "transparent" }}
                >
                  <CheckCircle2 size={13} style={{ color: LIME }} /> Publicar
                </button>
                <button
                  onClick={() => { handleUpdateStatus("Borrador"); setOpenMenu(false); }}
                  className="flex items-center gap-2.5 w-full px-3.5 py-2.5 text-left transition-all"
                  style={{ fontSize: 12.5, color: "#e5e7eb", background: "transparent" }}
                >
                  <FileText size={13} style={{ color: "#9ca3af" }} /> Borrador
                </button>
                <button
                  onClick={() => { handleUpdateStatus("Finalizado"); setOpenMenu(false); }}
                  className="flex items-center gap-2.5 w-full px-3.5 py-2.5 text-left transition-all"
                  style={{ fontSize: 12.5, color: "#e5e7eb", background: "transparent" }}
                >
                  <CheckCircle2 size={13} style={{ color: "#60a5fa" }} /> Finalizar
                </button>
                <button
                  onClick={() => { handleUpdateStatus("Cancelado"); setOpenMenu(false); }}
                  className="flex items-center gap-2.5 w-full px-3.5 py-2.5 text-left transition-all"
                  style={{ fontSize: 12.5, color: "#e5e7eb", background: "transparent" }}
                >
                  <XCircle size={13} style={{ color: "#f87171" }} /> Cancelar
                </button>
                <div style={{ height: 1, background: "rgba(255,255,255,0.08)", margin: "4px 0" }} />
                <button
                  onClick={handleDelete}
                  className="flex items-center gap-2.5 w-full px-3.5 py-2.5 text-left transition-all"
                  style={{ fontSize: 12.5, color: "#f87171", background: "transparent" }}
                >
                  <Trash2 size={13} /> Eliminar
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-5" style={{ background: "#080809" }}>
        <div className="grid gap-5" style={{ gridTemplateColumns: "1fr 320px" }}>
          {/* Main content */}
          <div className="flex flex-col gap-5">
            {/* Cover image */}
            <div
              className="rounded-xl overflow-hidden relative"
              style={{ height: 200, background: "#1a1a1c" }}
            >
              {event.img && (
                <img src={event.img} alt={event.name} style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.8 }} />
              )}
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.8), transparent 60%)" }} />
              <div style={{ position: "absolute", bottom: 20, left: 20, right: 20 }}>
                <span className="inline-flex rounded px-2 py-0.5 mb-2" style={{ fontSize: 10, fontFamily: "'JetBrains Mono', monospace", background: "rgba(163,230,53,0.2)", color: LIME, border: "1px solid rgba(163,230,53,0.3)" }}>
                  {event.type.toUpperCase()}
                </span>
                <h1 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 32, fontWeight: 700, color: "#fff", letterSpacing: "0.02em", lineHeight: 1 }}>
                  {event.name}
                </h1>
              </div>
            </div>

            {/* Description */}
            <div className="rounded-xl p-5" style={{ background: "#101012", border: "1px solid rgba(255,255,255,0.07)" }}>
              <div style={{ fontSize: 12, color: "#6b7280", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 12 }}>
                Descripción
              </div>
              <p style={{ fontSize: 14, color: "#d1d5db", lineHeight: 1.7 }}>{event.description}</p>
            </div>

            {/* Details grid */}
            <div className="grid grid-cols-4 gap-3">
              {[
                { icon: Calendar, label: "Fecha", value: event.date },
                { icon: Clock, label: "Horario", value: `${event.startTime} – ${event.endTime}` },
                { icon: MapPin, label: "Campo", value: field?.name || event.field },
                { icon: Users, label: "Inscritos", value: `${event.enrolled}/${event.maxCapacity}` },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="rounded-lg p-3" style={{ background: "#141416", border: "1px solid rgba(255,255,255,0.06)" }}>
                  <Icon size={14} style={{ color: LIME, marginBottom: 8 }} strokeWidth={1.5} />
                  <div style={{ fontSize: 11, color: "#6b7280", marginBottom: 4 }}>{label}</div>
                  <div style={{ fontSize: 13, fontWeight: 500, color: "#e5e7eb" }}>{value}</div>
                </div>
              ))}
            </div>

            {/* Additional info */}
            <div className="rounded-xl p-5" style={{ background: "#101012", border: "1px solid rgba(255,255,255,0.07)" }}>
              <div style={{ fontSize: 12, color: "#6b7280", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 12 }}>
                Información adicional
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div style={{ fontSize: 11, color: "#6b7280", marginBottom: 4 }}>Precio por jugador</div>
                  <div style={{ fontSize: 16, fontWeight: 600, color: LIME, fontFamily: "'JetBrains Mono', monospace" }}>
                    {formatARS(event.price)}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: 11, color: "#6b7280", marginBottom: 4 }}>Modalidad</div>
                  <div style={{ fontSize: 14, fontWeight: 500, color: "#e5e7eb" }}>{event.modality}</div>
                </div>
                <div>
                  <div style={{ fontSize: 11, color: "#6b7280", marginBottom: 4 }}>Nivel</div>
                  <div style={{ fontSize: 14, fontWeight: 500, color: "#e5e7eb" }}>{event.level}</div>
                </div>
                <div>
                  <div style={{ fontSize: 11, color: "#6b7280", marginBottom: 4 }}>Ingresos actuales</div>
                  <div style={{ fontSize: 16, fontWeight: 600, color: event.revenue > 0 ? LIME : "#4b5563", fontFamily: "'JetBrains Mono', monospace" }}>
                    {formatARS(event.revenue)}
                  </div>
                </div>
              </div>
            </div>

            {/* Equipment and rules */}
            {event.equipment && event.equipment.length > 0 && (
              <div className="rounded-xl p-5" style={{ background: "#101012", border: "1px solid rgba(255,255,255,0.07)" }}>
                <div style={{ fontSize: 12, color: "#6b7280", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 12 }}>
                  Equipamiento requerido
                </div>
                <div className="flex flex-wrap gap-2">
                  {event.equipment.map((eq) => (
                    <span key={eq} className="rounded-md px-2.5 py-1" style={{ fontSize: 11.5, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", color: "#9ca3af" }}>
                      {eq}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {event.rules && (
              <div className="rounded-xl p-5" style={{ background: "#101012", border: "1px solid rgba(255,255,255,0.07)" }}>
                <div style={{ fontSize: 12, color: "#6b7280", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 12 }}>
                  Reglas
                </div>
                <p style={{ fontSize: 13, color: "#d1d5db", lineHeight: 1.6 }}>{event.rules}</p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="flex flex-col gap-4">
            {/* Field info */}
            {field && (
              <div className="rounded-xl p-4" style={{ background: "#101012", border: "1px solid rgba(255,255,255,0.07)" }}>
                <div style={{ fontSize: 12, color: "#6b7280", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 12 }}>
                  Campo
                </div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="rounded-lg overflow-hidden" style={{ width: 48, height: 32, background: "#1a1a1c" }}>
                    <img src={field.img} alt={field.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 500, color: "#e5e7eb" }}>{field.name}</div>
                    <div style={{ fontSize: 11, color: "#6b7280" }}>{field.city}</div>
                  </div>
                </div>
                <div style={{ fontSize: 11, color: "#6b7280", lineHeight: 1.5 }}>{field.description}</div>
              </div>
            )}

            {/* Capacity */}
            <div className="rounded-xl p-4" style={{ background: "#101012", border: "1px solid rgba(255,255,255,0.07)" }}>
              <div style={{ fontSize: 12, color: "#6b7280", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 12 }}>
                Capacidad
              </div>
              <div className="flex items-center justify-between mb-2">
                <span style={{ fontSize: 24, fontWeight: 700, color: "#fff", fontFamily: "'Barlow Condensed', sans-serif" }}>
                  {event.enrolled}
                </span>
                <span style={{ fontSize: 13, color: "#6b7280" }}>/ {event.maxCapacity}</span>
              </div>
              <div style={{ height: 6, borderRadius: 3, background: "rgba(255,255,255,0.06)", marginBottom: 8 }}>
                <div
                  style={{
                    height: "100%",
                    borderRadius: 3,
                    width: `${(event.enrolled / event.maxCapacity) * 100}%`,
                    background: (event.enrolled / event.maxCapacity) >= 0.9 ? "#ef4444" : (event.enrolled / event.maxCapacity) >= 0.6 ? LIME : "#fbbf24",
                  }}
                />
              </div>
              <div style={{ fontSize: 11, color: "#6b7280", fontFamily: "'JetBrains Mono', monospace" }}>
                {Math.round((event.enrolled / event.maxCapacity) * 100)}% ocupado
              </div>
            </div>

            {/* Registrations */}
            <div className="rounded-xl p-4" style={{ background: "#101012", border: "1px solid rgba(255,255,255,0.07)" }}>
              <div style={{ fontSize: 12, color: "#6b7280", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 12 }}>
                Inscripciones
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span style={{ fontSize: 12, color: "#6b7280" }}>Confirmadas</span>
                  <span style={{ fontSize: 13, fontWeight: 500, color: LIME, fontFamily: "'JetBrains Mono', monospace" }}>
                    {confirmedRegistrations.length}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span style={{ fontSize: 12, color: "#6b7280" }}>Pendientes</span>
                  <span style={{ fontSize: 13, fontWeight: 500, color: "#fbbf24", fontFamily: "'JetBrains Mono', monospace" }}>
                    {eventRegistrations.filter((r) => r.status === "Pendiente").length}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span style={{ fontSize: 12, color: "#6b7280" }}>Total</span>
                  <span style={{ fontSize: 13, fontWeight: 500, color: "#e5e7eb", fontFamily: "'JetBrains Mono', monospace" }}>
                    {eventRegistrations.length}
                  </span>
                </div>
              </div>
              <button
                onClick={() => navigate("/registrations")}
                className="w-full mt-3 rounded-lg py-2 text-center transition-all"
                style={{ background: "rgba(163,230,53,0.1)", border: "1px solid rgba(163,230,53,0.2)", color: LIME, fontSize: 12, fontWeight: 500 }}
              >
                Gestionar inscripciones
              </button>
            </div>

            {/* Actions */}
            <div className="rounded-xl p-4" style={{ background: "#101012", border: "1px solid rgba(255,255,255,0.07)" }}>
              <div style={{ fontSize: 12, color: "#6b7280", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 12 }}>
                Acciones rápidas
              </div>
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => navigate("/registrations")}
                  className="flex items-center gap-2 rounded-lg px-3 py-2 text-left transition-all"
                  style={{ background: "#141416", border: "1px solid rgba(255,255,255,0.07)", color: "#9ca3af", fontSize: 12 }}
                >
                  <Eye size={13} /> Ver inscripciones
                </button>
                <button
                  className="flex items-center gap-2 rounded-lg px-3 py-2 text-left transition-all"
                  style={{ background: "#141416", border: "1px solid rgba(255,255,255,0.07)", color: "#9ca3af", fontSize: 12 }}
                >
                  <Send size={13} /> Enviar anuncio
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Banknote,
  MapPin,
  Shield,
  Target,
  Users,
  CheckCircle2,
  XCircle,
  Ticket,
  UserRound,
  Building2,
  CreditCard,
} from "lucide-react";
import { LIME, StatusBadge, formatARS } from "../shared";
import { useEventStore, useFieldStore, useRegistrationStore, useTeamStore } from "../stores";

export default function EventoDetalle() {
  const navigate = useNavigate();
  const { id } = useParams();
  const eventId = Number(id);
  const { events } = useEventStore();
  const { fields } = useFieldStore();
  const { registrations } = useRegistrationStore();
  const { teams } = useTeamStore();

  const event = useMemo(() => events.find((item) => item.id === eventId) ?? null, [events, eventId]);
  const eventField = useMemo(
    () => fields.find((field) => field.id === event?.fieldId) ?? fields.find((field) => field.name === event?.field) ?? null,
    [fields, event]
  );
  const relatedRegistrations = useMemo(
    () => registrations.filter((registration) => registration.eventId === eventId),
    [registrations, eventId]
  );
  const relatedTeams = useMemo(() => {
    const grouped = new Map<number, { teamName: string; teamId: number; players: string[] }>();

    relatedRegistrations.forEach((registration) => {
      const team = teams.find((item) => item.id === registration.teamId || item.name === registration.team) ?? null;
      const teamKey = team?.id ?? registration.teamId ?? registration.team;
      const teamName = team?.name ?? registration.team;

      const existing = grouped.get(Number(teamKey) || teamName);
      if (existing) {
        if (!existing.players.includes(registration.player)) existing.players.push(registration.player);
        return;
      }

      grouped.set(Number(teamKey) || teamName, {
        teamId: team?.id ?? registration.teamId ?? 0,
        teamName,
        players: [registration.player],
      });
    });

    return Array.from(grouped.values());
  }, [relatedRegistrations, teams]);

  if (!event) {
    return (
      <div className="flex-1 flex items-center justify-center" style={{ background: "#080809", color: "#e5e7eb" }}>
        <div className="text-center">
          <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 28, fontWeight: 700, letterSpacing: "0.04em", color: "#fff" }}>Evento no encontrado</div>
          <button
            onClick={() => navigate("/events")}
            className="mt-5 rounded-lg px-4 py-2"
            style={{ background: LIME, color: "#000", fontWeight: 600 }}
          >
            Volver a Mis eventos
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto p-5" style={{ background: "#080809" }}>
      <div className="mx-auto max-w-5xl">
        <div className="mb-4 flex items-center justify-between">
          <button
            onClick={() => navigate("/events")}
            className="flex items-center gap-2 rounded-lg px-3 py-2"
            style={{ background: "#141416", border: "1px solid rgba(255,255,255,0.07)", color: "#9ca3af" }}
          >
            <ArrowLeft size={14} /> Volver a Mis eventos
          </button>
          <StatusBadge status={event.status} />
        </div>

        <div className="overflow-hidden rounded-xl" style={{ background: "#101012", border: "1px solid rgba(255,255,255,0.07)" }}>
          <div className="relative p-6" style={{ minHeight: 220, background: "#1a1a1c" }}>
            {event.img && <img src={event.img} alt={event.name} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.7 }} />}
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.8), transparent 60%)" }} />
            <div style={{ position: "relative", zIndex: 1 }}>
              <span className="inline-flex rounded px-2 py-1 mb-3" style={{ background: "rgba(163,230,53,0.15)", border: "1px solid rgba(163,230,53,0.25)", color: LIME, fontSize: 10, fontFamily: "'JetBrains Mono', monospace" }}>
                {event.modality.toUpperCase()}
              </span>
              <h1 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 38, fontWeight: 700, color: "#fff", letterSpacing: "0.04em", lineHeight: 1 }}>{event.name}</h1>
              <div className="mt-3 flex flex-wrap items-center gap-4" style={{ color: "#d1d5db", fontSize: 13 }}>
                <span className="flex items-center gap-2"><Calendar size={14} /> {event.date}</span>
                <span className="flex items-center gap-2"><Clock size={14} /> {event.startTime} – {event.endTime}</span>
                <span className="flex items-center gap-2"><MapPin size={14} /> {event.field}, {event.city}</span>
              </div>
            </div>
          </div>

          <div className="grid gap-5 p-6 md:grid-cols-3">
            <div className="rounded-xl p-4" style={{ background: "#141416", border: "1px solid rgba(255,255,255,0.07)" }}>
              <div style={{ fontSize: 11, color: "#6b7280", letterSpacing: "0.08em", textTransform: "uppercase" }}>Precio</div>
              <div className="mt-2 flex items-center gap-2" style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 30, fontWeight: 700, color: "#fff" }}>
                <Banknote size={18} style={{ color: LIME }} /> {formatARS(event.price)}
              </div>
              <div style={{ marginTop: 6, fontSize: 12, color: "#9ca3af" }}>Por participante</div>
            </div>

            <div className="rounded-xl p-4" style={{ background: "#141416", border: "1px solid rgba(255,255,255,0.07)" }}>
              <div style={{ fontSize: 11, color: "#6b7280", letterSpacing: "0.08em", textTransform: "uppercase" }}>Capacidad</div>
              <div className="mt-2 flex items-center gap-2" style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 30, fontWeight: 700, color: "#fff" }}>
                <Users size={18} style={{ color: LIME }} /> {event.maxCapacity}
              </div>
              <div style={{ marginTop: 6, fontSize: 12, color: "#9ca3af" }}>{event.enrolled} inscritos / {event.maxCapacity} plazas</div>
            </div>

            <div className="rounded-xl p-4" style={{ background: "#141416", border: "1px solid rgba(255,255,255,0.07)" }}>
              <div style={{ fontSize: 11, color: "#6b7280", letterSpacing: "0.08em", textTransform: "uppercase" }}>Estado</div>
              <div className="mt-2 flex items-center gap-2" style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 30, fontWeight: 700, color: "#fff" }}>
                {event.status === "Publicado" ? <CheckCircle2 size={18} style={{ color: LIME }} /> : <XCircle size={18} style={{ color: "#f87171" }} />}
                {event.status}
              </div>
              <div style={{ marginTop: 6, fontSize: 12, color: "#9ca3af" }}>Presupuesto estimado: {formatARS(event.revenue)}</div>
            </div>
          </div>

          <div className="grid gap-5 p-6 pt-0 md:grid-cols-2">
            <div className="rounded-xl p-5" style={{ background: "#141416", border: "1px solid rgba(255,255,255,0.07)" }}>
              <div className="mb-3 flex items-center gap-2" style={{ color: LIME, fontWeight: 600 }}>
                <Shield size={16} /> Detalles del evento
              </div>
              <p style={{ color: "#9ca3af", lineHeight: 1.7 }}>{event.description}</p>

              <div className="mt-4 space-y-3" style={{ fontSize: 13, color: "#d1d5db" }}>
                <div className="flex items-center justify-between"><span style={{ color: "#6b7280" }}>Modalidad</span><strong>{event.modality}</strong></div>
                <div className="flex items-center justify-between"><span style={{ color: "#6b7280" }}>Nivel</span><strong>{event.level}</strong></div>
                <div className="flex items-center justify-between"><span style={{ color: "#6b7280" }}>Mín. jugadores</span><strong>{event.minPlayers}</strong></div>
                <div className="flex items-center justify-between"><span style={{ color: "#6b7280" }}>Campo</span><strong>{event.field}</strong></div>
              </div>
            </div>

            <div className="rounded-xl p-5" style={{ background: "#141416", border: "1px solid rgba(255,255,255,0.07)" }}>
              <div className="mb-3 flex items-center gap-2" style={{ color: LIME, fontWeight: 600 }}>
                <Target size={16} /> Reglas y logística
              </div>
              <div style={{ color: "#9ca3af", lineHeight: 1.7 }}>
                <p>{event.rules || "Sin reglas definidas."}</p>
                {event.additionalInfo && <p className="mt-3">{event.additionalInfo}</p>}
              </div>
              {event.equipment.length > 0 && (
                <div className="mt-4">
                  <div style={{ fontSize: 12, color: "#6b7280", marginBottom: 8 }}>Equipo recomendado</div>
                  <div className="flex flex-wrap gap-2">
                    {event.equipment.map((item) => (
                      <span key={item} className="rounded-md px-2 py-1" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", color: "#d1d5db", fontSize: 11.5 }}>{item}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="grid gap-5 p-6 pt-0 lg:grid-cols-[1.1fr_1.4fr]">
            <div className="rounded-xl p-5" style={{ background: "#141416", border: "1px solid rgba(255,255,255,0.07)" }}>
              <div className="mb-3 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2" style={{ color: LIME, fontWeight: 600 }}>
                  <MapPin size={16} /> Campo relacionado
                </div>
                <button
                  onClick={() => navigate("/fields")}
                  className="rounded-lg px-2.5 py-1.5"
                  style={{ background: "rgba(163,230,53,0.08)", border: "1px solid rgba(163,230,53,0.2)", color: LIME, fontSize: 11.5 }}
                >
                  Ver campo
                </button>
              </div>

              {eventField ? (
                <div className="space-y-3">
                  <div>
                    <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 26, fontWeight: 700, color: "#fff", letterSpacing: "0.03em" }}>{eventField.name}</div>
                    <div className="mt-1 flex items-center gap-2 text-sm" style={{ color: "#9ca3af" }}>
                      <MapPin size={12} /> {eventField.location}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs" style={{ color: "#9ca3af" }}>
                    <div className="rounded-lg p-2.5" style={{ background: "#101012", border: "1px solid rgba(255,255,255,0.05)" }}>
                      <div style={{ color: "#6b7280" }}>Localidad</div>
                      <div className="mt-1 font-medium" style={{ color: "#e5e7eb" }}>{eventField.city}</div>
                    </div>
                    <div className="rounded-lg p-2.5" style={{ background: "#101012", border: "1px solid rgba(255,255,255,0.05)" }}>
                      <div style={{ color: "#6b7280" }}>Capacidad</div>
                      <div className="mt-1 font-medium" style={{ color: "#e5e7eb" }}>{eventField.capacity} jugadores</div>
                    </div>
                  </div>

                  <p style={{ color: "#9ca3af", lineHeight: 1.6, fontSize: 12.5 }}>{eventField.description}</p>
                </div>
              ) : (
                <div style={{ color: "#9ca3af", fontSize: 12.5 }}>No hay información de campo asociada a este evento.</div>
              )}
            </div>

            <div className="rounded-xl p-5" style={{ background: "#141416", border: "1px solid rgba(255,255,255,0.07)" }}>
              <div className="mb-3 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2" style={{ color: LIME, fontWeight: 600 }}>
                  <Ticket size={16} /> Inscripciones del evento
                </div>
                <button
                  onClick={() => navigate("/registrations")}
                  className="rounded-lg px-2.5 py-1.5"
                  style={{ background: "rgba(163,230,53,0.08)", border: "1px solid rgba(163,230,53,0.2)", color: LIME, fontSize: 11.5 }}
                >
                  Ver inscripciones
                </button>
              </div>

              <div className="space-y-2">
                {relatedRegistrations.length > 0 ? relatedRegistrations.slice(0, 6).map((registration) => (
                  <div key={registration.id} className="flex items-center justify-between gap-3 rounded-lg p-3" style={{ background: "#101012", border: "1px solid rgba(255,255,255,0.05)" }}>
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="flex items-center justify-center rounded-full" style={{ width: 28, height: 28, background: `${registration.avatarColor}22`, border: `1px solid ${registration.avatarColor}44`, color: registration.avatarColor, fontSize: 10, fontWeight: 700 }}>
                        {registration.initials}
                      </div>
                      <div className="min-w-0">
                        <div style={{ fontSize: 12.5, fontWeight: 600, color: "#e5e7eb", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{registration.player}</div>
                        <div style={{ fontSize: 11, color: "#6b7280" }}>{registration.team}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="rounded px-1.5 py-0.5" style={{ background: registration.status === "Confirmada" ? "rgba(163,230,53,0.1)" : registration.status === "Pendiente" ? "rgba(251,191,36,0.1)" : "rgba(248,113,113,0.08)", color: registration.status === "Confirmada" ? LIME : registration.status === "Pendiente" ? "#fbbf24" : "#f87171", fontSize: 10.5 }}>
                        {registration.status}
                      </span>
                      <span className="rounded px-1.5 py-0.5" style={{ background: registration.paymentStatus === "Pagado" ? "rgba(163,230,53,0.1)" : "rgba(255,255,255,0.05)", color: registration.paymentStatus === "Pagado" ? LIME : "#9ca3af", fontSize: 10.5 }}>
                        {registration.paymentStatus}
                      </span>
                    </div>
                  </div>
                )) : (
                  <div style={{ color: "#9ca3af", fontSize: 12.5 }}>Todavía no hay inscripciones para este evento.</div>
                )}
              </div>
            </div>
          </div>

          <div className="p-6 pt-0">
            <div className="rounded-xl p-5" style={{ background: "#141416", border: "1px solid rgba(255,255,255,0.07)" }}>
              <div className="mb-4 flex items-center gap-2" style={{ color: LIME, fontWeight: 600 }}>
                <Users size={16} /> Equipos y participantes
              </div>

              <div className="grid gap-3 md:grid-cols-2">
                {relatedTeams.length > 0 ? relatedTeams.map((team) => (
                  <div key={team.teamName} className="rounded-xl p-4" style={{ background: "#101012", border: "1px solid rgba(255,255,255,0.05)" }}>
                    <div className="mb-3 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Building2 size={14} style={{ color: LIME }} />
                        <span style={{ fontWeight: 600, color: "#e5e7eb", fontSize: 13 }}>{team.teamName}</span>
                      </div>
                      <span style={{ color: "#6b7280", fontSize: 11 }}>{team.players.length} participantes</span>
                    </div>
                    <div className="space-y-2">
                      {team.players.map((player) => (
                        <div key={player} className="flex items-center gap-2.5 rounded-lg px-2.5 py-2" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.04)" }}>
                          <UserRound size={12} style={{ color: LIME }} />
                          <span style={{ fontSize: 12.5, color: "#d1d5db" }}>{player}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )) : (
                  <div style={{ color: "#9ca3af", fontSize: 12.5 }}>Todavía no hay equipos asociados a este evento.</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

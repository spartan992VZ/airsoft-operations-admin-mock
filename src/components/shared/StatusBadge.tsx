import { LIME } from "../../shared";

export function StatusBadge({ status }: { status: string }) {
  const cfg: Record<string, { bg: string; text: string }> = {
    Publicado: { bg: "rgba(163,230,53,0.12)", text: LIME },
    Borrador: { bg: "rgba(100,100,100,0.18)", text: "#9ca3af" },
    Finalizado: { bg: "rgba(96,165,250,0.12)", text: "#60a5fa" },
    Cancelado: { bg: "rgba(248,113,113,0.12)", text: "#f87171" },
    Confirmada: { bg: "rgba(163,230,53,0.12)", text: LIME },
    Pendiente: { bg: "rgba(251,191,36,0.12)", text: "#fbbf24" },
    Activo: { bg: "rgba(163,230,53,0.12)", text: LIME },
    Inactivo: { bg: "rgba(100,100,100,0.18)", text: "#9ca3af" },
    Mantenimiento: { bg: "rgba(251,191,36,0.12)", text: "#fbbf24" },
    Disponible: { bg: "rgba(163,230,53,0.12)", text: LIME },
    Reservado: { bg: "rgba(251,191,36,0.12)", text: "#fbbf24" },
    "Ocupado por evento": { bg: "rgba(248,113,113,0.12)", text: "#f87171" },
    Pagado: { bg: "rgba(163,230,53,0.08)", text: LIME },
    Reembolsado: { bg: "rgba(96,165,250,0.1)", text: "#60a5fa" },
    Exento: { bg: "rgba(167,139,250,0.1)", text: "#a78bfa" },
    Rechazada: { bg: "rgba(248,113,113,0.1)", text: "#f87171" },
  };
  const c = cfg[status] ?? { bg: "rgba(100,100,100,0.18)", text: "#9ca3af" };
  return (
    <span
      className="px-2 py-0.5 rounded text-xs font-medium"
      style={{
        background: c.bg,
        color: c.text,
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 11,
        whiteSpace: "nowrap",
      }}
    >
      {status}
    </span>
  );
}

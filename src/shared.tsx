export const LIME = "#a3e635";
export const LIME_DIM = "#84cc16";

export const NAV_ITEMS = [
  { label: "Dashboard" },
  { label: "Mis eventos" },
  { label: "Crear evento" },
  { label: "Inscripciones" },
  { label: "Equipos" },
  { label: "Campos" },
  { label: "Mensajes", badge: 5 },
  { label: "Reportes" },
  { label: "Estadísticas" },
  { label: "Configuración" },
];

export function StatusBadge({ status }: { status: string }) {
  const cfg: Record<string, { bg: string; text: string }> = {
    Publicado: { bg: "rgba(163,230,53,0.12)", text: LIME },
    Borrador: { bg: "rgba(100,100,100,0.18)", text: "#9ca3af" },
    Finalizado: { bg: "rgba(96,165,250,0.12)", text: "#60a5fa" },
    Cancelado: { bg: "rgba(248,113,113,0.12)", text: "#f87171" },
    Confirmada: { bg: "rgba(163,230,53,0.12)", text: LIME },
    Pendiente: { bg: "rgba(251,191,36,0.12)", text: "#fbbf24" },
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

export const CHART_TOOLTIP = {
  contentStyle: {
    background: "#161618",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: 6,
    padding: "8px 12px",
    fontSize: 12,
    fontFamily: "'JetBrains Mono', monospace",
    color: "#e5e7eb",
  },
  itemStyle: { color: "#e5e7eb" },
  labelStyle: { color: "#6b7280", marginBottom: 2 },
  cursor: { stroke: "rgba(163,230,53,0.1)" },
};

export const CARD = {
  background: "#101012",
  border: "1px solid rgba(255,255,255,0.07)",
};

export const CARD_HEADER: React.CSSProperties = {
  borderBottom: "1px solid rgba(255,255,255,0.055)",
};

export function CardHeader({
  title,
  action,
}: {
  title: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between px-4 py-3" style={CARD_HEADER}>
      <h2
        style={{
          fontFamily: "'Barlow Condensed', sans-serif",
          fontSize: 15,
          fontWeight: 600,
          letterSpacing: "0.04em",
          color: "#e5e7eb",
        }}
      >
        {title}
      </h2>
      {action}
    </div>
  );
}

export function LimeButton({
  children,
  onClick,
  small,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  small?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-1.5 rounded-md font-medium transition-all"
      style={{
        background: LIME,
        color: "#000",
        fontSize: small ? 11 : 13,
        padding: small ? "4px 10px" : "7px 14px",
        fontWeight: 600,
        letterSpacing: "0.01em",
      }}
    >
      {children}
    </button>
  );
}

export function GhostButton({
  children,
  onClick,
  active,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  active?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-1.5 rounded-md transition-all"
      style={{
        background: active ? "rgba(163,230,53,0.1)" : "#141416",
        border: active ? "1px solid rgba(163,230,53,0.2)" : "1px solid rgba(255,255,255,0.07)",
        color: active ? LIME : "#9ca3af",
        fontSize: 12,
        padding: "6px 12px",
        fontWeight: active ? 500 : 400,
      }}
    >
      {children}
    </button>
  );
}

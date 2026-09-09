import { LIME } from "../../shared";

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

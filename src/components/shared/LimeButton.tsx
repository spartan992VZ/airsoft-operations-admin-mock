import { LIME } from "../../shared";

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

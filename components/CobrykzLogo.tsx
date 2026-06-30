type LogoVariant = "default" | "reversed" | "cover";

interface CobrykzLogoProps {
  size?: number;
  variant?: LogoVariant;
  showWordmark?: boolean;
  wordmarkSize?: "sm" | "md" | "lg";
  className?: string;
}

const fills: Record<LogoVariant, { squares: string; blue: string }> = {
  default: { squares: "#0F172A", blue: "#2563EB" },
  reversed: { squares: "rgba(248,250,252,0.22)", blue: "#2563EB" },
  cover: { squares: "rgba(248,250,252,0.18)", blue: "#2563EB" },
};

const wordmarkSizes = { sm: "text-sm", md: "text-xl", lg: "text-2xl" };
const wordmarkColors: Record<LogoVariant, string> = {
  default: "text-navy",
  reversed: "text-[#F8FAFC]",
  cover: "text-[#F8FAFC]",
};

export default function CobrykzLogo({
  size = 32,
  variant = "default",
  showWordmark = false,
  wordmarkSize = "md",
  className = "",
}: CobrykzLogoProps) {
  const { squares, blue } = fills[variant];

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="COBRYKZ mark"
        role="img"
      >
        <rect x="4" y="4" width="22" height="22" rx="4" fill={squares} />
        <rect x="31" y="31" width="22" height="22" rx="4" fill={squares} />
        <rect x="58" y="58" width="22" height="22" rx="4" fill={squares} />
        <rect x="64" y="4" width="22" height="22" rx="4" fill={blue} />
      </svg>
      {showWordmark && (
        <span
          className={`font-extrabold tracking-[0.07em] ${wordmarkSizes[wordmarkSize]} ${wordmarkColors[variant]}`}
        >
          COBRYKZ
        </span>
      )}
    </div>
  );
}

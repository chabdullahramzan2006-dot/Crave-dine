import { cn } from "@/lib/utils";

type CraveLogoProps = {
  className?: string;
  variant?: "light" | "dark";
  showTagline?: boolean;
  size?: "sm" | "md" | "lg";
};

export default function CraveLogo({
  className,
  variant = "dark",
  showTagline = false,
  size = "md",
}: CraveLogoProps) {
  const onDark = variant === "light";
  const mark =
    size === "sm" ? "h-9 w-9 text-[10px]" : size === "lg" ? "h-14 w-14 text-sm" : "h-11 w-11 text-[11px]";
  const title =
    size === "sm"
      ? "text-base"
      : size === "lg"
        ? "text-3xl"
        : "text-[1.35rem] sm:text-[1.5rem]";

  return (
    <span className={cn("inline-flex items-center gap-3", className)}>
      <span
        className={cn(
          "relative flex shrink-0 items-center justify-center rounded-full font-extrabold tracking-[0.12em]",
          mark,
          onDark
            ? "bg-cd-yellow text-cd-ink shadow-[0_8px_24px_rgba(245,197,24,0.28)]"
            : "bg-cd-red text-cd-yellow shadow-[0_8px_24px_rgba(155,28,28,0.25)]"
        )}
        aria-hidden
      >
        <svg viewBox="0 0 48 48" className="absolute inset-0 h-full w-full p-2.5 opacity-95">
          <circle
            cx="24"
            cy="24"
            r="15"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
          />
          <path
            d="M15 28c3-7 6.5-11 9-11s6 4 9 11"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          <circle cx="19" cy="22" r="1.4" fill="currentColor" />
          <circle cx="24" cy="19.5" r="1.4" fill="currentColor" />
          <circle cx="29" cy="22" r="1.4" fill="currentColor" />
        </svg>
      </span>

      <span className="leading-none">
        <span
          className={cn(
            "font-display block tracking-[0.04em]",
            title,
            onDark ? "text-white" : "text-cd-ink"
          )}
        >
          CRAVE{" "}
          <span className={onDark ? "text-cd-yellow" : "text-cd-red"}>DINE</span>
        </span>
        {showTagline && (
          <span
            className={cn(
              "mt-1 block text-[10px] font-semibold uppercase tracking-[0.22em]",
              onDark ? "text-white/65" : "text-cd-muted"
            )}
          >
            Your Taste, Our Passion
          </span>
        )}
      </span>
    </span>
  );
}

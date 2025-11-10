// components/landing/glass-card.jsx
import { cn } from "@/lib/utils";

export function GlassCard({ children, className, ...props }) {
  return (
    <div
      className={cn(
        "relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl",
        "shadow-2xl shadow-black/50",
        className
      )}
      {...props}
    >
      {children}
      {/* Inner glow */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
    </div>
  );
}

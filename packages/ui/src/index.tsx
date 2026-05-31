import * as React from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export function buttonVariants(options: { variant?: "primary" | "secondary" | "ghost"; size?: "sm" | "md" } = {}) {
  const variant = options.variant ?? "primary";
  const size = options.size ?? "md";

  return cn(
    "inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#09090B] disabled:pointer-events-none disabled:opacity-50",
    size === "sm" ? "h-9 px-3 text-sm" : "h-11 px-5 text-sm",
    variant === "primary" && "bg-blue-500 text-white hover:bg-blue-400",
    variant === "secondary" && "border border-zinc-800 bg-zinc-950 text-zinc-100 hover:bg-zinc-900",
    variant === "ghost" && "text-zinc-300 hover:bg-zinc-900 hover:text-white"
  );
}

export function Badge({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-zinc-800 bg-zinc-950 px-3 py-1 text-xs font-medium text-zinc-300",
        className
      )}
      {...props}
    />
  );
}

export function Card({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("rounded-lg border border-zinc-800 bg-[#111111] shadow-[0_1px_0_rgba(255,255,255,0.04)_inset]", className)}
      {...props}
    />
  );
}

export function SectionLabel({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      className={cn("font-mono text-xs uppercase text-blue-400", className)}
      {...props}
    />
  );
}

import { MouseEvent, ReactNode, useRef } from "react";
import { cn } from "@/shared/lib/utils";

interface SpotlightCardProps {
  children: ReactNode;
  className?: string;
}

export const SpotlightCard = ({ children, className }: SpotlightCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const updateSpotlight = (event: MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const bounds = card.getBoundingClientRect();
    card.style.setProperty("--spotlight-x", `${event.clientX - bounds.left}px`);
    card.style.setProperty("--spotlight-y", `${event.clientY - bounds.top}px`);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={updateSpotlight}
      className={cn("spotlight-card relative h-full", className)}
    >
      {children}
    </div>
  );
};
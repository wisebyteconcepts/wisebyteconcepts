// Map icon names to Lucide icon components
import {
    Palette,
    Layout,
    PenTool,
    Smartphone,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
    "Palette": Palette,
    "Layout": Layout,
    "PenTool": PenTool,
    "Smartphone": Smartphone,
};

export const getServiceIcon = (iconName?: string): LucideIcon | null => {
    if (!iconName) return null;
    return iconMap[iconName] || null;
};

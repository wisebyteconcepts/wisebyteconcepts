// src/features/data/data.types.ts

export interface Service {
    id: string;
    iconName?: string; // e.g., "Palette", "Layout", "PenTool", "Smartphone"
    title: string;
    description: string;
    fullDescription: string;
    screenshot: string | null;
    color: string; // gradient like "from-purple-500/20 to-pink-500/20"
    features: string[];
    process: string[];
}

export interface Product {
    id: string;
    tag: string;
    title: string;
    desc: string;
    url: string | null;
    color: string;
    screenshot: string | null;
    fullDescription: string;
    challenges: string[];
    solutions: string[];
    technologies: string[];
    results: string[];
}

export interface Skill {
    id: string;
    name: string;
    category: string;
    level: number; // 0-100
    icon?: string | null;
}

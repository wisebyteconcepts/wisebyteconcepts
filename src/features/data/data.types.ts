// src/features/data/data.types.ts

import { LucideIcon } from "lucide-react";

export interface Service {
    id: string;
    icon?: LucideIcon;
    title: string;
    description: string;
    fullDescription: string;
    screenshot: string | null;
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

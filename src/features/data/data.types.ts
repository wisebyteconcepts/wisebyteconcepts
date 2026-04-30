// src/features/data/data.types.ts

export interface ServicePricing {
    /** "fixed" | "hourly" | "starting_at" | "custom" */
    model: "fixed" | "hourly" | "starting_at" | "custom";
    amount?: number | null;
    currency?: string; // e.g. "USD", "INR"
    note?: string;     // e.g. "per project"
}

export interface ServiceCTA {
    label: string;
    url: string;
}

export interface ServiceSEO {
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string[];
    ogImage?: string | null;
}

export interface Service {
    // Identity
    id: string;
    slug: string;

    // Content layer
    name: string;
    caption: string;
    header: string;
    shortDescription: string;
    fullDescription: string;

    // Media
    thumbnail: string | null;
    bannerImage: string | null;
    gallery: string[];

    // Organization
    category: string;
    tags: string[];

    // Value definition
    features: string[];
    deliverables: string[];

    // Commercial
    pricing: ServicePricing;
    estimatedDuration: string; // e.g. "2–4 weeks"

    // Technical
    technologies: string[];

    // Portfolio integration — references product ids
    relatedProjects: string[];

    // Conversion
    cta: ServiceCTA;

    // SEO
    seo: ServiceSEO;

    // Control
    isActive: boolean;
    isFeatured: boolean;
    order: number;

    // Visual + icon (kept for existing UI)
    iconName?: string;
    color: string; // gradient classes

    // Legacy/aliases (kept optional so older stored data still works)
    /** @deprecated use `name` or `header` */
    title?: string;
    /** @deprecated use `shortDescription` */
    description?: string;
    /** @deprecated use `bannerImage` or `thumbnail` */
    screenshot?: string | null;
    /** @deprecated process steps moved out of core schema */
    process?: string[];
}

export interface Product {
    id: string;
    tag: string;
    title: string;
    desc: string;
    url: string | null;
    color: string;
    screenshot: string | null;
    screenshots?: string[];
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

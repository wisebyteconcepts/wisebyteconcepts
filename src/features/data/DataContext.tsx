// src/features/data/DataContext.tsx

import { createContext, useContext, useEffect, useState } from "react";
import { defaultServices, defaultProducts, defaultSkills } from "./data.defaults";
import type { Service, Product, Skill } from "./data.types";

/** Upgrade legacy services from older shape to the current Service schema. */
const migrateService = (raw: any): Service => {
    const name = raw.name ?? raw.title ?? "Untitled";
    const shortDescription = raw.shortDescription ?? raw.description ?? "";
    const slug = raw.slug ?? raw.id;
    return {
        id: raw.id,
        slug,
        name,
        caption: raw.caption ?? shortDescription,
        header: raw.header ?? name,
        shortDescription,
        fullDescription: raw.fullDescription ?? "",
        thumbnail: raw.thumbnail ?? raw.screenshot ?? null,
        bannerImage: raw.bannerImage ?? raw.screenshot ?? null,
        gallery: raw.gallery ?? [],
        category: raw.category ?? "General",
        tags: raw.tags ?? [],
        features: raw.features ?? [],
        deliverables: raw.deliverables ?? [],
        pricing: raw.pricing ?? { model: "custom", note: "Contact for quote" },
        estimatedDuration: raw.estimatedDuration ?? "Flexible",
        technologies: raw.technologies ?? [],
        relatedProjects: raw.relatedProjects ?? [],
        cta: raw.cta ?? { label: "Schedule a consultation", url: "/contact" },
        seo: raw.seo ?? {},
        isActive: raw.isActive ?? true,
        isFeatured: raw.isFeatured ?? false,
        order: raw.order ?? 0,
        iconName: raw.iconName,
        color: raw.color ?? "from-blue-500/20 to-cyan-500/20",
        title: name,
        description: shortDescription,
        screenshot: raw.bannerImage ?? raw.screenshot ?? raw.thumbnail ?? null,
        process: raw.process,
    };
};

interface DataContextType {
    services: Service[];
    products: Product[];
    skills: Skill[];

    addService: (service: Service) => void;
    updateService: (id: string, service: Partial<Service>) => void;
    deleteService: (id: string) => void;

    addProduct: (product: Product) => void;
    updateProduct: (id: string, product: Partial<Product>) => void;
    deleteProduct: (id: string) => void;

    addSkill: (skill: Skill) => void;
    updateSkill: (id: string, skill: Partial<Skill>) => void;
    deleteSkill: (id: string) => void;

    resetToDefaults: () => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

const loadStored = <T,>(key: string, fallback: T, transform?: (raw: any) => T): T => {
    if (typeof window === "undefined") return fallback;
    try {
        const raw = localStorage.getItem(key);
        if (!raw) return fallback;
        const parsed = JSON.parse(raw);
        return transform ? transform(parsed) : (parsed as T);
    } catch {
        return fallback;
    }
};

export const DataProvider = ({ children }: { children: React.ReactNode }) => {
    const [services, setServices] = useState<Service[]>(() =>
        loadStored<Service[]>("services", defaultServices, (parsed) =>
            Array.isArray(parsed) ? parsed.map(migrateService) : defaultServices,
        ),
    );
    const [products, setProducts] = useState<Product[]>(() =>
        loadStored<Product[]>("products", defaultProducts),
    );
    const [skills, setSkills] = useState<Skill[]>(() =>
        loadStored<Skill[]>("skills", defaultSkills),
    );

    useEffect(() => {
        localStorage.setItem("services", JSON.stringify(services));
    }, [services]);

    useEffect(() => {
        localStorage.setItem("products", JSON.stringify(products));
    }, [products]);

    useEffect(() => {
        localStorage.setItem("skills", JSON.stringify(skills));
    }, [skills]);

    const value: DataContextType = {
        services,
        products,
        skills,

        addService: (s) => setServices((prev) => [...prev, s]),
        updateService: (id, data) =>
            setServices((prev) => prev.map((s) => (s.id === id ? { ...s, ...data } : s))),
        deleteService: (id) => setServices((prev) => prev.filter((s) => s.id !== id)),

        addProduct: (p) => setProducts((prev) => [...prev, p]),
        updateProduct: (id, data) =>
            setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, ...data } : p))),
        deleteProduct: (id) => setProducts((prev) => prev.filter((p) => p.id !== id)),

        addSkill: (s) => setSkills((prev) => [...prev, s]),
        updateSkill: (id, data) =>
            setSkills((prev) => prev.map((s) => (s.id === id ? { ...s, ...data } : s))),
        deleteSkill: (id) => setSkills((prev) => prev.filter((s) => s.id !== id)),

        resetToDefaults: () => {
            setServices(defaultServices);
            setProducts(defaultProducts);
            setSkills(defaultSkills);
            localStorage.removeItem("services");
            localStorage.removeItem("products");
            localStorage.removeItem("skills");
        },
    };

    return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export const useData = () => {
    const ctx = useContext(DataContext);
    if (!ctx) throw new Error("useData must be used within DataProvider");
    return ctx;
};

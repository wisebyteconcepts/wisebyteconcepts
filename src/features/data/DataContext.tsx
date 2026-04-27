// src/features/data/DataContext.tsx

import { createContext, useContext, useEffect, useState } from "react";
import { defaultServices, defaultProducts, defaultSkills } from "./data.defaults";
import type { Service, Product, Skill } from "./data.types";

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

export const DataProvider = ({ children }: { children: React.ReactNode }) => {
    const [services, setServices] = useState<Service[]>(defaultServices);
    const [products, setProducts] = useState<Product[]>(defaultProducts);
    const [skills, setSkills] = useState<Skill[]>(defaultSkills);

    useEffect(() => {
        const storedServices = localStorage.getItem("services");
        const storedProducts = localStorage.getItem("products");
        const storedSkills = localStorage.getItem("skills");

        if (storedServices) setServices(JSON.parse(storedServices));
        if (storedProducts) setProducts(JSON.parse(storedProducts));
        if (storedSkills) setSkills(JSON.parse(storedSkills));
    }, []);

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

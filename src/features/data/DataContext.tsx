// src/features/data/DataContext.tsx

import { createContext, useContext, useEffect, useState } from "react";
import { defaultServices, defaultProducts } from "./data.defaults";
import type { Service, Product } from "./data.types";

interface DataContextType {
    services: Service[];
    products: Product[];
    addService: (service: Service) => void;
    updateService: (id: string, service: Partial<Service>) => void;
    deleteService: (id: string) => void;
    addProduct: (product: Product) => void;
    updateProduct: (id: string, product: Partial<Product>) => void;
    deleteProduct: (id: string) => void;
    resetToDefaults: () => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider = ({ children }: { children: React.ReactNode }) => {
    const [services, setServices] = useState<Service[]>(defaultServices);
    const [products, setProducts] = useState<Product[]>(defaultProducts);

    useEffect(() => {
        const storedServices = localStorage.getItem("services");
        const storedProducts = localStorage.getItem("products");

        if (storedServices) setServices(JSON.parse(storedServices));
        if (storedProducts) setProducts(JSON.parse(storedProducts));
    }, []);

    useEffect(() => {
        localStorage.setItem("services", JSON.stringify(services));
    }, [services]);

    useEffect(() => {
        localStorage.setItem("products", JSON.stringify(products));
    }, [products]);

    const value: DataContextType = {
        services,
        products,
        addService: (s) => setServices((prev) => [...prev, s]),
        updateService: (id, data) =>
            setServices((prev) => prev.map((s) => (s.id === id ? { ...s, ...data } : s))),
        deleteService: (id) =>
            setServices((prev) => prev.filter((s) => s.id !== id)),

        addProduct: (p) => setProducts((prev) => [...prev, p]),
        updateProduct: (id, data) =>
            setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, ...data } : p))),
        deleteProduct: (id) =>
            setProducts((prev) => prev.filter((p) => p.id !== id)),

        resetToDefaults: () => {
            setServices(defaultServices);
            setProducts(defaultProducts);
            localStorage.removeItem("services");
            localStorage.removeItem("products");
        },
    };

    return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export const useData = () => {
    const ctx = useContext(DataContext);
    if (!ctx) throw new Error("useData must be used within DataProvider");
    return ctx;
};
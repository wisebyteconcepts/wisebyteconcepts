// src/features/data/data.defaults.ts

import { Palette, Layout, PenTool, Smartphone } from "lucide-react";
import type { Service, Product } from "./data.types";



export const defaultServices: Service[] = [
    {
        id: "graphic-design",
        icon: Palette,
        title: "Graphic Design",
        description: "Brand identities...",
        fullDescription: "Full description...",
        screenshot: null,
        features: [],
        process: [],
    },
];

export const defaultProducts: Product[] = [
    {
        id: "statoniq",
        tag: "Web",
        title: "Statoniq",
        desc: "Corporate website build & design.",
        url: "https://statoniq.com",
        color: "from-blue-500/20 to-indigo-500/20",
        screenshot: null,
        fullDescription:
            "Statoniq is a modern corporate website designed to showcase professional services with a clean, intuitive interface.",
        challenges: [
            "Scalable content architecture",
            "Responsive design across devices",
            "Performance optimization",
        ],
        solutions: [
            "Modern frontend stack",
            "Responsive design system",
            "SEO optimization",
            "CMS integration",
        ],
        technologies: ["React", "TypeScript", "Tailwind CSS"],
        results: [
            "50% faster load time",
            "40% increase in engagement",
        ],
    },

    {
        id: "essence4world",
        tag: "Web",
        title: "Essence4World",
        desc: "Brand-driven content platform.",
        url: "https://essence4world.com",
        color: "from-violet-500/20 to-blue-500/20",
        screenshot: null,
        fullDescription:
            "A content platform focused on storytelling and engagement with scalable content management.",
        challenges: [
            "Content scalability",
            "User engagement",
        ],
        solutions: [
            "Custom CMS",
            "Dynamic content system",
            "Social sharing integration",
        ],
        technologies: ["Next.js", "GraphQL", "Firebase"],
        results: [
            "10k+ monthly users",
            "High engagement rate",
        ],
    },

    {
        id: "valley-hospital",
        tag: "Healthcare",
        title: "Valley Hospital Silchar",
        desc: "Hospital website with patient-first UX.",
        url: "https://valleyhospitalsilchar.com",
        color: "from-blue-600/20 to-cyan-500/20",
        screenshot: null,
        fullDescription:
            "A patient-focused healthcare website with appointment booking and accessible UI.",
        challenges: [
            "Secure data handling",
            "Easy appointment booking",
        ],
        solutions: [
            "Secure backend",
            "Simplified booking flow",
            "Accessibility-first UI",
        ],
        technologies: ["Vue", "Express", "PostgreSQL"],
        results: [
            "Improved patient satisfaction",
            "Reduced booking friction",
        ],
    },

    {
        id: "ivory-squares",
        tag: "Real Estate",
        title: "Ivory Squares",
        desc: "Property showcase & lead generation site.",
        url: "https://ivorysquares.com",
        color: "from-sky-500/20 to-blue-500/20",
        screenshot: null,
        fullDescription:
            "A real estate platform with property listings, search, and lead capture.",
        challenges: [
            "Large image handling",
            "Lead tracking",
        ],
        solutions: [
            "Optimized media delivery",
            "Integrated CRM",
        ],
        technologies: ["Angular", "Node.js", "MongoDB"],
        results: [
            "Increased lead conversion",
            "High user engagement",
        ],
    },

    {
        id: "inventory-pro",
        tag: "Desktop App",
        title: "InventoryPro",
        desc: "Desktop inventory management application.",
        url: null,
        color: "from-indigo-500/20 to-blue-500/20",
        screenshot: null,
        fullDescription:
            "A desktop application for managing inventory across multiple locations.",
        challenges: [
            "Multi-location tracking",
            "Real-time updates",
        ],
        solutions: [
            "Centralized inventory system",
            "Automated stock tracking",
        ],
        technologies: [".NET", "WPF", "SQL Server"],
        results: [
            "Reduced inventory errors",
            "Improved efficiency",
        ],
    },
];
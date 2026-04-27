// src/features/data/data.defaults.ts

import type { Service, Product, Skill } from "./data.types";

export const defaultSkills: Skill[] = [
    { id: "react", name: "React", category: "Frontend", level: 95 },
    { id: "typescript", name: "TypeScript", category: "Language", level: 90 },
    { id: "tailwind", name: "Tailwind CSS", category: "Styling", level: 92 },
    { id: "node", name: "Node.js", category: "Backend", level: 85 },
    { id: "figma", name: "Figma", category: "Design", level: 88 },
];



export const defaultServices: Service[] = [
    {
        id: "graphic-design",
        iconName: "Palette",
        title: "Graphic Design",
        description: "Brand identities, marketing collateral, and visuals with a polished, modern edge.",
        fullDescription:
            "Our graphic design services help you establish a strong visual identity that sets you apart from the competition. We work with you to understand your brand values and translate them into compelling visual designs.",
        screenshot: null,
        color: "from-purple-500/20 to-pink-500/20",
        features: [
            "Logo Design & Brand Identity",
            "Marketing Collateral (Brochures, Business Cards)",
            "Social Media Design",
            "Package & Label Design",
            "Illustration & Custom Graphics",
            "Brand Guidelines Development",
        ],
        process: [
            "Discovery & Brand Briefing",
            "Concept Development",
            "Design Iterations",
            "Client Feedback & Refinement",
            "Final Delivery & Asset Optimization",
        ],
    },
    {
        id: "web-design",
        iconName: "Layout",
        title: "Web Design",
        description: "Responsive, conversion-focused websites that look sharp on every device.",
        fullDescription:
            "We design beautiful, responsive websites that not only look amazing but also convert visitors into customers. Every design decision is made with user experience and business goals in mind.",
        screenshot: null,
        color: "from-blue-500/20 to-cyan-500/20",
        features: [
            "Responsive Web Design",
            "E-commerce Design",
            "Landing Page Design",
            "CMS Integration",
            "Performance Optimization",
            "SEO-Friendly Structure",
        ],
        process: [
            "Strategy & Research",
            "Wireframing",
            "Visual Design",
            "Prototyping",
            "Development Handoff",
            "Launch & Optimization",
        ],
    },
    {
        id: "ui-ux-development",
        iconName: "PenTool",
        title: "UI/UX Development",
        description: "Thoughtful interfaces and user flows backed by clean, production-ready code.",
        fullDescription:
            "We create intuitive user interfaces combined with seamless user experiences, backed by clean, scalable code. Our approach ensures your product is both beautiful and functional.",
        screenshot: null,
        color: "from-emerald-500/20 to-teal-500/20",
        features: [
            "User Research & Testing",
            "Wireframing & Prototyping",
            "UI Component Design",
            "Interaction Design",
            "Usability Testing",
            "Design System Creation",
        ],
        process: [
            "User Research",
            "Persona Development",
            "Journey Mapping",
            "Wireframe Creation",
            "Visual Design",
            "Interactive Prototyping",
        ],
    },
    {
        id: "desktop-mobile-apps",
        iconName: "Smartphone",
        title: "Desktop & Mobile Apps",
        description: "Cross-platform apps engineered for performance, reliability, and scale.",
        fullDescription:
            "We build powerful applications for desktop and mobile platforms that are engineered for performance, reliability, and scalability. From native apps to cross-platform solutions, we have the expertise.",
        screenshot: null,
        color: "from-orange-500/20 to-red-500/20",
        features: [
            "iOS & Android Development",
            "Cross-Platform Apps",
            "Desktop Applications",
            "Cloud Integration",
            "Real-time Features",
            "App Maintenance & Support",
        ],
        process: [
            "Requirements Gathering",
            "Architecture Design",
            "Development Sprint",
            "Testing & QA",
            "Deployment",
            "Maintenance & Support",
        ],
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
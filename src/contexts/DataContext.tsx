import { createContext, useContext, useEffect, useState } from "react";
import { Palette, Layout, PenTool, Smartphone } from "lucide-react";

export interface Service {
  id: string;
  icon: any;
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

const defaultServices: Service[] = [
  {
    id: "graphic-design",
    icon: Palette,
    title: "Graphic Design",
    description: "Brand identities, marketing collateral, and visuals with a polished, modern edge.",
    fullDescription:
      "Our graphic design services help you establish a strong visual identity that sets you apart from the competition. We work with you to understand your brand values and translate them into compelling visual designs.",
    screenshot: null,
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
    icon: Layout,
    title: "Web Design",
    description: "Responsive, conversion-focused websites that look sharp on every device.",
    fullDescription:
      "We design beautiful, responsive websites that not only look amazing but also convert visitors into customers. Every design decision is made with user experience and business goals in mind.",
    screenshot: null,
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
    icon: PenTool,
    title: "UI/UX Development",
    description: "Thoughtful interfaces and user flows backed by clean, production-ready code.",
    fullDescription:
      "We create intuitive user interfaces combined with seamless user experiences, backed by clean, scalable code. Our approach ensures your product is both beautiful and functional.",
    screenshot: null,
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
    icon: Smartphone,
    title: "Desktop & Mobile Apps",
    description: "Cross-platform apps engineered for performance, reliability, and scale.",
    fullDescription:
      "We build powerful applications for desktop and mobile platforms that are engineered for performance, reliability, and scalability. From native apps to cross-platform solutions, we have the expertise.",
    screenshot: null,
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
      "Post-Launch Support",
    ],
  },
];

const defaultProducts: Product[] = [
  {
    id: "statoniq",
    tag: "Web",
    title: "Statoniq",
    desc: "Corporate website build & design.",
    url: "https://statoniq.com",
    color: "from-blue-500/20 to-indigo-500/20",
    screenshot: null,
    fullDescription:
      "Statoniq is a modern corporate website designed to showcase professional services with a clean, intuitive interface. Built with responsive design principles, it delivers a seamless experience across all devices.",
    challenges: [
      "Creating a scalable architecture for content management",
      "Implementing responsive design for diverse device sizes",
      "Optimizing performance for fast load times",
    ],
    solutions: [
      "Built with modern web technologies for optimal performance",
      "Responsive design system for all screen sizes",
      "Advanced SEO implementation for search visibility",
      "Content management system for easy updates",
    ],
    technologies: ["React", "TypeScript", "Tailwind CSS", "Node.js", "MongoDB"],
    results: [
      "50% faster page load time",
      "40% increase in user engagement",
      "Ranked in top 5 search results for target keywords",
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
      "Essence4World is a comprehensive content platform designed for brand storytelling and audience engagement. It combines beautiful design with powerful content management capabilities.",
    challenges: [
      "Building a scalable content management system",
      "Creating engaging user experience for content consumption",
      "Implementing social sharing features",
    ],
    solutions: [
      "Custom CMS with intuitive content management interface",
      "Dynamic content recommendations engine",
      "Integrated social media sharing",
      "Analytics dashboard for content performance",
    ],
    technologies: ["Next.js", "GraphQL", "Firebase", "Chakra UI"],
    results: [
      "10,000+ monthly active users",
      "85% content engagement rate",
      "30% growth in monthly subscriptions",
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
      "Valley Hospital Silchar's website is designed with patient experience at its core. It provides easy access to medical services, appointment booking, and health information with HIPAA-compliant security.",
    challenges: [
      "Ensuring HIPAA compliance and data security",
      "Creating intuitive appointment booking system",
      "Accessible design for diverse patient demographics",
    ],
    solutions: [
      "Secure patient data handling with encryption",
      "Simplified appointment scheduling system",
      "Multi-language support",
      "Accessibility-first design (WCAG AA)",
      "Emergency contact features",
    ],
    technologies: ["Vue.js", "Express.js", "PostgreSQL", "AWS"],
    results: [
      "95% patient satisfaction",
      "60% reduction in appointment call time",
      "2,000+ online bookings monthly",
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
      "Ivory Squares is a real estate platform featuring property listings, virtual tours, and an integrated lead management system. It helps property agents showcase properties effectively and convert leads.",
    challenges: [
      "Integrating virtual tour technology",
      "Building efficient lead management system",
      "Handling large image galleries",
    ],
    solutions: [
      "3D virtual tour integration for properties",
      "CRM system for lead tracking",
      "Advanced search and filtering",
      "Automated lead notifications",
      "Mobile-optimized property viewing",
    ],
    technologies: ["Angular", "Matterport API", "Node.js", "MongoDB", "SendGrid"],
    results: [
      "500+ property listings",
      "70% lead conversion rate",
      "25,000+ monthly visitors",
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
      "InventoryPro is a powerful desktop application for comprehensive inventory management. It supports multiple locations, real-time tracking, and advanced reporting with an intuitive interface.",
    challenges: [
      "Managing inventory across multiple locations",
      "Real-time synchronization of data",
      "Generating comprehensive inventory reports",
    ],
    solutions: [
      "Multi-location inventory tracking",
      "Real-time stock updates",
      "Barcode scanning integration",
      "Advanced analytics and reporting",
      "Automated reorder notifications",
      "User role-based access control",
    ],
    technologies: ["C#", ".NET Framework", "WPF", "SQL Server", "Entity Framework"],
    results: [
      "90% reduction in inventory errors",
      "Time-saving inventory audits",
      "Multi-location support across 50+ stores",
    ],
  },
];

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [services, setServices] = useState<Service[]>(defaultServices);
  const [products, setProducts] = useState<Product[]>(defaultProducts);

  // Load from localStorage on mount
  useEffect(() => {
    const storedServices = localStorage.getItem("services");
    const storedProducts = localStorage.getItem("products");

    if (storedServices) {
      try {
        setServices(JSON.parse(storedServices));
      } catch (e) {
        console.error("Failed to parse services from localStorage");
      }
    }

    if (storedProducts) {
      try {
        setProducts(JSON.parse(storedProducts));
      } catch (e) {
        console.error("Failed to parse products from localStorage");
      }
    }
  }, []);

  // Save to localStorage whenever services change
  useEffect(() => {
    localStorage.setItem("services", JSON.stringify(services));
  }, [services]);

  // Save to localStorage whenever products change
  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);

  const addService = (service: Service) => {
    setServices([...services, service]);
  };

  const updateService = (id: string, updatedData: Partial<Service>) => {
    setServices(services.map((s) => (s.id === id ? { ...s, ...updatedData } : s)));
  };

  const deleteService = (id: string) => {
    setServices(services.filter((s) => s.id !== id));
  };

  const addProduct = (product: Product) => {
    setProducts([...products, product]);
  };

  const updateProduct = (id: string, updatedData: Partial<Product>) => {
    setProducts(products.map((p) => (p.id === id ? { ...p, ...updatedData } : p)));
  };

  const deleteProduct = (id: string) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  const resetToDefaults = () => {
    setServices(defaultServices);
    setProducts(defaultProducts);
    localStorage.removeItem("services");
    localStorage.removeItem("products");
  };

  return (
    <DataContext.Provider
      value={{
        services,
        products,
        addService,
        updateService,
        deleteService,
        addProduct,
        updateProduct,
        deleteProduct,
        resetToDefaults,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};

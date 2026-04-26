import { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";

const productDetails: Record<string, any> = {
  "statoniq": {
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
  "essence4world": {
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
  "valley-hospital": {
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
  "ivory-squares": {
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
  "inventory-pro": {
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
};

const ProductDetail = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const product = productDetails[productId || ""];

  useEffect(() => {
    if (!product) {
      navigate("/products");
      return;
    }
    document.title = `${product.title} — Wise Byte Concepts`;
    const meta = document.querySelector('meta[name="description"]');
    const content = product.desc;
    if (meta) meta.setAttribute("content", content);
  }, [product, navigate]);

  if (!product) return null;

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      {/* Header */}
      <Navbar />

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-16 container">
        <Link to="/products" className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline mb-8">
          <ArrowLeft className="w-4 h-4" />
          Back to Products
        </Link>

        <div className="mb-12">
          <div className="mb-6">
            <Badge className="bg-blue-600 dark:bg-blue-500 text-white">{product.tag}</Badge>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white mb-4">{product.title}</h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 mb-6">{product.desc}</p>
          <p className="text-lg text-slate-600 dark:text-slate-400 mb-8">{product.fullDescription}</p>

          {product.url && (
            <Button className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white gap-2 mb-8">
              <ExternalLink className="w-4 h-4" />
              <a href={product.url} target="_blank" rel="noopener noreferrer">Visit Live Site</a>
            </Button>
          )}

          {/* Screenshot Section */}
          {product.screenshot ? (
            <div className="mb-12 rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700">
              <img src={product.screenshot} alt={`${product.title} screenshot`} className="w-full h-auto" />
            </div>
          ) : (
            <div className="mb-12 rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900">
              <div className="aspect-video flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-slate-300 dark:bg-slate-700 flex items-center justify-center">
                    <span className="text-slate-600 dark:text-slate-400 text-2xl">📸</span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400">Screenshot coming soon</p>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Challenges & Solutions */}
          <Card className="p-8">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Challenges</h2>
            <ul className="space-y-3">
              {product.challenges.map((challenge: string, idx: number) => (
                <li key={idx} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full flex-shrink-0 mt-2" />
                  <span className="text-slate-700 dark:text-slate-300">{challenge}</span>
                </li>
              ))}
            </ul>
          </Card>

          <Card className="p-8">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Solutions</h2>
            <ul className="space-y-3">
              {product.solutions.map((solution: string, idx: number) => (
                <li key={idx} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0 mt-2" />
                  <span className="text-slate-700 dark:text-slate-300">{solution}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>

        {/* Technologies */}
        <Card className="p-8 mb-12">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Technologies Used</h2>
          <div className="flex flex-wrap gap-3">
            {product.technologies.map((tech: string, idx: number) => (
              <Badge key={idx} className="bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-white hover:bg-slate-300 dark:hover:bg-slate-700">
                {tech}
              </Badge>
            ))}
          </div>
        </Card>

        {/* Results */}
        <Card className="p-8 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 border-green-200 dark:border-green-800">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Results & Impact</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {product.results.map((result: string, idx: number) => (
              <div key={idx} className="text-center">
                <p className="text-slate-700 dark:text-slate-300">{result}</p>
              </div>
            ))}
          </div>
        </Card>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50">
        <div className="container py-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <span className="text-sm text-muted-foreground">© {new Date().getFullYear()} Wise Byte Concepts. All rights reserved.</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ProductDetail;
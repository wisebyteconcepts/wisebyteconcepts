import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ExternalLink } from "lucide-react";
import { Card } from "@/shared/components/ui/card";
import Navbar from "@/shared/components/Navbar";

const products = [
  {
    id: "statoniq",
    tag: "Web",
    title: "Statoniq",
    desc: "Corporate website build & design.",
    color: "from-blue-500/20 to-indigo-500/20",
    url: "https://statoniq.com",
    fullDesc: "A comprehensive corporate website showcasing modern design principles and responsive architecture.",
  },
  {
    id: "essence4world",
    tag: "Web",
    title: "Essence4World",
    desc: "Brand-driven content platform.",
    color: "from-violet-500/20 to-blue-500/20",
    url: "https://essence4world.com",
    fullDesc: "A dynamic content platform built with focus on brand identity and user engagement.",
  },
  {
    id: "valley-hospital",
    tag: "Healthcare",
    title: "Valley Hospital Silchar",
    desc: "Hospital website with patient-first UX.",
    color: "from-blue-600/20 to-cyan-500/20",
    url: "https://valleyhospitalsilchar.com",
    fullDesc: "Healthcare website designed with patient experience at the forefront, featuring appointment booking and services.",
  },
  {
    id: "ivory-squares",
    tag: "Real Estate",
    title: "Ivory Squares",
    desc: "Property showcase & lead generation site.",
    color: "from-sky-500/20 to-blue-500/20",
    url: "https://ivorysquares.com",
    fullDesc: "Real estate platform with property listings, virtual tours, and lead management system.",
  },
  {
    id: "inventory-pro",
    tag: "Desktop App",
    title: "InventoryPro",
    desc: "Desktop inventory management application.",
    color: "from-indigo-500/20 to-blue-500/20",
    url: null,
    fullDesc: "Comprehensive desktop application for managing inventory across multiple locations with real-time analytics.",
  },
];

const Products = () => {
  useEffect(() => {
    document.title = "Products — Wise Byte Concepts";
    const meta = document.querySelector('meta[name="description"]');
    const content = "Explore our portfolio of products including web applications, healthcare solutions, real estate platforms, and desktop applications.";
    if (meta) meta.setAttribute("content", content);
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      {/* Header */}
      <Navbar />

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-16 container">
        <div className="mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white mb-4">Our Products</h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl">
            Explore the projects and products we've built for clients across various industries.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <Link key={product.id} to={`/products/${product.id}`}>
              <Card className={`p-6 hover:shadow-lg transition-all cursor-pointer h-full bg-gradient-to-br ${product.color}`}>
                <div className="mb-4">
                  <span className="inline-block px-3 py-1 bg-blue-600 dark:bg-blue-500 text-white text-xs font-semibold rounded-full">
                    {product.tag}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{product.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 mb-4">{product.desc}</p>
                <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-medium">
                  View Details <ArrowRight className="w-4 h-4" />
                </div>
              </Card>
            </Link>
          ))}
        </div>
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

export default Products;
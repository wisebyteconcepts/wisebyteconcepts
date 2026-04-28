import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ExternalLink, Globe, Terminal } from "lucide-react";
import { Card } from "@/shared/ui/card";
import { Badge } from "@/shared/ui/badge";
import { useData } from "@/features/data/DataContext";
import Navbar from "@/shared/components/Navbar";

const Products = () => {
  const { products } = useData();

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
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <Link key={product.id} to={`/products/${product.id}`}>
              <Card className="group relative overflow-hidden border-border/50 hover:border-primary/40 transition-all duration-300 hover:shadow-elegant h-full">
                <div className={`aspect-[4/3] bg-gradient-to-br ${product.color} relative overflow-hidden`}>
                  {product.screenshot ? (
                    <img
                      src={product.screenshot}
                      alt={product.title}
                      loading="lazy"
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-20 h-20 rounded-2xl bg-background/80 backdrop-blur flex items-center justify-center shadow-soft group-hover:scale-110 transition-transform duration-500">
                        {product.tag === "Desktop App" ? <Terminal className="w-8 h-8 text-primary" /> : <Globe className="w-8 h-8 text-primary" />}
                      </div>
                    </div>
                  )}
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-background/90 text-foreground border-0 backdrop-blur">{product.tag}</Badge>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-lg mb-1 group-hover:text-primary transition-colors flex items-center gap-2">
                    {product.url ? (
                      <a
                        href={product.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="hover:text-primary transition-colors flex items-center gap-2"
                      >
                        {product.title}
                        <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </a>
                    ) : (
                      product.title
                    )}
                  </h3>
                  <p className="text-sm text-muted-foreground">{product.desc}</p>
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
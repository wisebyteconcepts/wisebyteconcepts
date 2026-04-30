import { useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/shared/ui/button";
import { Card } from "@/shared/ui/card";
import Navbar from "@/shared/components/Navbar";
import { useData } from "@/features/data/DataContext";
import { getServiceIcon } from "@/shared/lib/getServiceIcon";

const Services = () => {
  const { services } = useData();

  useEffect(() => {
    document.title = "Services — Wise Byte Concepts";
    const meta = document.querySelector('meta[name="description"]');
    const content = "Explore our services including graphic design, web design, UI/UX development, and mobile/desktop apps.";
    if (meta) meta.setAttribute("content", content);
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      {/* Header */}
      <Navbar />

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-16 container">
        <div className="mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white mb-4">Our Services</h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl">
            We offer a comprehensive suite of services to bring your ideas to life with craft and precision.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {services
            .filter((s) => s.isActive !== false)
            .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
            .map((service) => {
              const IconComponent = getServiceIcon(service.iconName);
              const cardImage = service.thumbnail || service.bannerImage || service.screenshot;
              return (
                <Link key={service.id} to={`/services/${service.slug || service.id}`}>
                  <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer h-full flex flex-col group border-border/50">
                    <div className={`bg-gradient-to-br ${service.color} h-40 flex items-center justify-center relative overflow-hidden`}>
                      {cardImage ? (
                        <img
                          src={cardImage}
                          alt={service.name || service.title || ""}
                          loading="lazy"
                          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <>
                          <div className="absolute inset-0 opacity-30">
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(255,255,255,0.3),transparent_50%)]"></div>
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(255,255,255,0.2),transparent_50%)]"></div>
                          </div>
                          {IconComponent && (
                            <div className="relative z-10 transform group-hover:scale-110 transition-transform duration-300">
                              <div className="w-20 h-20 bg-white dark:bg-slate-900 rounded-2xl flex items-center justify-center shadow-lg">
                                <IconComponent className="w-10 h-10 text-slate-900 dark:text-white" />
                              </div>
                            </div>
                          )}
                        </>
                      )}
                    </div>

                    <div className="flex flex-col flex-1 p-6">
                      <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {service.name || service.title}
                      </h3>
                      <p className="text-slate-600 dark:text-slate-400 flex-1 mb-6 leading-relaxed">
                        {service.shortDescription || service.description}
                      </p>

                      <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold group-hover:gap-3 transition-all">
                        Learn more <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </Card>
                </Link>
              );
            })}
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

export default Services;
import { useEffect } from "react";
import { Palette, Layout, PenTool, Smartphone, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/shared/ui/button";
import { Card } from "@/shared/ui/card";
import Navbar from "@/shared/components/Navbar";

const services = [
  {
    id: "graphic-design",
    icon: Palette,
    title: "Graphic Design",
    desc: "Brand identities, marketing collateral, and visuals with a polished, modern edge.",
    details: "We create stunning visual designs that capture your brand's essence and resonate with your audience.",
  },
  {
    id: "web-design",
    icon: Layout,
    title: "Web Design",
    desc: "Responsive, conversion-focused websites that look sharp on every device.",
    details: "Our web design expertise ensures your site is not only beautiful but also functional and user-centric.",
  },
  {
    id: "ui-ux-development",
    icon: PenTool,
    title: "UI/UX Development",
    desc: "Thoughtful interfaces and user flows backed by clean, production-ready code.",
    details: "We design intuitive user experiences paired with robust code to deliver exceptional digital products.",
  },
  {
    id: "desktop-mobile-apps",
    icon: Smartphone,
    title: "Desktop & Mobile Apps",
    desc: "Cross-platform apps engineered for performance, reliability, and scale.",
    details: "From concept to deployment, we build applications that work seamlessly across all platforms.",
  },
];

const Services = () => {
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
        <div className="grid md:grid-cols-2 gap-6">
          {services.map((service) => {
            const IconComponent = service.icon;
            return (
              <Link key={service.id} to={`/services/${service.id}`}>
                <Card className="p-6 hover:shadow-lg transition-all cursor-pointer h-full">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                      <IconComponent className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white">{service.title}</h3>
                    </div>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 mb-4">{service.desc}</p>
                  <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-medium">
                    Learn more <ArrowRight className="w-4 h-4" />
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
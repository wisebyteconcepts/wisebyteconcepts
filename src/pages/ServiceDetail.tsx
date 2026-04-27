import { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Palette, Layout, PenTool, Smartphone, Check } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { Card } from "@/shared/components/ui/card";
import Navbar from "@/shared/components/Navbar";

const serviceDetails: Record<string, any> = {
  "graphic-design": {
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
  "web-design": {
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
  "ui-ux-development": {
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
  "desktop-mobile-apps": {
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
};

const ServiceDetail = () => {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const service = serviceDetails[serviceId || ""];

  useEffect(() => {
    if (!service) {
      navigate("/services");
      return;
    }
    document.title = `${service.title} — Wise Byte Concepts`;
    const meta = document.querySelector('meta[name="description"]');
    const content = service.description;
    if (meta) meta.setAttribute("content", content);
  }, [service, navigate]);

  if (!service) return null;

  const IconComponent = service.icon;

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      {/* Header */}
      <Navbar />

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-16 container">
        <Link to="/services" className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline mb-8">
          <ArrowLeft className="w-4 h-4" />
          Back to Services
        </Link>

        <div className="mb-12">
          <div className="flex items-start gap-4 mb-6">
            <div className="p-4 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <IconComponent className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white">{service.title}</h1>
              <p className="text-xl text-slate-600 dark:text-slate-400 mt-2">{service.description}</p>
            </div>
          </div>

          <p className="text-lg text-slate-600 dark:text-slate-400 mb-8">{service.fullDescription}</p>

          {/* Screenshot Section */}
          {service.screenshot ? (
            <div className="mb-12 rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700">
              <img src={service.screenshot} alt={`${service.title} screenshot`} className="w-full h-auto" />
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

        <div className="grid md:grid-cols-2 gap-12 mb-16">
          {/* Features */}
          <Card className="p-8">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Key Features</h2>
            <ul className="space-y-4">
              {service.features.map((feature: string, idx: number) => (
                <li key={idx} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700 dark:text-slate-300">{feature}</span>
                </li>
              ))}
            </ul>
          </Card>

          {/* Process */}
          <Card className="p-8">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Our Process</h2>
            <ol className="space-y-4">
              {service.process.map((step: string, idx: number) => (
                <li key={idx} className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-blue-600 dark:bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    {idx + 1}
                  </div>
                  <span className="text-slate-700 dark:text-slate-300 pt-0.5">{step}</span>
                </li>
              ))}
            </ol>
          </Card>
        </div>

        {/* CTA */}
        <Card className="p-8 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 border-blue-200 dark:border-blue-800">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Ready to get started?</h2>
          <p className="text-slate-600 dark:text-slate-400 mb-6">Let's discuss how {service.title.toLowerCase()} can help your project.</p>
          <Button className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white">
            Schedule a Consultation
          </Button>
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

export default ServiceDetail;
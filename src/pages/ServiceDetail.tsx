import { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Check } from "lucide-react";
import { Button } from "@/shared/ui/button";
import { Card } from "@/shared/ui/card";
import Navbar from "@/shared/components/Navbar";
import { useData } from "@/features/data/DataContext";
import { getServiceIcon } from "@/shared/lib/getServiceIcon";

const ServiceDetail = () => {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const { services } = useData();
  const service = services.find((s) => s.id === serviceId);

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

  const IconComponent = getServiceIcon(service.iconName);

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
            {IconComponent && (
              <div className="p-4 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <IconComponent className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
            )}
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
              {service.features.map((feature, idx) => (
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
              {service.process.map((step, idx) => (
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
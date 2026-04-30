import { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Check, Clock, Tag } from "lucide-react";
import { Button } from "@/shared/ui/button";
import { Card } from "@/shared/ui/card";
import { Badge } from "@/shared/ui/badge";
import Navbar from "@/shared/components/Navbar";
import { useData } from "@/features/data/DataContext";
import { getServiceIcon } from "@/shared/lib/getServiceIcon";

const formatPricing = (p: { model: string; amount?: number | null; currency?: string; note?: string }) => {
  if (!p) return "Contact for quote";
  const money = p.amount != null ? `${p.currency ?? ""} ${p.amount.toLocaleString()}`.trim() : null;
  switch (p.model) {
    case "fixed": return money ? `${money}${p.note ? ` · ${p.note}` : ""}` : "Fixed price";
    case "hourly": return money ? `${money}${p.note ? ` ${p.note}` : "/hour"}` : "Hourly";
    case "starting_at": return money ? `Starting at ${money}${p.note ? ` · ${p.note}` : ""}` : "Starting at —";
    default: return p.note || "Custom quote";
  }
};

const ServiceDetail = () => {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const { services, products } = useData();
  const service = services.find((s) => s.slug === serviceId || s.id === serviceId);

  useEffect(() => {
    if (!service) {
      navigate("/services");
      return;
    }
    document.title = service.seo?.metaTitle || `${service.name || service.title} — Wise Byte Concepts`;
    const meta = document.querySelector('meta[name="description"]');
    const content = service.seo?.metaDescription || service.shortDescription || service.description || "";
    if (meta) meta.setAttribute("content", content);
  }, [service, navigate]);

  if (!service) return null;

  const IconComponent = getServiceIcon(service.iconName);
  const banner = service.bannerImage || service.thumbnail || service.screenshot;
  const related = products.filter((p) => service.relatedProjects?.includes(p.id));

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      <Navbar />

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
            <div className="flex-1">
              {service.category && (
                <Badge variant="secondary" className="mb-2">{service.category}</Badge>
              )}
              <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white">
                {service.header || service.name || service.title}
              </h1>
              <p className="text-xl text-slate-600 dark:text-slate-400 mt-2">
                {service.caption || service.shortDescription || service.description}
              </p>
            </div>
          </div>

          {/* Tags */}
          {service.tags?.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {service.tags.map((t) => (
                <Badge key={t} variant="outline" className="text-xs">
                  <Tag className="mr-1 h-3 w-3" />{t}
                </Badge>
              ))}
            </div>
          )}

          {/* Pricing & duration strip */}
          <div className="grid sm:grid-cols-2 gap-4 mb-8">
            <Card className="p-4">
              <div className="text-xs uppercase tracking-wide text-muted-foreground">Pricing</div>
              <div className="text-lg font-semibold mt-1">{formatPricing(service.pricing)}</div>
            </Card>
            <Card className="p-4">
              <div className="text-xs uppercase tracking-wide text-muted-foreground flex items-center gap-1">
                <Clock className="h-3 w-3" /> Estimated duration
              </div>
              <div className="text-lg font-semibold mt-1">{service.estimatedDuration || "Flexible"}</div>
            </Card>
          </div>

          <p className="text-lg text-slate-600 dark:text-slate-400 mb-8">{service.fullDescription}</p>

          {/* Banner */}
          {banner ? (
            <div className="mb-12 rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700">
              <img src={banner} alt={`${service.name || service.title}`} className="w-full h-auto" />
            </div>
          ) : (
            <div className="mb-12 rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900">
              <div className="aspect-video flex items-center justify-center text-slate-500">
                <span>Banner image coming soon</span>
              </div>
            </div>
          )}
        </div>

        {/* Features + Deliverables */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {service.features?.length > 0 && (
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
          )}

          {service.deliverables?.length > 0 && (
            <Card className="p-8">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Deliverables</h2>
              <ul className="space-y-4">
                {service.deliverables.map((d, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-blue-600 dark:bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                      {idx + 1}
                    </div>
                    <span className="text-slate-700 dark:text-slate-300 pt-0.5">{d}</span>
                  </li>
                ))}
              </ul>
            </Card>
          )}
        </div>

        {/* Technologies */}
        {service.technologies?.length > 0 && (
          <Card className="p-8 mb-12">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Technologies we use</h2>
            <div className="flex flex-wrap gap-2">
              {service.technologies.map((t) => (
                <Badge key={t} variant="secondary">{t}</Badge>
              ))}
            </div>
          </Card>
        )}

        {/* Gallery */}
        {service.gallery?.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Gallery</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {service.gallery.map((src, i) => (
                <div key={i} className="rounded-lg overflow-hidden border border-border">
                  <img src={src} alt={`Gallery ${i + 1}`} loading="lazy" className="aspect-video w-full object-cover" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Related projects */}
        {related.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Related projects</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {related.map((p) => (
                <Link key={p.id} to={`/products/${p.id}`}>
                  <Card className="overflow-hidden hover:shadow-lg transition group h-full">
                    <div className={`aspect-video bg-gradient-to-br ${p.color} relative`}>
                      {p.screenshot && (
                        <img src={p.screenshot} alt={p.title} className="absolute inset-0 h-full w-full object-cover" />
                      )}
                    </div>
                    <div className="p-4">
                      <div className="font-semibold group-hover:text-primary transition-colors">{p.title}</div>
                      <div className="text-sm text-muted-foreground">{p.desc}</div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* CTA */}
        <Card className="p-8 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 border-blue-200 dark:border-blue-800">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Ready to get started?</h2>
          <p className="text-slate-600 dark:text-slate-400 mb-6">
            Let's discuss how {(service.name || service.title || "").toLowerCase()} can help your project.
          </p>
          <Button asChild className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white">
            {service.cta?.url?.startsWith("http") ? (
              <a href={service.cta.url} target="_blank" rel="noopener noreferrer">{service.cta.label}</a>
            ) : (
              <Link to={service.cta?.url || "/contact"}>{service.cta?.label || "Schedule a Consultation"}</Link>
            )}
          </Button>
        </Card>
      </main>

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

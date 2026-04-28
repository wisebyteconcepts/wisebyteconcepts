import { useEffect } from "react";
import { ArrowRight, Code2, Mail, Github, Linkedin, Twitter, Sun, Moon, Terminal, GitBranch, Globe } from "lucide-react";
import { Button } from "@/shared/ui/button";
import { Card } from "@/shared/ui/card";
import { Badge } from "@/shared/ui/badge";
import { Link } from "react-router-dom";
import Navbar from "@/shared/components/Navbar";
import { useData } from "@/features/data/DataContext";
import { getServiceIcon } from "@/shared/lib/getServiceIcon";
import { LucideIcon as DynLucideIcon } from "@/shared/components/LucideIcon";
import logo from "@/assets/wbc-logo.png";

const projects = [
  { tag: "Web", title: "Statoniq", desc: "Corporate website build & design.", url: "https://statoniq.com", color: "from-blue-500/20 to-indigo-500/20" },
  { tag: "Web", title: "Essence4World", desc: "Brand-driven content platform.", url: "https://essence4world.com", color: "from-violet-500/20 to-blue-500/20" },
  { tag: "Healthcare", title: "Valley Hospital Silchar", desc: "Hospital website with patient-first UX.", url: "https://valleyhospitalsilchar.com", color: "from-blue-600/20 to-cyan-500/20" },
  { tag: "Real Estate", title: "Ivory Squares", desc: "Property showcase & lead generation site.", url: "https://ivorysquares.com", color: "from-sky-500/20 to-blue-500/20" },
  { tag: "Desktop App", title: "InventoryPro", desc: "Desktop inventory management application.", url: null, color: "from-indigo-500/20 to-blue-500/20" },
];

const stats = [
  { value: "40+", label: "Products shipped" },
  { value: "12", label: "Industries served" },
  { value: "99.9%", label: "Uptime SLA" },
  { value: "4.9/5", label: "Client rating" },
];

const Index = () => {
  const { services, skills } = useData();

  useEffect(() => {
    document.title = "Wise Byte Concepts — Software Studio for Modern Products";
    const meta = document.querySelector('meta[name="description"]');
    const content = "Wise Byte Concepts builds web, AI, and cloud products with craft. Explore our work, services, and approach.";
    if (meta) meta.setAttribute("content", content);
    else {
      const m = document.createElement("meta");
      m.name = "description";
      m.content = content;
      document.head.appendChild(m);
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section id="home" className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero" aria-hidden />
        <div className="absolute inset-0 bg-gradient-mesh opacity-60" aria-hidden />
        <div className="container relative py-24 md:py-36">
          <div className="max-w-3xl animate-fade-up">
            <Badge variant="secondary" className="mb-6 bg-accent text-accent-foreground border-0 px-3 py-1">
              <span className="w-1.5 h-1.5 rounded-full bg-primary mr-2 animate-pulse" />
              Now booking Q3 projects
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold leading-[1.05] mb-6">
              We build <span className="text-gradient-primary">software</span> with intent.
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-8 leading-relaxed">
              Wise Byte Concepts is a small studio crafting modern web, AI, and cloud products
              for ambitious teams. Thoughtful design. Engineered to last.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg" className="bg-gradient-primary hover:opacity-90 transition-opacity shadow-elegant">
                <a href="#work">View our work <ArrowRight className="ml-2 h-4 w-4" /></a>
              </Button>
              <Button asChild size="lg" variant="outline">
                <a href="#services">Our services</a>
              </Button>
            </div>
          </div>

          {/* Floating logo accent */}
          <div className="hidden lg:block absolute right-10 top-24 animate-float">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/30 blur-3xl rounded-full" aria-hidden />
              <img src={logo} alt="" className="relative w-48 h-48 rounded-3xl shadow-glow" />
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-border/50 bg-secondary/30">
        <div className="container py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s) => (
            <div key={s.label} className="text-center md:text-left">
              <div className="text-3xl md:text-4xl font-bold text-gradient-primary">{s.value}</div>
              <div className="text-sm text-muted-foreground mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Work */}
      <section id="work" className="container py-24">
        <div className="max-w-2xl mb-12">
          <Badge variant="secondary" className="mb-3 bg-accent text-accent-foreground border-0">Selected Work</Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Products we're proud of.</h2>
          <p className="text-muted-foreground text-lg">A glimpse at recent collaborations across SaaS, AI, fintech, and more.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {projects.map((p) => {
            const CardInner = (
              <>
                <div className={`aspect-[4/3] bg-gradient-to-br ${p.color} relative overflow-hidden`}>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-20 h-20 rounded-2xl bg-background/80 backdrop-blur flex items-center justify-center shadow-soft group-hover:scale-110 transition-transform duration-500">
                      {p.tag === "Desktop App" ? <Terminal className="w-8 h-8 text-primary" /> : <Globe className="w-8 h-8 text-primary" />}
                    </div>
                  </div>
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-background/90 text-foreground border-0 backdrop-blur">{p.tag}</Badge>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-lg mb-1 group-hover:text-primary transition-colors flex items-center gap-2">
                    {p.title}
                    {p.url && <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />}
                  </h3>
                  <p className="text-sm text-muted-foreground">{p.desc}</p>
                </div>
              </>
            );
            return p.url ? (
              <a key={p.title} href={p.url} target="_blank" rel="noopener noreferrer">
                <Card className="group relative overflow-hidden border-border/50 hover:border-primary/40 transition-all duration-300 hover:shadow-elegant cursor-pointer h-full">
                  {CardInner}
                </Card>
              </a>
            ) : (
              <Card key={p.title} className="group relative overflow-hidden border-border/50 hover:border-primary/40 transition-all duration-300 hover:shadow-elegant h-full">
                {CardInner}
              </Card>
            );
           })}
         </div>
         <div className="flex justify-center mt-8">
           <Button asChild size="lg" variant="outline">
             <Link to="/products">View all products <ArrowRight className="ml-2 h-4 w-4" /></Link>
           </Button>
         </div>
       </section>

       {/* Services */}
      <section id="services" className="bg-secondary/40 border-y border-border/50">
        <div className="container py-24">
          <div className="max-w-2xl mb-12">
            <Badge variant="secondary" className="mb-3 bg-accent text-accent-foreground border-0">What we do</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Services, end to end.</h2>
            <p className="text-muted-foreground text-lg">From first sketch to production deploy — one team, all the way through.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {services.map((s) => {
              const IconComponent = getServiceIcon(s.iconName);
              return (
                <Link key={s.id} to={`/services/${s.id}`}>
                  <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer h-full flex flex-col group border-border/50">
                    {/* Image/Color Area */}
                    <div className={`bg-gradient-to-br ${s.color} h-32 flex items-center justify-center relative overflow-hidden`}>
                      {s.screenshot ? (
                        <img
                          src={s.screenshot}
                          alt={s.title}
                          loading="lazy"
                          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <>
                          {/* Background pattern effect */}
                          <div className="absolute inset-0 opacity-30">
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(255,255,255,0.3),transparent_50%)]"></div>
                          </div>
                          {IconComponent && (
                            <div className="relative z-10 transform group-hover:scale-110 transition-transform duration-300">
                              <div className="w-16 h-16 bg-white dark:bg-slate-900 rounded-2xl flex items-center justify-center shadow-lg">
                                <IconComponent className="w-8 h-8 text-slate-900 dark:text-white" />
                              </div>
                            </div>
                          )}
                        </>
                      )}
                    </div>

                    {/* Content Area */}
                    <div className="flex flex-col flex-1 p-4">
                      <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">{s.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed flex-1">{s.description}</p>
                    </div>
                  </Card>
                </Link>
              );
            })}
          </div>
                <div className="flex justify-center mt-8">
                  <Button asChild size="lg" variant="outline">
                    <Link to="/services">View all services <ArrowRight className="ml-2 h-4 w-4" /></Link>
                  </Button>
                </div>
              </div>
            </section>

      {/* Skills */}
      <section id="skills" className="container py-24">
        <div className="max-w-2xl mb-12">
          <Badge variant="secondary" className="mb-3 bg-accent text-accent-foreground border-0">Toolkit</Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Skills & tools we work with.</h2>
          <p className="text-muted-foreground text-lg">A blend of design and development tools we use to bring concepts to life.</p>
        </div>
        {skills.length === 0 ? (
          <p className="text-muted-foreground">No skills added yet.</p>
        ) : (
          <div className="relative -mx-4 sm:-mx-6">
            <div
              className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory px-4 sm:px-6 pb-4
                         [scrollbar-width:thin] [&::-webkit-scrollbar]:h-1.5
                         [&::-webkit-scrollbar-thumb]:bg-border [&::-webkit-scrollbar-thumb]:rounded-full"
            >
              {skills.map((s) => (
                <Card
                  key={s.id}
                  className="snap-start shrink-0 w-40 sm:w-44 p-6 flex flex-col items-center justify-center gap-3 border-border/50 hover:border-primary/40 hover:shadow-soft transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center">
                    {s.icon ? (
                      <DynLucideIcon name={s.icon} className="w-6 h-6 text-primary" />
                    ) : (
                      <Code2 className="w-6 h-6 text-primary" />
                    )}
                  </div>
                  <span className="text-sm font-medium text-center">{s.name}</span>
                  {s.category && (
                    <span className="text-xs text-muted-foreground">{s.category}</span>
                  )}
                </Card>
              ))}
            </div>
            {/* Edge fade */}
            <div className="pointer-events-none absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-background to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-background to-transparent" />
          </div>
        )}
      </section>

      {/* CTA */}
      <section id="contact" className="container pb-24">
        <Card className="relative overflow-hidden border-0 bg-gradient-primary p-8 md:p-12 text-primary-foreground shadow-elegant">
          <div className="absolute inset-0 bg-gradient-mesh opacity-20" aria-hidden />
          <div className="relative">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Have a concept worth building?</h2>
            <p className="text-lg opacity-90 mb-8 max-w-2xl">Tell us about your project. We typically respond within one business day.</p>
            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg" variant="secondary" className="bg-background text-foreground hover:bg-background/90">
                <Link to="/contact">Get in touch <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="bg-transparent border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground">
                <a href="mailto:wisebyteconcepts@gmail.com"><Mail className="mr-2 h-4 w-4" /> Email us</a>
              </Button>
            </div>
          </div>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50">
        <div className="container py-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <img src={logo} alt="" className="w-7 h-7 rounded-md" />
            <span className="text-sm text-muted-foreground">© {new Date().getFullYear()} Wise Byte Concepts. All rights reserved.</span>
          </div>
          <div className="flex items-center gap-4 text-muted-foreground">
            <a href="https://github.com/wisebyteconcepts" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="hover:text-primary transition-colors"><Github className="w-4 h-4" /></a>
            <a href="mailto:wisebyteconcepts@gmail.com" aria-label="Email" className="hover:text-primary transition-colors"><Mail className="w-4 h-4" /></a>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default Index;

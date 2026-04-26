import { useEffect, useState } from "react";
import { ArrowRight, Code2, Palette, Layout, Smartphone, Mail, Github, Linkedin, Twitter, Sun, Moon, Image as ImageIcon, FileImage, PenTool, Figma, Terminal, GitBranch, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useTheme } from "@/hooks/use-theme";
import logo from "@/assets/wbc-logo.png";

const services = [
  { icon: Palette, title: "Graphic Design", desc: "Brand identities, marketing collateral, and visuals with a polished, modern edge." },
  { icon: Layout, title: "Web Design", desc: "Responsive, conversion-focused websites that look sharp on every device." },
  { icon: PenTool, title: "UI/UX Development", desc: "Thoughtful interfaces and user flows backed by clean, production-ready code." },
  { icon: Smartphone, title: "Desktop & Mobile Apps", desc: "Cross-platform apps engineered for performance, reliability, and scale." },
];

const skills = [
  { icon: ImageIcon, name: "Photoshop" },
  { icon: FileImage, name: "Adobe InDesign" },
  { icon: PenTool, name: "Adobe Illustrator" },
  { icon: Figma, name: "Figma" },
  { icon: Terminal, name: ".NET" },
  { icon: GitBranch, name: "GitHub" },
];

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
  const { theme, toggleTheme } = useTheme();
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`New project inquiry from ${form.name}`);
    const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`);
    window.location.href = `mailto:wisebyteconcepts@gmail.com?subject=${subject}&body=${body}`;
  };
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
      {/* Nav */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-background/70 border-b border-border/50">
        <nav className="container flex items-center justify-between h-16">
          <a href="#home" className="flex items-center gap-2.5">
            <img src={logo} alt="Wise Byte Concepts logo" className="w-8 h-8 rounded-lg" />
            <span className="font-semibold tracking-tight">Wise Byte Concepts</span>
          </a>
          <div className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
            <a href="#work" className="hover:text-foreground transition-colors">Work</a>
            <a href="#services" className="hover:text-foreground transition-colors">Services</a>
            <a href="#skills" className="hover:text-foreground transition-colors">Skills</a>
            <a href="#contact" className="hover:text-foreground transition-colors">Contact</a>
          </div>
          <div className="flex items-center gap-2">
            <Button
              onClick={toggleTheme}
              size="icon"
              variant="ghost"
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
              className="rounded-full"
            >
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
            <Button asChild size="sm" className="bg-gradient-primary hover:opacity-90 transition-opacity shadow-elegant">
              <a href="#contact">Start a project <ArrowRight className="ml-1 h-4 w-4" /></a>
            </Button>
          </div>
        </nav>
      </header>

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
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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
      </section>

      {/* Services */}
      <section id="services" className="bg-secondary/40 border-y border-border/50">
        <div className="container py-24">
          <div className="max-w-2xl mb-12">
            <Badge variant="secondary" className="mb-3 bg-accent text-accent-foreground border-0">What we do</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Services, end to end.</h2>
            <p className="text-muted-foreground text-lg">From first sketch to production deploy — one team, all the way through.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s) => (
              <Card key={s.title} className="p-6 border-border/50 hover:border-primary/40 hover:shadow-soft transition-all duration-300 bg-background">
                <div className="w-11 h-11 rounded-xl bg-accent flex items-center justify-center mb-4">
                  <s.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
              </Card>
            ))}
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
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {skills.map((s) => (
            <Card key={s.name} className="p-6 flex flex-col items-center justify-center gap-3 border-border/50 hover:border-primary/40 hover:shadow-soft transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center">
                <s.icon className="w-6 h-6 text-primary" />
              </div>
              <span className="text-sm font-medium text-center">{s.name}</span>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section id="contact" className="container pb-24">
        <Card className="relative overflow-hidden border-0 bg-gradient-primary p-12 md:p-16 text-primary-foreground shadow-elegant">
          <div className="absolute inset-0 bg-gradient-mesh opacity-20" aria-hidden />
          <div className="relative max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Have a concept worth building?</h2>
            <p className="text-lg opacity-90 mb-8">Tell us about your project. We typically respond within one business day.</p>
            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg" variant="secondary" className="bg-background text-foreground hover:bg-background/90">
                <a href="mailto:hello@wisebyteconcepts.com"><Mail className="mr-2 h-4 w-4" /> hello@wisebyteconcepts.com</a>
              </Button>
              <Button asChild size="lg" variant="outline" className="bg-transparent border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground">
                <a href="#work">See more work</a>
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
            <a href="#" aria-label="GitHub" className="hover:text-primary transition-colors"><Github className="w-4 h-4" /></a>
            <a href="#" aria-label="LinkedIn" className="hover:text-primary transition-colors"><Linkedin className="w-4 h-4" /></a>
            <a href="#" aria-label="Twitter" className="hover:text-primary transition-colors"><Twitter className="w-4 h-4" /></a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;

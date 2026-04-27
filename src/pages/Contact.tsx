import { useEffect, useState } from "react";
import { Mail, Github, Linkedin, Twitter, Phone, MapPin } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { Card } from "@/shared/components/ui/card";
import { Input } from "@/shared/components/ui/input";
import { Textarea } from "@/shared/components/ui/textarea";
import { Label } from "@/shared/components/ui/label";
import Navbar from "@/shared/components/Navbar";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "", phone: "", subject: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    document.title = "Contact Us — Wise Byte Concepts";
    const meta = document.querySelector('meta[name="description"]');
    const content = "Get in touch with Wise Byte Concepts. Send us a message or reach out via email to discuss your project.";
    if (meta) meta.setAttribute("content", content);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const subject = encodeURIComponent(form.subject || `New project inquiry from ${form.name}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone || "Not provided"}\n\nMessage:\n${form.message}`
    );
    window.location.href = `mailto:wisebyteconcepts@gmail.com?subject=${subject}&body=${body}`;

    setTimeout(() => {
      setIsSubmitting(false);
      setForm({ name: "", email: "", message: "", phone: "", subject: "" });
    }, 500);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero" aria-hidden />
        <div className="absolute inset-0 bg-gradient-mesh opacity-60" aria-hidden />
        <div className="container relative py-24 md:py-32">
          <div className="max-w-3xl animate-fade-up">
            <h1 className="text-5xl md:text-6xl font-bold leading-[1.05] mb-6">
              Let's talk about your <span className="text-gradient-primary">project</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-8 leading-relaxed">
              Have a concept worth building? We'd love to hear from you. Get in touch and let's create something amazing together.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="container py-24">
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {/* Contact Info */}
          <div className="space-y-8">
            {/* Email */}
            <Card className="p-6 border-border/50 hover:border-primary/40 hover:shadow-soft transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Email</h3>
                  <a
                    href="mailto:wisebyteconcepts@gmail.com"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    wisebyteconcepts@gmail.com
                  </a>
                  <p className="text-sm text-muted-foreground mt-2">We typically respond within one business day.</p>
                </div>
              </div>
            </Card>

            {/* GitHub */}
            <Card className="p-6 border-border/50 hover:border-primary/40 hover:shadow-soft transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center flex-shrink-0">
                  <Github className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">GitHub</h3>
                  <a
                    href="https://github.com/wisebyteconcepts"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    @wisebyteconcepts
                  </a>
                  <p className="text-sm text-muted-foreground mt-2">Check out our open source projects</p>
                </div>
              </div>
            </Card>

            {/* Social Links */}
            <Card className="p-6 border-border/50 hover:border-primary/40 hover:shadow-soft transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center flex-shrink-0">
                  <Linkedin className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Connect</h3>
                  <div className="flex gap-3 mt-2">
                    <a
                      href="https://linkedin.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      <Linkedin className="w-5 h-5" />
                    </a>
                    <a
                      href="https://twitter.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      <Twitter className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="p-8 border-border/50 bg-secondary/30">
              <h2 className="text-2xl font-bold mb-6">Send us a message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name *</Label>
                    <Input
                      id="name"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Your name"
                      className="border-border/50 focus:border-primary/40"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="your@email.com"
                      className="border-border/50 focus:border-primary/40"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone (Optional)</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="+1 (555) 000-0000"
                    className="border-border/50 focus:border-primary/40"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    placeholder="What is this about?"
                    className="border-border/50 focus:border-primary/40"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message *</Label>
                  <Textarea
                    id="message"
                    required
                    rows={6}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Tell us about your project, timeline, and goals..."
                    className="border-border/50 focus:border-primary/40 resize-none"
                  />
                </div>

                <div className="flex gap-3">
                  <Button
                    type="submit"
                    size="lg"
                    className="bg-gradient-primary hover:opacity-90 transition-opacity shadow-elegant"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                  <Button asChild size="lg" variant="outline">
                    <a href="mailto:wisebyteconcepts@gmail.com">
                      <Mail className="mr-2 h-4 w-4" /> Send via Email
                    </a>
                  </Button>
                </div>

                <p className="text-sm text-muted-foreground">
                  * Required fields. We'll respond to your inquiry as soon as possible.
                </p>
              </form>
            </Card>
          </div>
        </div>

        {/* Additional Info */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="p-8 border-border/50 bg-secondary/30">
            <h3 className="text-xl font-bold mb-4">What to expect</h3>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex gap-3">
                <span className="text-primary font-bold">1.</span>
                <span>You fill out the contact form with project details</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold">2.</span>
                <span>We review your message within 24 hours</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold">3.</span>
                <span>We send you a detailed response with next steps</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold">4.</span>
                <span>Schedule a call to discuss your vision</span>
              </li>
            </ul>
          </Card>

          <Card className="p-8 border-border/50 bg-secondary/30">
            <h3 className="text-xl font-bold mb-4">Our process</h3>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex gap-3">
                <span className="text-primary font-bold">→</span>
                <span>Discovery: Understanding your goals and requirements</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold">→</span>
                <span>Planning: Creating a roadmap for success</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold">→</span>
                <span>Execution: Building with precision and care</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold">→</span>
                <span>Launch: Deploying and supporting your product</span>
              </li>
            </ul>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50">
        <div className="container py-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <span className="text-sm text-muted-foreground">© {new Date().getFullYear()} Wise Byte Concepts. All rights reserved.</span>
          </div>
          <div className="flex items-center gap-4 text-muted-foreground">
            <a href="https://github.com/wisebyteconcepts" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="hover:text-primary transition-colors">
              <Github className="w-4 h-4" />
            </a>
            <a href="mailto:wisebyteconcepts@gmail.com" aria-label="Email" className="hover:text-primary transition-colors">
              <Mail className="w-4 h-4" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Contact;

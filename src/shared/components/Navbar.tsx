import { useTheme } from "@/hooks/use-theme";
import { Button } from "@/shared/components/ui/button";
import { Sun, Moon, ArrowRight, Github } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import logo from "@/assets/wbc-logo.png";

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-background/70 border-b border-border/50">
      <nav className="container flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2.5">
          <img src={logo} alt="Wise Byte Concepts logo" className="w-8 h-8 rounded-lg" />
          <span className="font-semibold tracking-tight">Wise Byte Concepts</span>
        </Link>
        <div className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
          <Link
            to="/"
            className={`hover:text-foreground transition-colors ${location.pathname === "/" ? "text-foreground" : ""}`}
          >
            Work
          </Link>
          <Link
            to="/services"
            className={`hover:text-foreground transition-colors ${location.pathname.includes("/services") ? "text-foreground" : ""}`}
          >
            Services
          </Link>
          <Link
            to="/products"
            className={`hover:text-foreground transition-colors ${location.pathname.includes("/products") ? "text-foreground" : ""}`}
          >
            Products
          </Link>
          <Link
            to="/contact"
            className={`hover:text-foreground transition-colors ${location.pathname === "/contact" ? "text-foreground" : ""}`}
          >
            Contact
          </Link>
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
          <Button asChild size="icon" variant="ghost" aria-label="GitHub" className="rounded-full">
            <a href="https://github.com/wisebyteconcepts" target="_blank" rel="noopener noreferrer">
              <Github className="h-4 w-4" />
            </a>
          </Button>
          <Button asChild size="sm" className="bg-gradient-primary hover:opacity-90 transition-opacity shadow-elegant">
            <Link to="/contact">Start a project <ArrowRight className="ml-1 h-4 w-4" /></Link>
          </Button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;

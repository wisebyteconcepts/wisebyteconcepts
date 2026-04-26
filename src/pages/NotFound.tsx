import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    
            <div className="relative flex min-h-screen items-center justify-center bg-gradient-to-br from-background via-muted/40 to-background px-6">

                {/* Background Glow */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-primary/20 blur-3xl" />
                    <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-secondary/20 blur-3xl" />
                </div>

                {/* Content */}
                <div className="relative z-10 max-w-md text-center">

                    {/* 404 Badge */}
                    <div className="mb-6 inline-block rounded-2xl bg-muted px-6 py-2 text-sm font-medium text-muted-foreground shadow-sm">
                        Error 404
                    </div>

                    {/* Title */}
                    <h1 className="mb-4 text-6xl font-extrabold tracking-tight bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                        Page not found
                    </h1>

                    {/* Description */}
                    <p className="mb-8 text-base text-muted-foreground">
                        The page you're looking for doesn’t exist or may have been moved.
                        Let’s get you back on track.
                    </p>

                    {/* Actions */}
                    <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">

                        <a
                            href="/"
                            className="rounded-xl bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-lg transition hover:scale-[1.02] hover:shadow-xl"
                        >
                            Go Home
                        </a>

                        <button
                            onClick={() => window.history.back()}
                            className="rounded-xl border border-border px-6 py-3 text-sm font-medium transition hover:bg-muted"
                        >
                            Go Back
                        </button>
                    </div>

                    {/* Footer hint */}
                    <p className="mt-8 text-xs text-muted-foreground">
                        If you think this is a mistake, check the URL or contact support.
                    </p>
                </div>
            </div>
        );
    
};

export default NotFound;
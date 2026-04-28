import { useMemo, useState } from "react";
import { Check, Search, X } from "lucide-react";
import dynamicIconImports from "lucide-react/dynamicIconImports";
import { Button } from "@/shared/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/shared/ui/dialog";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import { LucideIcon } from "@/shared/components/LucideIcon";

interface IconPickerProps {
    label?: string;
    value: string | null;
    onChange: (name: string | null) => void;
}

const ALL_ICON_NAMES = Object.keys(dynamicIconImports).sort();

const POPULAR = [
    "code", "code-2", "terminal", "git-branch", "github", "globe",
    "rocket", "zap", "sparkles", "star", "heart", "flame",
    "palette", "pen-tool", "brush", "layout", "layers", "box",
    "smartphone", "monitor", "laptop", "server", "database", "cloud",
    "figma", "framer", "chrome", "atom", "cpu", "settings",
    "package", "shopping-cart", "credit-card", "dollar-sign", "trending-up",
    "shield", "lock", "key", "user", "users", "message-circle",
    "mail", "phone", "calendar", "clock", "map-pin", "image",
];

export const IconPicker = ({ label = "Icon", value, onChange }: IconPickerProps) => {
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState("");

    const results = useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!q) return POPULAR;
        return ALL_ICON_NAMES.filter((n) => n.includes(q)).slice(0, 120);
    }, [query]);

    return (
        <div className="space-y-2">
            <Label>{label}</Label>
            <div className="flex items-center gap-2">
                <button
                    type="button"
                    onClick={() => setOpen(true)}
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-input bg-background hover:border-primary transition-colors"
                    aria-label="Pick icon"
                >
                    {value ? (
                        <LucideIcon name={value} className="h-5 w-5" />
                    ) : (
                        <Search className="h-4 w-4 text-muted-foreground" />
                    )}
                </button>
                <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setOpen(true)}
                    className="flex-1 justify-start font-normal text-muted-foreground"
                >
                    {value ?? "Choose an icon..."}
                </Button>
                {value && (
                    <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => onChange(null)}
                        aria-label="Clear icon"
                    >
                        <X className="h-4 w-4" />
                    </Button>
                )}
            </div>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="max-h-[80vh] sm:max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>Pick an icon</DialogTitle>
                    </DialogHeader>

                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            autoFocus
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Search 1000+ icons (e.g. rocket, code, cloud)..."
                            className="pl-9"
                        />
                    </div>

                    {!query && (
                        <p className="text-xs text-muted-foreground">Popular icons — start typing to search the full library.</p>
                    )}

                    <div className="grid max-h-[50vh] grid-cols-6 gap-2 overflow-y-auto rounded-md border border-border p-3 sm:grid-cols-8">
                        {results.length === 0 && (
                            <p className="col-span-full py-8 text-center text-sm text-muted-foreground">
                                No icons match "{query}"
                            </p>
                        )}
                        {results.map((name) => {
                            const selected = value === name;
                            return (
                                <button
                                    key={name}
                                    type="button"
                                    title={name}
                                    onClick={() => {
                                        onChange(name);
                                        setOpen(false);
                                    }}
                                    className={`group relative flex aspect-square items-center justify-center rounded-md border transition-all ${
                                        selected
                                            ? "border-primary bg-primary/10"
                                            : "border-border hover:border-primary/50 hover:bg-accent"
                                    }`}
                                >
                                    <LucideIcon name={name} className="h-5 w-5" />
                                    {selected && (
                                        <Check className="absolute right-1 top-1 h-3 w-3 text-primary" />
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
};

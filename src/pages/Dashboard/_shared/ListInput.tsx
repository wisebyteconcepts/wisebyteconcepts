import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";

interface ListInputProps {
    label: string;
    value: string[];
    onChange: (next: string[]) => void;
    placeholder?: string;
}

/** Comma-separated list editor — simple and fast for admin use. */
export const ListInput = ({ label, value, onChange, placeholder }: ListInputProps) => {
    return (
        <div className="space-y-2">
            <Label>{label}</Label>
            <Input
                value={value.join(", ")}
                onChange={(e) =>
                    onChange(
                        e.target.value
                            .split(",")
                            .map((v) => v.trim())
                            .filter(Boolean),
                    )
                }
                placeholder={placeholder ?? "Comma-separated values"}
            />
            <p className="text-xs text-muted-foreground">Separate items with commas.</p>
        </div>
    );
};

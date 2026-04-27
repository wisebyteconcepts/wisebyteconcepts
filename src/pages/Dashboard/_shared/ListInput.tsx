import { useState } from "react";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import { Button } from "@/shared/ui/button";
import { Badge } from "@/shared/ui/badge";
import { X } from "lucide-react";

interface ListInputProps {
    label: string;
    value: string[];
    onChange: (next: string[]) => void;
    placeholder?: string;
}

/** List editor with tag display and comma-separated input support. */
export const ListInput = ({ label, value, onChange, placeholder }: ListInputProps) => {
    const [inputValue, setInputValue] = useState("");

    const handleAddItem = (item: string) => {
        const trimmed = item.trim();
        if (trimmed && !value.includes(trimmed)) {
            onChange([...value, trimmed]);
            setInputValue("");
        }
    };

    const handleRemoveItem = (item: string) => {
        onChange(value.filter((v) => v !== item));
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const text = e.target.value;
        setInputValue(text);

        // Auto-split on comma
        if (text.includes(",")) {
            const items = text
                .split(",")
                .map((v) => v.trim())
                .filter(Boolean);

            if (items.length > 0) {
                // Add all but the last item (which might be incomplete)
                const completeItems = items.slice(0, -1);
                const lastItem = items[items.length - 1];

                completeItems.forEach((item) => {
                    if (!value.includes(item)) {
                        onChange([...value, item]);
                    }
                });

                setInputValue(lastItem);
            }
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            e.preventDefault();
            handleAddItem(inputValue);
        }
    };

    return (
        <div className="space-y-2">
            <Label>{label}</Label>
            <Input
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                placeholder={placeholder ?? "Type and press Enter or use commas to add"}
            />
            {value.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                    {value.map((item) => (
                        <Badge
                            key={item}
                            variant="secondary"
                            className="flex items-center gap-1 pr-1"
                        >
                            {item}
                            <button
                                type="button"
                                onClick={() => handleRemoveItem(item)}
                                className="ml-1 hover:text-destructive transition-colors"
                                aria-label={`Remove ${item}`}
                            >
                                <X className="h-3 w-3" />
                            </button>
                        </Badge>
                    ))}
                </div>
            )}
            <p className="text-xs text-muted-foreground">
                Type items and press Enter, or separate with commas
            </p>
        </div>
    );
};

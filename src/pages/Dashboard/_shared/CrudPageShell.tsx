import { ReactNode } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/shared/ui/button";
import { Card } from "@/shared/ui/card";

interface CrudPageShellProps {
    title: string;
    description: string;
    onAdd: () => void;
    addLabel?: string;
    children: ReactNode;
    count: number;
}

export const CrudPageShell = ({
    title,
    description,
    onAdd,
    addLabel = "Add new",
    children,
    count,
}: CrudPageShellProps) => {
    return (
        <div className="space-y-6">
            <div className="flex items-start justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
                    <p className="text-sm text-muted-foreground">
                        {description} · {count} total
                    </p>
                </div>
                <Button onClick={onAdd} size="sm">
                    <Plus className="mr-2 h-4 w-4" />
                    {addLabel}
                </Button>
            </div>

            <Card className="border-border/50">{children}</Card>
        </div>
    );
};

import { lazy, Suspense, memo } from "react";
import type { LucideProps } from "lucide-react";
import dynamicIconImports from "lucide-react/dynamicIconImports";

interface Props extends Omit<LucideProps, "ref"> {
    name: string;
    fallback?: React.ReactNode;
}

/**
 * Renders any Lucide icon by its kebab-case name (e.g. "rocket", "code-2").
 * Uses dynamic imports so only icons actually rendered are bundled/loaded.
 */
const LucideIconBase = ({ name, fallback = null, ...props }: Props) => {
    const importer = (dynamicIconImports as Record<string, () => Promise<{ default: React.ComponentType<LucideProps> }>>)[name];
    if (!importer) return <>{fallback}</>;
    const Icon = lazy(importer);
    return (
        <Suspense fallback={fallback}>
            <Icon {...props} />
        </Suspense>
    );
};

export const LucideIcon = memo(LucideIconBase);

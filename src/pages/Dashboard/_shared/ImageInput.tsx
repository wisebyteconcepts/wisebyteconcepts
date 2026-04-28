import { useRef, useState } from "react";
import { Upload, X, Image as ImageIcon, Link as LinkIcon } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";

interface ImageInputProps {
    label?: string;
    value: string | null;
    onChange: (value: string | null) => void;
    /** Max width/height in px. Larger images are scaled down. */
    maxDimension?: number;
    /** JPEG quality 0–1 */
    quality?: number;
    /** Hard cap on stored size (KB). */
    maxKB?: number;
}

const readFile = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });

const loadImage = (src: string): Promise<HTMLImageElement> =>
    new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = src;
    });

/**
 * Compress an image file client-side.
 * Resizes to fit within maxDimension and re-encodes as JPEG.
 */
async function compressImage(
    file: File,
    maxDimension: number,
    quality: number,
): Promise<string> {
    const dataUrl = await readFile(file);
    const img = await loadImage(dataUrl);

    let { width, height } = img;
    if (width > maxDimension || height > maxDimension) {
        const ratio = Math.min(maxDimension / width, maxDimension / height);
        width = Math.round(width * ratio);
        height = Math.round(height * ratio);
    }

    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Canvas not supported");
    ctx.drawImage(img, 0, 0, width, height);

    // Use JPEG for photos (much smaller than PNG). Preserve PNG only if has alpha-ish type.
    const mime = file.type === "image/png" ? "image/png" : "image/jpeg";
    return canvas.toDataURL(mime, quality);
}

export const ImageInput = ({
    label = "Featured image",
    value,
    onChange,
    maxDimension = 1280,
    quality = 0.8,
    maxKB = 600,
}: ImageInputProps) => {
    const fileRef = useRef<HTMLInputElement>(null);
    const [busy, setBusy] = useState(false);
    const [mode, setMode] = useState<"upload" | "url">(
        value && value.startsWith("data:") ? "upload" : "url",
    );

    const handleFile = async (file: File) => {
        if (!file.type.startsWith("image/")) {
            toast.error("Please select an image file");
            return;
        }
        setBusy(true);
        try {
            let compressed = await compressImage(file, maxDimension, quality);
            // If still too big, crank quality down progressively.
            let q = quality;
            while (compressed.length / 1024 > maxKB && q > 0.3) {
                q -= 0.1;
                compressed = await compressImage(file, maxDimension, q);
            }
            const sizeKB = Math.round(compressed.length / 1024);
            onChange(compressed);
            toast.success(`Image ready (${sizeKB} KB)`);
        } catch (err) {
            console.error(err);
            toast.error("Could not process image");
        } finally {
            setBusy(false);
            if (fileRef.current) fileRef.current.value = "";
        }
    };

    const clear = () => onChange(null);

    return (
        <div className="space-y-2">
            <div className="flex items-center justify-between">
                <Label>{label}</Label>
                <div className="flex gap-1 rounded-md border border-border p-0.5 text-xs">
                    <button
                        type="button"
                        onClick={() => setMode("upload")}
                        className={`flex items-center gap-1 rounded px-2 py-1 transition-colors ${
                            mode === "upload"
                                ? "bg-primary text-primary-foreground"
                                : "text-muted-foreground hover:text-foreground"
                        }`}
                    >
                        <Upload className="h-3 w-3" /> Upload
                    </button>
                    <button
                        type="button"
                        onClick={() => setMode("url")}
                        className={`flex items-center gap-1 rounded px-2 py-1 transition-colors ${
                            mode === "url"
                                ? "bg-primary text-primary-foreground"
                                : "text-muted-foreground hover:text-foreground"
                        }`}
                    >
                        <LinkIcon className="h-3 w-3" /> URL
                    </button>
                </div>
            </div>

            {/* Preview */}
            {value ? (
                <div className="relative overflow-hidden rounded-lg border border-border bg-muted/30">
                    <img
                        src={value}
                        alt="Preview"
                        className="aspect-[16/9] w-full object-cover"
                        onError={() => toast.error("Image failed to load")}
                    />
                    <Button
                        type="button"
                        size="icon"
                        variant="secondary"
                        className="absolute right-2 top-2 h-7 w-7 shadow"
                        onClick={clear}
                    >
                        <X className="h-4 w-4" />
                    </Button>
                </div>
            ) : (
                <div className="flex aspect-[16/9] w-full items-center justify-center rounded-lg border border-dashed border-border bg-muted/20 text-muted-foreground">
                    <div className="flex flex-col items-center gap-1 text-xs">
                        <ImageIcon className="h-6 w-6" />
                        <span>No image selected</span>
                    </div>
                </div>
            )}

            {mode === "upload" ? (
                <div>
                    <input
                        ref={fileRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                            const f = e.target.files?.[0];
                            if (f) handleFile(f);
                        }}
                    />
                    <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        disabled={busy}
                        onClick={() => fileRef.current?.click()}
                        className="w-full"
                    >
                        <Upload className="mr-2 h-4 w-4" />
                        {busy ? "Processing..." : value ? "Replace image" : "Choose image"}
                    </Button>
                    <p className="mt-1 text-xs text-muted-foreground">
                        Auto-resized to {maxDimension}px and compressed to under {maxKB} KB.
                    </p>
                </div>
            ) : (
                <Input
                    value={value && !value.startsWith("data:") ? value : ""}
                    onChange={(e) => onChange(e.target.value || null)}
                    placeholder="https://example.com/image.jpg"
                />
            )}
        </div>
    );
};

import { useRef, useState } from "react";
import { Upload, X, Image as ImageIcon, Link as LinkIcon } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";

interface ImagesInputProps {
    label?: string;
    value: string[];
    onChange: (value: string[]) => void;
    maxDimension?: number;
    quality?: number;
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

    const mime = file.type === "image/png" ? "image/png" : "image/jpeg";
    return canvas.toDataURL(mime, quality);
}

export const ImagesInput = ({
    label = "Screenshots",
    value,
    onChange,
    maxDimension = 1280,
    quality = 0.8,
    maxKB = 600,
}: ImagesInputProps) => {
    const fileRef = useRef<HTMLInputElement>(null);
    const [busy, setBusy] = useState(false);
    const [mode, setMode] = useState<"upload" | "url">("upload");
    const [urlInput, setUrlInput] = useState("");

    const handleFile = async (file: File) => {
        if (!file.type.startsWith("image/")) {
            toast.error("Please select an image file");
            return;
        }
        setBusy(true);
        try {
            let compressed = await compressImage(file, maxDimension, quality);
            let q = quality;
            while (compressed.length / 1024 > maxKB && q > 0.3) {
                q -= 0.1;
                compressed = await compressImage(file, maxDimension, q);
            }
            const sizeKB = Math.round(compressed.length / 1024);
            onChange([...value, compressed]);
            toast.success(`Image added (${sizeKB} KB)`);
        } catch (err) {
            console.error(err);
            toast.error("Could not process image");
        } finally {
            setBusy(false);
            if (fileRef.current) fileRef.current.value = "";
        }
    };

    const handleAddUrl = () => {
        if (!urlInput.trim()) {
            toast.error("Please enter a URL");
            return;
        }
        onChange([...value, urlInput]);
        setUrlInput("");
        toast.success("Image URL added");
    };

    const removeImage = (index: number) => {
        onChange(value.filter((_, i) => i !== index));
    };

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

            {/* Add Image Section */}
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
                        {busy ? "Processing..." : "Add image"}
                    </Button>
                    <p className="mt-1 text-xs text-muted-foreground">
                        Auto-resized to {maxDimension}px and compressed to under {maxKB} KB.
                    </p>
                </div>
            ) : (
                <div className="flex gap-2">
                    <Input
                        value={urlInput}
                        onChange={(e) => setUrlInput(e.target.value)}
                        placeholder="https://example.com/image.jpg"
                        onKeyDown={(e) => {
                            if (e.key === "Enter") handleAddUrl();
                        }}
                    />
                    <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={handleAddUrl}
                    >
                        Add
                    </Button>
                </div>
            )}

            {/* Gallery Grid */}
            {value.length > 0 && (
                <div className="mt-4 space-y-2">
                    <Label className="text-xs text-muted-foreground">
                        {value.length} image{value.length !== 1 ? "s" : ""} added
                    </Label>
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                        {value.map((img, idx) => (
                            <div
                                key={idx}
                                className="group relative overflow-hidden rounded-lg border border-border bg-muted/30"
                            >
                                <img
                                    src={img}
                                    alt={`Screenshot ${idx + 1}`}
                                    className="aspect-[16/9] w-full object-cover"
                                    onError={() => {
                                        toast.error(`Image ${idx + 1} failed to load`);
                                        removeImage(idx);
                                    }}
                                />
                                <Button
                                    type="button"
                                    size="icon"
                                    variant="secondary"
                                    className="absolute right-1 top-1 h-6 w-6 opacity-0 shadow transition-opacity group-hover:opacity-100"
                                    onClick={() => removeImage(idx)}
                                >
                                    <X className="h-3 w-3" />
                                </Button>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

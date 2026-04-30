import { useState } from "react";
import { Pencil, Trash2, Star, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { useData } from "@/features/data/DataContext";
import type { Service } from "@/features/data/data.types";
import { AdminLayout } from "@/layouts/AdminLayout";
import { Button } from "@/shared/ui/button";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/shared/ui/dialog";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import { Textarea } from "@/shared/ui/textarea";
import { Switch } from "@/shared/ui/switch";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/shared/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/shared/ui/table";
import { Badge } from "@/shared/ui/badge";
import { CrudPageShell } from "./_shared/CrudPageShell";
import { ListInput } from "./_shared/ListInput";
import { ImageInput } from "./_shared/ImageInput";
import { ImagesInput } from "./_shared/ImagesInput";

const slugify = (s: string) =>
    s
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

const emptyService = (): Service => ({
    id: "",
    slug: "",
    name: "",
    caption: "",
    header: "",
    shortDescription: "",
    fullDescription: "",
    thumbnail: null,
    bannerImage: null,
    gallery: [],
    category: "Web",
    tags: [],
    features: [],
    deliverables: [],
    pricing: { model: "custom", note: "Contact for quote" },
    estimatedDuration: "",
    technologies: [],
    relatedProjects: [],
    cta: { label: "Schedule a consultation", url: "/contact" },
    seo: {},
    isActive: true,
    isFeatured: false,
    order: 0,
    color: "from-blue-500/20 to-cyan-500/20",
});

const COLOR_OPTIONS = [
    { label: "Purple → Pink", value: "from-purple-500/20 to-pink-500/20" },
    { label: "Blue → Cyan", value: "from-blue-500/20 to-cyan-500/20" },
    { label: "Emerald → Teal", value: "from-emerald-500/20 to-teal-500/20" },
    { label: "Orange → Red", value: "from-orange-500/20 to-red-500/20" },
    { label: "Indigo → Blue", value: "from-indigo-500/20 to-blue-500/20" },
    { label: "Violet → Purple", value: "from-violet-500/20 to-purple-500/20" },
];

const ServicesAdminPage = () => {
    const { services, products, addService, updateService, deleteService } = useData();
    const [open, setOpen] = useState(false);
    const [editing, setEditing] = useState<Service | null>(null);
    const [form, setForm] = useState<Service>(emptyService());

    const update = <K extends keyof Service>(key: K, val: Service[K]) =>
        setForm((prev) => ({ ...prev, [key]: val }));

    const openAdd = () => {
        setEditing(null);
        setForm(emptyService());
        setOpen(true);
    };

    const openEdit = (s: Service) => {
        setEditing(s);
        setForm({ ...s });
        setOpen(true);
    };

    const handleSave = () => {
        if (!form.name.trim()) {
            toast.error("Name is required");
            return;
        }
        const slug = (form.slug || slugify(form.name)).trim();
        const id = editing?.id || form.id || slug;
        const payload: Service = {
            ...form,
            id,
            slug,
            header: form.header || form.name,
            caption: form.caption || form.shortDescription,
            // sync legacy aliases so older UI keeps working
            title: form.name,
            description: form.shortDescription,
            screenshot: form.bannerImage ?? form.thumbnail ?? null,
        };
        if (editing) {
            updateService(editing.id, payload);
            toast.success("Service updated");
        } else {
            if (services.some((s) => s.id === id)) {
                toast.error("A service with this ID already exists");
                return;
            }
            addService(payload);
            toast.success("Service added");
        }
        setOpen(false);
    };

    const handleDelete = (s: Service) => {
        if (!confirm(`Delete service "${s.name}"?`)) return;
        deleteService(s.id);
        toast.success("Service deleted");
    };

    const ordered = [...services].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

    return (
        <AdminLayout>
            <CrudPageShell
                title="Services"
                description="Manage what your studio offers"
                onAdd={openAdd}
                addLabel="Add service"
                count={services.length}
            >
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-12">#</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead className="hidden md:table-cell">Category</TableHead>
                            <TableHead className="hidden lg:table-cell">Tags</TableHead>
                            <TableHead className="hidden md:table-cell">Status</TableHead>
                            <TableHead className="w-[120px] text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {ordered.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={6} className="py-10 text-center text-sm text-muted-foreground">
                                    No services yet. Click "Add service" to create one.
                                </TableCell>
                            </TableRow>
                        )}
                        {ordered.map((s) => (
                            <TableRow key={s.id}>
                                <TableCell className="text-muted-foreground">{s.order ?? 0}</TableCell>
                                <TableCell>
                                    <div className="font-medium flex items-center gap-2">
                                        {s.name}
                                        {s.isFeatured && <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />}
                                    </div>
                                    <div className="text-xs text-muted-foreground">/{s.slug}</div>
                                </TableCell>
                                <TableCell className="hidden md:table-cell text-muted-foreground">{s.category}</TableCell>
                                <TableCell className="hidden lg:table-cell">
                                    <div className="flex flex-wrap gap-1">
                                        {(s.tags ?? []).slice(0, 3).map((t) => (
                                            <Badge key={t} variant="secondary" className="text-xs">{t}</Badge>
                                        ))}
                                        {(s.tags?.length ?? 0) > 3 && (
                                            <span className="text-xs text-muted-foreground">+{s.tags!.length - 3}</span>
                                        )}
                                    </div>
                                </TableCell>
                                <TableCell className="hidden md:table-cell">
                                    {s.isActive ? (
                                        <Badge variant="outline" className="text-xs">Active</Badge>
                                    ) : (
                                        <Badge variant="outline" className="text-xs text-muted-foreground">
                                            <EyeOff className="mr-1 h-3 w-3" /> Hidden
                                        </Badge>
                                    )}
                                </TableCell>
                                <TableCell className="text-right">
                                    <div className="flex justify-end gap-2">
                                        <Button size="icon" variant="ghost" onClick={() => openEdit(s)}>
                                            <Pencil className="h-4 w-4" />
                                        </Button>
                                        <Button size="icon" variant="ghost" onClick={() => handleDelete(s)}>
                                            <Trash2 className="h-4 w-4 text-destructive" />
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CrudPageShell>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="max-h-[92vh] overflow-y-auto sm:max-w-3xl">
                    <DialogHeader>
                        <DialogTitle>{editing ? "Edit service" : "Add service"}</DialogTitle>
                    </DialogHeader>

                    <Tabs defaultValue="content" className="w-full">
                        <TabsList className="w-full justify-start overflow-x-auto">
                            <TabsTrigger value="content">Content</TabsTrigger>
                            <TabsTrigger value="media">Media</TabsTrigger>
                            <TabsTrigger value="organize">Organize</TabsTrigger>
                            <TabsTrigger value="value">Value</TabsTrigger>
                            <TabsTrigger value="commercial">Commercial</TabsTrigger>
                            <TabsTrigger value="tech">Tech</TabsTrigger>
                            <TabsTrigger value="seo">SEO</TabsTrigger>
                            <TabsTrigger value="control">Control</TabsTrigger>
                        </TabsList>

                        {/* CONTENT */}
                        <TabsContent value="content" className="space-y-4 pt-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Name (internal)</Label>
                                    <Input
                                        value={form.name}
                                        onChange={(e) => {
                                            const name = e.target.value;
                                            setForm((p) => ({
                                                ...p,
                                                name,
                                                slug: editing ? p.slug : slugify(name),
                                                header: p.header || name,
                                            }));
                                        }}
                                        placeholder="Web Design"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>Slug (URL)</Label>
                                    <Input
                                        value={form.slug}
                                        onChange={(e) => update("slug", slugify(e.target.value))}
                                        placeholder="web-design"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label>Header (detail page title)</Label>
                                <Input
                                    value={form.header}
                                    onChange={(e) => update("header", e.target.value)}
                                    placeholder="Web Design that converts"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label>Caption (small UI hook)</Label>
                                <Input
                                    value={form.caption}
                                    onChange={(e) => update("caption", e.target.value)}
                                    placeholder="Responsive, conversion-first websites"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label>Short description (preview)</Label>
                                <Textarea
                                    rows={2}
                                    value={form.shortDescription}
                                    onChange={(e) => update("shortDescription", e.target.value)}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label>Full description</Label>
                                <Textarea
                                    rows={5}
                                    value={form.fullDescription}
                                    onChange={(e) => update("fullDescription", e.target.value)}
                                />
                            </div>
                        </TabsContent>

                        {/* MEDIA */}
                        <TabsContent value="media" className="space-y-5 pt-4">
                            <ImageInput
                                label="Thumbnail (cards/grid)"
                                value={form.thumbnail}
                                onChange={(v) => update("thumbnail", v)}
                            />
                            <ImageInput
                                label="Banner image (hero)"
                                value={form.bannerImage}
                                onChange={(v) => update("bannerImage", v)}
                            />
                            <ImagesInput
                                label="Gallery"
                                value={form.gallery}
                                onChange={(v) => update("gallery", v)}
                            />

                            <div className="space-y-2">
                                <Label>Card gradient</Label>
                                <div className="grid grid-cols-3 gap-2">
                                    {COLOR_OPTIONS.map((opt) => (
                                        <button
                                            key={opt.value}
                                            type="button"
                                            onClick={() => update("color", opt.value)}
                                            className={`flex h-16 items-center justify-center gap-2 rounded-lg border-2 p-2 text-xs font-medium transition-all ${
                                                form.color === opt.value
                                                    ? "border-primary bg-accent"
                                                    : "border-border hover:border-primary/40"
                                            }`}
                                        >
                                            <div className={`h-6 w-6 rounded bg-gradient-to-br ${opt.value}`} />
                                            {opt.label}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </TabsContent>

                        {/* ORGANIZE */}
                        <TabsContent value="organize" className="space-y-4 pt-4">
                            <div className="space-y-2">
                                <Label>Category</Label>
                                <Input
                                    value={form.category}
                                    onChange={(e) => update("category", e.target.value)}
                                    placeholder="Design / Web / Engineering"
                                />
                            </div>
                            <ListInput
                                label="Tags"
                                value={form.tags}
                                onChange={(v) => update("tags", v)}
                                placeholder="branding, ui, mobile"
                            />
                        </TabsContent>

                        {/* VALUE */}
                        <TabsContent value="value" className="space-y-4 pt-4">
                            <ListInput
                                label="Features (selling points)"
                                value={form.features}
                                onChange={(v) => update("features", v)}
                                placeholder="Logo design, Style guide..."
                            />
                            <ListInput
                                label="Deliverables (concrete outputs)"
                                value={form.deliverables}
                                onChange={(v) => update("deliverables", v)}
                                placeholder="Brand book PDF, Source files..."
                            />
                        </TabsContent>

                        {/* COMMERCIAL */}
                        <TabsContent value="commercial" className="space-y-4 pt-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Pricing model</Label>
                                    <Select
                                        value={form.pricing.model}
                                        onValueChange={(v) =>
                                            update("pricing", { ...form.pricing, model: v as Service["pricing"]["model"] })
                                        }
                                    >
                                        <SelectTrigger><SelectValue /></SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="fixed">Fixed</SelectItem>
                                            <SelectItem value="hourly">Hourly</SelectItem>
                                            <SelectItem value="starting_at">Starting at</SelectItem>
                                            <SelectItem value="custom">Custom</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label>Currency</Label>
                                    <Input
                                        value={form.pricing.currency ?? ""}
                                        onChange={(e) => update("pricing", { ...form.pricing, currency: e.target.value })}
                                        placeholder="USD"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>Amount</Label>
                                    <Input
                                        type="number"
                                        value={form.pricing.amount ?? ""}
                                        onChange={(e) =>
                                            update("pricing", {
                                                ...form.pricing,
                                                amount: e.target.value === "" ? null : Number(e.target.value),
                                            })
                                        }
                                        placeholder="1500"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>Note</Label>
                                    <Input
                                        value={form.pricing.note ?? ""}
                                        onChange={(e) => update("pricing", { ...form.pricing, note: e.target.value })}
                                        placeholder="per project"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label>Estimated duration</Label>
                                <Input
                                    value={form.estimatedDuration}
                                    onChange={(e) => update("estimatedDuration", e.target.value)}
                                    placeholder="2–4 weeks"
                                />
                            </div>

                            <div className="space-y-2 border-t pt-4">
                                <Label>CTA button</Label>
                                <div className="grid grid-cols-2 gap-4">
                                    <Input
                                        value={form.cta.label}
                                        onChange={(e) => update("cta", { ...form.cta, label: e.target.value })}
                                        placeholder="Schedule a consultation"
                                    />
                                    <Input
                                        value={form.cta.url}
                                        onChange={(e) => update("cta", { ...form.cta, url: e.target.value })}
                                        placeholder="/contact"
                                    />
                                </div>
                            </div>
                        </TabsContent>

                        {/* TECH */}
                        <TabsContent value="tech" className="space-y-4 pt-4">
                            <ListInput
                                label="Technologies"
                                value={form.technologies}
                                onChange={(v) => update("technologies", v)}
                                placeholder="React, TypeScript, Figma"
                            />

                            <div className="space-y-2">
                                <Label>Related projects</Label>
                                <p className="text-xs text-muted-foreground">Pick from existing products</p>
                                <div className="flex flex-wrap gap-2">
                                    {products.map((p) => {
                                        const active = form.relatedProjects.includes(p.id);
                                        return (
                                            <button
                                                key={p.id}
                                                type="button"
                                                onClick={() =>
                                                    update(
                                                        "relatedProjects",
                                                        active
                                                            ? form.relatedProjects.filter((id) => id !== p.id)
                                                            : [...form.relatedProjects, p.id],
                                                    )
                                                }
                                                className={`rounded-full border px-3 py-1 text-xs transition-colors ${
                                                    active
                                                        ? "border-primary bg-primary text-primary-foreground"
                                                        : "border-border hover:border-primary/50"
                                                }`}
                                            >
                                                {p.title}
                                            </button>
                                        );
                                    })}
                                    {products.length === 0 && (
                                        <p className="text-xs text-muted-foreground">No products available yet.</p>
                                    )}
                                </div>
                            </div>
                        </TabsContent>

                        {/* SEO */}
                        <TabsContent value="seo" className="space-y-4 pt-4">
                            <div className="space-y-2">
                                <Label>Meta title</Label>
                                <Input
                                    value={form.seo.metaTitle ?? ""}
                                    onChange={(e) => update("seo", { ...form.seo, metaTitle: e.target.value })}
                                    placeholder="Web Design Services — Wise Byte Concepts"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Meta description</Label>
                                <Textarea
                                    rows={3}
                                    value={form.seo.metaDescription ?? ""}
                                    onChange={(e) => update("seo", { ...form.seo, metaDescription: e.target.value })}
                                />
                            </div>
                            <ListInput
                                label="Keywords"
                                value={form.seo.keywords ?? []}
                                onChange={(v) => update("seo", { ...form.seo, keywords: v })}
                                placeholder="web design, ui, ux"
                            />
                            <ImageInput
                                label="OG image"
                                value={form.seo.ogImage ?? null}
                                onChange={(v) => update("seo", { ...form.seo, ogImage: v })}
                            />
                        </TabsContent>

                        {/* CONTROL */}
                        <TabsContent value="control" className="space-y-5 pt-4">
                            <div className="flex items-center justify-between rounded-lg border p-4">
                                <div>
                                    <Label className="text-base">Active</Label>
                                    <p className="text-xs text-muted-foreground">Hidden services don't appear on the site</p>
                                </div>
                                <Switch
                                    checked={form.isActive}
                                    onCheckedChange={(v) => update("isActive", v)}
                                />
                            </div>
                            <div className="flex items-center justify-between rounded-lg border p-4">
                                <div>
                                    <Label className="text-base">Featured</Label>
                                    <p className="text-xs text-muted-foreground">Highlight on homepage</p>
                                </div>
                                <Switch
                                    checked={form.isFeatured}
                                    onCheckedChange={(v) => update("isFeatured", v)}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Display order</Label>
                                <Input
                                    type="number"
                                    value={form.order}
                                    onChange={(e) => update("order", Number(e.target.value) || 0)}
                                />
                            </div>
                        </TabsContent>
                    </Tabs>

                    <DialogFooter className="pt-4">
                        <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                        <Button onClick={handleSave}>{editing ? "Save changes" : "Create"}</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </AdminLayout>
    );
};

export default ServicesAdminPage;

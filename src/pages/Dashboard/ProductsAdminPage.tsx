import { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useData } from "@/features/data/DataContext";
import type { Product } from "@/features/data/data.types";
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
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/shared/ui/table";
import { CrudPageShell } from "./_shared/CrudPageShell";
import { ListInput } from "./_shared/ListInput";
import { ImageInput } from "./_shared/ImageInput";
import { ImagesInput } from "./_shared/ImagesInput";

const emptyProduct = (): Product => ({
    id: "",
    tag: "",
    title: "",
    desc: "",
    url: null,
    color: "from-blue-500/20 to-indigo-500/20",
    screenshot: null,
    screenshots: [],
    fullDescription: "",
    challenges: [],
    solutions: [],
    technologies: [],
    results: [],
});

const slugify = (s: string) =>
    s
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

const ProductsAdminPage = () => {
    const { products, addProduct, updateProduct, deleteProduct } = useData();
    const [open, setOpen] = useState(false);
    const [editing, setEditing] = useState<Product | null>(null);
    const [form, setForm] = useState<Product>(emptyProduct());

    const openAdd = () => {
        setEditing(null);
        setForm(emptyProduct());
        setOpen(true);
    };

    const openEdit = (p: Product) => {
        setEditing(p);
        setForm({ ...p });
        setOpen(true);
    };

    const handleSave = () => {
        if (!form.title.trim()) {
            toast.error("Title is required");
            return;
        }
        if (editing) {
            updateProduct(editing.id, form);
            toast.success("Product updated");
        } else {
            const id = form.id || slugify(form.title);
            if (products.some((p) => p.id === id)) {
                toast.error("A product with this ID already exists");
                return;
            }
            addProduct({ ...form, id });
            toast.success("Product added");
        }
        setOpen(false);
    };

    const handleDelete = (p: Product) => {
        if (!confirm(`Delete product "${p.title}"?`)) return;
        deleteProduct(p.id);
        toast.success("Product deleted");
    };

    return (
        <AdminLayout>
            <CrudPageShell
                title="Products"
                description="Showcase work you've shipped"
                onAdd={openAdd}
                addLabel="Add product"
                count={products.length}
            >
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Title</TableHead>
                            <TableHead className="hidden md:table-cell">Tag</TableHead>
                            <TableHead className="hidden lg:table-cell">URL</TableHead>
                            <TableHead className="w-[120px] text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {products.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={4} className="py-10 text-center text-sm text-muted-foreground">
                                    No products yet.
                                </TableCell>
                            </TableRow>
                        )}
                        {products.map((p) => (
                            <TableRow key={p.id}>
                                <TableCell className="font-medium">{p.title}</TableCell>
                                <TableCell className="hidden text-muted-foreground md:table-cell">
                                    {p.tag}
                                </TableCell>
                                <TableCell className="hidden max-w-xs truncate text-muted-foreground lg:table-cell">
                                    {p.url ?? "—"}
                                </TableCell>
                                <TableCell className="text-right">
                                    <div className="flex justify-end gap-2">
                                        <Button size="icon" variant="ghost" onClick={() => openEdit(p)}>
                                            <Pencil className="h-4 w-4" />
                                        </Button>
                                        <Button size="icon" variant="ghost" onClick={() => handleDelete(p)}>
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
                <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>{editing ? "Edit product" : "Add product"}</DialogTitle>
                    </DialogHeader>

                    <div className="space-y-4 py-2">
                        <div className="grid gap-4 sm:grid-cols-2">
                            <div className="space-y-2">
                                <Label>Title</Label>
                                <Input
                                    value={form.title}
                                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Tag</Label>
                                <Input
                                    value={form.tag}
                                    onChange={(e) => setForm({ ...form, tag: e.target.value })}
                                    placeholder="Web, Mobile, Healthcare..."
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label>Short description</Label>
                            <Input
                                value={form.desc}
                                onChange={(e) => setForm({ ...form, desc: e.target.value })}
                            />
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                            <div className="space-y-2">
                                <Label>URL (optional)</Label>
                                <Input
                                    value={form.url ?? ""}
                                    onChange={(e) => setForm({ ...form, url: e.target.value || null })}
                                    placeholder="https://..."
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Gradient classes</Label>
                                <Input
                                    value={form.color}
                                    onChange={(e) => setForm({ ...form, color: e.target.value })}
                                />
                            </div>
                        </div>

                        <ImageInput
                            label="Featured image"
                            value={form.screenshot}
                            onChange={(v) => setForm({ ...form, screenshot: v })}
                        />

                        <ImagesInput
                            label="Additional screenshots"
                            value={form.screenshots || []}
                            onChange={(v) => setForm({ ...form, screenshots: v })}
                        />

                        <div className="space-y-2">
                            <Label>Full description</Label>
                            <Textarea
                                rows={4}
                                value={form.fullDescription}
                                onChange={(e) => setForm({ ...form, fullDescription: e.target.value })}
                            />
                        </div>

                        <ListInput
                            label="Challenges"
                            value={form.challenges}
                            onChange={(v) => setForm({ ...form, challenges: v })}
                        />
                        <ListInput
                            label="Solutions"
                            value={form.solutions}
                            onChange={(v) => setForm({ ...form, solutions: v })}
                        />
                        <ListInput
                            label="Technologies"
                            value={form.technologies}
                            onChange={(v) => setForm({ ...form, technologies: v })}
                        />
                        <ListInput
                            label="Results"
                            value={form.results}
                            onChange={(v) => setForm({ ...form, results: v })}
                        />
                    </div>

                    <DialogFooter>
                        <Button variant="outline" onClick={() => setOpen(false)}>
                            Cancel
                        </Button>
                        <Button onClick={handleSave}>{editing ? "Save changes" : "Create"}</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </AdminLayout>
    );
};

export default ProductsAdminPage;

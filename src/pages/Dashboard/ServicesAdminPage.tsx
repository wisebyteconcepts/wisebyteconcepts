import { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
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

const emptyService = (): Service => ({
    id: "",
    title: "",
    description: "",
    fullDescription: "",
    screenshot: null,
    features: [],
    process: [],
});

const slugify = (s: string) =>
    s
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

const ServicesAdminPage = () => {
    const { services, addService, updateService, deleteService } = useData();
    const [open, setOpen] = useState(false);
    const [editing, setEditing] = useState<Service | null>(null);
    const [form, setForm] = useState<Service>(emptyService());

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
        if (!form.title.trim()) {
            toast.error("Title is required");
            return;
        }
        if (editing) {
            updateService(editing.id, form);
            toast.success("Service updated");
        } else {
            const id = form.id || slugify(form.title);
            if (services.some((s) => s.id === id)) {
                toast.error("A service with this ID already exists");
                return;
            }
            addService({ ...form, id });
            toast.success("Service added");
        }
        setOpen(false);
    };

    const handleDelete = (s: Service) => {
        if (!confirm(`Delete service "${s.title}"?`)) return;
        deleteService(s.id);
        toast.success("Service deleted");
    };

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
                            <TableHead>Title</TableHead>
                            <TableHead className="hidden md:table-cell">Description</TableHead>
                            <TableHead className="hidden lg:table-cell">Features</TableHead>
                            <TableHead className="w-[120px] text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {services.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={4} className="py-10 text-center text-sm text-muted-foreground">
                                    No services yet. Click "Add service" to create one.
                                </TableCell>
                            </TableRow>
                        )}
                        {services.map((s) => (
                            <TableRow key={s.id}>
                                <TableCell className="font-medium">{s.title}</TableCell>
                                <TableCell className="hidden max-w-md truncate text-muted-foreground md:table-cell">
                                    {s.description}
                                </TableCell>
                                <TableCell className="hidden text-muted-foreground lg:table-cell">
                                    {s.features.length}
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
                <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>{editing ? "Edit service" : "Add service"}</DialogTitle>
                    </DialogHeader>

                    <div className="space-y-4 py-2">
                        <div className="space-y-2">
                            <Label>Title</Label>
                            <Input
                                value={form.title}
                                onChange={(e) => setForm({ ...form, title: e.target.value })}
                                placeholder="Graphic Design"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label>Short description</Label>
                            <Input
                                value={form.description}
                                onChange={(e) => setForm({ ...form, description: e.target.value })}
                                placeholder="Brand identities, marketing assets..."
                            />
                        </div>

                        <div className="space-y-2">
                            <Label>Full description</Label>
                            <Textarea
                                rows={4}
                                value={form.fullDescription}
                                onChange={(e) => setForm({ ...form, fullDescription: e.target.value })}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label>Screenshot URL (optional)</Label>
                            <Input
                                value={form.screenshot ?? ""}
                                onChange={(e) =>
                                    setForm({ ...form, screenshot: e.target.value || null })
                                }
                                placeholder="https://..."
                            />
                        </div>

                        <ListInput
                            label="Features"
                            value={form.features}
                            onChange={(v) => setForm({ ...form, features: v })}
                            placeholder="Logo design, Style guide, Print collateral"
                        />

                        <ListInput
                            label="Process steps"
                            value={form.process}
                            onChange={(v) => setForm({ ...form, process: v })}
                            placeholder="Discovery, Concept, Delivery"
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

export default ServicesAdminPage;

import { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useData } from "@/features/data/DataContext";
import type { Skill } from "@/features/data/data.types";
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
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/shared/ui/table";
import { CrudPageShell } from "./_shared/CrudPageShell";
import { IconPicker } from "./_shared/IconPicker";
import { LucideIcon } from "@/shared/components/LucideIcon";

const emptySkill = (): Skill => ({
    id: "",
    name: "",
    category: "",
    level: 50,
});

const slugify = (s: string) =>
    s
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

const SkillsAdminPage = () => {
    const { skills, addSkill, updateSkill, deleteSkill } = useData();
    const [open, setOpen] = useState(false);
    const [editing, setEditing] = useState<Skill | null>(null);
    const [form, setForm] = useState<Skill>(emptySkill());

    const openAdd = () => {
        setEditing(null);
        setForm(emptySkill());
        setOpen(true);
    };

    const openEdit = (s: Skill) => {
        setEditing(s);
        setForm({ ...s });
        setOpen(true);
    };

    const handleSave = () => {
        if (!form.name.trim()) {
            toast.error("Name is required");
            return;
        }
        const level = Math.max(0, Math.min(100, Number(form.level) || 0));
        if (editing) {
            updateSkill(editing.id, { ...form, level });
            toast.success("Skill updated");
        } else {
            const id = form.id || slugify(form.name);
            if (skills.some((s) => s.id === id)) {
                toast.error("A skill with this ID already exists");
                return;
            }
            addSkill({ ...form, id, level });
            toast.success("Skill added");
        }
        setOpen(false);
    };

    const handleDelete = (s: Skill) => {
        if (!confirm(`Delete skill "${s.name}"?`)) return;
        deleteSkill(s.id);
        toast.success("Skill deleted");
    };

    return (
        <AdminLayout>
            <CrudPageShell
                title="Skills"
                description="Tech & tools you specialise in"
                onAdd={openAdd}
                addLabel="Add skill"
                count={skills.length}
            >
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[60px]">Icon</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead className="hidden sm:table-cell">Category</TableHead>
                            <TableHead className="w-[200px]">Level</TableHead>
                            <TableHead className="w-[120px] text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {skills.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={5} className="py-10 text-center text-sm text-muted-foreground">
                                    No skills yet.
                                </TableCell>
                            </TableRow>
                        )}
                        {skills.map((s) => (
                            <TableRow key={s.id}>
                                <TableCell>
                                    {s.icon ? (
                                        <div className="flex h-8 w-8 items-center justify-center rounded-md bg-accent">
                                            <LucideIcon name={s.icon} className="h-4 w-4 text-primary" />
                                        </div>
                                    ) : (
                                        <span className="text-xs text-muted-foreground">—</span>
                                    )}
                                </TableCell>
                                <TableCell className="font-medium">{s.name}</TableCell>
                                <TableCell className="hidden text-muted-foreground sm:table-cell">
                                    {s.category}
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-2">
                                        <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
                                            <div
                                                className="h-full bg-primary"
                                                style={{ width: `${s.level}%` }}
                                            />
                                        </div>
                                        <span className="w-10 text-right text-xs text-muted-foreground">
                                            {s.level}%
                                        </span>
                                    </div>
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
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{editing ? "Edit skill" : "Add skill"}</DialogTitle>
                    </DialogHeader>

                    <div className="space-y-4 py-2">
                        <div className="space-y-2">
                            <Label>Name</Label>
                            <Input
                                value={form.name}
                                onChange={(e) => setForm({ ...form, name: e.target.value })}
                                placeholder="React"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label>Category</Label>
                            <Input
                                value={form.category}
                                onChange={(e) => setForm({ ...form, category: e.target.value })}
                                placeholder="Frontend, Backend, Design..."
                            />
                        </div>

                        <IconPicker
                            value={form.icon ?? null}
                            onChange={(icon) => setForm({ ...form, icon })}
                        />

                        <div className="space-y-2">
                            <Label>Level ({form.level}%)</Label>
                            <Input
                                type="range"
                                min={0}
                                max={100}
                                value={form.level}
                                onChange={(e) =>
                                    setForm({ ...form, level: Number(e.target.value) })
                                }
                            />
                        </div>
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

export default SkillsAdminPage;

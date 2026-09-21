import { useEffect, useState } from "react";
import { X } from "lucide-react";
import Button from "@/ui/Button";
import Input from "@/ui/Input";
import Select from "@/ui/Select";
import { Label } from "@/ui/Label";
import {
  DEPARTMENT_OPTIONS,
  REFLECTION_OPTIONS,
  type EmployeeFormValues,
  type EmployeeRow,
} from "./data";

type EmployeeFormModalProps = {
  isOpen: boolean;
  mode: "add" | "edit";
  employee?: EmployeeRow | null;
  onClose: () => void;
  onSubmit: (values: EmployeeFormValues) => void;
};

const empty: EmployeeFormValues = {
  name: "",
  email: "",
  phone: "",
  department: "Engineering",
  role: "",
  team: "",
  blueprint: "None Assigned",
};

const EmployeeFormModal = ({
  isOpen,
  mode,
  employee,
  onClose,
  onSubmit,
}: EmployeeFormModalProps) => {
  const [values, setValues] = useState<EmployeeFormValues>(empty);
  const [errors, setErrors] = useState<Partial<Record<keyof EmployeeFormValues, string>>>({});

  useEffect(() => {
    if (!isOpen) return;
    if (mode === "edit" && employee) {
      setValues({
        name: employee.name,
        email: employee.email,
        phone: employee.phone === "—" ? "" : employee.phone,
        department: employee.department,
        role: employee.role,
        team: employee.team === "—" ? "" : employee.team,
        blueprint: employee.blueprint,
      });
    } else {
      setValues(empty);
    }
    setErrors({});
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen, mode, employee]);

  if (!isOpen) return null;

  const set =
    (key: keyof EmployeeFormValues) => (value: string) => {
      setValues((prev) => ({ ...prev, [key]: value }));
      setErrors((prev) => ({ ...prev, [key]: undefined }));
    };

  const validate = () => {
    const next: typeof errors = {};
    if (!values.name.trim()) next.name = "Name is required";
    if (!values.email.trim()) next.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim()))
      next.email = "Enter a valid email";
    if (!values.role.trim()) next.role = "Job title is required";
    if (!values.department) next.department = "Department is required";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit(values);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/75 backdrop-blur-xs"
        onClick={onClose}
      />
      <div className="relative w-full max-w-lg rounded-2xl border border-white/10 bg-[#0D1117] p-6 shadow-2xl">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded-lg text-secondary-text hover:bg-white/5 hover:text-white cursor-pointer"
          aria-label="Close"
        >
          <X className="size-4" />
        </button>

        <h3 className="text-lg font-semibold text-white pr-8">
          {mode === "add" ? "Add Employee" : "Edit Employee"}
        </h3>
        <p className="mt-1 text-xs text-secondary-text">
          {mode === "add"
            ? "Create a new employee record for your organization."
            : "Update employee details. Changes apply immediately."}
        </p>

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <div className="space-y-1.5">
            <Label className="text-xs text-secondary-text">Full Name</Label>
            <Input
              variant="soft"
              value={values.name}
              onChange={(e) => set("name")(e.target.value)}
              placeholder="James Robertson"
              error={!!errors.name}
            />
            {errors.name ? (
              <p className="text-[11px] text-red-400">{errors.name}</p>
            ) : null}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label className="text-xs text-secondary-text">Email</Label>
              <Input
                variant="soft"
                type="email"
                value={values.email}
                onChange={(e) => set("email")(e.target.value)}
                placeholder="name@Encounters.com"
                error={!!errors.email}
              />
              {errors.email ? (
                <p className="text-[11px] text-red-400">{errors.email}</p>
              ) : null}
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs text-secondary-text">Phone</Label>
              <Input
                variant="soft"
                value={values.phone}
                onChange={(e) => set("phone")(e.target.value)}
                placeholder="+1 555-0142"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label className="text-xs text-secondary-text">Department</Label>
              <Select
                variant="soft"
                options={DEPARTMENT_OPTIONS}
                value={values.department}
                onChange={set("department")}
                placeholder="Department"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs text-secondary-text">Job Title</Label>
              <Input
                variant="soft"
                value={values.role}
                onChange={(e) => set("role")(e.target.value)}
                placeholder="Senior Engineer"
                error={!!errors.role}
              />
              {errors.role ? (
                <p className="text-[11px] text-red-400">{errors.role}</p>
              ) : null}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label className="text-xs text-secondary-text">Team</Label>
              <Input
                variant="soft"
                value={values.team}
                onChange={(e) => set("team")(e.target.value)}
                placeholder="Platform Team"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs text-secondary-text">Reflection™</Label>
              <Select
                variant="soft"
                options={REFLECTION_OPTIONS}
                value={values.blueprint}
                onChange={set("blueprint")}
                placeholder="Reflection"
              />
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              variant="soft"
              className="flex-1 rounded-lg!"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              className="flex-1 rounded-lg! bg-[#FBBF24]! text-black! hover:bg-[#e8b93a]!"
            >
              {mode === "add" ? "Add Employee" : "Save Changes"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmployeeFormModal;

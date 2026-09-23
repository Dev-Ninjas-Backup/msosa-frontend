import { useRef, useState, type ReactNode } from "react";
import { BadgeCheck, BookOpen, CloudUpload, CreditCard, FileBarChart, Mail, Settings, Trash2, Upload, UsersRound } from "lucide-react";
import { toast } from "sonner";
import Button from "@/ui/Button";
import Input from "@/ui/Input";
import { Label } from "@/ui/Label";
const FOUNDER_AVATAR =
  "https://res.cloudinary.com/dc6zbxbvm/image/upload/v1772355382/nest-practice/zickqqto0zmov8aespmn.png";

const INITIAL = {
  firstName: "Sourav",
  lastName: "Debnath",
  displayName: "Sourav Debnath",
  jobTitle: "Founder",
  email: "sourav@email.com",
  phone: "+1 (555) 234-5678",
};

const PERMISSIONS = [
  { name: "Employee Mgmt", icon: UsersRound  , tone: "text-[#10b7ba]" },
  { name: "Reflection Mgmt", icon: BookOpen, tone: "text-[#fbbf24]" },
  { name: "Reports & QCV™", icon: FileBarChart, tone: "text-[#60a5fa]" },
  { name: "Invitation Mgmt", icon: Mail, tone: "text-[#fb923c]" },
  { name: "Billing™", icon: CreditCard, tone: "text-[#f87171]" },
  { name: "System Config", icon: Settings, tone: "text-white/70" },
];

const panel = "rounded-xl border border-white/10 bg-white/5 p-6";
const fieldLabel = "text-[10px] font-bold uppercase tracking-[0.6px] text-white/45";

const MyProfileTab = ({ onChangePassword }: { onChangePassword: () => void }) => {
  const firstNameRef = useRef<HTMLInputElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const [saved, setSaved] = useState(INITIAL);
  const [form, setForm] = useState(INITIAL);
  const [photo, setPhoto] = useState(FOUNDER_AVATAR);
  const [savedAt, setSavedAt] = useState("Today at 10:42 AM");

  const set = (key: keyof typeof form, value: string) => setForm((prev) => ({ ...prev, [key]: value }));

  const save = () => {
    if (!form.firstName.trim() || !form.lastName.trim() || !form.email.includes("@")) {
      toast.error("Enter a first name, last name, and work email.");
      return;
    }
    setSaved(form);
    setSavedAt("Today at " + new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" }));
    toast.success("Profile saved.");
  };

  const applyFile = (file?: File) => {
    if (!file) return;
    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type) || file.size > 5 * 1024 * 1024) {
      toast.error("Use a JPG, PNG, or WEBP under 5MB.");
      return;
    }
    setPhoto(URL.createObjectURL(file));
    toast.success("Profile photo updated.");
  };

  return (
    <div className="grid items-start gap-5 xl:grid-cols-[280px_minmax(0,1fr)]">
      <section className={panel}>
        <div className="flex flex-col items-center text-center">
          <img src={photo} alt="" className="size-24 rounded-full border border-white/20 object-cover" />
          <p className="mt-4 text-lg font-bold text-white">{saved.displayName}</p>
          <p className="text-sm text-white/70">Founder</p>
          <p className="text-xs text-white/40">Encounters Corporation</p>
          <span className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-[#22c55e]/15 px-2.5 py-0.5 text-[11px] font-semibold text-[#22c55e]">
            <span className="size-1.5 rounded-full bg-[#22c55e]" />
            Active
          </span>
        </div>
        <dl className="mt-5 space-y-2.5 border-t border-white/10 pt-4 text-xs">
          <div className="flex justify-between"><dt className="text-white/45">Member Since</dt><dd className="font-medium text-white">Jan 2024</dd></div>
          <div className="flex justify-between"><dt className="text-white/45">Last Login</dt><dd className="font-medium text-white">2 hours ago</dd></div>
          <div className="flex justify-between"><dt className="text-white/45">Role</dt><dd className="font-semibold text-[#fbbf24]">Founder</dd></div>
        </dl>
        <div className="mt-5 space-y-2">
          <Button
            variant="primary"
            size="sm"
            className="h-10 w-full rounded-lg bg-[#fbbf24] text-sm font-bold text-black"
            title="Edit Profile"
            onClick={() => firstNameRef.current?.focus()}
          />
          <Button
            variant="secondary"
            size="sm"
            className="h-10 w-full rounded-lg border-white/15 bg-white/5 text-sm text-white"
            title="Change Password"
            onClick={onChangePassword}
          />
        </div>
      </section>

      <div className="space-y-5">
        <section className={panel}>
          <h2 className="text-lg font-bold text-white">Personal Information</h2>
          <p className="mt-1 text-xs text-white/45">Manage your personal details and contact information</p>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <Field label="First Name">
              <Input ref={firstNameRef} variant="soft" value={form.firstName} onChange={(event) => set("firstName", event.target.value)} className="border-white/10 bg-black/40 text-white" />
            </Field>
            <Field label="Last Name">
              <Input variant="soft" value={form.lastName} onChange={(event) => set("lastName", event.target.value)} className="border-white/10 bg-black/40 text-white" />
            </Field>
            <Field label="Display Name">
              <Input variant="soft" value={form.displayName} onChange={(event) => set("displayName", event.target.value)} className="border-white/10 bg-black/40 text-white" />
            </Field>
            <Field label="Job Title">
              <Input variant="soft" value={form.jobTitle} onChange={(event) => set("jobTitle", event.target.value)} className="border-white/10 bg-black/40 text-white" />
            </Field>
            <Field label="Work Email">
              <Input
                variant="soft"
                type="email"
                value={form.email}
                onChange={(event) => set("email", event.target.value)}
                rightIcon={<BadgeCheck className="size-4 text-[#38bdf8]" />}
                className="border-[#fbbf24] bg-black text-white"
              />
            </Field>
            <Field label="Phone Number">
              <Input variant="soft" value={form.phone} onChange={(event) => set("phone", event.target.value)} className="border-white/10 bg-black/40 text-white" />
            </Field>
          </div>
          <div className="mt-5 flex flex-col gap-3 border-t border-white/10 pt-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-white/40">Last saved: {savedAt}</p>
            <div className="flex items-center gap-3">
              <Button variant="link" size="sm" className="text-sm text-white/60" title="Cancel" onClick={() => setForm(saved)} />
              <Button variant="primary" size="sm" className="h-10 rounded-lg bg-[#fbbf24] px-5 text-sm font-bold text-black" title="Save Changes" onClick={save} />
            </div>
          </div>
        </section>

        <section className={panel}>
          <h2 className="text-lg font-bold text-white">Profile Photo</h2>
          <p className="mt-1 text-xs text-white/45">Update your profile photo displayed across the platform</p>
          <div className="mt-5 grid items-center gap-5 lg:grid-cols-[minmax(0,1fr)_220px]">
            <div className="flex items-center gap-4">
              <img src={photo} alt="" className="size-14 rounded-full object-cover" />
              <div>
                <p className="text-sm text-white">Update your profile photo</p>
                <p className="text-[11px] text-white/40">JPG, PNG, WEBP · Max 5MB · Recommended 400x400px</p>
                <div className="mt-3 flex items-center gap-4">
                  <Button variant="primary" size="sm" className="h-9 rounded-lg bg-[#fbbf24] px-4 text-xs font-bold text-black" leftIcon={<Upload className="size-3.5" />} title="Upload Photo" onClick={() => fileRef.current?.click()} />
                  <button
                    type="button"
                    className="inline-flex cursor-pointer items-center gap-1.5 border-0 bg-transparent p-0 text-xs font-semibold text-[#ef4444]"
                    onClick={() => {
                      setPhoto(FOUNDER_AVATAR);
                      toast.message("Profile photo removed.");
                    }}
                  >
                    <Trash2 className="size-3.5" />
                    Remove Photo
                  </button>
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              onDragOver={(event) => event.preventDefault()}
              onDrop={(event) => {
                event.preventDefault();
                applyFile(event.dataTransfer.files?.[0]);
              }}
              className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-white/20 bg-white/[0.02] px-4 py-8 text-center"
            >
              <CloudUpload className="size-6 text-white/35" />
              <span className="text-xs text-white/50">Drag & drop or <br /> browse files</span>
            </button>
          </div>
          <input
            ref={fileRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            className="hidden"
            onChange={(event) => {
              applyFile(event.target.files?.[0]);
              event.target.value = "";
            }}
          />
        </section>

        <section className={panel}>
          <div className="flex items-start justify-between gap-3">
            <div>
              <h2 className="text-lg font-bold text-white">Platform Access & Permissions</h2>
              <p className="mt-1 text-xs text-white/45">Your current role and access level within FAR Systems™</p>
            </div>
            <span className="rounded-full bg-[#fbbf24]/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.4px] text-[#fbbf24]">Administrator</span>
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {PERMISSIONS.map((item) => (
              <div key={item.name} className="flex items-center gap-3 rounded-xl border border-white/10 bg-black/30 px-4 py-3">
                <item.icon className={`size-4 ${item.tone}`} />
                <div>
                  <p className="text-sm font-medium text-white">{item.name}</p>
                  <p className="text-[11px] text-white/40">Full Access</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

const Field = ({ label, children }: { label: string; children: ReactNode }) => (
  <div className="space-y-1.5">
    <Label className={fieldLabel}>{label}</Label>
    {children}
  </div>
);

export default MyProfileTab;

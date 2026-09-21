import { useState } from "react";
import { BadgeCheck } from "lucide-react";
import { toast } from "sonner";
import AnimatedContainer from "@/common/AnimatedContainer";
import Button from "@/ui/Button";
import Card from "@/ui/Card";
import Input from "@/ui/Input";
import Select from "@/ui/Select";
import Textarea from "@/ui/Textarea";
import { Label } from "@/ui/Label";
import { PROFILE_USER } from "../../data";

const fieldLabel = "text-[10px] font-semibold uppercase tracking-wide text-white/45";

const PersonalInformation = () => {
  const [form, setForm] = useState({
    firstName: PROFILE_USER.firstName,
    lastName: PROFILE_USER.lastName,
    displayName: PROFILE_USER.displayName,
    jobTitle: PROFILE_USER.jobTitle,
    email: PROFILE_USER.email,
    phone: PROFILE_USER.phone,
    department: PROFILE_USER.department,
    position: PROFILE_USER.position,
    timezone: PROFILE_USER.timezone,
    language: PROFILE_USER.language,
    country: PROFILE_USER.country,
    bio: PROFILE_USER.bio,
  });

  const set = (key: keyof typeof form, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  return (
    <AnimatedContainer delay={0.06}>
      <Card
        className="p-6 sm:p-7 space-y-5"
        backgroundColor="rgba(255,255,255,0.05)"
        shadow="none"
      >
        <div>
          <h3 className="text-lg font-bold text-white">Personal Information</h3>
          <p className="text-xs text-white/45 mt-1">
            Manage your personal details and contact information
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label className={fieldLabel}>First Name</Label>
            <Input variant="soft" value={form.firstName} onChange={(e) => set("firstName", e.target.value)} />
          </div>
          <div className="space-y-1.5">
            <Label className={fieldLabel}>Last Name</Label>
            <Input variant="soft" value={form.lastName} onChange={(e) => set("lastName", e.target.value)} />
          </div>
          <div className="space-y-1.5">
            <Label className={fieldLabel}>Display Name</Label>
            <Input variant="soft" value={form.displayName} onChange={(e) => set("displayName", e.target.value)} />
          </div>
          <div className="space-y-1.5">
            <Label className={fieldLabel}>Job Title</Label>
            <Input variant="soft" value={form.jobTitle} onChange={(e) => set("jobTitle", e.target.value)} />
          </div>
          <div className="space-y-1.5">
            <Label className={fieldLabel}>Work Email</Label>
            <div className="relative">
              <Input variant="soft" value={form.email} onChange={(e) => set("email", e.target.value)} className="pr-9" />
              <BadgeCheck className="absolute right-2.5 top-1/2 -translate-y-1/2 size-4 text-[#60A5FA]" />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label className={fieldLabel}>Phone Number</Label>
            <Input variant="soft" value={form.phone} onChange={(e) => set("phone", e.target.value)} />
          </div>
          <div className="space-y-1.5">
            <Label className={fieldLabel}>Department</Label>
            <Input variant="soft" value={form.department} onChange={(e) => set("department", e.target.value)} />
          </div>
          <div className="space-y-1.5">
            <Label className={fieldLabel}>Position</Label>
            <Input variant="soft" value={form.position} onChange={(e) => set("position", e.target.value)} />
          </div>
          <div className="space-y-1.5">
            <Label className={fieldLabel}>Time Zone</Label>
            <Select
              variant="soft"
              options={["UTC-5 Eastern Time", "UTC-6 Central Time", "UTC-8 Pacific Time"]}
              value={form.timezone}
              onChange={(v) => set("timezone", v)}
            />
          </div>
          <div className="space-y-1.5">
            <Label className={fieldLabel}>Language</Label>
            <Select
              variant="soft"
              options={["English (US)", "English (UK)", "Spanish"]}
              value={form.language}
              onChange={(v) => set("language", v)}
            />
          </div>
          <div className="space-y-1.5 sm:col-span-2">
            <Label className={fieldLabel}>Country</Label>
            <Select
              variant="soft"
              options={["United States", "Canada", "United Kingdom"]}
              value={form.country}
              onChange={(v) => set("country", v)}
            />
          </div>
          <div className="space-y-1.5 sm:col-span-2">
            <Label className={fieldLabel}>Bio</Label>
            <Textarea
              variant="soft"
              rows={3}
              value={form.bio}
              onChange={(e) => set("bio", e.target.value)}
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-2 border-t border-white/10">
          <p className="text-xs text-white/40">Last saved: Today at 10:42 AM</p>
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="text-xs text-white/50 hover:text-white cursor-pointer border-0 bg-transparent p-0"
              onClick={() => toast.message("Changes discarded.")}
            >
              Cancel
            </button>
            <Button
              variant="primary"
              size="sm"
              className="rounded-lg! bg-[#FBBF24]! text-black!"
              onClick={() => toast.success("Profile saved.")}
            >
              Save Changes
            </Button>
          </div>
        </div>
      </Card>
    </AnimatedContainer>
  );
};

export default PersonalInformation;

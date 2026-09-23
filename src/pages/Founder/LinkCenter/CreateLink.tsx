import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Calendar, Info, Lock, Shield, UserRound, X } from "lucide-react";
import AnimatedContainer from "@/common/AnimatedContainer";
import { cn } from "@/lib/utils";
import Input from "@/ui/Input";
import Select from "@/ui/Select";
import Textarea from "@/ui/Textarea";
import Switch from "@/ui/Switch";
import { Popover, PopoverContent, PopoverTrigger } from "@/ui/Popover";
import {
  DEFAULT_PERMISSIONS,
  DEFAULT_SECURITY,
  PRODUCTS,
  ROLE_OPTIONS,
  addLink,
  formatLinkDate,
  getLinks,
  updateLink,
  type LinkSecurity,
  type LinkType,
  type ModulePermissions,
  type PlatformLink,
} from "./data";
import { LINK_CENTER_PATH, LINK_CREATE_FORM_EVENT, type LinkCreateAction } from "./events";

const DRAFT_KEY = "link-center-draft";

type FormState = {
  name: string;
  description: string;
  product: string;
  path: string;
  type: LinkType;
  roles: string[];
  permissions: ModulePermissions;
  expires: string;
  security: LinkSecurity;
};

const EMPTY_FORM: FormState = {
  name: "",
  description: "",
  product: "Growth Engine™",
  path: "",
  type: "Product Link",
  roles: ["Founder", "Admin"],
  permissions: { ...DEFAULT_PERMISSIONS },
  expires: "2026-06-30",
  security: { ...DEFAULT_SECURITY },
};

const fromLink = (link: PlatformLink): FormState => ({
  name: link.name,
  description: link.description,
  product: link.product,
  path: link.path,
  type: link.type,
  roles: link.roles,
  permissions: { ...link.permissions },
  expires: toIso(link.expires),
  security: { ...link.security },
});

const toIso = (display: string) => {
  const parsed = new Date(display);
  if (Number.isNaN(parsed.getTime()) || display === "—") return "2026-06-30";
  const month = String(parsed.getMonth() + 1).padStart(2, "0");
  const day = String(parsed.getDate()).padStart(2, "0");
  return `${parsed.getFullYear()}-${month}-${day}`;
};

const FieldLabel = ({ children }: { children: string }) => (
  <p className="text-xs font-bold uppercase tracking-[0.6px] text-white/40">{children}</p>
);

const Section = ({
  icon,
  title,
  children,
}: {
  icon: ReactNode;
  title: string;
  children: ReactNode;
}) => (
  <section className="flex flex-col gap-6 rounded-xl border border-white/5 bg-white/[0.03] p-6">
    <h2 className="flex items-center gap-2 text-base font-bold tracking-[0.4px] text-white/80">
      {icon}
      {title}
    </h2>
    {children}
  </section>
);

const CreateLink = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = (location.state ?? {}) as { preset?: LinkType; linkId?: string };
  const editing = useMemo(
    () => (state.linkId ? getLinks().find((link) => link.id === state.linkId) : undefined),
    [state.linkId],
  );

  const [form, setForm] = useState<FormState>(() => {
    if (editing) return fromLink(editing);
    const stored = sessionStorage.getItem(DRAFT_KEY);
    if (stored && !state.preset && !state.linkId) {
      try {
        return { ...EMPTY_FORM, ...JSON.parse(stored) } as FormState;
      } catch {
        sessionStorage.removeItem(DRAFT_KEY);
      }
    }
    return {
      ...EMPTY_FORM,
      type: state.preset ?? "Product Link",
      permissions: { ...DEFAULT_PERMISSIONS },
      security: { ...DEFAULT_SECURITY },
      roles: ["Founder", "Admin"],
    };
  });
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const patch = (next: Partial<FormState>) => setForm((current) => ({ ...current, ...next }));

  const saveDraft = () => {
    sessionStorage.setItem(DRAFT_KEY, JSON.stringify(form));
    setError("");
    setMessage("Draft saved on this device.");
  };

  const generate = () => {
    if (!form.name.trim()) {
      setMessage("");
      setError("Link name is required.");
      return;
    }
    const path = form.path.trim().replace(/^\/+/, "") || "target-destination-path";
    const payload = {
      name: form.name.trim(),
      description: form.description.trim(),
      product: form.product,
      path,
      type: form.type,
      roles: form.roles,
      permissions: form.permissions,
      security: form.security,
      expires: formatLinkDate(form.expires),
    };
    if (editing) {
      updateLink(editing.id, payload);
    } else {
      addLink(payload);
    }
    sessionStorage.removeItem(DRAFT_KEY);
    navigate(LINK_CENTER_PATH);
  };

  const actionsRef = useRef({ saveDraft, generate, cancel: () => navigate(LINK_CENTER_PATH) });
  actionsRef.current = { saveDraft, generate, cancel: () => navigate(LINK_CENTER_PATH) };

  useEffect(() => {
    const onAction = (event: Event) => {
      const action = (event as CustomEvent<LinkCreateAction>).detail;
      if (action === "cancel") actionsRef.current.cancel();
      if (action === "draft") actionsRef.current.saveDraft();
      if (action === "generate") actionsRef.current.generate();
    };
    window.addEventListener(LINK_CREATE_FORM_EVENT, onAction);
    return () => window.removeEventListener(LINK_CREATE_FORM_EVENT, onAction);
  }, []);

  const availableRoles = ROLE_OPTIONS.filter((role) => !form.roles.includes(role));

  return (
    <AnimatedContainer className="pb-8">
      {(error || message) && (
        <p
          className={cn(
            "mb-4 rounded-lg border px-4 py-2 text-sm",
            error ? "border-red-500/30 bg-red-500/10 text-red-300" : "border-white/10 bg-white/5 text-white/80",
          )}
        >
          {error || message}
        </p>
      )}

      <div className="grid items-start gap-8 xl:grid-cols-[minmax(0,1fr)_340px]">
        <div className="flex flex-col gap-8">
          <Section icon={<Info className="size-4 text-[#3b82f6]" />} title="BASIC INFORMATION">
            <div className="grid gap-5 md:grid-cols-2">
              <div className="flex flex-col gap-2">
                <FieldLabel>Link Name</FieldLabel>
                <Input
                  variant="soft"
                  value={form.name}
                  onChange={(event) => patch({ name: event.target.value })}
                  placeholder="e.g. Q4 Growth Report Share"
                  className="h-11 border-white/10 bg-white/5 text-white placeholder:text-[#9ca3af]"
                />
              </div>
              <div className="flex flex-col gap-2 md:col-span-2">
                <FieldLabel>Description</FieldLabel>
                <Textarea
                  variant="soft"
                  value={form.description}
                  onChange={(event) => patch({ description: event.target.value })}
                  placeholder="Describe the purpose of this internal link..."
                  className="min-h-24 rounded-md border-white/10 bg-white/5 text-sm text-white placeholder:text-[#9ca3af]"
                />
              </div>
              <div className="flex flex-col gap-2">
                <FieldLabel>Product</FieldLabel>
                <Select
                  variant="soft"
                  value={form.product}
                  onChange={(product) => patch({ product })}
                  options={[...PRODUCTS]}
                />
              </div>
              <div className="flex flex-col gap-2">
                <FieldLabel>Destination Link</FieldLabel>
                <div className="flex h-11 items-center rounded-md border border-white/10 bg-white/5 px-3">
                  <span className="shrink-0 pr-2 text-sm text-white/30">https://app.farplatform.com/</span>
                  <Input
                    variant="soft"
                    value={form.path}
                    onChange={(event) => patch({ path: event.target.value })}
                    placeholder="target-destination-path"
                    className="h-9 border-0 bg-transparent px-0 text-[13px] text-white shadow-none placeholder:text-[#9ca3af] focus:ring-0"
                  />
                </div>
              </div>
            </div>
          </Section>

          <Section icon={<UserRound className="size-4 text-[#3b82f6]" />} title="ACCESS CONFIGURATION">
            <div className="flex flex-col gap-2">
              <FieldLabel>User Role Requirements</FieldLabel>
              <div className="flex min-h-11 flex-wrap items-center gap-2 rounded-md border border-white/10 bg-white/5 p-2">
                {form.roles.map((role) => (
                  <span
                    key={role}
                    className="inline-flex items-center gap-2 rounded bg-[#3b82f6] px-2 py-1 text-[11px] text-white"
                  >
                    {role}
                    <button
                      type="button"
                      aria-label={`Remove ${role}`}
                      className="cursor-pointer border-0 bg-transparent p-0 text-white"
                      onClick={() => patch({ roles: form.roles.filter((item) => item !== role) })}
                    >
                      <X className="size-3" />
                    </button>
                  </span>
                ))}
                {availableRoles.length > 0 && (
                  <Popover>
                    <PopoverTrigger asChild>
                      <button
                        type="button"
                        className="cursor-pointer rounded border border-dashed border-white/10 bg-transparent px-1.5 py-1 text-[11px] text-white/20"
                      >
                        + Add Role
                      </button>
                    </PopoverTrigger>
                    <PopoverContent align="start" className="w-44 rounded-lg border-white/10 bg-[#111] p-1">
                      {availableRoles.map((role) => (
                        <button
                          key={role}
                          type="button"
                          className="block w-full cursor-pointer rounded-md border-0 bg-transparent px-2 py-1.5 text-left text-sm text-white hover:bg-white/5"
                          onClick={() => patch({ roles: [...form.roles, role] })}
                        >
                          {role}
                        </button>
                      ))}
                    </PopoverContent>
                  </Popover>
                )}
              </div>
            </div>

            <div className="mt-4 flex flex-col gap-4">
              <FieldLabel>Module Permissions</FieldLabel>
              <div className="flex flex-wrap gap-x-8 gap-y-3">
                {(
                  [
                    ["product", "Product Access"],
                    ["reflection", "Reflection"],
                    ["dashboard", "Dashboard Access"],
                    ["report", "Report Access"],
                    ["continuum", "Continuum Access"],
                  ] as const
                ).map(([key, label]) => (
                  <label key={key} className="inline-flex items-center gap-3 text-xs text-white/80">
                    <Switch
                      checked={form.permissions[key]}
                      onCheckedChange={(checked) =>
                        patch({ permissions: { ...form.permissions, [key]: checked } })
                      }
                      aria-label={label}
                    />
                    <span className={form.permissions[key] ? "text-white/80" : "text-white/40"}>{label}</span>
                  </label>
                ))}
              </div>
            </div>
          </Section>
        </div>

        <Section icon={<Lock className="size-4 text-[#f87171]" />} title="SECURITY SETTINGS">
          <div className="flex flex-col gap-2">
            <FieldLabel>Expiration Date</FieldLabel>
            <label className="relative flex h-11 cursor-pointer items-center gap-3 rounded-md border border-white/10 bg-white/5 px-3">
              <Calendar className="size-3.5 text-white/50" />
              <span className="text-sm text-white">
                {new Date(`${form.expires}T00:00:00`).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
              <input
                type="date"
                value={form.expires}
                onChange={(event) => patch({ expires: event.target.value })}
                className="absolute inset-0 cursor-pointer opacity-0"
                aria-label="Expiration Date"
              />
            </label>
          </div>

          <ToggleRow
            label="Single Use Link"
            checked={form.security.singleUse}
            onChange={(singleUse) => patch({ security: { ...form.security, singleUse } })}
          />
          <ToggleRow
            label="Email Verification Required"
            checked={form.security.emailVerification}
            onChange={(emailVerification) => patch({ security: { ...form.security, emailVerification } })}
          />

          <div className="space-y-3 border-t border-white/5 pt-2">
            <ToggleRow
              label="Password Protection"
              checked={form.security.passwordProtection}
              onChange={(passwordProtection) => patch({ security: { ...form.security, passwordProtection } })}
            />
            <Input
              type="password"
              variant="soft"
              value={form.security.password}
              onChange={(event) =>
                patch({ security: { ...form.security, password: event.target.value, passwordProtection: true } })
              }
              placeholder="Set Access Password"
              className="h-9 border-white/10 bg-white/5 text-xs text-white placeholder:text-[#9ca3af]"
            />
          </div>

          <div className="space-y-3 border-t border-white/5 pt-2">
            <ToggleRow
              label="IP Restriction"
              checked={form.security.ipRestriction}
              onChange={(ipRestriction) => patch({ security: { ...form.security, ipRestriction } })}
            />
            <Input
              variant="soft"
              value={form.security.ip}
              onChange={(event) =>
                patch({ security: { ...form.security, ip: event.target.value, ipRestriction: true } })
              }
              placeholder="Allowlisted IP (e.g. 192.168.1.1)"
              className="h-9 border-white/10 bg-white/5 text-xs text-white placeholder:text-[#9ca3af]"
            />
          </div>
        </Section>
      </div>

      <p className="mt-10 text-center text-[10px] tracking-[1px] text-white/20">
        <Shield className="mr-1 inline size-3 align-text-bottom" />
        FAR SYSTEMS™ USES ENTERPRISE-GRADE ENCRYPTION. ALL LINK GENERATION DATA IS PRIVATELY AUDITED AND SECURE.
      </p>
    </AnimatedContainer>
  );
};

const ToggleRow = ({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) => (
  <div className="flex items-center justify-between py-2">
    <span className="text-[13px] text-white">{label}</span>
    <Switch checked={checked} onCheckedChange={onChange} aria-label={label} />
  </div>
);

export default CreateLink;

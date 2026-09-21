import { useEffect, useMemo, useState } from "react";
import {
  Copy,
  Lock,
  Mail,
  RefreshCw,
  X,
} from "lucide-react";
import { toast } from "sonner";
import Button from "@/ui/Button";
import Select from "@/ui/Select";
import { cn } from "@/lib/utils";
import {
  getEmployeesSnapshot,
} from "../EmployeeManagement/data";
import {
  REFLECTION_CHOICES,
  createInvitations,
} from "./data";

type CreateInvitationModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onCreated?: (count: number) => void;
};

const makeLink = () =>
  `https://app.farsystems.io/invite/ref-${Math.random().toString(36).slice(2, 6)}-${Math.random().toString(36).slice(2, 6)}-x01`;

const parseEmails = (raw: string) =>
  raw
    .split(/[,;\s]+/)
    .map((e) => e.trim().toLowerCase())
    .filter((e) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e));

const CreateInvitationModal = ({
  isOpen,
  onClose,
  onCreated,
}: CreateInvitationModalProps) => {
  const [reflection, setReflection] = useState<string>(REFLECTION_CHOICES[0]);
  const [emails, setEmails] = useState<string[]>([]);
  const [draft, setDraft] = useState("");
  const [link, setLink] = useState(makeLink);

  useEffect(() => {
    if (!isOpen) return;
    setReflection(REFLECTION_CHOICES[0]);
    setEmails([]);
    setDraft("");
    setLink(makeLink());
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const reflectionOptions = useMemo(
    () => REFLECTION_CHOICES.map((v) => ({ label: v, value: v })),
    []
  );

  if (!isOpen) return null;

  const addEmails = (raw: string) => {
    const next = parseEmails(raw);
    if (next.length === 0) return;
    setEmails((prev) => Array.from(new Set([...prev, ...next])));
  };

  const onDraftKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === "," || e.key === " ") {
      e.preventDefault();
      addEmails(draft);
      setDraft("");
    } else if (e.key === "Backspace" && !draft && emails.length > 0) {
      setEmails((prev) => prev.slice(0, -1));
    }
  };

  const selectAllEmployees = () => {
    const all = getEmployeesSnapshot()
      .filter((e) => e.accountStatus === "Active")
      .map((e) => e.email.toLowerCase());
    setEmails(Array.from(new Set(all)));
    toast.success(`${all.length} employees selected.`);
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(link);
      toast.success("Invite link copied.");
    } catch {
      toast.message(link);
    }
  };

  const handleSend = () => {
    const fromDraft = parseEmails(draft);
    const all = Array.from(new Set([...emails, ...fromDraft]));
    if (all.length === 0) {
      toast.error("Add at least one recipient email.");
      return;
    }
    const created = createInvitations({
      emails: all,
      reflection,
      link,
    });
    onCreated?.(created.length);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-xs"
        onClick={onClose}
      />
      <div className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-xl border border-[#1f2937] bg-[#0a0a0a] shadow-2xl">
        <div className="flex items-center justify-between px-8 py-6 border-b border-[#1f2937]">
          <h2 className="font-playfair text-[30px] font-semibold text-[#e5e7eb] tracking-tight leading-9">
            Create Invitation
            <sup className="ml-0.5 text-[12px] opacity-60 font-semibold">TM</sup>
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="p-1 text-white/40 hover:text-white cursor-pointer"
            aria-label="Close"
          >
            <X className="size-5" />
          </button>
        </div>

        <div className="p-8 space-y-8">
          <div>
            <Select
              variant="soft"
              options={reflectionOptions}
              value={reflection}
              onChange={setReflection}
              className="w-full"
            />
          </div>

          {/* Invite via Email */}
          <section className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="flex size-8 items-center justify-center rounded-full bg-[#111827] text-[#FBBF24]">
                <Mail className="size-3.5" />
              </span>
              <h3 className="text-sm font-semibold uppercase tracking-[0.7px] text-[#9CA3AF]">
                Invite via Email
              </h3>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between gap-3">
                <label className="text-xs font-medium uppercase tracking-[1.2px] text-[#6B7280]">
                  Recipient Emails
                </label>
                <button
                  type="button"
                  onClick={selectAllEmployees}
                  className="h-[35px] rounded-lg border border-white/10 bg-white/5 px-3.5 text-xs font-medium text-white hover:bg-white/10 cursor-pointer"
                >
                  All Employees
                </button>
              </div>

              <div className="min-h-[100px] rounded-lg border border-[#262626] bg-[#121212] p-3">
                <div className="flex flex-wrap gap-2 mb-2">
                  {emails.map((email) => (
                    <span
                      key={email}
                      className="inline-flex h-[30px] items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 text-sm text-white"
                    >
                      {email}
                      <button
                        type="button"
                        onClick={() =>
                          setEmails((prev) => prev.filter((e) => e !== email))
                        }
                        className="text-white/50 hover:text-white cursor-pointer"
                        aria-label={`Remove ${email}`}
                      >
                        <X className="size-2.5" />
                      </button>
                    </span>
                  ))}
                </div>
                <input
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  onKeyDown={onDraftKeyDown}
                  onBlur={() => {
                    if (draft.trim()) {
                      addEmails(draft);
                      setDraft("");
                    }
                  }}
                  placeholder="Add email addresses..."
                  className="w-full bg-transparent text-sm text-white placeholder:text-[#9CA3AF] outline-none"
                />
              </div>
              <p className="text-[11px] italic text-[#6B7280]">
                Separate emails with commas or spaces to invite multiple team
                members.
              </p>
            </div>
          </section>

          {/* Generate Unique Link */}
          <section className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="flex size-8 items-center justify-center rounded-full bg-[#111827] text-[#FBBF24]">
                <Lock className="size-3.5" />
              </span>
              <h3 className="text-sm font-semibold uppercase tracking-[0.7px] text-[#9CA3AF]">
                Generate Unique Link
              </h3>
            </div>

            <div className="space-y-3">
              <div className="relative">
                <div className="rounded-lg border border-[#262626] bg-[#121212] px-4 py-3 pr-12 text-sm text-[#9CA3AF] break-all">
                  {link}
                </div>
                <button
                  type="button"
                  onClick={copyLink}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white cursor-pointer"
                  aria-label="Copy link"
                >
                  <Copy className="size-3.5" />
                </button>
              </div>
              <button
                type="button"
                onClick={() => {
                  setLink(makeLink());
                  toast.success("New invite link generated.");
                }}
                className={cn(
                  "w-full inline-flex items-center justify-center gap-2 rounded-lg border border-dashed border-[#374151]",
                  "py-3 text-xs font-semibold uppercase tracking-[1.2px] text-[#9CA3AF]",
                  "hover:border-white/30 hover:text-white cursor-pointer transition-colors"
                )}
              >
                <RefreshCw className="size-3" />
                Regenerate New Link
              </button>
            </div>
          </section>
        </div>

        <div className="flex items-center justify-end gap-3 px-8 py-6 border-t border-[#1f2937] bg-[#050505]">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 text-sm font-semibold text-[#9CA3AF] hover:text-white cursor-pointer"
          >
            Cancel
          </button>
          <Button
            type="button"
            variant="primary"
            onClick={handleSend}
            className="rounded-md! bg-[#EAB308]! text-black! hover:bg-[#ca9a07]! px-8! py-2.5! h-auto! text-sm! font-bold! uppercase! tracking-[1.4px]! shadow-[0_0_15px_rgba(234,179,8,0.2)]"
          >
            Send Invitations
          </Button>
        </div>

        <p className="px-8 pb-4 pt-4 text-center text-[9px] uppercase tracking-[1.8px] text-[#4B5563]">
          FAR Systems™ uses enterprise-grade encryption for all data transfers.
        </p>
      </div>
    </div>
  );
};

export default CreateInvitationModal;

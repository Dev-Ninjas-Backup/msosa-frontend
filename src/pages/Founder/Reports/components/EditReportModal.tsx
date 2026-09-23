import { useState } from "react";
import { ChevronDown } from "lucide-react";
import Button from "@/ui/Button";
import Input from "@/ui/Input";
import Select from "@/ui/Select";
import { Label } from "@/ui/Label";
import ModalShell from "@/pages/Founder/_shared/ModalShell";
import { fieldControlClass, fieldLabelClass } from "../styles";
import {
  REPORT_DIVISIONS,
  REPORT_ORGANIZATIONS,
  REPORT_PRODUCTS,
  REPORT_TYPES,
  type Report,
  type ReportDivision,
  type ReportType,
} from "../data";

type EditableFields = Pick<Report, "title" | "product" | "organization" | "type" | "division">;

const chevron = <ChevronDown className="size-4 shrink-0 text-white/60" />;

const withCurrent = (options: readonly string[], current: string) =>
  options.includes(current) ? [...options] : [current, ...options];

const EditReportModal = ({
  report,
  onClose,
  onSave,
}: {
  report: Report;
  onClose: () => void;
  onSave: (patch: EditableFields) => void;
}) => {
  const [draft, setDraft] = useState<EditableFields>({
    title: report.title,
    product: report.product,
    organization: report.organization,
    type: report.type,
    division: report.division,
  });
  const [error, setError] = useState("");
  const set = <K extends keyof EditableFields>(key: K, value: EditableFields[K]) =>
    setDraft((d) => ({ ...d, [key]: value }));

  const submit = () => {
    if (!draft.title.trim()) {
      setError("Report title is required");
      return;
    }
    onSave({ ...draft, title: draft.title.trim() });
  };

  return (
    <ModalShell
      open
      onClose={onClose}
      title="Edit Report"
      description={report.id}
      footer={
        <>
          <Button
            variant="ghost"
            size="md"
            className="border-0 font-medium normal-case tracking-normal"
            title="Cancel"
            onClick={onClose}
          />
          <Button
            variant="primary"
            size="md"
            className="rounded-lg px-6 font-medium"
            title="Save Changes"
            onClick={submit}
          />
        </>
      }
    >
      <div className="flex flex-col gap-5">
        <div className="space-y-2">
          <Label className={fieldLabelClass}>Report Title</Label>
          <Input
            variant="soft"
            autoFocus
            value={draft.title}
            onChange={(e) => {
              set("title", e.target.value);
              setError("");
            }}
            error={!!error}
            className={fieldControlClass}
          />
          {error && <p className="text-xs text-[#ef4444]">{error}</p>}
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="space-y-2">
            <Label className={fieldLabelClass}>Product</Label>
            <Select
              variant="soft"
              options={withCurrent(REPORT_PRODUCTS, draft.product)}
              value={draft.product}
              onChange={(v) => set("product", v)}
              className={fieldControlClass}
              rightIcon={chevron}
            />
          </div>
          <div className="space-y-2">
            <Label className={fieldLabelClass}>Organization</Label>
            <Select
              variant="soft"
              options={withCurrent(REPORT_ORGANIZATIONS, draft.organization)}
              value={draft.organization}
              onChange={(v) => set("organization", v)}
              className={fieldControlClass}
              rightIcon={chevron}
            />
          </div>
          <div className="space-y-2">
            <Label className={fieldLabelClass}>Type</Label>
            <Select
              variant="soft"
              options={[...REPORT_TYPES]}
              value={draft.type}
              onChange={(v) => set("type", v as ReportType)}
              className={fieldControlClass}
              rightIcon={chevron}
            />
          </div>
          <div className="space-y-2">
            <Label className={fieldLabelClass}>Division</Label>
            <Select
              variant="soft"
              options={[...REPORT_DIVISIONS]}
              value={draft.division}
              onChange={(v) => set("division", v as ReportDivision)}
              className={fieldControlClass}
              rightIcon={chevron}
            />
          </div>
        </div>
      </div>
    </ModalShell>
  );
};

export default EditReportModal;

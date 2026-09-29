import { useState } from "react";
import { ChevronDown } from "lucide-react";
import Button from "@/ui/Button";
import Input from "@/ui/Input";
import Select from "@/ui/Select";
import Textarea from "@/ui/Textarea";
import { Label } from "@/ui/Label";
import ModalShell from "@/pages/Founder/_shared/ModalShell";
import { fieldControlClass, fieldLabelClass } from "../styles";
import {
  REPORT_DIVISIONS,
  REPORT_ORGANIZATIONS,
  REPORT_PRODUCTS,
  REPORT_TYPES,
  formatReportDate,
  type Report,
  type ReportDivision,
  type ReportType,
} from "../data";

type EditableFields = Pick<
  Report,
  | "title"
  | "summary"
  | "findings"
  | "recommendation"
  | "product"
  | "organization"
  | "type"
  | "division"
  | "period"
  | "owner"
  | "founderNote"
>;

const chevron = <ChevronDown className="size-4 shrink-0 text-white/60" />;
const areaClass =
  "min-h-[88px] rounded-lg! border-white/10! bg-black! px-3! py-2! text-sm leading-6 text-white placeholder:text-white/30";

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
    summary: report.summary,
    findings: report.findings,
    recommendation: report.recommendation,
    product: report.product,
    organization: report.organization,
    type: report.type,
    division: report.division,
    period: report.period,
    owner: report.owner,
    founderNote: report.founderNote,
  });
  const [error, setError] = useState("");
  const set = <K extends keyof EditableFields>(key: K, value: EditableFields[K]) =>
    setDraft((d) => ({ ...d, [key]: value }));

  const submit = () => {
    if (!draft.title.trim()) return setError("Give the report a title.");
    if (!draft.summary.trim()) return setError("Write the summary a reader will see.");
    if (!draft.recommendation.trim()) return setError("State the action this report recommends.");
    onSave({
      ...draft,
      title: draft.title.trim(),
      summary: draft.summary.trim(),
      findings: draft.findings
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean)
        .join("\n"),
      recommendation: draft.recommendation.trim(),
      period: draft.period.trim() || report.period,
      owner: draft.owner.trim() || report.owner,
      founderNote: draft.founderNote.trim(),
    });
  };

  return (
    <ModalShell
      open
      onClose={onClose}
      panelClassName="max-w-2xl"
      title="Edit report brief"
      description={`${report.id} · ${report.status} · Generated ${formatReportDate(report.createdAt)}`}
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
            title="Save brief"
            onClick={submit}
          />
        </>
      }
    >
      <div className="flex flex-col gap-6">
        <p className="text-sm leading-6 text-white/55">
          This updates the brief the next file is built from. Status still changes from the review
          actions. A founder note stays on the record and is not printed.
        </p>

        <div className="space-y-2">
          <Label className={fieldLabelClass}>Title</Label>
          <Input
            variant="soft"
            autoFocus
            value={draft.title}
            onChange={(e) => {
              set("title", e.target.value);
              setError("");
            }}
            error={!!error && !draft.title.trim()}
            className={fieldControlClass}
          />
        </div>

        <div className="space-y-2">
          <Label className={fieldLabelClass}>Executive summary</Label>
          <Textarea
            variant="soft"
            value={draft.summary}
            onChange={(e) => {
              set("summary", e.target.value);
              setError("");
            }}
            placeholder="What should the reader understand after one reading?"
            className={areaClass}
          />
        </div>

        <div className="space-y-2">
          <Label className={fieldLabelClass}>Findings, one per line</Label>
          <Textarea
            variant="soft"
            value={draft.findings}
            onChange={(e) => set("findings", e.target.value)}
            placeholder={"Revenue finished above plan.\nRenewals are the remaining risk."}
            className={areaClass}
          />
        </div>

        <div className="space-y-2">
          <Label className={fieldLabelClass}>Recommended action</Label>
          <Textarea
            variant="soft"
            value={draft.recommendation}
            onChange={(e) => {
              set("recommendation", e.target.value);
              setError("");
            }}
            placeholder="The decision this report is asking for."
            className="min-h-[72px] rounded-lg! border-white/10! bg-black! px-3! py-2! text-sm leading-6 text-white placeholder:text-white/30"
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div className="space-y-2">
            <Label className={fieldLabelClass}>Period covered</Label>
            <Input
              variant="soft"
              value={draft.period}
              onChange={(e) => set("period", e.target.value)}
              placeholder="e.g. Q4 2024"
              className={fieldControlClass}
            />
          </div>
          <div className="space-y-2">
            <Label className={fieldLabelClass}>Prepared by</Label>
            <Input
              variant="soft"
              value={draft.owner}
              onChange={(e) => set("owner", e.target.value)}
              placeholder="e.g. Founder Office"
              className={fieldControlClass}
            />
          </div>
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

        <div className="space-y-2">
          <Label className={fieldLabelClass}>Founder note, internal</Label>
          <Textarea
            variant="soft"
            value={draft.founderNote}
            onChange={(e) => set("founderNote", e.target.value)}
            placeholder="Context for the next reviewer. This is not printed."
            className="min-h-[72px] rounded-lg! border-white/10! bg-black! px-3! py-2! text-sm leading-6 text-white placeholder:text-white/30"
          />
        </div>

        {error && <p className="text-xs text-[#ef4444]">{error}</p>}
      </div>
    </ModalShell>
  );
};

export default EditReportModal;

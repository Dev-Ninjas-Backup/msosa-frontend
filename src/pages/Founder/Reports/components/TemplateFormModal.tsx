import { useState } from "react";
import { ChevronDown } from "lucide-react";
import Button from "@/ui/Button";
import Checkbox from "@/ui/Checkbox";
import Input from "@/ui/Input";
import Select from "@/ui/Select";
import Textarea from "@/ui/Textarea";
import { Label } from "@/ui/Label";
import ModalShell from "@/pages/Founder/_shared/ModalShell";
import { fieldControlClass, fieldLabelClass } from "../styles";
import {
  TEMPLATE_AUDIENCES,
  TEMPLATE_CATEGORIES,
  TEMPLATE_DIVISIONS,
  TEMPLATE_SECTIONS,
  TEMPLATE_STATUSES,
  templateAudienceMeta,
  type ReportTemplate,
  type TemplateAudience,
  type TemplateSectionId,
  type TemplateStatus,
} from "../data";

export type TemplateValues = Pick<
  ReportTemplate,
  "name" | "category" | "division" | "audience" | "status" | "purpose" | "sections"
>;

const chevron = <ChevronDown className="size-4 shrink-0 text-white/60" />;
const areaClass =
  "min-h-[96px] rounded-lg! border-white/10! bg-black! px-3! py-2! text-sm leading-6 text-white placeholder:text-white/30";

const TemplateFormModal = ({
  template,
  existingNames,
  onClose,
  onSubmit,
}: {
  /** Omit to create a new template. */
  template?: ReportTemplate;
  existingNames: string[];
  onClose: () => void;
  onSubmit: (values: TemplateValues) => void;
}) => {
  const [values, setValues] = useState<TemplateValues>(() =>
    template
      ? {
          name: template.name,
          category: template.category,
          division: template.division,
          audience: template.audience,
          status: template.status,
          purpose: template.purpose,
          sections: template.sections,
        }
      : {
          name: "",
          category: TEMPLATE_CATEGORIES[0],
          division: TEMPLATE_DIVISIONS[0],
          audience: "Founder",
          status: "Drafting",
          purpose: "",
          sections: ["cover", "summary", "results", "action-plan"],
        }
  );
  const [error, setError] = useState("");
  const set = <K extends keyof TemplateValues>(key: K, value: TemplateValues[K]) =>
    setValues((v) => ({ ...v, [key]: value }));

  const toggleSection = (id: TemplateSectionId) => {
    setValues((current) => ({
      ...current,
      sections: current.sections.includes(id)
        ? current.sections.filter((section) => section !== id)
        : [...current.sections, id],
    }));
    setError("");
  };

  const submit = () => {
    const name = values.name.trim();
    const purpose = values.purpose.trim();
    if (!name) return setError("Name the template.");
    if (!purpose) return setError("Say what a report from this template is for.");
    if (!values.sections.length) return setError("Include at least one section.");
    const taken = existingNames.some(
      (n) => n.toLowerCase() === name.toLowerCase() && n !== template?.name
    );
    if (taken) return setError("A template with this name already exists.");
    onSubmit({ ...values, name, purpose });
  };

  const audienceHint = templateAudienceMeta[values.audience].subtitle;

  return (
    <ModalShell
      open
      onClose={onClose}
      panelClassName="max-w-2xl"
      title={template ? "Edit template" : "Create template"}
      description={
        template
          ? `${template.id} · ${template.version}. A saved change issues the next version.`
          : "A new template stays in draft until it is published."
      }
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
            title={template ? "Save template" : "Create template"}
            onClick={submit}
          />
        </>
      }
    >
      <div className="flex flex-col gap-6">
        <div className="space-y-2">
          <Label className={fieldLabelClass}>Template name</Label>
          <Input
            variant="soft"
            autoFocus
            placeholder="e.g. Quarterly Growth Protocol™"
            value={values.name}
            onChange={(e) => {
              set("name", e.target.value);
              setError("");
            }}
            error={!!error && !values.name.trim()}
            className={fieldControlClass}
          />
        </div>

        <div className="space-y-2">
          <Label className={fieldLabelClass}>Purpose</Label>
          <Textarea
            variant="soft"
            value={values.purpose}
            onChange={(e) => {
              set("purpose", e.target.value);
              setError("");
            }}
            placeholder="What decision or understanding should this report leave the reader with?"
            className={areaClass}
          />
        </div>

        <div className="space-y-3">
          <Label className={fieldLabelClass}>Sections included</Label>
          <div className="grid gap-2 sm:grid-cols-2">
            {TEMPLATE_SECTIONS.map((section) => {
              const on = values.sections.includes(section.id);
              return (
                <label
                  key={section.id}
                  className="flex cursor-pointer items-start gap-3 rounded-xl border border-white/10 bg-black/40 p-3"
                >
                  <Checkbox
                    checked={on}
                    onCheckedChange={() => toggleSection(section.id)}
                    aria-label={section.title}
                    className="mt-0.5"
                  />
                  <span>
                    <span className="block text-sm text-white">{section.title}</span>
                    <span className="block text-[11px] leading-4 text-white/45">{section.description}</span>
                  </span>
                </label>
              );
            })}
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div className="space-y-2">
            <Label className={fieldLabelClass}>Category</Label>
            <Select
              variant="soft"
              options={[...TEMPLATE_CATEGORIES]}
              value={values.category}
              onChange={(v) => set("category", v)}
              className={fieldControlClass}
              rightIcon={chevron}
            />
          </div>
          <div className="space-y-2">
            <Label className={fieldLabelClass}>Division</Label>
            <Select
              variant="soft"
              options={[...TEMPLATE_DIVISIONS]}
              value={values.division}
              onChange={(v) => set("division", v)}
              className={fieldControlClass}
              rightIcon={chevron}
            />
          </div>
          <div className="space-y-2">
            <Label className={fieldLabelClass}>Who it is written for</Label>
            <Select
              variant="soft"
              options={TEMPLATE_AUDIENCES.map((a) => ({
                label: templateAudienceMeta[a].label,
                value: a,
              }))}
              value={values.audience}
              onChange={(v) => set("audience", v as TemplateAudience)}
              className={fieldControlClass}
              rightIcon={chevron}
            />
            <p className="text-[11px] text-white/40">{audienceHint}</p>
          </div>
          <div className="space-y-2">
            <Label className={fieldLabelClass}>Status</Label>
            <Select
              variant="soft"
              options={[...TEMPLATE_STATUSES]}
              value={values.status}
              onChange={(v) => set("status", v as TemplateStatus)}
              className={fieldControlClass}
              rightIcon={chevron}
            />
            <p className="text-[11px] text-white/40">
              {values.status === "Published"
                ? "Live. New reports can be generated from it."
                : values.status === "Drafting"
                  ? "Still being shaped. It is not offered for generation."
                  : "Kept, and no longer offered for new reports."}
            </p>
          </div>
        </div>

        {error && <p className="text-xs text-[#ef4444]">{error}</p>}
      </div>
    </ModalShell>
  );
};

export default TemplateFormModal;

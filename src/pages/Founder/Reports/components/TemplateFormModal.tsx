import { useState } from "react";
import { ChevronDown } from "lucide-react";
import Button from "@/ui/Button";
import Input from "@/ui/Input";
import Select from "@/ui/Select";
import { Label } from "@/ui/Label";
import ModalShell from "@/pages/Founder/_shared/ModalShell";
import { fieldControlClass, fieldLabelClass } from "../styles";
import {
  TEMPLATE_AUDIENCES,
  TEMPLATE_CATEGORIES,
  TEMPLATE_DIVISIONS,
  TEMPLATE_STATUSES,
  templateAudienceMeta,
  type ReportTemplate,
  type TemplateAudience,
  type TemplateStatus,
} from "../data";

export type TemplateValues = Pick<
  ReportTemplate,
  "name" | "category" | "division" | "audience" | "status"
>;

const chevron = <ChevronDown className="size-4 shrink-0 text-white/60" />;

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
        }
      : {
      name: "",
      category: TEMPLATE_CATEGORIES[0],
      division: TEMPLATE_DIVISIONS[0],
      audience: "Founder",
      status: "Drafting",
    }
  );
  const [error, setError] = useState("");
  const set = <K extends keyof TemplateValues>(key: K, value: TemplateValues[K]) =>
    setValues((v) => ({ ...v, [key]: value }));

  const submit = () => {
    const name = values.name.trim();
    if (!name) return setError("Template name is required");
    const taken = existingNames.some(
      (n) => n.toLowerCase() === name.toLowerCase() && n !== template?.name
    );
    if (taken) return setError("A template with this name already exists");
    onSubmit({ ...values, name });
  };

  return (
    <ModalShell
      open
      onClose={onClose}
      title={template ? "Edit Template" : "Create Template"}
      description={
        template
          ? `${template.id} · ${template.version}`
          : "New templates start as drafts until they are published."
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
            title={template ? "Save Changes" : "Create Template"}
            onClick={submit}
          />
        </>
      }
    >
      <div className="flex flex-col gap-5">
        <div className="space-y-2">
          <Label className={fieldLabelClass}>Template Name</Label>
          <Input
            variant="soft"
            autoFocus
            placeholder="e.g. Quarterly Growth Protocol™"
            value={values.name}
            onChange={(e) => {
              set("name", e.target.value);
              setError("");
            }}
            error={!!error}
            className={fieldControlClass}
          />
          {error && <p className="text-xs text-[#ef4444]">{error}</p>}
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
            <Label className={fieldLabelClass}>Report Audience</Label>
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
          </div>
        </div>
      </div>
    </ModalShell>
  );
};

export default TemplateFormModal;

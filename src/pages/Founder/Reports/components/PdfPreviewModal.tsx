import { Printer } from "lucide-react";
import Button from "@/ui/Button";
import ModalShell from "@/pages/Founder/_shared/ModalShell";
import {
  TEMPLATE_SECTIONS,
  templateAudienceMeta,
  type PdfConfig,
  type TemplateAudience,
  type TemplateSectionId,
} from "../data";

export type PreviewDocument = {
  id: string;
  title: string;
  subtitle: string;
  purpose?: string;
  audience?: TemplateAudience;
  version?: string;
  sections?: TemplateSectionId[];
};

const PdfPreviewModal = ({
  doc,
  config,
  sections,
  onClose,
  onPrint,
}: {
  doc: PreviewDocument;
  config: PdfConfig;
  sections: TemplateSectionId[];
  onClose: () => void;
  onPrint: () => void;
}) => {
  const [headingFont, bodyFont] = config.typography.split(" / ");
  const shown = doc.sections?.length ? doc.sections : sections;
  const bodySections = TEMPLATE_SECTIONS.filter((s) => s.id !== "cover" && shown.includes(s.id));
  const audience = doc.audience ? templateAudienceMeta[doc.audience].label : null;

  return (
    <ModalShell
      open
      onClose={onClose}
      panelClassName="max-w-3xl"
      title={doc.title}
      description={[doc.version, audience, doc.subtitle].filter(Boolean).join(" · ")}
      footer={
        <>
          <Button
            variant="ghost"
            size="md"
            className="border-0 font-medium normal-case tracking-normal"
            title="Close"
            onClick={onClose}
          />
          <Button
            variant="primary"
            size="md"
            className="rounded-lg px-5 font-medium"
            leftIcon={<Printer className="size-4" />}
            title="Print / Save PDF"
            onClick={onPrint}
          />
        </>
      }
    >
      <div
        className="relative mx-auto w-full max-w-xl overflow-hidden rounded-md bg-white px-8 py-7 text-[#111] shadow-xl"
        style={{ fontFamily: `"${bodyFont}", Inter, sans-serif` }}
      >
        {config.watermark && (
          <span className="pointer-events-none absolute inset-0 flex -rotate-30 items-center justify-center text-5xl font-extrabold text-black/[0.04]">
            FAR CONFIDENTIAL
          </span>
        )}
        <div
          className="flex items-center justify-between border-b-2 pb-3"
          style={{ borderColor: config.primaryColor }}
        >
          {config.logoUrl ? (
            <img src={config.logoUrl} alt="Company logo" className="h-6 max-w-[120px] object-contain" />
          ) : (
            <span className="text-sm font-bold tracking-[3px]" style={{ color: config.primaryColor }}>
              FAR
            </span>
          )}
          <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: config.accentColor }}>
            {doc.id}
          </span>
        </div>

        <div className="py-5">
          <p className="text-[10px] font-bold uppercase tracking-wider" style={{ color: config.accentColor }}>
            {audience ?? "FAR Platform Report"}
          </p>
          <p
            className="mt-1 text-2xl font-bold leading-tight"
            style={{ fontFamily: `"${headingFont}", Inter, sans-serif` }}
          >
            {doc.title}
          </p>
          <p className="mt-2 text-xs leading-5 text-black/55">{doc.subtitle}</p>
        </div>

        {doc.purpose ? (
          <div className="border-t border-black/10 py-4">
            <p className="text-[11px] font-bold uppercase tracking-wide" style={{ color: config.primaryColor }}>
              Purpose
            </p>
            <p className="mt-1.5 text-[13px] leading-5 text-black/80">{doc.purpose}</p>
          </div>
        ) : null}

        {bodySections.map((section) => (
          <div key={section.id} className="border-t border-black/10 py-4">
            <p className="text-[11px] font-bold uppercase tracking-wide" style={{ color: config.primaryColor }}>
              {section.title}
            </p>
            <p className="mt-1.5 text-[13px] leading-5 text-black/70">{section.description}</p>
          </div>
        ))}

        {config.pageNumbering && (
          <p className="border-t border-black/10 pt-3 text-center text-[10px] text-black/40">
            {doc.id}
            {doc.version ? ` · ${doc.version}` : ""} · Page 1
          </p>
        )}
      </div>
    </ModalShell>
  );
};

export default PdfPreviewModal;

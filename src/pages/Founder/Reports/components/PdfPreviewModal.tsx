import { Printer } from "lucide-react";
import Button from "@/ui/Button";
import ModalShell from "@/pages/Founder/_shared/ModalShell";
import { TEMPLATE_SECTIONS, type PdfConfig, type TemplateSectionId } from "../data";

export type PreviewDocument = { id: string; title: string; subtitle: string };

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
  const bodySections = TEMPLATE_SECTIONS.filter((s) => s.id !== "cover" && sections.includes(s.id));

  return (
    <ModalShell
      open
      onClose={onClose}
      title="PDF Style Preview"
      description={`${config.typography} · ${sections.length} section${sections.length === 1 ? "" : "s"} enabled`}
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
        className="relative mx-auto aspect-[1/1.414] w-full max-w-sm overflow-hidden rounded-md bg-white p-6 text-[#111] shadow-xl"
        style={{ fontFamily: `"${bodyFont}", Inter, sans-serif` }}
      >
        {config.watermark && (
          <span className="pointer-events-none absolute inset-0 flex -rotate-30 items-center justify-center text-4xl font-extrabold text-black/[0.05]">
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
          <span className="text-[8px] font-bold uppercase tracking-wider" style={{ color: config.accentColor }}>
            {doc.id}
          </span>
        </div>
        {sections.includes("cover") ? (
          <div className="py-6">
            <p className="text-[8px] font-bold uppercase tracking-wider" style={{ color: config.accentColor }}>
              FAR Platform Report
            </p>
            <p className="mt-1 text-lg font-bold leading-tight" style={{ fontFamily: `"${headingFont}", Inter, sans-serif` }}>
              {doc.title}
            </p>
            <p className="mt-1 text-[9px] text-black/50">{doc.subtitle}</p>
          </div>
        ) : (
          <p className="pt-4 pb-2 text-sm font-bold">{doc.title}</p>
        )}
        <div className="flex flex-col gap-2">
          {bodySections.map((s) => (
            <div key={s.id} className="border-t border-black/10 pt-2">
              <p className="text-[9px] font-bold" style={{ color: config.primaryColor }}>
                {s.title}
              </p>
              <div className="mt-1 h-1 w-full rounded bg-black/10" />
              <div className="mt-1 h-1 w-3/4 rounded bg-black/10" />
            </div>
          ))}
        </div>
        {config.pageNumbering && (
          <span className="absolute inset-x-0 bottom-2 text-center text-[8px] text-black/40">
            Page 1 of {Math.max(1, bodySections.length)}
          </span>
        )}
      </div>
    </ModalShell>
  );
};

export default PdfPreviewModal;

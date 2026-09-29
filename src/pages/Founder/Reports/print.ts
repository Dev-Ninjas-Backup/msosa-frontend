import { TEMPLATE_SECTIONS, type PdfConfig, type TemplateSectionId } from "./data";

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export type PrintableDocument = {
  id: string;
  title: string;
  subtitle: string;
  meta: [label: string, value: string][];
  /** When present, these blocks are the document. Generic section filler is omitted. */
  narrative?: { heading: string; body: string }[];
};

/**
 * Opens a branded, print-ready view of a document so the browser's
 * "Save as PDF" produces the final file. Returns false if the popup was blocked.
 */
export const openPrintableReport = (
  doc: PrintableDocument,
  config: PdfConfig,
  sections: TemplateSectionId[]
) => {
  const win = window.open("", "_blank", "width=900,height=1100");
  if (!win) return false;

  const [headingFont] = config.typography.split(" / ");
  const narrativeHtml = (doc.narrative ?? [])
    .filter((block) => block.body.trim())
    .map((block) => {
      const lines = block.body.split("\n").map((line) => line.trim()).filter(Boolean);
      const body =
        lines.length > 1
          ? `<ul>${lines.map((line) => `<li>${escapeHtml(line)}</li>`).join("")}</ul>`
          : `<p>${escapeHtml(lines[0] ?? "")}</p>`;
      return `<section><h2>${escapeHtml(block.heading)}</h2>${body}</section>`;
    })
    .join("");
  const sectionHtml = narrativeHtml
    ? narrativeHtml
    : TEMPLATE_SECTIONS.filter((s) => s.id !== "cover" && sections.includes(s.id))
        .map(
          (s) => `<section><h2>${escapeHtml(s.title)}</h2><p>${escapeHtml(s.description)}</p></section>`
        )
        .join("");
  const logo = config.logoUrl
    ? `<img src="${config.logoUrl}" alt="" style="height:40px" />`
    : `<strong style="color:${config.primaryColor};letter-spacing:4px">FAR</strong>`;

  win.document.write(`<!doctype html><html><head><title>${escapeHtml(doc.id)} — ${escapeHtml(doc.title)}</title>
<style>
  @page { margin: 24mm 18mm; }
  body { font-family: "${headingFont}", Inter, system-ui, sans-serif; color: #111; margin: 0; }
  header { display:flex; justify-content:space-between; align-items:center; border-bottom: 3px solid ${config.primaryColor}; padding-bottom: 16px; }
  .cover { padding: 48px 0 32px; }
  .cover h1 { font-size: 32px; margin: 0 0 8px; }
  .cover p { color: #555; margin: 0; }
  .tag { color: ${config.accentColor}; font-weight: 700; font-size: 12px; letter-spacing: 1px; text-transform: uppercase; }
  dl { display:grid; grid-template-columns: 160px 1fr; gap: 8px 16px; margin: 24px 0; font-size: 14px; }
  dt { color:#777; }
  section { border-top: 1px solid #eee; padding: 16px 0; }
  section h2 { font-size: 16px; margin: 0 0 4px; color: ${config.primaryColor}; }
  section p, section li { margin: 0; color: #444; font-size: 13px; line-height: 1.5; }
  section ul { margin: 0; padding-left: 18px; }
  section li + li { margin-top: 6px; }
  .watermark { position: fixed; inset: 0; display:flex; align-items:center; justify-content:center; font-size: 96px; font-weight: 800; color: rgba(0,0,0,0.04); transform: rotate(-30deg); pointer-events:none; }
  footer { position: fixed; bottom: 0; left: 0; right: 0; text-align: center; font-size: 11px; color: #999; }
</style></head><body>
${config.watermark ? '<div class="watermark">FAR CONFIDENTIAL</div>' : ""}
<header>${logo}<span class="tag">${escapeHtml(doc.id)}</span></header>
${
  sections.includes("cover")
    ? `<div class="cover"><p class="tag">FAR Platform Report</p><h1>${escapeHtml(doc.title)}</h1><p>${escapeHtml(doc.subtitle)}</p></div>`
    : `<h1 style="font-size:24px;margin:32px 0 0">${escapeHtml(doc.title)}</h1>`
}
<dl>${doc.meta.map(([k, v]) => `<dt>${escapeHtml(k)}</dt><dd style="margin:0">${escapeHtml(v)}</dd>`).join("")}</dl>
${sectionHtml}
${config.pageNumbering ? `<footer>${escapeHtml(doc.id)} · Generated ${new Date().toLocaleDateString("en-US")}</footer>` : ""}
<script>window.onload = () => { window.focus(); window.print(); };</script>
</body></html>`);
  win.document.close();
  return true;
};

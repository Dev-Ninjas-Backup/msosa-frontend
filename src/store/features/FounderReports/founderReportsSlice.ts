import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import {
  APPROVAL_WORKFLOWS,
  INITIAL_PDF_CONFIG,
  INITIAL_REPORTS,
  INITIAL_TEMPLATES,
  TEMPLATE_SECTIONS,
  bumpVersion,
  type PdfConfig,
  type Report,
  type ReportTemplate,
  type TemplateSectionId,
} from "@/pages/Founder/Reports/data";

type FounderReportsState = {
  reports: Report[];
  templates: ReportTemplate[];
  pdfConfig: PdfConfig;
  enabledSections: TemplateSectionId[];
  workflow: string;
};

const initialState: FounderReportsState = {
  reports: INITIAL_REPORTS,
  templates: INITIAL_TEMPLATES,
  pdfConfig: INITIAL_PDF_CONFIG,
  enabledSections: TEMPLATE_SECTIONS.filter((s) => s.id !== "history").map((s) => s.id),
  workflow: APPROVAL_WORKFLOWS[0].name,
};

const founderReportsSlice = createSlice({
  name: "founderReports",
  initialState,
  reducers: {
    updateReport: (
      state,
      action: PayloadAction<{ id: string; patch: Partial<Omit<Report, "id">> }>
    ) => {
      const report = state.reports.find((r) => r.id === action.payload.id);
      if (report) Object.assign(report, action.payload.patch);
    },
    addTemplate: (state, action: PayloadAction<ReportTemplate>) => {
      state.templates.unshift(action.payload);
    },
    updateTemplate: (
      state,
      action: PayloadAction<{ id: string; patch: Partial<Omit<ReportTemplate, "id">> }>
    ) => {
      const template = state.templates.find((t) => t.id === action.payload.id);
      if (template) Object.assign(template, action.payload.patch);
    },
    publishAllTemplates: (state) => {
      state.templates.forEach((t) => {
        if (t.status === "Drafting") {
          t.status = "Published";
          t.version = bumpVersion(t.version);
        }
      });
    },
    updatePdfConfig: (state, action: PayloadAction<Partial<PdfConfig>>) => {
      Object.assign(state.pdfConfig, action.payload);
    },
    toggleSection: (state, action: PayloadAction<TemplateSectionId>) => {
      const id = action.payload;
      state.enabledSections = state.enabledSections.includes(id)
        ? state.enabledSections.filter((s) => s !== id)
        : [...state.enabledSections, id];
    },
    setWorkflow: (state, action: PayloadAction<string>) => {
      state.workflow = action.payload;
    },
  },
});

export const {
  updateReport,
  addTemplate,
  updateTemplate,
  publishAllTemplates,
  updatePdfConfig,
  toggleSection,
  setWorkflow,
} = founderReportsSlice.actions;
export default founderReportsSlice.reducer;

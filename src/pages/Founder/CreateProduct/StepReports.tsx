import { Palette, Lightbulb } from "lucide-react";
import { cn } from "@/lib/utils";
import Input from "@/ui/Input";
import Select from "@/ui/Select";
import Textarea from "@/ui/Textarea";
import { Label } from "@/ui/Label";
import Button from "@/ui/Button";
import { type ProductDraft } from "./data";

type StepProps = {
    draft: ProductDraft;
    setDraft: (patch: Partial<ProductDraft>) => void;
};

const fieldInput =
    "h-11! rounded-lg! border-white/10! bg-white/[0.05]! px-4! text-sm placeholder:text-white/30";

const fieldTextarea =
    "rounded-lg! border-white/10! bg-white/[0.05]! px-4! py-3! text-sm placeholder:text-white/30 shadow-none";

const TEMPLATE_STYLES = ["Standard", "Executive", "Detailed", "Minimal"];
const REPORT_FORMATS = ["PDF", "DOCX", "HTML"];
const PAGE_SIZES = ["A4", "Letter", "Legal", "A3"];
const MARGIN_SIZES = ["Normal", "Narrow", "Wide", "None"];
const FONT_FAMILIES = ["Inter", "Roboto", "Open Sans", "Georgia", "Helvetica"];
const LOGO_POSITIONS = ["Top Left", "Top Right", "Top Center"] as const;
const REC_STYLES = ["Bullet Points", "Numbered", "Priority Matrix"] as const;

const Field = ({
    label,
    required,
    hint,
    className,
    children,
}: {
    label: string;
    required?: boolean;
    hint?: string;
    className?: string;
    children: React.ReactNode;
}) => (
    <div className={cn("space-y-1.5", className)}>
        <Label className="text-xs font-semibold tracking-[0.3px] text-white">
            {label} {required && <span className="text-[#ef4444]">*</span>}
        </Label>
        {children}
        {hint && <p className="text-[11px] text-white/60">{hint}</p>}
    </div>
);

const MiniToggle = ({
    on,
    onToggle,
}: {
    on: boolean;
    onToggle: () => void;
}) => (
    <button
        type="button"
        role="switch"
        aria-checked={on}
        onClick={onToggle}
        className={cn(
            "relative h-5 w-9 shrink-0 rounded-full border-0 cursor-pointer",
            on ? "bg-[#fbbf24]" : "bg-white/10"
        )}
    >
        <span
            className={cn(
                "absolute top-[3px] size-3.5 rounded-full transition-transform",
                on ? "left-[18px] bg-black" : "left-1 bg-white/60"
            )}
        />
    </button>
);

const ColorSwatch = ({
    label,
    value,
    onChange,
}: {
    label: string;
    value: string;
    onChange: (v: string) => void;
}) => (
    <label className="flex h-11 cursor-pointer items-center justify-between gap-3 rounded-lg border border-white/10 bg-white/[0.05] px-3">
        <span className="flex items-center gap-2.5 min-w-0">
            <span
                className="size-5 shrink-0 rounded border border-white/20"
                style={{ backgroundColor: value }}
            />
            <span className="text-sm text-white truncate">{label}</span>
        </span>
        <span className="text-xs text-white/40 shrink-0 uppercase">{value}</span>
        <input
            type="color"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="sr-only"
            aria-label={label}
        />
    </label>
);

const Segmented = <T extends string>({
    options,
    value,
    onChange,
}: {
    options: readonly T[];
    value: T;
    onChange: (v: T) => void;
}) => (
    <div className="flex flex-wrap gap-2">
        {options.map((opt) => {
            const on = value === opt;
            return (
                <button
                    key={opt}
                    type="button"
                    onClick={() => onChange(opt)}
                    className={cn(
                        "h-9 rounded-lg px-4 text-sm font-medium border cursor-pointer transition-colors",
                        on
                            ? "border-[#fbbf24] bg-[#fbbf24]/15 text-[#fbbf24]"
                            : "border-white/10 bg-white/[0.05] text-white/60 hover:text-white"
                    )}
                >
                    {opt}
                </button>
            );
        })}
    </div>
);

export const StepReports = ({ draft, setDraft }: StepProps) => {
    // Sensible defaults so the UI matches the screenshot even if draft fields are empty
    const templateStyle = draft.reportTemplateStyle ?? "Standard";
    const reportFormat = draft.reportFormat ?? "PDF";
    const reportTitle = draft.reportTitle ?? "";
    const reportSubtitle = draft.reportSubtitle ?? "";
    const pdfLayout = draft.pdfLayout ?? "Portrait";
    const pageSize = draft.pageSize ?? "A4";
    const marginSize = draft.marginSize ?? "Normal";
    const fontFamily = draft.fontFamily ?? "Inter";
    const includeExecSummary = draft.includeExecSummary ?? true;
    const execSummaryTemplate = draft.execSummaryTemplate ?? "";
    const includeRecommendations = draft.includeRecommendations ?? true;
    const recommendationStyle = draft.recommendationStyle ?? "Bullet Points";
    const primaryColor = draft.reportPrimaryColor ?? "#D4A554";
    const secondaryColor = draft.reportSecondaryColor ?? "#2D4A3E";
    const logoPosition = draft.logoPosition ?? "Top Left";
    const reportHeader = draft.reportHeader ?? "FAR Platform™";
    const showWatermark = draft.showFarWatermark ?? true;
    const includeFooter = draft.includeFooter ?? true;
    const footerLeft = draft.footerLeftText ?? "";
    const footerRight = draft.footerRightText ?? "";
    const showPageNumbers = draft.showPageNumbers ?? true;

    return (
        <div className="space-y-5">
            {/* ── Report Template ── */}
            <section className="space-y-4 rounded-xl border border-white/10 bg-white/[0.05] p-5">
                <p className="text-sm font-bold tracking-[0.35px] text-white">
                    Report Template
                </p>

                <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="Template Style" required>
                        <Select
                            variant="soft"
                            options={TEMPLATE_STYLES}
                            value={templateStyle}
                            onChange={(v) => setDraft({ reportTemplateStyle: v })}
                        />
                    </Field>
                    <Field label="Report Format" required>
                        <Select
                            variant="soft"
                            options={REPORT_FORMATS}
                            value={reportFormat}
                            onChange={(v) => setDraft({ reportFormat: v })}
                        />
                    </Field>
                </div>

                <Field label="Report Title" required>
                    <Input
                        variant="soft"
                        placeholder="e.g. FAR Reflection™ Assessment Report"
                        value={reportTitle}
                        onChange={(e) => setDraft({ reportTitle: e.target.value })}
                        className={fieldInput}
                    />
                </Field>

                <Field label="Report Subtitle">
                    <Input
                        variant="soft"
                        placeholder="Optional subtitle or tagline"
                        value={reportSubtitle}
                        onChange={(e) => setDraft({ reportSubtitle: e.target.value })}
                        className={fieldInput}
                    />
                </Field>
            </section>

            {/* ── PDF Template ── */}
            <section className="space-y-4 rounded-xl border border-white/10 bg-white/[0.05] p-5">
                <div className="flex items-center gap-2">
                    <span className="flex size-6 items-center justify-center rounded-md bg-[#fbbf24]/12 text-[#fbbf24]">
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="10" viewBox="0 0 12 10" fill="none">
                            <g clip-path="url(#clip0_1336_61375)">
                                <path d="M0.5564 1.01117C0.32495 0.779575 0.32495 0.405305 0.5564 0.173702C0.787849 -0.0579007 1.16372 -0.0579007 1.39518 0.173702L4.95026 3.73113C5.18169 3.96272 5.18169 4.33885 4.95026 4.57045L1.39518 8.12782C1.16372 8.35942 0.787849 8.35942 0.5564 8.12782C0.32495 7.89627 0.32495 7.52014 0.5564 7.28854L3.69116 4.14985L0.5564 1.01117ZM5.12244 7.11437H10.455C10.7828 7.11437 11.0475 7.37933 11.0475 7.70727C11.0475 8.03526 10.7828 8.3002 10.455 8.3002H5.12244C4.79472 8.3002 4.52993 8.03526 4.52993 7.70727C4.52993 7.37933 4.79472 7.11437 5.12244 7.11437Z" fill="#FBBF24" />
                            </g>
                            <defs>
                                <clipPath id="clip0_1336_61375">
                                    <rect width="11.7" height="9.11" fill="white" />
                                </clipPath>
                            </defs>
                        </svg>
                    </span>
                    <p className="text-sm font-bold tracking-[0.35px] text-white">
                        PDF Template
                    </p>
                </div>

                <div className="space-y-1.5">
                    <Label className="text-xs font-semibold tracking-[0.3px] text-white">
                        PDF Layout <span className="text-[#ef4444]">*</span>
                    </Label>
                    <div className="flex justify-center">
                        <div className="inline-flex gap-2">
                            {(["Portrait", "Landscape"] as const).map((opt) => {
                                const on = pdfLayout === opt;
                                return (
                                    <button
                                        key={opt}
                                        type="button"
                                        onClick={() => setDraft({ pdfLayout: opt })}
                                        className={cn(
                                            "h-9 min-w-[110px] rounded-lg px-5 text-sm font-medium border cursor-pointer transition-colors",
                                            on
                                                ? "border-[#fbbf24] bg-[#fbbf24]/15 text-[#fbbf24]"
                                                : "border-white/10 bg-white/[0.05] text-white/60 hover:text-white"
                                        )}
                                    >
                                        {opt}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>

                <div className="flex justify-center">
                    <div className="grid w-full max-w-xl grid-cols-3 gap-4">
                        <div className="space-y-1.5">
                            <Label className="text-xs font-semibold tracking-[0.3px] text-white">
                                Page Size <span className="text-[#ef4444]">*</span>
                            </Label>
                            <Select
                                variant="soft"
                                options={PAGE_SIZES}
                                value={pageSize}
                                onChange={(v) => setDraft({ pageSize: v })}
                            />
                        </div>
                        <div className="space-y-1.5">
                            <Label className="text-xs font-semibold tracking-[0.3px] text-white">
                                Margin Size
                            </Label>
                            <Select
                                variant="soft"
                                options={MARGIN_SIZES}
                                value={marginSize}
                                onChange={(v) => setDraft({ marginSize: v })}
                            />
                        </div>
                        <div className="space-y-1.5">
                            <Label className="text-xs font-semibold tracking-[0.3px] text-white">
                                Font Family
                            </Label>
                            <Select
                                variant="soft"
                                options={FONT_FAMILIES}
                                value={fontFamily}
                                onChange={(v) => setDraft({ fontFamily: v })}
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Executive Summary + Recommendations (side by side) ── */}
            <div className="grid gap-5 xl:grid-cols-2">
                {/* Executive Summary */}
                <section className="space-y-4 rounded-xl border border-white/10 bg-white/[0.05] p-5">
                    <div className="flex items-center gap-2">
                        <span className="flex size-6 items-center justify-center rounded-md bg-[#fbbf24]/12 text-[#fbbf24]">
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                                <g clip-path="url(#clip0_1336_61424)">
                                    <path d="M4.125 0.5625C4.125 0.250781 3.87422 0 3.5625 0C3.25078 0 3 0.250781 3 0.5625V1.5C2.17266 1.5 1.5 2.17266 1.5 3H0.5625C0.250781 3 0 3.25078 0 3.5625C0 3.87422 0.250781 4.125 0.5625 4.125H1.5V5.4375H0.5625C0.250781 5.4375 0 5.68828 0 6C0 6.31172 0.250781 6.5625 0.5625 6.5625H1.5V7.875H0.5625C0.250781 7.875 0 8.12578 0 8.4375C0 8.74922 0.250781 9 0.5625 9H1.5C1.5 9.82734 2.17266 10.5 3 10.5V11.4375C3 11.7492 3.25078 12 3.5625 12C3.87422 12 4.125 11.7492 4.125 11.4375V10.5H5.4375V11.4375C5.4375 11.7492 5.68828 12 6 12C6.31172 12 6.5625 11.7492 6.5625 11.4375V10.5H7.875V11.4375C7.875 11.7492 8.12578 12 8.4375 12C8.74922 12 9 11.7492 9 11.4375V10.5C9.82734 10.5 10.5 9.82734 10.5 9H11.4375C11.7492 9 12 8.74922 12 8.4375C12 8.12578 11.7492 7.875 11.4375 7.875H10.5V6.5625H11.4375C11.7492 6.5625 12 6.31172 12 6C12 5.68828 11.7492 5.4375 11.4375 5.4375H10.5V4.125H11.4375C11.7492 4.125 12 3.87422 12 3.5625C12 3.25078 11.7492 3 11.4375 3H10.5C10.5 2.17266 9.82734 1.5 9 1.5V0.5625C9 0.250781 8.74922 0 8.4375 0C8.12578 0 7.875 0.250781 7.875 0.5625V1.5H6.5625V0.5625C6.5625 0.250781 6.31172 0 6 0C5.68828 0 5.4375 0.250781 5.4375 0.5625V1.5H4.125V0.5625ZM3.75 3H8.25C8.66484 3 9 3.33516 9 3.75V8.25C9 8.66484 8.66484 9 8.25 9H3.75C3.33516 9 3 8.66484 3 8.25V3.75C3 3.33516 3.33516 3 3.75 3ZM8.25 3.75H3.75V8.25H8.25V3.75Z" fill="#FBBF24" />
                                </g>
                                <defs>
                                    <clipPath id="clip0_1336_61424">
                                        <rect width="12" height="12" fill="white" />
                                    </clipPath>
                                </defs>
                            </svg>
                        </span>
                        <p className="text-sm font-bold tracking-[0.35px] text-white">
                            Executive Summary
                        </p>
                    </div>

                    <div className="flex items-center justify-between gap-4 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-3">
                        <span className="text-sm text-white">Include Executive Summary</span>
                        <MiniToggle
                            on={includeExecSummary}
                            onToggle={() =>
                                setDraft({ includeExecSummary: !includeExecSummary })
                            }
                        />
                    </div>

                    {includeExecSummary && (
                        <>
                            <Field label="Executive Summary Template">
                                <Textarea
                                    variant="soft"
                                    maxLength={1000}
                                    placeholder="Enter your executive summary template text or use AI to generate..."
                                    value={execSummaryTemplate}
                                    onChange={(e) =>
                                        setDraft({ execSummaryTemplate: e.target.value })
                                    }
                                    className={cn(fieldTextarea, "min-h-[100px]")}
                                />
                                <p className="text-right text-[11px] text-white/40">
                                    {execSummaryTemplate.length} / 1000 characters
                                </p>
                            </Field>

                            <Button
                                variant="secondary"
                                size="sm"
                                className="h-9 gap-2 rounded-lg px-3 font-medium normal-case tracking-normal border-white/10 bg-white/[0.05] text-[#fbbf24] hover:bg-white/[0.08]"
                                leftIcon={<Lightbulb className="size-3.5" />}
                                title="AI Generate Summary"
                                onClick={() => {
                                    // Placeholder – wire to your AI generation endpoint
                                    setDraft({
                                        execSummaryTemplate:
                                            "This report summarizes the key findings from the FAR Reflection™ assessment, highlighting strengths, growth areas, and recommended next steps.",
                                    });
                                }}
                            />
                        </>
                    )}
                </section>

                {/* Recommendations */}
                <section className="space-y-4 rounded-xl border border-white/10 bg-white/[0.05] p-5">
                    <div className="flex items-center gap-2">
                        <span className="flex size-6 items-center justify-center rounded-md bg-[#fbbf24]/12 text-[#fbbf24]">
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="12" viewBox="0 0 14 12" fill="none">
                                <g clip-path="url(#clip0_1336_61451)">
                                    <path d="M7.0026 0C7.36357 0 7.65521 0.291697 7.65521 0.65275V1.95825H10.1025C10.9141 1.95825 11.5708 2.61508 11.5708 3.42694V8.97531C11.5708 9.78715 10.9141 10.444 10.1025 10.444H3.90273C3.09106 10.444 2.43437 9.78715 2.43437 8.97531V3.42694C2.43437 2.61508 3.09106 1.95825 3.90273 1.95825H6.35V0.65275C6.35 0.291697 6.64164 0 7.0026 0ZM4.71849 7.833C4.53902 7.833 4.39219 7.97987 4.39219 8.15937C4.39219 8.33888 4.53902 8.48575 4.71849 8.48575H5.37109C5.55056 8.48575 5.6974 8.33888 5.6974 8.15937C5.6974 7.97987 5.55056 7.833 5.37109 7.833H4.71849ZM6.6763 7.833C6.49684 7.833 6.35 7.97987 6.35 8.15937C6.35 8.33888 6.49684 8.48575 6.6763 8.48575H7.32891C7.50837 8.48575 7.65521 8.33888 7.65521 8.15937C7.65521 7.97987 7.50837 7.833 7.32891 7.833H6.6763ZM8.63412 7.833C8.45465 7.833 8.30781 7.97987 8.30781 8.15937C8.30781 8.33888 8.45465 8.48575 8.63412 8.48575H9.28672C9.46623 8.48575 9.61302 8.33888 9.61302 8.15937C9.61302 7.97987 9.46623 7.833 9.28672 7.833H8.63412ZM5.86055 5.222C5.86055 5.0056 5.7746 4.79806 5.62162 4.64504C5.46864 4.49203 5.26114 4.40606 5.04479 4.40606C4.82844 4.40606 4.62094 4.49203 4.46796 4.64504C4.31498 4.79806 4.22904 5.0056 4.22904 5.222C4.22904 5.4384 4.31498 5.64594 4.46796 5.79896C4.62094 5.95197 4.82844 6.03794 5.04479 6.03794C5.26114 6.03794 5.46864 5.95197 5.62162 5.79896C5.7746 5.64594 5.86055 5.4384 5.86055 5.222ZM8.96042 6.03794C9.17676 6.03794 9.38426 5.95197 9.53724 5.79896C9.69021 5.64594 9.77617 5.4384 9.77617 5.222C9.77617 5.0056 9.69021 4.79806 9.53724 4.64504C9.38426 4.49203 9.17676 4.40606 8.96042 4.40606C8.74407 4.40606 8.53657 4.49203 8.38359 4.64504C8.23061 4.79806 8.14466 5.0056 8.14466 5.222C8.14466 5.4384 8.23061 5.64594 8.38359 5.79896C8.53657 5.95197 8.74407 6.03794 8.96042 6.03794ZM1.45547 4.56925H1.78177V8.48575H1.45547C0.91503 8.48575 0.476562 8.04718 0.476562 7.50662V5.54837C0.476562 5.00782 0.91503 4.56925 1.45547 4.56925ZM12.5497 4.56925C13.0902 4.56925 13.5286 5.00782 13.5286 5.54837V7.50662C13.5286 8.04718 13.0902 8.48575 12.5497 8.48575H12.2234V4.56925H12.5497Z" fill="#FBBF24" />
                                </g>
                                <defs>
                                    <clipPath id="clip0_1336_61451">
                                        <rect width="14" height="11.19" fill="white" />
                                    </clipPath>
                                </defs>
                            </svg>
                        </span>
                        <p className="text-sm font-bold tracking-[0.35px] text-white">
                            Recommendations
                        </p>
                    </div>

                    <div className="flex items-center justify-between gap-4 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-3">
                        <span className="text-sm text-white">
                            Include Recommendations Section
                        </span>
                        <MiniToggle
                            on={includeRecommendations}
                            onToggle={() =>
                                setDraft({ includeRecommendations: !includeRecommendations })
                            }
                        />
                    </div>

                    {includeRecommendations && (
                        <Field label="Recommendation Style" required>
                            <Segmented
                                options={REC_STYLES}
                                value={recommendationStyle as (typeof REC_STYLES)[number]}
                                onChange={(v) => setDraft({ recommendationStyle: v })}
                            />
                        </Field>
                    )}
                </section>
            </div>

            {/* ── Branding + Footer (side by side) ── */}
            <div className="grid gap-5 xl:grid-cols-2">
                {/* Branding */}
                <section className="space-y-4 rounded-xl border border-white/10 bg-white/[0.05] p-5">
                    <div className="flex items-center gap-2">
                        <span className="flex size-6 items-center justify-center rounded-md bg-[#fbbf24]/12 text-[#fbbf24]">
                            <Palette className="size-3" />
                        </span>
                        <p className="text-sm font-bold tracking-[0.35px] text-white">
                            Branding
                        </p>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2">
                        <ColorSwatch
                            label="Primary Color"
                            value={primaryColor}
                            onChange={(v) => setDraft({ reportPrimaryColor: v })}
                        />
                        <ColorSwatch
                            label="Secondary Color"
                            value={secondaryColor}
                            onChange={(v) => setDraft({ reportSecondaryColor: v })}
                        />
                    </div>

                    <Field label="Logo Position">
                        <Segmented
                            options={LOGO_POSITIONS}
                            value={logoPosition as (typeof LOGO_POSITIONS)[number]}
                            onChange={(v) => setDraft({ logoPosition: v })}
                        />
                    </Field>

                    <Field label="Report Header">
                        <Input
                            variant="soft"
                            placeholder="FAR Platform™"
                            value={reportHeader}
                            onChange={(e) => setDraft({ reportHeader: e.target.value })}
                            className={fieldInput}
                        />
                    </Field>

                    <div className="flex items-center justify-between gap-4 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-3">
                        <span className="text-sm text-white">Show FAR Watermark</span>
                        <MiniToggle
                            on={showWatermark}
                            onToggle={() => setDraft({ showFarWatermark: !showWatermark })}
                        />
                    </div>
                </section>

                {/* Footer */}
                <section className="space-y-4 rounded-xl border border-white/10 bg-white/[0.05] p-5">
                    <div className="flex items-center gap-2">
                        <span className="flex size-6 items-center justify-center rounded-md bg-[#fbbf24]/12 text-[#fbbf24]">
                            <svg xmlns="http://www.w3.org/2000/svg" width="9" height="9" viewBox="0 0 9 9" fill="none">
                                <g clip-path="url(#clip0_1336_61542)">
                                    <path d="M0 0.886697V3.65414C0 3.96883 0.124025 4.27056 0.346161 4.49269L3.60414 7.75068C4.06693 8.21346 4.81664 8.21346 5.27942 7.75068L7.75067 5.27943C8.21346 4.81664 8.21346 4.06693 7.75067 3.60415L4.49268 0.346167C4.27055 0.124032 3.96882 6.43134e-06 3.65413 6.43134e-06H0.888542C0.397993 -0.0018447 0 0.396148 0 0.886697ZM2.07326 1.47905C2.23037 1.47905 2.38104 1.54147 2.49212 1.65255C2.60321 1.76364 2.66562 1.91431 2.66562 2.07142C2.66562 2.22852 2.60321 2.37919 2.49212 2.49029C2.38104 2.60138 2.23037 2.66378 2.07326 2.66378C1.91616 2.66378 1.76549 2.60138 1.6544 2.49029C1.54331 2.37919 1.4809 2.22852 1.4809 2.07142C1.4809 1.91431 1.54331 1.76364 1.6544 1.65255C1.76549 1.54147 1.91616 1.47905 2.07326 1.47905Z" fill="#FBBF24" />
                                </g>
                                <defs>
                                    <clipPath id="clip0_1336_61542">
                                        <rect width="8.53" height="8.53" fill="white" />
                                    </clipPath>
                                </defs>
                            </svg>
                        </span>
                        <p className="text-sm font-bold tracking-[0.35px] text-white">
                            Footer
                        </p>
                    </div>

                    <div className="flex items-center justify-between gap-4 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-3">
                        <span className="text-sm text-white">Include Footer</span>
                        <MiniToggle
                            on={includeFooter}
                            onToggle={() => setDraft({ includeFooter: !includeFooter })}
                        />
                    </div>

                    {includeFooter && (
                        <>
                            <div className="grid gap-4 sm:grid-cols-2">
                                <Field label="Footer Left Text">
                                    <Input
                                        variant="soft"
                                        placeholder="e.g. Confidential — FAR Platform™"
                                        value={footerLeft}
                                        onChange={(e) =>
                                            setDraft({ footerLeftText: e.target.value })
                                        }
                                        className={fieldInput}
                                    />
                                </Field>
                                <Field label="Footer Right Text">
                                    <Input
                                        variant="soft"
                                        placeholder="e.g. Page {page} of {total}"
                                        value={footerRight}
                                        onChange={(e) =>
                                            setDraft({ footerRightText: e.target.value })
                                        }
                                        className={fieldInput}
                                    />
                                </Field>
                            </div>

                            <div className="flex items-center justify-between gap-4 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-3">
                                <span className="text-sm text-white">Show Page Numbers</span>
                                <MiniToggle
                                    on={showPageNumbers}
                                    onToggle={() =>
                                        setDraft({ showPageNumbers: !showPageNumbers })
                                    }
                                />
                            </div>
                        </>
                    )}
                </section>
            </div>
        </div>
    );
};

export default StepReports;
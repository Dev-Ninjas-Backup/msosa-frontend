import {
    Info,
    GitBranch,
    Bot,
    FileText,
    LayoutDashboard,
    DollarSign,
    Shield,
    Check,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { PUBLISH_CHECKS, type ProductDraft } from "./data";

type StepPublishProps = {
    draft: ProductDraft;
};

const ICONS: Record<string, React.ReactNode> = {
    info: <Info className="size-3.5" />,
    workflow: <GitBranch className="size-3.5" />,
    ai: <Bot className="size-3.5" />,
    reports: <FileText className="size-3.5" />,
    dashboard: <LayoutDashboard className="size-3.5" />,
    pricing: <DollarSign className="size-3.5" />,
    permissions: <Shield className="size-3.5" />,
};

export const StepPublish = ({ draft }: StepPublishProps) => {
    // All checks are treated as complete for the review screen
    // (you can later make this dynamic based on actual draft validation)
    return (
        <div className="space-y-5">
            <section className="space-y-4 rounded-xl border border-white/10 bg-white/[0.05] p-5">
                <p className="text-sm font-bold tracking-[0.35px] text-white">
                    Product Review Summary
                </p>

                <div className="space-y-2">
                    {PUBLISH_CHECKS.map((check) => (
                        <div
                            key={check.title}
                            className="flex items-center justify-between gap-4 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3.5"
                        >
                            <div className="flex items-start gap-3 min-w-0">
                                <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-lg bg-[#10b7ba]/15 text-[#10b7ba]">
                                    {ICONS[check.icon] ?? <Info className="size-3.5" />}
                                </span>
                                <div className="min-w-0">
                                    <p className="text-[13px] font-semibold text-white">
                                        {check.title}
                                    </p>
                                    <p className="mt-0.5 text-xs leading-4 text-white/50">
                                        {check.body}
                                    </p>
                                </div>
                            </div>

                            <span className="inline-flex shrink-0 items-center gap-1 rounded-full border border-[#10b7ba]/30 bg-[#10b7ba]/10 px-2.5 py-1 text-[11px] font-semibold text-[#10b7ba]">
                                <Check className="size-3" />
                                Complete
                            </span>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default StepPublish;
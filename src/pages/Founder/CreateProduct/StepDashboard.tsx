import {
    Target,
    BarChart3,
    LineChart,
    Bell,
    FileText,
    Users,
    Lightbulb,
    History,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
    type ProductDraft,
    type DashboardWidgetId,
    type DashboardWidget,
} from "./data";

type StepProps = {
    draft: ProductDraft;
    setDraft: (patch: Partial<ProductDraft>) => void;
};

const WIDGET_ICONS: Record<DashboardWidgetId, React.ReactNode> = {
    progress: <Target className="size-3.5" />,
    kpi: <BarChart3 className="size-3.5" />,
    charts: <LineChart className="size-3.5" />,
    notifications: <Bell className="size-3.5" />,
    reports: <FileText className="size-3.5" />,
    timeline: <Users className="size-3.5" />,
    recommendations: <Lightbulb className="size-3.5" />,
    recent: <History className="size-3.5" />,
};

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

export const StepDashboard = ({ draft, setDraft }: StepProps) => {
    const widgets = draft.dashboardWidgets ?? [];

    const toggleWidget = (id: DashboardWidgetId) => {
        setDraft({
            dashboardWidgets: widgets.map((w) =>
                w.id === id ? { ...w, enabled: !w.enabled } : w
            ),
        });
    };

    const renameWidget = (id: DashboardWidgetId, name: string) => {
        setDraft({
            dashboardWidgets: widgets.map((w) =>
                w.id === id ? { ...w, name } : w
            ),
        });
    };

    return (
        <div className="space-y-5">
            <section className="space-y-4 rounded-xl border border-white/10 bg-white/[0.05] p-5">
                <p className="text-sm font-bold tracking-[0.35px] text-white">
                    Widget Library
                </p>

                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                    {widgets.map((widget) => (
                        <div
                            key={widget.id}
                            className={cn(
                                "relative flex flex-col rounded-xl border border-white/10 bg-white/[0.03] p-4 transition-opacity",
                                !widget.enabled && "opacity-60"
                            )}
                        >
                            {/* Header: icon + toggle */}
                            <div className="mb-3 flex items-start justify-between gap-3">
                                <span
                                    className={cn(
                                        "flex size-8 items-center justify-center rounded-lg",
                                        widget.enabled
                                            ? "bg-[#fbbf24]/15 text-[#fbbf24]"
                                            : "bg-white/10 text-white/40"
                                    )}
                                >
                                    {WIDGET_ICONS[widget.id]}
                                </span>
                                <MiniToggle
                                    on={widget.enabled}
                                    onToggle={() => toggleWidget(widget.id)}
                                />
                            </div>

                            {/* Title */}
                            <p className="text-[13px] font-semibold text-white">
                                {widget.name}
                            </p>

                            {/* Description */}
                            <p className="mt-1 text-xs leading-4 text-white/50">
                                {widget.description}
                            </p>

                            {/* Rename action */}
                            <button
                                type="button"
                                onClick={() => {
                                    const next = window.prompt("Rename widget", widget.name);
                                    if (next && next.trim()) {
                                        renameWidget(widget.id, next.trim());
                                    }
                                }}
                                className="mt-3 self-start text-xs font-medium text-[#fbbf24] hover:text-[#fbbf24]/80 cursor-pointer bg-transparent border-0 p-0"
                            >
                                Rename
                            </button>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default StepDashboard;
import { useEffect, useId, useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Eye, EyeOff, Lock, Maximize2, Minimize2 } from "lucide-react";
import { cn } from "@/lib/utils";
import Checkbox from "@/ui/Checkbox";
import { seedSeries, type Widget } from "../data";

type Point = { day: string; value: number };

const tooltipStyle = {
  backgroundColor: "#111",
  border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: 8,
  fontSize: 12,
  color: "#fff",
};

const StreamPill = ({ widget, live }: { widget: Widget; live: boolean }) => {
  const [label, tone, dot] =
    widget.status === "Draft"
      ? ["Draft Preview", "border-white/10 bg-white/5 text-[#9ca3af]", "bg-[#6b7280]"]
      : live
        ? ["Active Stream", "border-[rgba(16,185,129,0.3)] bg-[rgba(16,185,129,0.1)] text-[#10b981]", "bg-[#10b981] animate-pulse"]
        : ["Snapshot", "border-[rgba(34,211,238,0.3)] bg-[rgba(34,211,238,0.1)] text-[#22d3ee]", "bg-[#22d3ee]"];
  return (
    <span className={cn("inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-[1px]", tone)}>
      <span className={cn("size-1.5 rounded-full", dot)} />
      {label}
    </span>
  );
};

const ChartBody = ({ data, color, showDots }: { data: Point[]; color: string; showDots: boolean }) => {
  const gradientId = useId();
  return (
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={color} stopOpacity={0.35} />
              <stop offset="95%" stopColor={color} stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
          <XAxis dataKey="day" tickLine={false} axisLine={false} tick={{ fill: "#6b7280", fontSize: 11 }} />
          <YAxis domain={[0, 100]} ticks={[0, 20, 40, 60, 80]} tickLine={false} axisLine={false} tick={{ fill: "#6b7280", fontSize: 11 }} />
          <Tooltip contentStyle={tooltipStyle} cursor={{ stroke: "rgba(255,255,255,0.1)" }} />
          <Area
            type="monotone"
            dataKey="value"
            stroke={color}
            strokeWidth={2}
            fill={`url(#${gradientId})`}
            dot={showDots ? { r: 3, fill: color, strokeWidth: 0 } : false}
            isAnimationActive={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

const KpiBody = ({ data, color }: { data: Point[]; color: string }) => {
  const last = data[data.length - 1].value;
  const prev = data[data.length - 2].value;
  const delta = ((last - prev) / prev) * 100;
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {[
        ["Current", `${(last * 1.284).toFixed(1)}k`],
        ["7-Day Avg", `${((data.reduce((s, p) => s + p.value, 0) / data.length) * 1.284).toFixed(1)}k`],
        ["Change", `${delta >= 0 ? "+" : ""}${delta.toFixed(1)}%`],
      ].map(([label, value], i) => (
        <div key={label} className="rounded-xl border border-white/10 bg-white/5 p-5">
          <p className="text-[10px] font-bold uppercase tracking-[1px] text-[#6b7280]">{label}</p>
          <p
            className="mt-2 text-3xl font-bold tabular-nums"
            style={{ color: i === 2 ? (delta >= 0 ? "#10b981" : "#ef4444") : i === 0 ? color : "#fff" }}
          >
            {value}
          </p>
        </div>
      ))}
    </div>
  );
};

const GridBody = ({ data, color }: { data: Point[]; color: string }) => (
  <div className="overflow-hidden rounded-xl border border-white/10">
    <table className="w-full text-left text-xs">
      <thead className="bg-white/5 text-[10px] uppercase tracking-[0.5px] text-[#6b7280]">
        <tr>
          <th className="px-4 py-3">Segment</th>
          <th className="px-4 py-3">Records</th>
          <th className="px-4 py-3">Load</th>
        </tr>
      </thead>
      <tbody>
        {data.map((p) => (
          <tr key={p.day} className="border-t border-white/5 text-white/80">
            <td className="px-4 py-2.5">{p.day}-Cluster</td>
            <td className="px-4 py-2.5 tabular-nums">{(p.value * 47).toLocaleString()}</td>
            <td className="px-4 py-2.5">
              <span className="block h-1.5 rounded-full bg-white/5">
                <span className="block h-full rounded-full" style={{ width: `${p.value}%`, backgroundColor: color }} />
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const TIMELINE_EVENTS = ["Session started", "Assessment submitted", "Report generated", "Seat assigned", "Protocol synced"];

const TimelineBody = ({ data, color }: { data: Point[]; color: string }) => (
  <ol className="flex flex-col gap-4 border-l border-white/10 pl-5">
    {TIMELINE_EVENTS.map((event, i) => (
      <li key={event} className="relative">
        <span className="absolute -left-[25px] top-1 size-2.5 rounded-full" style={{ backgroundColor: color }} />
        <p className="text-sm text-white">{event}</p>
        <p className="text-[11px] text-[#6b7280]">
          {data[i].day} · {String(8 + i * 2).padStart(2, "0")}:{String(data[i].value % 60).padStart(2, "0")} · {data[i].value} nodes
        </p>
      </li>
    ))}
  </ol>
);

const ConfigBody = ({ color }: { color: string }) => {
  const [values, setValues] = useState([true, false, true, true]);
  return (
    <div className="flex flex-col gap-3">
      {["Compact density", "High-contrast mode", "Animated transitions", "Sync across devices"].map((label, i) => (
        <label key={label} className="flex cursor-pointer items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3">
          <span className="text-sm text-white/80">{label}</span>
          <Checkbox
            aria-label={label}
            checked={values[i]}
            onCheckedChange={(v) => setValues((s) => s.map((x, j) => (j === i ? v : x)))}
          />
        </label>
      ))}
      <p className="text-[11px] text-[#6b7280]">
        Accent <span style={{ color }}>{color}</span> applied to preview controls.
      </p>
    </div>
  );
};

type WidgetPreviewProps = {
  widget: Widget;
  restricted: boolean;
  role: string;
  expanded: boolean;
  onToggleExpand: () => void;
};

const WidgetPreview = ({ widget, restricted, role, expanded, onToggleExpand }: WidgetPreviewProps) => {
  const live = widget.status !== "Draft" && widget.realtime && Boolean(widget.dataSource);
  const [data, setData] = useState<Point[]>(() => seedSeries(widget.id));
  const [showDots, setShowDots] = useState(true);

  useEffect(() => {
    if (!live) return;
    const timer = window.setInterval(() => {
      setData((prev) => {
        const last = prev[prev.length - 1].value;
        const next = Math.max(10, Math.min(95, Math.round(last + (Math.random() - 0.45) * 14)));
        return prev.map((p, i) => ({ day: p.day, value: i < prev.length - 1 ? prev[i + 1].value : next }));
      });
    }, 3000);
    return () => window.clearInterval(timer);
  }, [live]);

  const body = {
    "Interactive Chart": <ChartBody data={data} color={widget.color} showDots={showDots} />,
    "KPI Metric": <KpiBody data={data} color={widget.color} />,
    "Data Grid": <GridBody data={data} color={widget.color} />,
    "Event Timeline": <TimelineBody data={data} color={widget.color} />,
    "Configuration Tool": <ConfigBody color={widget.color} />,
  }[widget.type];

  return (
    <div className="relative flex min-h-[440px] flex-col gap-6 bg-black/50 p-5 sm:p-8">
      <div className="flex justify-center">
        <StreamPill widget={widget} live={live} />
      </div>
      <div className={cn("flex flex-col gap-6 rounded-2xl border border-white/10 bg-[#0d0d0d] p-6", restricted && "pointer-events-none blur-sm")}>
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="truncate text-lg font-bold text-white">{widget.title || widget.name}</p>
            <p className="text-[10px] font-bold uppercase tracking-[1px] text-[#6b7280]">
              {widget.subtitle || widget.dataSource || "No data source connected"}
            </p>
          </div>
          <div className="flex shrink-0 gap-2">
            {widget.type === "Interactive Chart" && (
              <button
                type="button"
                aria-label={showDots ? "Hide data points" : "Show data points"}
                onClick={() => setShowDots((v) => !v)}
                className="flex size-8 cursor-pointer items-center justify-center rounded-lg border-0 bg-white/5 text-white/70 hover:bg-white/10 hover:text-white"
              >
                {showDots ? <Eye className="size-4" /> : <EyeOff className="size-4" />}
              </button>
            )}
            <button
              type="button"
              aria-label={expanded ? "Collapse preview" : "Expand preview"}
              onClick={onToggleExpand}
              className="flex size-8 cursor-pointer items-center justify-center rounded-lg border-0 bg-white/5 text-white/70 hover:bg-white/10 hover:text-white"
            >
              {expanded ? <Minimize2 className="size-4" /> : <Maximize2 className="size-4" />}
            </button>
          </div>
        </div>
        {body}
      </div>
      {restricted && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black/60 p-6 text-center">
          <span className="flex size-12 items-center justify-center rounded-xl border border-white/10 bg-[#111] text-[#eab308]">
            <Lock className="size-5" />
          </span>
          <p className="text-sm font-bold uppercase tracking-[1px] text-white">Hidden for {role}</p>
          <p className="max-w-xs text-xs text-[#9ca3af]">
            The widget's visibility rules and target environments exclude this role.
          </p>
        </div>
      )}
    </div>
  );
};

export default WidgetPreview;

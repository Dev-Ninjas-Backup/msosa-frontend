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
import { Eye, EyeOff } from "lucide-react";
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

const ChartBody = ({
  data,
  color,
  showDots,
  height,
  fontFamily,
}: {
  data: Point[];
  color: string;
  showDots: boolean;
  height: number;
  fontFamily?: string;
}) => {
  const gradientId = useId();
  const tick = { fill: "#6b7280", fontSize: 11, fontFamily };
  return (
    <div style={{ height, fontFamily }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={color} stopOpacity={0.35} />
              <stop offset="95%" stopColor={color} stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="rgba(255,255,255,0.05)"
            vertical={false}
          />
          <XAxis
            dataKey="day"
            tickLine={false}
            axisLine={false}
            tick={tick}
          />
          <YAxis
            domain={[0, 100]}
            ticks={[0, 20, 40, 60, 80]}
            tickLine={false}
            axisLine={false}
            tick={tick}
          />
          <Tooltip
            contentStyle={tooltipStyle}
            cursor={{ stroke: "rgba(255,255,255,0.1)" }}
          />
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

const KpiBody = ({
  data,
  color,
  compact,
}: {
  data: Point[];
  color: string;
  compact: boolean;
}) => {
  const last = data[data.length - 1].value;
  const prev = data[data.length - 2].value;
  const delta = ((last - prev) / prev) * 100;
  return (
    <div
      className={
        compact
          ? "grid gap-2 grid-cols-3"
          : "grid gap-4 sm:grid-cols-3"
      }
    >
      {[
        ["Current", `${(last * 1.284).toFixed(1)}k`],
        [
          "7-Day Avg",
          `${((data.reduce((s, p) => s + p.value, 0) / data.length) * 1.284).toFixed(1)}k`,
        ],
        ["Change", `${delta >= 0 ? "+" : ""}${delta.toFixed(1)}%`],
      ].map(([label, value], i) => (
        <div
          key={label}
          className={
            compact
              ? "rounded-lg border border-white/10 bg-black/30 p-3"
              : "rounded-xl border border-white/10 bg-white/5 p-5"
          }
        >
          <p className="text-[10px] font-bold uppercase tracking-[1px] text-[#6b7280]">
            {label}
          </p>
          <p
            className={
              compact
                ? "mt-1 text-lg font-bold tabular-nums"
                : "mt-2 text-3xl font-bold tabular-nums"
            }
            style={{
              color:
                i === 2
                  ? delta >= 0
                    ? "#10b981"
                    : "#ef4444"
                  : i === 0
                    ? color
                    : "#fff",
            }}
          >
            {value}
          </p>
        </div>
      ))}
    </div>
  );
};

const GridBody = ({
  data,
  color,
  compact,
}: {
  data: Point[];
  color: string;
  compact: boolean;
}) => (
  <div className="overflow-hidden rounded-xl border border-white/10">
    <table className="w-full text-left text-xs">
      <thead className="bg-white/5 text-[10px] uppercase tracking-[0.5px] text-[#6b7280]">
        <tr>
          <th className="px-3 py-2">Segment</th>
          <th className="px-3 py-2">Records</th>
          <th className="px-3 py-2">Load</th>
        </tr>
      </thead>
      <tbody>
        {(compact ? data.slice(0, 4) : data).map((p) => (
          <tr key={p.day} className="border-t border-white/5 text-white/80">
            <td className="px-3 py-2">{p.day}-Cluster</td>
            <td className="px-3 py-2 tabular-nums">
              {(p.value * 47).toLocaleString()}
            </td>
            <td className="px-3 py-2">
              <span className="block h-1.5 rounded-full bg-white/5">
                <span
                  className="block h-full rounded-full"
                  style={{ width: `${p.value}%`, backgroundColor: color }}
                />
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const TIMELINE_EVENTS = [
  "Session started",
  "Assessment submitted",
  "Report generated",
  "Seat assigned",
  "Protocol synced",
];

const TimelineBody = ({
  data,
  color,
  compact,
}: {
  data: Point[];
  color: string;
  compact: boolean;
}) => (
  <ol className="flex flex-col gap-3 border-l border-white/10 pl-4">
    {(compact ? TIMELINE_EVENTS.slice(0, 3) : TIMELINE_EVENTS).map(
      (event, i) => (
        <li key={event} className="relative">
          <span
            className="absolute -left-[21px] top-1 size-2.5 rounded-full"
            style={{ backgroundColor: color }}
          />
          <p className="text-sm text-white">{event}</p>
          <p className="text-[11px] text-[#6b7280]">
            {data[i].day} · {String(8 + i * 2).padStart(2, "0")}:
            {String(data[i].value % 60).padStart(2, "0")} · {data[i].value}{" "}
            nodes
          </p>
        </li>
      )
    )}
  </ol>
);

const ConfigBody = ({
  color,
  compact,
}: {
  color: string;
  compact: boolean;
}) => {
  const [values, setValues] = useState([true, false, true, true]);
  const labels = [
    "Compact density",
    "High-contrast mode",
    "Animated transitions",
    "Sync across devices",
  ];
  return (
    <div className="flex flex-col gap-2">
      {(compact ? labels.slice(0, 3) : labels).map((label, i) => (
        <label
          key={label}
          className="flex cursor-pointer items-center justify-between rounded-xl border border-white/10 bg-black/30 px-3 py-2.5"
        >
          <span className="text-sm text-white/80">{label}</span>
          <Checkbox
            aria-label={label}
            checked={values[i]}
            onCheckedChange={(v) =>
              setValues((s) => s.map((x, j) => (j === i ? v : x)))
            }
          />
        </label>
      ))}
      {!compact && (
        <p className="text-[11px] text-[#6b7280]">
          Accent <span style={{ color }}>{color}</span> applied to preview
          controls.
        </p>
      )}
    </div>
  );
};

type WidgetLiveContentProps = {
  widget: Widget;
  /** Compact density for Product Dashboard tiles */
  density?: "detail" | "dashboard";
  /** Optional title override from Product Dashboard instance */
  titleOverride?: string;
  showChrome?: boolean;
  /** CSS font-family stack from Product Dashboard styling */
  fontFamily?: string;
};

/** Live widget body shared by Widget Details and Product Dashboard. */
const WidgetLiveContent = ({
  widget,
  density = "detail",
  titleOverride,
  showChrome = true,
  fontFamily,
}: WidgetLiveContentProps) => {
  const compact = density === "dashboard";
  const live =
    widget.status !== "Draft" && widget.realtime && Boolean(widget.dataSource);
  const [data, setData] = useState<Point[]>(() => seedSeries(widget.id));
  const [showDots, setShowDots] = useState(true);

  useEffect(() => {
    if (!live) return;
    const timer = window.setInterval(() => {
      setData((prev) => {
        const last = prev[prev.length - 1].value;
        const next = Math.max(
          10,
          Math.min(95, Math.round(last + (Math.random() - 0.45) * 14))
        );
        return prev.map((p, i) => ({
          day: p.day,
          value: i < prev.length - 1 ? prev[i + 1].value : next,
        }));
      });
    }, 3000);
    return () => window.clearInterval(timer);
  }, [live]);

  const chartHeight = compact ? 160 : 300;
  const body = {
    "Interactive Chart": (
      <ChartBody
        data={data}
        color={widget.color}
        showDots={showDots}
        height={chartHeight}
        fontFamily={fontFamily}
      />
    ),
    "KPI Metric": <KpiBody data={data} color={widget.color} compact={compact} />,
    "Data Grid": <GridBody data={data} color={widget.color} compact={compact} />,
    "Event Timeline": (
      <TimelineBody data={data} color={widget.color} compact={compact} />
    ),
    "Configuration Tool": (
      <ConfigBody color={widget.color} compact={compact} />
    ),
  }[widget.type];

  const title = titleOverride || widget.title || widget.name;

  const fontStyle = fontFamily ? { fontFamily } : undefined;

  if (!showChrome) {
    return (
      <div className="min-w-0" style={fontStyle}>
        {body}
      </div>
    );
  }

  return (
    <div className="flex min-w-0 flex-col gap-3" style={fontStyle}>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p
            className={
              compact
                ? "truncate text-sm font-bold"
                : "truncate text-lg font-bold text-white"
            }
            style={{
              ...(compact ? { color: "inherit" } : null),
              ...fontStyle,
            }}
          >
            {title}
          </p>
          <p
            className={
              compact
                ? "text-[10px] font-bold uppercase tracking-[1px] opacity-60"
                : "text-[10px] font-bold uppercase tracking-[1px] text-[#6b7280]"
            }
            style={fontStyle}
          >
            {widget.subtitle || widget.dataSource || "No data source connected"}
          </p>
        </div>
        {widget.type === "Interactive Chart" && (
          <button
            type="button"
            aria-label={showDots ? "Hide data points" : "Show data points"}
            onClick={() => setShowDots((v) => !v)}
            className="flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-lg border-0 bg-white/5 text-white/70 hover:bg-white/10 hover:text-white"
          >
            {showDots ? <Eye className="size-4" /> : <EyeOff className="size-4" />}
          </button>
        )}
      </div>
      {live && compact && (
        <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-[rgba(16,185,129,0.3)] bg-[rgba(16,185,129,0.1)] px-2 py-0.5 text-[10px] font-bold uppercase tracking-[1px] text-[#10b981]">
          <span className="size-1.5 rounded-full bg-[#10b981] animate-pulse" />
          Live
        </span>
      )}
      {body}
    </div>
  );
};

export default WidgetLiveContent;

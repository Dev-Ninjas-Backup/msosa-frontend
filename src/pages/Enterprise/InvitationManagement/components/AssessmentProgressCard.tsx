import { Check } from "lucide-react";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
import AnimatedContainer from "@/common/AnimatedContainer";
import Card from "@/ui/Card";
import { cn } from "@/lib/utils";
import type { InvitationRow } from "../data";

type AssessmentProgressCardProps = {
  inv: InvitationRow;
};

const AssessmentProgressCard = ({ inv }: AssessmentProgressCardProps) => {
  const donut = [
    { name: "Done", value: inv.completion || 1, color: "#10B7BA" },
    {
      name: "Rest",
      value: Math.max(0, 100 - (inv.completion || 0)),
      color: "#3f3f46",
    },
  ];

  return (
    <AnimatedContainer delay={0.12}>
      <Card className="p-5 sm:p-6">
        <h3 className="text-[15px] font-medium text-white mb-5">
          Assessment Progress
        </h3>

        <div className="flex flex-col sm:flex-row items-center gap-5 mb-6">
          <div className="relative size-[100px] sm:size-[110px] shrink-0">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={donut}
                  dataKey="value"
                  innerRadius={34}
                  outerRadius={48}
                  stroke="none"
                  startAngle={90}
                  endAngle={-270}
                >
                  {donut.map((d) => (
                    <Cell key={d.name} fill={d.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <span className="text-lg font-bold text-[#10B7BA]">
                {inv.completion}%
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 flex-1 w-full">
            {[
              { label: "Total Sessions", value: "8" },
              { label: "Current Progress", value: `${inv.completion}%` },
              { label: "Prev. Assessments", value: "2" },
              {
                label: "Report Available",
                value: inv.completion === 100 ? "Yes" : "No",
                check: inv.completion === 100,
              },
            ].map((m) => (
              <div
                key={m.label}
                className="rounded-xl border border-white/[0.08] bg-white/[0.03] px-3 py-3 text-center"
              >
                <p className="text-base sm:text-lg font-bold text-white inline-flex items-center justify-center gap-1">
                  {m.value}
                  {"check" in m && m.check ? (
                    <Check
                      className="size-3.5 text-[#10B7BA]"
                      strokeWidth={3}
                    />
                  ) : null}
                </p>
                <p className="mt-1 text-[10px] text-white/50">{m.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative flex items-start justify-between gap-2 pt-2">
          <div className="absolute top-[7px] left-[8%] right-[8%] h-px bg-gradient-to-r from-[#10B7BA] via-[#3B82F6] via-[#10B7BA] to-[#F5C542] opacity-40" />

          {[
            {
              label: "Invite Date",
              value: inv.inviteDate || "Feb 1, 2025",
              color: "#10B7BA",
            },
            {
              label: "Start Date",
              value: "Feb 3, 2025",
              color: "#3B82F6",
            },
            {
              label: "Completed",
              value: "Feb 28, 2025",
              color: "#10B7BA",
              done: true,
            },
            {
              label: "Duration",
              value: "25 days",
              color: "#F5C542",
              accent: true,
            },
          ].map((step) => (
            <div
              key={step.label}
              className="relative flex flex-col items-center text-center flex-1 min-w-0 z-10"
            >
              <span
                className="flex size-3.5 items-center justify-center rounded-full border-2 bg-[#0D1117]"
                style={{ borderColor: step.color }}
              >
                {step.done ? (
                  <Check className="size-2 text-[#10B7BA]" strokeWidth={3} />
                ) : (
                  <span
                    className="size-1.5 rounded-full"
                    style={{ backgroundColor: step.color }}
                  />
                )}
              </span>

              <p className="mt-2.5 text-[10px] uppercase tracking-wider text-white/40 font-semibold">
                {step.label}
              </p>
              <p
                className={cn(
                  "mt-0.5 text-xs sm:text-sm font-medium",
                  step.accent ? "text-[#F5C542]" : "text-white"
                )}
              >
                {step.value}
              </p>
            </div>
          ))}
        </div>
      </Card>
    </AnimatedContainer>
  );
};

export default AssessmentProgressCard;

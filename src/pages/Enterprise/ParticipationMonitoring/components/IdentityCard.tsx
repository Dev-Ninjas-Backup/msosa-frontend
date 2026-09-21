import { Info, User } from "lucide-react";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
import AnimatedContainer from "@/common/AnimatedContainer";
import Card from "@/ui/Card";
import type { ParticipationRow } from "../data";

type IdentityCardProps = {
  row: ParticipationRow;
};

const IdentityCard = ({ row }: IdentityCardProps) => {
  const pct = row.progress || 62;
  const donut = [
    { name: "Done", value: pct || 1, color: "#10B7BA" },
    { name: "Rest", value: Math.max(0, 100 - pct), color: "#3f3f46" },
  ];

  return (
    <AnimatedContainer delay={0.08}>
      <Card
        borderColor="rgba(16,183,186,0.45)"
        className="p-6 space-y-5 border-t-2!"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="flex size-10 items-center justify-center rounded-full border border-[rgba(16,183,186,0.2)] bg-[rgba(16,183,186,0.1)] text-[#10B7BA]">
              <User className="size-4" />
            </span>
            <p className="text-base text-white">{row.name}</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="relative size-20">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={donut}
                    dataKey="value"
                    innerRadius={28}
                    outerRadius={38}
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
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-lg font-bold text-[#10B7BA] leading-none">
                  {pct}%
                </span>
                <span className="text-[9px] text-[#9CA3AF]">complete</span>
              </div>
            </div>
            <p className="mt-1 text-[10px] text-[#9CA3AF]">Completion Rate</p>
          </div>
        </div>

        <div className="rounded-[10px] border border-black overflow-hidden">
          {[
            { label: "Employee ID", value: `#${row.empId}` },
            { label: "Department", value: row.department },
            { label: "Invitation Date", value: row.inviteDate },
            {
              label: "Invitation Status",
              value: (
                <span className="rounded-full bg-[rgba(16,183,186,0.1)] px-2 py-0.5 text-[10px] font-bold text-[#10B7BA]">
                  {row.inviteStatus}
                </span>
              ),
            },
            {
              label: "Assessment",
              value: (
                <span className="inline-flex items-center gap-1.5">
                  <User className="size-2.5 text-white/50" />
                  {row.reflection}
                </span>
              ),
            },
            {
              label: "Reflection",
              value: `${row.reflection} ${row.campaign}`,
            },
          ].map((f, i, arr) => (
            <div
              key={f.label}
              className={`flex items-center justify-between px-3.5 py-2.5 ${
                i < arr.length - 1 ? "border-b border-black" : ""
              }`}
            >
              <span className="text-[11px] text-[#9CA3AF]">{f.label}</span>
              <span className="text-[11px] font-semibold text-white">
                {f.value}
              </span>
            </div>
          ))}
        </div>

        <div className="rounded-lg border border-black bg-white/[0.02] px-3 py-2.5 flex gap-2 items-start">
          <Info className="size-3 text-white/30 shrink-0 mt-0.5" />
          <p className="text-[10px] italic text-white/35 leading-[15px]">
            Personal identity and responses are protected. Only participation
            status is displayed.
          </p>
        </div>
      </Card>
    </AnimatedContainer>
  );
};

export default IdentityCard;

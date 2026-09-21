import { Link } from "react-router-dom";
import { ChevronRight, Info, Sparkles } from "lucide-react";
import AnimatedContainer from "@/common/AnimatedContainer";
import { QUICK_ACTIONS } from "../data";

const QuickActions = () => (
  <AnimatedContainer delay={0.12}>
    <div className="rounded-3xl border border-white/10 bg-[#0D1117] p-6 space-y-6">
      <div className="flex items-center gap-2">
        <h3 className="text-sm font-bold uppercase tracking-[0.1em] text-white">
          Quick Actions
        </h3>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M8 16C10.1217 16 12.1566 15.1571 13.6569 13.6569C15.1571 12.1566 16 10.1217 16 8C16 5.87827 15.1571 3.84344 13.6569 2.34315C12.1566 0.842855 10.1217 0 8 0C5.87827 0 3.84344 0.842855 2.34315 2.34315C0.842855 3.84344 0 5.87827 0 8C0 10.1217 0.842855 12.1566 2.34315 13.6569C3.84344 15.1571 5.87827 16 8 16ZM6.75 10.5H7.5V8.5H6.75C6.33437 8.5 6 8.16562 6 7.75C6 7.33437 6.33437 7 6.75 7H8.25C8.66562 7 9 7.33437 9 7.75V10.5H9.25C9.66562 10.5 10 10.8344 10 11.25C10 11.6656 9.66562 12 9.25 12H6.75C6.33437 12 6 11.6656 6 11.25C6 10.8344 6.33437 10.5 6.75 10.5ZM8 4C8.26522 4 8.51957 4.10536 8.70711 4.29289C8.89464 4.48043 9 4.73478 9 5C9 5.26522 8.89464 5.51957 8.70711 5.70711C8.51957 5.89464 8.26522 6 8 6C7.73478 6 7.48043 5.89464 7.29289 5.70711C7.10536 5.51957 7 5.26522 7 5C7 4.73478 7.10536 4.48043 7.29289 4.29289C7.48043 4.10536 7.73478 4 8 4Z" fill="white" fill-opacity="0.6" />
        </svg>
      </div>
      <ul className="space-y-3">
        {QUICK_ACTIONS.map(({ label, to, icon: Icon }) => (
          <li key={label}>
            <Link
              to={to}
              className="flex items-center justify-between gap-3 rounded-2xl border border-white/[0.05] bg-white/[0.03] p-4 text-sm font-medium text-white hover:bg-white/[0.06] transition-colors no-underline"
            >
              <span className="inline-flex items-center gap-3 min-w-0">
                <span className="flex size-10 items-center justify-center rounded-xl bg-white/10 text-[#FBBF24] shrink-0">
                  <Icon className="size-4" />
                </span>
                <span className="truncate">{label}</span>
              </span>
              <ChevronRight className="size-3 text-white/50 shrink-0" />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  </AnimatedContainer>
);

export default QuickActions;

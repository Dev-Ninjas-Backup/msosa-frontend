import { Link, useParams } from "react-router-dom";
import { Download, Music2 } from "lucide-react";
import AnimatedContainer from "@/common/AnimatedContainer";
import Card from "@/pages/Consumer/Dashboard/Card";

const INSIGHTS = [
  { title: "Empathetic Leadership High", tone: "positive" as const },
  { title: "Boundary Attrition Risk", tone: "warn" as const },
];

const THEMES = [
  {
    n: "01",
    title: 'The "Legacy vs. Logic" Paradox',
    body: "You hold tension between preserving what worked historically and adopting clearer logic for future decisions.",
  },
  {
    n: "02",
    title: "Communicative Reticence",
    body: "In high-stakes moments you withhold clarity until certainty feels complete — slowing alignment with others.",
  },
];

const ghostBtn =
  "h-9 px-4 rounded-lg border border-white/15 bg-white/5 hover:bg-white/10 text-primary-text text-xs font-medium transition-colors cursor-pointer";
const goldBtn =
  "h-9 px-4 rounded-lg bg-[#F5C542] hover:bg-[#e8b93a] text-black text-xs font-semibold transition-colors cursor-pointer border-0 inline-flex items-center gap-1.5";

const ReportDetail = () => {
  const { reportId } = useParams();

  return (
    <div className="space-y-5 sm:space-y-6 pb-6">
      <div className="flex flex-wrap items-center gap-2 text-sm text-secondary-text">
        <Link to="/consumer/dashboard" className="hover:text-[#F5C542]">
          Home
        </Link>
        <span>/</span>
        <Link to="/consumer/report" className="hover:text-[#F5C542]">
          Reports
        </Link>
        <span>/</span>
        <span className="text-primary-text truncate max-w-[200px] sm:max-w-none">
          Relationship Blueprint™ V2
        </span>
      </div>

      <AnimatedContainer delay={0.05}>
        <Card className="p-4 sm:p-6 lg:p-8">
          <div className="flex flex-col lg:flex-row lg:items-start gap-4 lg:justify-between">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2 text-xs text-secondary-text mb-2">
                <Music2 className="size-3.5 text-[#F5C542]" />
                Music / Vibe
              </div>
              <h1 className="font-playfair text-2xl sm:text-3xl text-primary-text">
                Relationship Blueprint™{" "}
                <span className="text-[#F5C542] text-lg align-middle">V2</span>
              </h1>
              <div className="mt-3 flex flex-wrap gap-3 text-sm">
                <span className="text-emerald-400">Status: Delivered</span>
                <span className="text-secondary-text">March 15, 2026</span>
                <span className="text-secondary-text capitalize">
                  ID: {reportId}
                </span>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 shrink-0">
              <button type="button" className={goldBtn}>
                <Download className="size-3.5" />
                Download PDF
              </button>
              <button type="button" className={ghostBtn}>
                Version History
              </button>
            </div>
          </div>
        </Card>
      </AnimatedContainer>

      <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_300px] 2xl:grid-cols-[minmax(0,1fr)_320px] gap-5 lg:gap-6">
        <div className="space-y-5">
          <AnimatedContainer delay={0.1}>
            <Card className="p-4 sm:p-5 lg:p-6">
              <h2 className="font-playfair text-xl text-primary-text mb-3">
                Executive Summary
              </h2>
              <p className="text-sm text-secondary-text leading-relaxed">
                This narrative synthesizes your Relationship™ reflections into a
                clear map of strengths, friction points, and forward motion. Your
                Continuum alignment rose from 42% to 78% since baseline — with
                empathetic leadership as your strongest signal and boundary
                attrition as the primary risk to watch.
              </p>
            </Card>
          </AnimatedContainer>

          <AnimatedContainer delay={0.12}>
            <Card className="p-4 sm:p-5 lg:p-6">
              <h2 className="font-playfair text-xl text-primary-text mb-4">
                Core Insights
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {INSIGHTS.map((item) => (
                  <div
                    key={item.title}
                    className={`rounded-xl border p-4 ${
                      item.tone === "positive"
                        ? "border-emerald-500/20 bg-emerald-500/5"
                        : "border-[#F5C542]/25 bg-[#F5C542]/5"
                    }`}
                  >
                    <p className="text-sm text-primary-text font-medium">
                      {item.title}
                    </p>
                  </div>
                ))}
              </div>
            </Card>
          </AnimatedContainer>

          <AnimatedContainer delay={0.14}>
            <Card className="p-4 sm:p-5 lg:p-6">
              <h2 className="font-playfair text-xl text-primary-text mb-4">
                Themes & Patterns
              </h2>
              <div className="space-y-4">
                {THEMES.map((theme) => (
                  <div key={theme.n} className="flex gap-4">
                    <span className="font-playfair text-2xl text-[#F5C542] shrink-0">
                      {theme.n}
                    </span>
                    <div>
                      <h3 className="text-primary-text font-medium">
                        {theme.title}
                      </h3>
                      <p className="mt-1 text-sm text-secondary-text leading-relaxed">
                        {theme.body}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </AnimatedContainer>

          <AnimatedContainer delay={0.16}>
            <Card className="p-4 sm:p-5 lg:p-6">
              <h2 className="font-playfair text-xl text-primary-text mb-3">
                Recommendations
              </h2>
              <ul className="space-y-2 text-sm text-secondary-text list-disc pl-5">
                <li>
                  Schedule a weekly 20-minute boundary check-in before high-load
                  weeks.
                </li>
                <li>
                  Practice naming uncertainty early in collaborative decisions.
                </li>
                <li>
                  Continue Continuum tracking after your next Blueprint cycle.
                </li>
              </ul>
            </Card>
          </AnimatedContainer>
        </div>

        <div className="space-y-5">
          <AnimatedContainer delay={0.12} direction="left">
            <Card className="p-4 sm:p-5">
              <h3 className="font-playfair text-lg text-primary-text mb-4">
                Reflection Highlights
              </h3>
              <ul className="space-y-3 text-sm">
                <li className="flex justify-between gap-3 border-b border-white/[0.05] pb-3">
                  <span className="text-secondary-text">Session note</span>
                  <span className="text-secondary-text">March 12</span>
                </li>
                <li className="flex justify-between gap-3">
                  <span className="text-secondary-text">Session note</span>
                  <span className="text-secondary-text">March 04</span>
                </li>
              </ul>
            </Card>
          </AnimatedContainer>

          <AnimatedContainer delay={0.15} direction="left">
            <Card className="p-4 sm:p-5">
              <h3 className="font-playfair text-lg text-primary-text mb-4">
                Continuity Notes
              </h3>
              <div className="space-y-4">
                <div>
                  <p className="text-xs text-secondary-text">Baseline (Q1 2025)</p>
                  <p className="mt-1 text-primary-text font-medium">
                    42% Alignment
                  </p>
                </div>
                <div>
                  <p className="text-xs text-secondary-text">
                    Current (March 2026)
                  </p>
                  <p className="mt-1 text-[#F5C542] font-medium text-lg">
                    78% Alignment
                  </p>
                </div>
              </div>
            </Card>
          </AnimatedContainer>
        </div>
      </div>
    </div>
  );
};

export default ReportDetail;

import { Link } from "react-router-dom";
import {
  ArrowRight,
  BadgeCheck,
  Cloud,
  FileText,
  Info,
  MessageSquareText,
} from "lucide-react";
import AnimatedContainer from "@/common/AnimatedContainer";
import Button from "@/ui/Button";
import Card from "@/ui/Card";
import { cn } from "@/lib/utils";
import {
  ACTIVITY,
  QUEUE_ROWS,
  queueCounts,
  type QueueStatus,
} from "@/pages/Refiner/ReviewQueue/data";

const counts = queueCounts();

const KPI = [
  {
    label: "Needs Review",
    value: String(counts.needs),
    hint: "Reports waiting for refinement",
    icon: FileText,
    to: "/refiner/review-queue?tab=needs",
  },
  {
    label: "In Review",
    value: String(counts.inReview),
    hint: "Reports currently being reviewed",
    icon: MessageSquareText,
    to: "/refiner/review-queue?tab=in",
  },
  {
    label: "Approved Today",
    value: String(counts.approvedToday),
    hint: "Reports finalized today",
    icon: BadgeCheck,
    to: "/refiner/review-history",
  },
  {
    label: "Total completed",
    value: String(counts.totalCompleted),
    hint: "Your completed queue",
    icon: Cloud,
    to: "/refiner/review-history",
  },
] as const;

const DASHBOARD_REPORTS = QUEUE_ROWS.filter(
  (r) => r.status === "Needs Review" || r.status === "In Review"
).slice(0, 4);

const statusClass = (status: QueueStatus) =>
  status === "Needs Review"
    ? "bg-sky-400/10 text-sky-300"
    : status === "In Review"
      ? "bg-[#FBBF24]/10 text-[#FBBF24]"
      : "bg-teal-500/10 text-teal-300";

const statusLabel = (status: QueueStatus) =>
  status === "In Review" ? "In Reviews" : status;

const Dashboard = () => {
  return (
    <div className="space-y-6 sm:space-y-8 pb-6">
      <AnimatedContainer delay={0.04}>
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl lg:text-[36px] font-bold text-white tracking-tight leading-tight">
              Good morning, Alex Morgan
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[#a1a1aa]">
              Here&apos;s what needs your attention today.
            </p>
          </div>
          <Button
            variant="primary"
            size="lg"
            asChild
            className="rounded-xl! shrink-0 self-start lg:self-center bg-[#FBBF24]!"
          >
            <Link
              to="/refiner/review-queue"
              className="inline-flex items-center gap-2"
            >
              Open review queue
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </AnimatedContainer>

      <AnimatedContainer delay={0.08}>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {KPI.map(({ label, value, hint, icon: Icon, to }) => (
            <Link key={label} to={to} className="no-underline block group">
              <Card className="p-5 sm:p-6 h-full transition-colors group-hover:border-white/20">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm sm:text-base font-medium text-primary-text">
                    {label}
                  </p>
                  <span className="flex size-10 items-center justify-center rounded-lg bg-white/5 border border-white/10 text-primary-brand">
                    <Icon className="size-5" />
                  </span>
                </div>
                <p className="mt-4 text-[28px] font-bold text-primary-text leading-none">
                  {value}
                </p>
                <p className="mt-2 text-xs text-secondary-text">{hint}</p>
              </Card>
            </Link>
          ))}
        </div>
      </AnimatedContainer>

      <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_350px] gap-6">
        <AnimatedContainer delay={0.12}>
          <Card className="p-5 sm:p-6">
            <div className="flex items-center gap-2 mb-5 sm:mb-6">
              <h3 className=" text-xl text-primary-text">
                Completed Reports
              </h3>
              <Info className="size-3.5 text-secondary-text/80" />
            </div>

            <div className="space-y-3">
              {DASHBOARD_REPORTS.map((report) => (
                <div
                  key={report.id}
                  className="rounded-xl border border-white/[0.08] bg-[#FFFFFF12] px-4 py-3.5 flex flex-col lg:flex-row lg:items-center gap-4"
                >
                  <div className="flex items-start sm:items-center gap-3 min-w-0 flex-1">
                    <span className="flex size-10 items-center justify-center rounded-lg bg-white/5 border border-white/10 text-primary-brand shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M14.25 2.5C14.25 2.4337 14.2237 2.37011 14.1768 2.32322C14.1299 2.27634 14.0663 2.25 14 2.25H7C6.27065 2.25 5.57118 2.53973 5.05546 3.05546C4.53973 3.57118 4.25 4.27065 4.25 5V19C4.25 19.7293 4.53973 20.4288 5.05546 20.9445C5.57118 21.4603 6.27065 21.75 7 21.75H17C17.7293 21.75 18.4288 21.4603 18.9445 20.9445C19.4603 20.4288 19.75 19.7293 19.75 19V9.147C19.75 9.0807 19.7237 9.01711 19.6768 8.97022C19.6299 8.92334 19.5663 8.897 19.5 8.897H15C14.8011 8.897 14.6103 8.81798 14.4697 8.67733C14.329 8.53668 14.25 8.34591 14.25 8.147V2.5ZM15 12.25C15.1989 12.25 15.3897 12.329 15.5303 12.4697C15.671 12.6103 15.75 12.8011 15.75 13C15.75 13.1989 15.671 13.3897 15.5303 13.5303C15.3897 13.671 15.1989 13.75 15 13.75H9C8.80109 13.75 8.61032 13.671 8.46967 13.5303C8.32902 13.3897 8.25 13.1989 8.25 13C8.25 12.8011 8.32902 12.6103 8.46967 12.4697C8.61032 12.329 8.80109 12.25 9 12.25H15ZM15 16.25C15.1989 16.25 15.3897 16.329 15.5303 16.4697C15.671 16.6103 15.75 16.8011 15.75 17C15.75 17.1989 15.671 17.3897 15.5303 17.5303C15.3897 17.671 15.1989 17.75 15 17.75H9C8.80109 17.75 8.61032 17.671 8.46967 17.5303C8.32902 17.3897 8.25 17.1989 8.25 17C8.25 16.8011 8.32902 16.6103 8.46967 16.4697C8.61032 16.329 8.80109 16.25 9 16.25H15Z" fill="white" />
                        <path d="M15.75 2.82542C15.75 2.64142 15.943 2.52442 16.086 2.63942C16.2073 2.73742 16.315 2.85142 16.409 2.98142L19.422 7.17842C19.49 7.27442 19.416 7.39842 19.298 7.39842H16C15.9337 7.39842 15.8701 7.37208 15.8232 7.3252C15.7763 7.27831 15.75 7.21473 15.75 7.14842V2.82542Z" fill="white" />
                      </svg>
                    </span>
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="text-sm font-medium text-primary-text">
                          {report.title}
                        </p>
                        <span
                          className={cn(
                            "rounded-full px-2 py-0.5 text-[10px] font-medium",
                            statusClass(report.status)
                          )}
                        >
                          {statusLabel(report.status)}
                        </span>
                      </div>
                      <p className="mt-1 text-xs text-secondary-text">
                        Client:{" "}
                        <span className="text-[#b9cbff] font-medium">
                          {report.client}
                        </span>{" "}
                        ({report.company})
                      </p>
                      <p className="mt-1.5 text-xs text-muted-blue">
                        Generated: {report.generated}
                      </p>
                      <p className="mt-0.5 text-xs text-muted-blue">
                        Waiting:{" "}
                        <span className="text-[#e05a7a]">{report.waiting}</span>
                      </p>
                    </div>
                  </div>

                  <Link
                    to={`/refiner/review-queue/${report.id}`}
                    className="inline-flex items-center justify-center gap-1.5 h-9 py-2.5 px-6 rounded-lg bg-[#FBBF24] hover:bg-[#e8b93a] text-black text-xs  shrink-0 self-stretch lg:self-center transition-colors no-underline text-[16px] font-semibold"
                  >
                    Review queue
                    <ArrowRight className="size-4" />
                  </Link>
                </div>
              ))}
            </div>
          </Card>
        </AnimatedContainer>

        <div className="space-y-5">
          <AnimatedContainer delay={0.14}>
            <Card className="p-5 sm:p-6">
              <div className="flex items-center justify-between gap-3 mb-5">
                <h3 className=" text-xl text-primary-text">
                  Recent Activity
                </h3>
                <Link
                  to="/refiner/review-history"
                  className="text-xs text-[#F5C542] hover:text-[#e8b93a] no-underline"
                >
                  View all
                </Link>
              </div>
              <ul className="space-y-8">
                {ACTIVITY.map((item) => (
                  <li key={item.title + item.time}>
                    <Link
                      to={`/refiner/review-queue/${item.reportId}`}
                      className="flex gap-3 no-underline group border-b pb-2 border-[#FFFFFF1A]"
                    >
                      <span className="mt-2 size-2 rounded-full bg-primary-brand shrink-0" />
                      <div className="min-w-0 flex-1">
                        <p className="text-sm text-primary-text group-hover:text-[#F5C542] transition-colors">
                          {item.title}
                        </p>
                        <div className="mt-1 flex items-start justify-between gap-3">
                          <p className="text-xs text-secondary-text truncate">
                            {item.detail}
                          </p>
                          <span className="text-[10px] text-muted-blue shrink-0 ">
                            {item.time}
                          </span>
                        </div>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </Card>
          </AnimatedContainer>

          <AnimatedContainer delay={0.16}>
            <Card className="p-5 sm:p-6">
              <h3 className=" text-xl text-primary-text mb-3">
                Refiner Quality Mandate
              </h3>
              <p className="text-sm text-secondary-text leading-relaxed">
                Verify all AI draft quantitative claims against underlying
                client intake files. All 7 checklist gates must be certified
                before final PDF generation.
              </p>
            </Card>
          </AnimatedContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

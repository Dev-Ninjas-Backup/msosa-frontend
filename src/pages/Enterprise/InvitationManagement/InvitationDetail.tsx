import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowLeft, CheckCircle2, Download, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import AnimatedContainer from "@/common/AnimatedContainer";
import Button from "@/ui/Button";
import Card from "@/ui/Card";
import { cn } from "@/lib/utils";
import { AVATAR_COLORS } from "../EmployeeManagement/data";
import { getInvitation } from "./data";

const HISTORY = [
  {
    title: "Invitation Created",
    detail: "Invitation drafted and queued",
    date: "Feb 1, 2025",
  },
  {
    title: "Invitation Delivered",
    detail: "Email delivered successfully",
    date: "Feb 1, 2025",
  },
  {
    title: "Employee opened the invitation link",
    detail: "Secure link accessed",
    date: "Feb 2, 2025",
  },
  {
    title: "Invitation Accepted",
    detail: "Employee confirmed participation in assessment",
    date: "Feb 2, 2025",
  },
  {
    title: "Report Generated",
    detail: "Assessment report available",
    date: "Mar 1, 2025",
  },
] as const;

const Field = ({ label, value }: { label: string; value: string }) => (
  <div>
    <p className="text-[10px] uppercase tracking-[0.08em] text-secondary-text">
      {label}
    </p>
    <p className="mt-1 text-sm text-primary-text break-all">{value}</p>
  </div>
);

const InvitationDetail = () => {
  const { invitationId } = useParams<{ invitationId: string }>();
  const inv = invitationId ? getInvitation(invitationId) : undefined;

  if (!inv) {
    return <Navigate to="/enterprise/invitation-management" replace />;
  }

  return (
    <div className="space-y-5 sm:space-y-6 pb-8">
      <AnimatedContainer delay={0.02}>
        <Link
          to="/enterprise/invitation-management"
          className="inline-flex items-center gap-1.5 text-xs text-secondary-text hover:text-[#F5C542] no-underline"
        >
          <ArrowLeft className="size-3.5" />
          Invitation Management
          <span className="text-white/30 mx-1">/</span>
          <span className="text-primary-text">{inv.inviteId}</span>
        </Link>
      </AnimatedContainer>

      <AnimatedContainer delay={0.04}>
        <Card className="p-5 sm:p-6">
          <div className="flex flex-col xl:flex-row xl:items-center gap-5">
            <div className="flex items-start gap-4 min-w-0 flex-1">
              <span
                className="flex size-16 items-center justify-center rounded-full text-lg font-bold text-black shrink-0"
                style={{ backgroundColor: AVATAR_COLORS[0] }}
              >
                {inv.initials}
              </span>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-xl sm:text-2xl font-bold text-white">
                    {inv.name}
                  </h2>
                  <span
                    className={cn(
                      "rounded-full px-2.5 py-0.5 text-[10px] font-medium",
                      inv.inviteStatus === "Accepted"
                        ? "bg-teal-500/15 text-teal-300"
                        : "bg-orange-500/15 text-orange-300"
                    )}
                  >
                    {inv.inviteStatus}
                  </span>
                  <span className="text-xs text-secondary-text">
                    #{inv.inviteId}
                  </span>
                </div>
                <p className="mt-1.5 text-sm text-secondary-text">
                  {inv.role}
                  <span className="mx-2 text-white/20">|</span>
                  {inv.department}
                  <span className="mx-2 text-white/20">|</span>#{inv.employeeId}
                  <span className="mx-2 text-white/20">|</span>
                  {inv.blueprint}
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button
                variant="soft"
                size="sm"
                className="rounded-lg!"
                onClick={() => toast.success("Invitation resent.")}
              >
                <RefreshCw className="size-3.5" />
                Resend
              </Button>
              <Button
                variant="soft"
                size="sm"
                className="rounded-lg! text-red-400!"
                onClick={() => toast.message("Invitation cancelled.")}
              >
                Cancel
              </Button>
            </div>
          </div>
        </Card>
      </AnimatedContainer>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
        <AnimatedContainer delay={0.08}>
          <Card className="p-5 sm:p-6 h-full">
            <h3 className="text-lg text-primary-text mb-5">Invitation Details</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">
              <Field label="Invitation ID" value={`#${inv.inviteId}`} />
              <Field label="Blueprint Assigned" value={inv.blueprint} />
              <Field label="Assessment Campaign" value={inv.campaign} />
              <Field label="Department" value={inv.department} />
              <Field label="Invitation Date" value={inv.inviteDate} />
              <Field label="Expiration Date" value={inv.expirationDate} />
              <Field label="Delivery Method" value={inv.deliveryMethod} />
            </div>
            <div className="mb-6">
              <p className="text-[10px] uppercase tracking-[0.08em] text-secondary-text mb-1">
                Custom Message
              </p>
              <p className="text-sm text-secondary-text leading-relaxed">
                {inv.customMessage}
              </p>
            </div>
            <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-4 space-y-4">
              <div className="flex items-center justify-between gap-2">
                <p className="text-sm font-medium text-primary-text">Secure Link</p>
                <span className="rounded-full px-2 py-0.5 text-[10px] bg-teal-500/15 text-teal-300">
                  {inv.linkStatus}
                </span>
              </div>
              <Field label="Secure Link" value={inv.secureLink} />
              <Field label="Unique Token" value={inv.token} />
              <div className="flex flex-wrap gap-2 pt-1">
                <Button
                  variant="soft"
                  size="sm"
                  className="rounded-lg!"
                  onClick={() => toast.success("Link regenerated.")}
                >
                  Regenerate Link
                </Button>
                <Button
                  variant="soft"
                  size="sm"
                  className="rounded-lg!"
                  onClick={() => toast.success("QR download started.")}
                >
                  <Download className="size-3.5" />
                  Download QR
                </Button>
              </div>
            </div>
          </Card>
        </AnimatedContainer>

        <div className="space-y-4 sm:space-y-6">
          <AnimatedContainer delay={0.1}>
            <Card className="p-5 sm:p-6">
              <h3 className="text-lg text-primary-text mb-5">
                Assessment Progress
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "Total Sessions", value: "8" },
                  { label: "Current Progress", value: `${inv.completion}%` },
                  { label: "Prev. Assessments", value: "2" },
                  {
                    label: "Report Available",
                    value: inv.completion === 100 ? "Yes" : "No",
                  },
                ].map((m) => (
                  <div
                    key={m.label}
                    className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-3 text-center"
                  >
                    <p className="text-xl font-bold text-primary-text">
                      {m.value}
                    </p>
                    <p className="mt-1 text-[10px] text-secondary-text">
                      {m.label}
                    </p>
                  </div>
                ))}
              </div>
            </Card>
          </AnimatedContainer>

          <AnimatedContainer delay={0.12}>
            <Card className="p-5 sm:p-6">
              <h3 className="text-lg text-primary-text mb-5">
                Invitation History
              </h3>
              <ul>
                {HISTORY.map((item, i) => (
                  <li key={item.title} className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <CheckCircle2 className="size-4 text-primary-brand shrink-0" />
                      {i < HISTORY.length - 1 ? (
                        <span className="w-px flex-1 min-h-6 bg-white/10 my-1" />
                      ) : null}
                    </div>
                    <div className="flex-1 pb-4 flex justify-between gap-3">
                      <div>
                        <p className="text-sm text-primary-text">{item.title}</p>
                        <p className="text-xs text-secondary-text mt-0.5">
                          {item.detail}
                        </p>
                      </div>
                      <span className="text-[10px] text-muted-blue shrink-0">
                        {item.date}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </Card>
          </AnimatedContainer>
        </div>
      </div>
    </div>
  );
};

export default InvitationDetail;

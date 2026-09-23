import { Check, FileKey2, HardDrive, Lock, Plus, Server } from "lucide-react";
import { toast } from "sonner";
import Button from "@/ui/Button";
import { cn } from "@/lib/utils";
import ProfilePanel from "../components/ProfilePanel";
import SubscriptionsPanel from "../components/SubscriptionsPanel";
import type { ProfileTabProps } from "../types";
import { formatRegDate, type AssetKind, type DigitalAsset } from "../../data";

const DEVICE_REQUEST_ACTION = "Hardware Device Requested";

const KIND_ICON: Record<AssetKind, { icon: typeof Lock; className: string }> = {
  "API Key": { icon: FileKey2, className: "text-[#22d3ee]" },
  Storage: { icon: HardDrive, className: "text-[#eab308]" },
  Compute: { icon: Server, className: "text-[#ef4444]" },
  License: { icon: FileKey2, className: "text-[#22d3ee]" },
};

const csvCell = (v: string) => `"${v.replace(/"/g, '""')}"`;

const downloadComplianceReport = (userName: string, assets: DigitalAsset[]) => {
  const header = ["Asset Name", "Type", "Resource ID", "Date Assigned", "Access Level", "Status"];
  const lines = assets.map((a) =>
    [a.name, a.kind, a.resourceId, formatRegDate(a.assignedAt), a.accessLevel, a.status]
      .map(csvCell)
      .join(",")
  );
  const blob = new Blob([[header.map(csvCell).join(","), ...lines].join("\n")], {
    type: "text/csv;charset=utf-8",
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${userName.replace(/\s+/g, "-").toLowerCase()}-license-compliance.csv`;
  link.click();
  URL.revokeObjectURL(url);
};

const ProductsTab = ({ user, actions }: ProfileTabProps) => {
  const { assets, subscriptions, audit } = user.profile;
  const deviceRequested = audit.some((a) => a.action === DEVICE_REQUEST_ACTION);
  const compliant = !assets.some((a) => a.kind === "License" && a.status === "Suspended");
  const lastScan = audit.find((a) => a.action === "License Compliance Report Downloaded");

  return (
    <div className="flex flex-col gap-6">
      <SubscriptionsPanel subscriptions={subscriptions} onAssign={actions.openAssignProduct} />

      <ProfilePanel
        title="Digital Assets & Licenses"
        bodyClassName="p-0"
        action={
          <Button
            variant="primary"
            size="sm"
            className="h-8 rounded-md px-3 text-[10px] font-bold uppercase tracking-[0.5px]"
            leftIcon={<Plus className="size-3" />}
            title="Assign New Asset"
            onClick={actions.openAssignAsset}
          />
        }
      >
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left">
            <thead>
              <tr className="border-b border-[#222] text-[9px] font-bold uppercase tracking-[0.5px] text-[#6b7280]">
                <th className="px-6 py-4 font-bold">Asset Name</th>
                <th className="px-6 py-4 font-bold">Resource ID</th>
                <th className="px-6 py-4 font-bold">Date Assigned</th>
                <th className="px-6 py-4 font-bold">Access Level</th>
                <th className="px-6 py-4 text-right font-bold">Status</th>
              </tr>
            </thead>
            <tbody>
              {assets.map((a) => {
                const { icon: Icon, className } = KIND_ICON[a.kind];
                const suspended = a.status === "Suspended";
                return (
                  <tr key={a.id} className="border-b border-[#1a1a1a]">
                    <td className="px-6 py-5">
                      <span className="inline-flex items-center gap-2 text-xs text-white">
                        <Icon className={cn("size-3.5 shrink-0", className)} />
                        {a.name}
                      </span>
                    </td>
                    <td className="px-6 py-5 font-mono text-[11px] text-[#9ca3af]">
                      {a.resourceId}
                    </td>
                    <td className="px-6 py-5 text-xs text-[#6b7280]">
                      {formatRegDate(a.assignedAt)}
                    </td>
                    <td className="px-6 py-5 text-xs text-white">{a.accessLevel}</td>
                    <td className="px-6 py-5 text-right">
                      <span
                        className={cn(
                          "inline-flex items-center gap-1 text-xs font-semibold",
                          suspended ? "text-[#ef4444]" : "text-[#10b981]"
                        )}
                      >
                        {suspended ? <Lock className="size-3" /> : <Check className="size-3" />}
                        {a.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
              {assets.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-10 text-center text-sm text-white/50">
                    No digital assets assigned yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <p className="px-6 py-4 text-center text-[11px] text-[#6b7280]">
          Showing {assets.length} assigned digital asset{assets.length === 1 ? "" : "s"}.
          Additional assets may require security clearance level 4+.
        </p>
      </ProfilePanel>

      <div className="grid gap-6 lg:grid-cols-2">
        <ProfilePanel title="Hardware & Physical Inventory">
          <p className="text-sm text-white/80">
            {deviceRequested
              ? "A hardware device request is pending fulfilment."
              : "No physical assets currently registered to this user account."}
          </p>
          <Button
            variant="secondary"
            size="sm"
            disabled={deviceRequested}
            className="mt-6 h-9 rounded-md border-[#eab308]/50 bg-transparent px-4 text-[10px] font-bold uppercase tracking-[0.5px] text-[#eab308] hover:bg-[#eab308]/10"
            title={deviceRequested ? "Request Pending" : "Request Device"}
            onClick={() => {
              actions.log(DEVICE_REQUEST_ACTION);
              toast.success("Device request submitted to IT operations");
            }}
          />
        </ProfilePanel>

        <ProfilePanel title="License Compliance Audit">
          <p className="inline-flex items-center gap-2 text-sm font-semibold text-white">
            <span
              className={cn(
                "size-2.5 rounded-full",
                compliant ? "bg-[#10b981]" : "bg-[#ef4444]"
              )}
            />
            Status: {compliant ? "Compliant" : "Action Required"}
          </p>
          <p className="mt-2 text-[11px] text-[#6b7280]">
            {lastScan
              ? `Last report exported ${formatRegDate(lastScan.at)}.`
              : "Last verification run: 2 hours ago."}{" "}
            Next scheduled scan: 22:00 GMT.
          </p>
          <Button
            variant="secondary"
            size="sm"
            className="mt-4 h-9 rounded-md border-[#333] bg-[#1a1a1a] px-4 text-[10px] font-bold uppercase tracking-[0.5px] text-white"
            title="Download Report"
            disabled={assets.length === 0}
            onClick={() => {
              downloadComplianceReport(user.name, assets);
              actions.log("License Compliance Report Downloaded");
            }}
          />
        </ProfilePanel>
      </div>
    </div>
  );
};

export default ProductsTab;

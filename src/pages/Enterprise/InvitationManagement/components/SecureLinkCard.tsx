import { Copy, Download } from "lucide-react";
import { toast } from "sonner";
import AnimatedContainer from "@/common/AnimatedContainer";
import Button from "@/ui/Button";
import Card from "@/ui/Card";
import { cn } from "@/lib/utils";
import { regenerateInviteLink, type InvitationRow } from "../data";

type SecureLinkCardProps = {
  inv: InvitationRow;
  onCopy: () => void;
};

const SecureLinkCard = ({ inv, onCopy }: SecureLinkCardProps) => (
  <AnimatedContainer delay={0.1}>
    <Card className="p-6 sm:p-8">
      <div className="flex items-center justify-between gap-3 mb-4">
        <h3 className="text-[15px] font-bold text-white">Secure Link</h3>
        <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-[#10B7BA]">
          <span className="size-1.5 rounded-full bg-[#10B7BA]" />
          {inv.linkStatus === "Expired" ? "Expired" : "Active"}
        </span>
      </div>
      <div className="relative mb-3">
        <div className="rounded-lg border border-white/10 bg-black/40 px-4 py-3 pr-12 text-sm text-white/60 break-all">
          {inv.secureLink}
        </div>
        <button
          type="button"
          onClick={onCopy}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white cursor-pointer"
          aria-label="Copy link"
        >
          <Copy className="size-4" />
        </button>
      </div>
      <div className="flex flex-wrap gap-2 mb-4">
        <span
          className={cn(
            "rounded-full px-2.5 py-0.5 text-[10px] font-bold",
            inv.linkStatus === "Used"
              ? "bg-white/5 text-white/40"
              : "bg-white/5 text-white/40"
          )}
        >
          Used
        </span>
        <span
          className={cn(
            "rounded-full px-2.5 py-0.5 text-[10px] font-bold",
            inv.linkStatus === "Active"
              ? "bg-[rgba(16,183,186,0.1)] text-[#10B7BA]"
              : "bg-white/5 text-white/40"
          )}
        >
          Active
        </span>
      </div>
      <div className="flex flex-wrap gap-2">
        <Button
          variant="soft"
          size="sm"
          className="rounded-lg! border border-[#FBBF24]/40! text-[#FBBF24]!"
          onClick={() => {
            const link = regenerateInviteLink(inv.inviteId);
            toast.success("Link regenerated.");
            void navigator.clipboard?.writeText(link);
          }}
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
    </Card>
  </AnimatedContainer>
);

export default SecureLinkCard;

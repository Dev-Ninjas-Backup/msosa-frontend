import { toast } from "sonner";
import AnimatedContainer from "@/common/AnimatedContainer";
import Button from "@/ui/Button";

const BillingActions = () => (
  <AnimatedContainer delay={0.02}>
    <div className="flex flex-wrap items-center gap-2.5 justify-end">
      <Button
        variant="primary"
        size="sm"
        className="rounded-lg! bg-[#FBBF24]! text-black! hover:bg-[#e8b93a]! h-9! px-[18px]! text-[13px]! font-bold!"
        onClick={() => toast.message("Upgrade plan coming soon.")}
      >
        Upgrade Plan
      </Button>
      <Button
        variant="outline"
        size="sm"
        className="rounded-lg! border-[#FBBF24]! text-[#FBBF24]! h-9! px-4! text-[13px]! font-semibold!"
        onClick={() => toast.success("Renewal started.")}
      >
        Renew Subscription
      </Button>
      <Button
        variant="ghost"
        size="sm"
        className="rounded-lg! h-9! px-4! text-[13px]! font-semibold! text-[#9CA3AF]!"
        onClick={() => toast.success("Invoice download started.")}
      >
        Download Invoice
      </Button>
      <button
        type="button"
        className="text-[13px] font-semibold text-[#FBBF24] hover:underline cursor-pointer border-0 bg-transparent p-0"
        onClick={() => toast.message("Support contacted.")}
      >
        Contact Support
      </button>
    </div>
  </AnimatedContainer>
);

export default BillingActions;

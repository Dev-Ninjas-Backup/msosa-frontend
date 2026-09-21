import { Check } from "lucide-react";
import AnimatedContainer from "@/common/AnimatedContainer";
import Card from "@/ui/Card";
import type { InvitationRow } from "../data";
import Field from "./Field";

type InvitationDetailsCardProps = {
  inv: InvitationRow;
};

const InvitationDetailsCard = ({ inv }: InvitationDetailsCardProps) => (
  <AnimatedContainer delay={0.08}>
    <Card className="p-6 sm:p-8">
      <h3 className="text-[15px] font-bold text-white mb-6">
        Invitation Details
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5 mb-5">
        <Field label="Invitation ID" value={`#${inv.inviteId}`} accent />
        <Field label="Reflection Assigned" value={inv.blueprint} />
        <Field label="Assessment Campaign" value={inv.campaign} />
        <Field label="Department" value={inv.department} />
        <Field label="Invitation Date" value={inv.inviteDate} />
        <Field label="Expiration Date" value={inv.expirationDate} />
        <Field
          label="Delivery Method"
          value={
            <span className="inline-flex items-center gap-1.5">
              {inv.deliveryMethod}
              <Check className="size-3.5 text-[#10B7BA]" strokeWidth={3} />
            </span>
          }
        />
      </div>
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-[0.8px] text-white/40 mb-1">
          Custom Message
        </p>
        <p className="text-[13px] text-white/60 leading-relaxed">
          {inv.customMessage}
        </p>
      </div>
    </Card>
  </AnimatedContainer>
);

export default InvitationDetailsCard;

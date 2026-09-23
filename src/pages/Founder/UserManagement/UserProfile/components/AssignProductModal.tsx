import { useEffect, useMemo, useState } from "react";
import { ChevronDown } from "lucide-react";
import Button from "@/ui/Button";
import Input from "@/ui/Input";
import Select from "@/ui/Select";
import { Label } from "@/ui/Label";
import ModalShell from "@/pages/Founder/_shared/ModalShell";
import { PRODUCT_CATALOG, type Subscription } from "../../data";
import { fieldControlClass, fieldLabelClass } from "../styles";

const oneYearFromNow = () => {
  const d = new Date();
  d.setFullYear(d.getFullYear() + 1);
  return d.toISOString().slice(0, 10);
};

const AssignProductModal = ({
  open,
  assigned,
  onClose,
  onAssign,
}: {
  open: boolean;
  assigned: Subscription[];
  onClose: () => void;
  onAssign: (product: string, expiresAt: string) => void;
}) => {
  const available = useMemo(
    () => PRODUCT_CATALOG.filter((p) => !assigned.some((s) => s.product === p)),
    [assigned]
  );
  const [product, setProduct] = useState("");
  const [expiresAt, setExpiresAt] = useState(oneYearFromNow);

  useEffect(() => {
    if (!open) return;
    setProduct(available[0] ?? "");
    setExpiresAt(oneYearFromNow());
  }, [open, available]);

  const today = new Date().toISOString().slice(0, 10);
  const canAssign = !!product && !!expiresAt && expiresAt > today;

  return (
    <ModalShell
      open={open}
      onClose={onClose}
      title="Assign Product"
      description="Grant this user a product subscription."
      footer={
        <>
          <Button
            variant="ghost"
            size="md"
            className="border-0 font-medium normal-case tracking-normal"
            title="Cancel"
            onClick={onClose}
          />
          <Button
            variant="primary"
            size="md"
            className="rounded-lg px-6 font-medium"
            title="Assign"
            disabled={!canAssign}
            onClick={() => onAssign(product, expiresAt)}
          />
        </>
      }
    >
      {available.length === 0 ? (
        <p className="text-sm text-white/60">
          Every product in the catalog is already assigned to this user.
        </p>
      ) : (
        <div className="flex flex-col gap-5">
          <div className="space-y-2">
            <Label className={fieldLabelClass}>Product</Label>
            <Select
              variant="soft"
              options={available}
              value={product}
              onChange={setProduct}
              className={fieldControlClass}
              rightIcon={<ChevronDown className="size-4 shrink-0 text-white/60" />}
            />
          </div>
          <div className="space-y-2">
            <Label className={fieldLabelClass}>Expires On</Label>
            <Input
              variant="soft"
              type="date"
              min={today}
              value={expiresAt}
              onChange={(e) => setExpiresAt(e.target.value)}
              className={`${fieldControlClass} [color-scheme:dark]`}
            />
          </div>
        </div>
      )}
    </ModalShell>
  );
};

export default AssignProductModal;

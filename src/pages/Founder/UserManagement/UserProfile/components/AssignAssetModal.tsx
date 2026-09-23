import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import Button from "@/ui/Button";
import Input from "@/ui/Input";
import Select from "@/ui/Select";
import { Label } from "@/ui/Label";
import ModalShell from "../../components/ModalShell";
import {
  ACCESS_LEVELS,
  ASSET_KINDS,
  type AccessLevel,
  type AssetKind,
} from "../../data";
import { fieldControlClass, fieldLabelClass } from "../styles";

export type NewAsset = { name: string; kind: AssetKind; accessLevel: AccessLevel };

const chevron = <ChevronDown className="size-4 shrink-0 text-white/60" />;

const AssignAssetModal = ({
  open,
  onClose,
  onAssign,
}: {
  open: boolean;
  onClose: () => void;
  onAssign: (asset: NewAsset) => void;
}) => {
  const [name, setName] = useState("");
  const [kind, setKind] = useState<AssetKind>("API Key");
  const [accessLevel, setAccessLevel] = useState<AccessLevel>("Read Only");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!open) return;
    setName("");
    setKind("API Key");
    setAccessLevel("Read Only");
    setError("");
  }, [open]);

  const submit = () => {
    if (!name.trim()) {
      setError("Asset name is required");
      return;
    }
    onAssign({ name: name.trim(), kind, accessLevel });
  };

  return (
    <ModalShell
      open={open}
      onClose={onClose}
      title="Assign New Asset"
      description="Provision a digital asset or license for this user."
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
            title="Assign Asset"
            onClick={submit}
          />
        </>
      }
    >
      <div className="flex flex-col gap-5">
        <div className="space-y-2">
          <Label className={fieldLabelClass}>Asset Name</Label>
          <Input
            variant="soft"
            autoFocus
            placeholder="e.g. Analytics API Key"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setError("");
            }}
            error={!!error}
            className={fieldControlClass}
          />
          {error && <p className="text-xs text-[#ef4444]">{error}</p>}
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="space-y-2">
            <Label className={fieldLabelClass}>Asset Type</Label>
            <Select
              variant="soft"
              options={[...ASSET_KINDS]}
              value={kind}
              onChange={(v) => setKind(v as AssetKind)}
              className={fieldControlClass}
              rightIcon={chevron}
            />
          </div>
          <div className="space-y-2">
            <Label className={fieldLabelClass}>Access Level</Label>
            <Select
              variant="soft"
              options={[...ACCESS_LEVELS]}
              value={accessLevel}
              onChange={(v) => setAccessLevel(v as AccessLevel)}
              className={fieldControlClass}
              rightIcon={chevron}
            />
          </div>
        </div>
      </div>
    </ModalShell>
  );
};

export default AssignAssetModal;

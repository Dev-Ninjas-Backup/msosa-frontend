import { X } from "lucide-react";
import { toast } from "sonner";
import Button from "@/ui/Button";

type CropPhotoModalProps = {
  open: boolean;
  onClose: () => void;
};

const CropPhotoModal = ({ open, onClose }: CropPhotoModalProps) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
      <div className="w-full max-w-[284px] rounded-2xl border border-white/10 bg-[#0D1117] p-4 space-y-4 animate-in zoom-in-95">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-white">Crop Image</h3>
          <button
            type="button"
            onClick={onClose}
            className="text-white/40 hover:text-white cursor-pointer border-0 bg-transparent p-0"
          >
            <X className="size-4" />
          </button>
        </div>

        <div className="relative aspect-square rounded-xl overflow-hidden bg-black border border-white/10">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="size-[70%] rounded-full border-2 border-[#FBBF24] shadow-[0_0_0_9999px_rgba(0,0,0,0.55)]" />
          </div>
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span className="flex size-28 items-center justify-center rounded-full bg-[#0a2a2a] text-4xl font-bold text-[#10B7BA]">
              E
            </span>
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-[10px] text-white/45 uppercase tracking-wide">
            Zoom
          </p>
          <input
            type="range"
            min={1}
            max={100}
            defaultValue={40}
            className="w-full accent-[#FBBF24]"
          />
        </div>

        <div className="flex gap-2">
          <Button
            variant="soft"
            size="sm"
            className="flex-1 rounded-lg!"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            size="sm"
            className="flex-1 rounded-lg! bg-[#FBBF24]! text-black!"
            onClick={() => {
              toast.success("Photo updated.");
              onClose();
            }}
          >
            Apply
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CropPhotoModal;

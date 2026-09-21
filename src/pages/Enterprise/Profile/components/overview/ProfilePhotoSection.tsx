import { CloudUpload, Trash2 } from "lucide-react";
import { toast } from "sonner";
import AnimatedContainer from "@/common/AnimatedContainer";
import Button from "@/ui/Button";
import Card from "@/ui/Card";
import { PROFILE_USER } from "../../data";

type ProfilePhotoSectionProps = {
  onUpload: () => void;
};

const ProfilePhotoSection = ({ onUpload }: ProfilePhotoSectionProps) => (
  <AnimatedContainer delay={0.08}>
    <Card
      className="p-6 sm:p-7 space-y-5"
      backgroundColor="rgba(255,255,255,0.05)"
      shadow="none"
    >
      <div>
        <h3 className="text-lg font-bold text-white">Profile Photo</h3>
        <p className="text-xs text-white/45 mt-1">
          Update your profile photo displayed across the platform
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_220px] gap-5 items-center">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <span className="flex size-16 items-center justify-center rounded-full bg-[#0a2a2a] text-2xl font-bold text-[#10B7BA] shrink-0">
            {PROFILE_USER.avatarLetter}
          </span>
          <div className="space-y-2">
            <p className="text-sm text-white">Update your profile photo</p>
            <p className="text-[11px] text-white/40">
              JPG, PNG, WEBP · Max 5MB · Recommended 400×400px
            </p>
            <div className="flex items-center gap-3">
              <Button
                variant="primary"
                size="sm"
                className="rounded-lg! bg-[#FBBF24]! text-black!"
                onClick={onUpload}
              >
                Upload Photo
              </Button>
              <button
                type="button"
                onClick={() => toast.message("Photo removed.")}
                className="inline-flex items-center gap-1.5 text-xs text-[#F87171] hover:underline cursor-pointer border-0 bg-transparent p-0"
              >
                <Trash2 className="size-3" />
                Remove Photo
              </button>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={onUpload}
          className="flex flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-white/20 bg-white/[0.02] px-4 py-8 text-center cursor-pointer hover:border-[#FBBF24]/40"
        >
          <CloudUpload className="size-6 text-white/35" />
          <p className="text-xs text-white/50">Drag & drop or browse files</p>
        </button>
      </div>
    </Card>
  </AnimatedContainer>
);

export default ProfilePhotoSection;

import { cn } from "@/lib/utils";

type FieldProps = {
  label: string;
  value: React.ReactNode;
  accent?: boolean;
};

const Field = ({ label, value, accent }: FieldProps) => (
  <div className="space-y-0.5">
    <p className="text-[10px] font-semibold uppercase tracking-[0.8px] text-white/40">
      {label}
    </p>
    <div
      className={cn(
        "text-[13px] font-medium break-words",
        accent ? "text-[#FBBF24]" : "text-white"
      )}
    >
      {value}
    </div>
  </div>
);

export default Field;

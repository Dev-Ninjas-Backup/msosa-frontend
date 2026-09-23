export const formLabelClass =
  "text-[10px] font-bold uppercase leading-[15px] tracking-[1px] text-[#6b7280]";

export const formControlClass =
  "h-auto! rounded-lg! border! border-white/10! bg-white/5! px-4! py-3.5! text-sm! text-white! placeholder:text-[#4b5563] focus:border-[#eab308]/60! focus:ring-1! focus:ring-[#eab308]/30!";

export const formErrorControlClass = "border-[#ef4444]/70!";

export const formErrorClass = "text-[11px] leading-4 text-[#f87171]";

export const choiceCardClass = (active: boolean) =>
  [
    "flex cursor-pointer flex-col items-start gap-1 rounded-xl border-2 bg-white/5 p-4 text-left transition-colors",
    active ? "border-[#eab308]" : "border-transparent outline outline-1 -outline-offset-1 outline-white/10 hover:bg-white/[0.08]",
  ].join(" ");

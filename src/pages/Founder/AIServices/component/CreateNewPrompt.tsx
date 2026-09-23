import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronDown, Copy, MessagesSquare, SquareTerminal } from "lucide-react";
import { toast } from "sonner";
import AnimatedContainer from "@/common/AnimatedContainer";
import Button from "@/ui/Button";
import Input from "@/ui/Input";
import Select from "@/ui/Select";
import Textarea from "@/ui/Textarea";
import { Label } from "@/ui/Label";
import { cn } from "@/lib/utils";

const PRODUCTS = [
    "Mindstate Product™",
    "FAR Engine™",
    "Knowledge Processing™",
    "Illumination Bridge™",
    "Analytics & Insights™",
    "Product Protocol™",
];

const PROVIDERS = ["Chat GPT", "Claude", "Google Gemini"];

const RESPONSE_STYLES = [
    "Professional",
    "Conversational",
    "Coaching",
    "Analytical",
] as const;

const PROMPT_VARS = [
    "{{user_response}}",
    "{{user_name}}",
    "{{context}}",
];

const MAX_PROMPT_LENGTH = 2000;

const DEFAULT_PROMPT = `// FAR Reflection™ AI System Prompt
You are a professional FAR Reflection™ coach and transformation guide.
Your role is to deeply analyze and illuminate the user's inner world.

Based on the user's response:
{{user_response}}

User context and history:
{{context}}

Provide a transformative, insight-rich reflection that:
1. Validates their experience with empathy
2. Illuminates hidden patterns and beliefs
3. Offers actionable wisdom and next steps
4. Maintains a professional, coaching tone`;

const DEFAULT_INSTRUCTIONS =
    "Always address the user by name. Never provide medical or psychological diagnosis. Keep responses under 400 words unless user requests elaboration. Use empathetic language. Avoid jargon. Format output with clear sections.";

const fieldLabelClass =
    "text-[10px] font-bold uppercase leading-[15px] tracking-[0.5px] text-[#888]";
const fieldControlClass =
    "rounded-lg! border-[#222]! bg-[#0d0d0d]! px-4! text-sm text-white";
const sectionLabelClass =
    "text-xs font-semibold leading-4 tracking-[0.3px] text-white";

type CreateNewPromptProps = {
    onBack?: () => void;
    onSave?: (data: {
        name: string;
        product: string;
        provider: string;
        purpose: string;
        prompt: string;
        responseStyle: string;
        instructions: string;
    }) => void;
};

const CreateNewPrompt = ({ onBack, onSave }: CreateNewPromptProps) => {
    const navigate = useNavigate();
    const handleBack = onBack ?? (() => navigate("/founder/ai-services"));
    const [name, setName] = useState("");
    const [product, setProduct] = useState("Mindstate Product™");
    const [provider, setProvider] = useState("Chat GPT");
    const [purpose, setPurpose] = useState("");
    const [prompt, setPrompt] = useState(DEFAULT_PROMPT);
    const [responseStyle, setResponseStyle] =
        useState<(typeof RESPONSE_STYLES)[number]>("Coaching");
    const [instructions, setInstructions] = useState(DEFAULT_INSTRUCTIONS);

    const handleSave = () => {
        if (!name.trim()) {
            toast.error("Prompt name is required");
            return;
        }
        onSave?.({
            name: name.trim(),
            product,
            provider,
            purpose: purpose.trim(),
            prompt,
            responseStyle,
            instructions,
        });
        toast.success("Prompt saved");
    };

    return (
        <AnimatedContainer className="pb-8">
            <section className="overflow-hidden rounded-lg border border-[#222] bg-[#111]">
                {/* Card header */}
                <div className="border-b border-[#222] p-6">
                    <h2 className="text-lg font-semibold leading-7 text-white">
                        AI Prompt Configuration
                    </h2>
                    <p className="mt-1 text-[13px] leading-[19.5px] text-[#888]">
                        Configure parameters for the new AI system prompt.
                    </p>
                </div>

                {/* Card body */}
                <div className="flex flex-col gap-6 p-6">
                    <div className="grid gap-6 sm:grid-cols-2">
                        <div className="space-y-2">
                            <Label className={fieldLabelClass}>Prompt Name</Label>
                            <Input
                                variant="soft"
                                placeholder="e.g. Executive Summary Generator"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className={cn("h-11!", fieldControlClass)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label className={fieldLabelClass}>Product</Label>
                            <Select
                                variant="soft"
                                options={PRODUCTS}
                                value={product}
                                onChange={setProduct}
                                className={fieldControlClass}
                                rightIcon={<ChevronDown className="size-4 shrink-0 text-white/60" />}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label className={fieldLabelClass}>AI Provider</Label>
                        <Select
                            variant="soft"
                            options={PROVIDERS}
                            value={provider}
                            onChange={setProvider}
                            className={fieldControlClass}
                            rightIcon={<ChevronDown className="size-4 shrink-0 text-white/60" />}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label className={fieldLabelClass}>Purpose</Label>
                        <Textarea
                            variant="soft"
                            placeholder="Briefly describe what this prompt achieves..."
                            value={purpose}
                            onChange={(e) => setPurpose(e.target.value)}
                            className={cn("min-h-20 py-3! leading-[21px]", fieldControlClass)}
                        />
                    </div>

                    {/* Prompt Configuration block */}
                    <div className="flex flex-col gap-4 rounded-xl border border-black bg-white/5 p-5">
                        <div className="flex items-center gap-2">
                            <span className="flex size-6 items-center justify-center rounded-md bg-[#fbbf24]/12 text-[#fbbf24]">
                                <SquareTerminal className="size-3.5" />
                            </span>
                            <p className="text-sm font-bold leading-5 tracking-[0.35px] text-white">
                                Prompt Configuration
                            </p>
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <div className="flex flex-wrap items-center justify-between gap-2">
                                <Label className={sectionLabelClass}>
                                    AI Prompt Template <span className="text-[#fbbf24]">*</span>
                                </Label>
                                <div className="flex flex-wrap items-center gap-2 text-xs text-white/60">
                                    <span>Variables:</span>
                                    {PROMPT_VARS.map((v) => (
                                        <span
                                            key={v}
                                            className="rounded border border-[#fbbf24]/20 bg-[#fbbf24]/10 px-2 py-0.5 font-mono text-xs leading-4 text-[#fbbf24]"
                                        >
                                            {v}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Code editor style box */}
                            <div className="overflow-hidden rounded-lg border border-black bg-black">
                                <div className="relative flex items-center justify-between border-b border-black px-3 py-2">
                                    <div className="flex items-center gap-2">
                                        <span className="size-2.5 rounded-full bg-[#ff5f57]" />
                                        <span className="size-2.5 rounded-full bg-[#fbbf24]" />
                                        <span className="size-2.5 rounded-full bg-[#10b981]" />
                                    </div>
                                    <span className="absolute left-1/2 -translate-x-1/2 font-mono text-xs leading-4 text-white/60">
                                        system_prompt.txt
                                    </span>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            void navigator.clipboard.writeText(prompt);
                                            toast.success("Prompt copied");
                                        }}
                                        className="cursor-pointer border-0 bg-transparent p-0.5 text-white/60 hover:text-white"
                                        aria-label="Copy prompt"
                                    >
                                        <Copy className="size-3" />
                                    </button>
                                </div>
                                <Textarea
                                    variant="soft"
                                    value={prompt}
                                    onChange={(e) => setPrompt(e.target.value)}
                                    maxLength={MAX_PROMPT_LENGTH}
                                    spellCheck={false}
                                    className="min-h-[260px] rounded-none! border-0! bg-black! p-4! font-mono text-xs! leading-[20.4px] text-[#fbbf24] shadow-none! focus-visible:ring-0!"
                                />
                            </div>
                            <p className="text-right text-xs leading-4 text-white/60">
                                {prompt.length} / {MAX_PROMPT_LENGTH} characters
                            </p>
                        </div>

                        {/* Response Style + AI Instructions */}
                        <div className="grid gap-4 sm:grid-cols-2">
                            <div className="flex flex-col gap-1.5">
                                <p className={sectionLabelClass}>Response Style</p>
                                <div className="relative">
                                    <MessagesSquare className="pointer-events-none absolute left-4 top-1/2 z-10 size-4 -translate-y-1/2 text-[#fbbf24]" />
                                    <Select
                                        variant="soft"
                                        options={[...RESPONSE_STYLES]}
                                        value={responseStyle}
                                        onChange={(v) =>
                                            setResponseStyle(v as (typeof RESPONSE_STYLES)[number])
                                        }
                                        className="h-10! rounded-lg! border-white/10! bg-white/5! pl-10! pr-4! text-sm text-white"
                                        rightIcon={<ChevronDown className="size-4 shrink-0 text-white/60" />}
                                    />
                                </div>
                                <div className="flex flex-wrap gap-1.5">
                                    {RESPONSE_STYLES.map((s) => (
                                        <button
                                            key={s}
                                            type="button"
                                            onClick={() => setResponseStyle(s)}
                                            className={cn(
                                                "cursor-pointer rounded-full border-0 px-2.5 py-1 text-xs leading-4 text-white transition-colors",
                                                responseStyle === s
                                                    ? "bg-white/10 font-semibold"
                                                    : "bg-white/5 font-medium hover:bg-white/10"
                                            )}
                                        >
                                            {s}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="flex flex-col gap-1.5">
                                <p className={sectionLabelClass}>AI Instructions</p>
                                <Textarea
                                    variant="soft"
                                    value={instructions}
                                    onChange={(e) => setInstructions(e.target.value)}
                                    className="min-h-[110px] rounded-lg! border-black! bg-black! px-4! pb-7! pt-3! text-xs! leading-4 text-white/60 shadow-none!"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Card footer */}
                <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#222] bg-[#0d0d0d] p-6">
                    <Button
                        variant="secondary"
                        size="sm"
                        className="h-10 rounded-lg border border-white/10 bg-white/5 px-6 text-sm font-medium normal-case tracking-normal text-white hover:bg-white/10"
                        title="Back"
                        onClick={handleBack}
                    />
                    <div className="flex items-center gap-5">
                        <Button
                            variant="ghost"
                            size="sm"
                            className="h-10 rounded-lg px-6 text-sm font-medium normal-case tracking-normal text-white"
                            title="Cancel"
                            onClick={handleBack}
                        />
                        <Button
                            variant="primary"
                            size="sm"
                            className="h-10 rounded-lg px-6 text-sm font-medium normal-case tracking-normal"
                            title="Save"
                            onClick={handleSave}
                        />
                    </div>
                </div>
            </section>
        </AnimatedContainer>
    );
};

export default CreateNewPrompt;

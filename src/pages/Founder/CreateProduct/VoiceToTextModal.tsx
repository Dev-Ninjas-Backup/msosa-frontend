import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Keyboard, Mic, Send } from "lucide-react";
import { cn } from "@/lib/utils";
import Button from "@/ui/Button";
import Textarea from "@/ui/Textarea";

type SpeechRec = {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onresult: ((event: SpeechRecEvent) => void) | null;
  onerror: (() => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
};

type SpeechRecEvent = {
  resultIndex: number;
  results: ArrayLike<{ isFinal: boolean; 0: { transcript: string } }>;
};

type VoiceToTextModalProps = {
  open: boolean;
  initialValue?: string;
  onSend: (text: string) => void;
  onType: () => void;
  onClose: () => void;
};

const VoiceToTextModal = ({
  open,
  initialValue = "",
  onSend,
  onType,
  onClose,
}: VoiceToTextModalProps) => {
  const [listening, setListening] = useState(false);
  const [text, setText] = useState(initialValue);
  const recRef = useRef<SpeechRec | null>(null);
  const baseRef = useRef(initialValue);

  useEffect(() => {
    if (!open) {
      recRef.current?.stop();
      recRef.current = null;
      setListening(false);
      return;
    }
    setText(initialValue);
    baseRef.current = initialValue;
  }, [open, initialValue]);

  useEffect(() => {
    return () => {
      recRef.current?.stop();
    };
  }, []);

  if (!open) return null;

  const hasText = text.trim().length > 0;

  const startListening = () => {
    const Ctor =
      (
        window as unknown as {
          SpeechRecognition?: new () => SpeechRec;
          webkitSpeechRecognition?: new () => SpeechRec;
        }
      ).SpeechRecognition ||
      (window as unknown as { webkitSpeechRecognition?: new () => SpeechRec })
        .webkitSpeechRecognition;

    setListening(true);
    baseRef.current = text;

    if (!Ctor) return;

    const rec = new Ctor();
    rec.continuous = true;
    rec.interimResults = true;
    rec.lang = "en-US";
    rec.onresult = (event) => {
      let finalChunk = "";
      let interim = "";
      for (let i = event.resultIndex; i < event.results.length; i += 1) {
        const piece = event.results[i][0].transcript;
        if (event.results[i].isFinal) finalChunk += piece;
        else interim += piece;
      }
      if (finalChunk) {
        baseRef.current = `${baseRef.current}${baseRef.current ? " " : ""}${finalChunk}`.trim();
      }
      setText(`${baseRef.current}${interim ? ` ${interim}` : ""}`.trim());
    };
    rec.onerror = () => setListening(true);
    rec.onend = () => {
      if (recRef.current === rec) recRef.current = null;
    };
    recRef.current = rec;
    try {
      rec.start();
    } catch {
      /* already started */
    }
  };

  const send = () => {
    if (!hasText) return;
    recRef.current?.stop();
    onSend(text.trim());
  };

  return (
    <div className="fixed inset-0 z-[95] flex items-center justify-center p-4">
      <button
        type="button"
        aria-label="Close voice to text"
        className="absolute inset-0 border-0 bg-black/75 backdrop-blur-sm cursor-pointer"
        onClick={onClose}
      />
      <div className="relative z-10 flex w-full max-w-[480px] flex-col items-center rounded-[20px] border border-white/20 bg-black/92 px-8 py-8 text-center shadow-[0_0_60px_rgba(251,191,36,0.08),0_8px_48px_rgba(0,0,0,0.7)]">
        <p className="font-[family-name:var(--font-display)] text-[42px] italic font-bold leading-none text-white">
          Take your time.
        </p>
        <p className="mt-3 text-xl leading-7 tracking-[0.5px] text-white">
          Tell everything that you want here
        </p>

        <div className="mt-8 flex flex-col items-center">
          <button
            type="button"
            onClick={startListening}
            aria-label="Start voice to text"
            className={cn(
              "relative flex size-[264px] items-center justify-center rounded-full bg-transparent cursor-pointer border",
              listening ? "border-[#fbbf24]/40" : "border-white/20"
            )}
          >
            <span
              className={cn(
                "absolute inset-[20px] rounded-full border",
                listening ? "border-[#fbbf24]/60" : "border-white/20"
              )}
            />
            <span
              className={cn(
                "flex size-[192px] items-center justify-center rounded-full bg-[#af7626] shadow-[0_4px_2px_rgba(251,191,36,0.25),0_0_12px_rgba(251,191,36,0.5)]",
                listening ? "border border-[#fbbf24]" : "border border-white/20"
              )}
            >
              <motion.span
                className="flex"
                initial={{ y: -10 }}
                animate={{ y: [-10, 0, 0] }}
                transition={{
                  duration: 2,
                  times: [0, 0.64, 1],
                  ease: ["easeOut", "linear"],
                  repeat: Infinity,
                }}
              >
                <Mic className="size-16 text-white drop-shadow-[0_0_18px_rgba(251,191,36,0.84)]" />
              </motion.span>
            </span>
          </button>

          {!listening && (
            <Button
              variant="primary"
              className="mt-7 h-12 rounded-full px-12 text-[21px] font-medium normal-case tracking-normal"
              title="Start"
              onClick={startListening}
            />
          )}
        </div>

        {!listening ? (
          <>
            <p className="mt-6 text-[11px] font-light uppercase tracking-[0.4em] text-white">
              or
            </p>
            <Button
              variant="secondary"
              className="mt-4 h-auto gap-3 rounded-[18px] border-white/10 bg-[#121212]/60 px-6 py-3 text-lg font-medium normal-case tracking-normal text-white/70 hover:bg-white/5 hover:text-white"
              leftIcon={<Keyboard className="size-4" />}
              title="Type"
              onClick={onType}
            />
          </>
        ) : (
          <div className="mt-8 flex w-full flex-col rounded-2xl border border-[#333] bg-gradient-to-r from-[#1a1a1a] to-black/20 p-[17px] text-left">
            <Textarea
              variant="soft"
              value={text}
              onChange={(e) => {
                setText(e.target.value);
                baseRef.current = e.target.value;
              }}
              placeholder="Type here"
              className="min-h-[88px] resize-none rounded-none! border-0! bg-transparent! px-0! py-0! text-base leading-6 text-[#8890a4] placeholder:text-[#8890a4] shadow-none focus-visible:ring-0"
            />
            <div className="flex justify-end pt-4">
              <Button
                variant={hasText ? "primary" : "secondary"}
                className={cn(
                  "h-10 gap-2 rounded-[10px] px-4 text-base font-medium normal-case tracking-normal",
                  !hasText &&
                    "border-0 bg-[#6b7280] text-[#1c1f24] hover:bg-[#6b7280]"
                )}
                title="Send"
                rightIcon={<Send className="size-5" />}
                onClick={send}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VoiceToTextModal;

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Keyboard, Mic, Send, Square } from "lucide-react";
import { toast } from "sonner";
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
  initialAudio?: string;
  onSend: (text: string, audioUrl?: string) => void;
  /** Kept so existing callers compile. Type stays inside this modal. */
  onType?: () => void;
  onClose: () => void;
};

const clock = (total: number) => {
  const m = Math.floor(total / 60)
    .toString()
    .padStart(2, "0");
  const s = (total % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
};

const VoiceToTextModal = ({
  open,
  initialValue = "",
  initialAudio = "",
  onSend,
  onClose,
}: VoiceToTextModalProps) => {
  const [panel, setPanel] = useState<"voice" | "type">("voice");
  const [recording, setRecording] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [text, setText] = useState(initialValue);
  const [audioUrl, setAudioUrl] = useState(initialAudio);
  const recRef = useRef<SpeechRec | null>(null);
  const mediaRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const baseRef = useRef(initialValue);
  const ownedUrl = useRef<string | null>(null);
  const audioUrlRef = useRef(initialAudio);
  const stopWait = useRef<((url: string) => void) | null>(null);

  const releaseStream = () => {
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
  };

  const stopCapture = () => {
    try {
      recRef.current?.stop();
    } catch {
      /* recognition already stopped */
    }
    recRef.current = null;
    if (mediaRef.current && mediaRef.current.state !== "inactive") {
      mediaRef.current.stop();
    }
    mediaRef.current = null;
    releaseStream();
    setRecording(false);
  };

  useEffect(() => {
    if (!open) {
      stopCapture();
      setPanel("voice");
      return;
    }
    setText(initialValue);
    baseRef.current = initialValue;
    audioUrlRef.current = initialAudio;
    setAudioUrl(initialAudio);
    setSeconds(0);
    setPanel("voice");
    // Reset only when the popup opens.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  useEffect(() => {
    if (!recording) return;
    const id = window.setInterval(() => setSeconds((n) => n + 1), 1000);
    return () => window.clearInterval(id);
  }, [recording]);

  useEffect(() => {
    return () => {
      try {
        recRef.current?.stop();
      } catch {
        /* ignore */
      }
      if (mediaRef.current && mediaRef.current.state !== "inactive") {
        mediaRef.current.stop();
      }
      releaseStream();
    };
  }, []);

  if (!open) return null;

  const hasText = text.trim().length > 0;
  const canSend = hasText || Boolean(audioUrl);

  const rememberAudio = (url: string) => {
    if (ownedUrl.current && ownedUrl.current !== initialAudio) {
      URL.revokeObjectURL(ownedUrl.current);
    }
    ownedUrl.current = url;
    audioUrlRef.current = url;
    setAudioUrl(url);
  };

  const startListening = async () => {
    if (recording) return;
    setSeconds(0);
    baseRef.current = text;

    let stream: MediaStream;
    try {
      stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    } catch {
      toast.error("Allow microphone access to record a voice note.");
      return;
    }

    streamRef.current = stream;
    chunksRef.current = [];
    const mime = MediaRecorder.isTypeSupported("audio/webm;codecs=opus")
      ? "audio/webm;codecs=opus"
      : MediaRecorder.isTypeSupported("audio/webm")
        ? "audio/webm"
        : "";
    const recorder = new MediaRecorder(
      stream,
      mime ? { mimeType: mime } : undefined
    );
    recorder.ondataavailable = (event) => {
      if (event.data.size > 0) chunksRef.current.push(event.data);
    };
    recorder.onstop = () => {
      const blob = new Blob(chunksRef.current, {
        type: recorder.mimeType || "audio/webm",
      });
      const url = blob.size > 0 ? URL.createObjectURL(blob) : audioUrlRef.current;
      if (blob.size > 0) rememberAudio(url);
      releaseStream();
      stopWait.current?.(url);
      stopWait.current = null;
    };
    mediaRef.current = recorder;
    recorder.start();
    setRecording(true);

    const Ctor =
      (
        window as unknown as {
          SpeechRecognition?: new () => SpeechRec;
          webkitSpeechRecognition?: new () => SpeechRec;
        }
      ).SpeechRecognition ||
      (window as unknown as { webkitSpeechRecognition?: new () => SpeechRec })
        .webkitSpeechRecognition;

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
        baseRef.current =
          `${baseRef.current}${baseRef.current ? " " : ""}${finalChunk}`.trim();
      }
      setText(`${baseRef.current}${interim ? ` ${interim}` : ""}`.trim());
    };
    rec.onerror = () => {
      /* audio recording still continues */
    };
    rec.onend = () => {
      if (recRef.current === rec) recRef.current = null;
    };
    recRef.current = rec;
    try {
      rec.start();
    } catch {
      /* recognition already started */
    }
  };

  const finishRecording = () =>
    new Promise<string>((resolve) => {
      try {
        recRef.current?.stop();
      } catch {
        /* ignore */
      }
      recRef.current = null;
      const recorder = mediaRef.current;
      mediaRef.current = null;
      setRecording(false);
      if (!recorder || recorder.state === "inactive") {
        resolve(audioUrlRef.current);
        return;
      }
      stopWait.current = resolve;
      recorder.stop();
    });

  const send = async () => {
    const url = recording ? await finishRecording() : audioUrlRef.current;
    const spoken = text.trim();
    if (!spoken && !url) return;
    onSend(spoken, url || undefined);
  };

  const openType = () => {
    if (recording) finishRecording();
    setPanel("type");
  };

  return (
    <div className="fixed inset-0 z-[95] flex items-center justify-center p-4">
      <button
        type="button"
        aria-label="Close voice to text"
        className="absolute inset-0 border-0 bg-black/75 backdrop-blur-sm cursor-pointer"
        onClick={() => {
          finishRecording();
          onClose();
        }}
      />
      <div
        className="relative z-10 flex w-full max-w-[480px] flex-col items-center rounded-[20px] border border-white/20 bg-black/92 px-8 py-8 text-center shadow-[0_0_60px_rgba(251,191,36,0.08),0_8px_48px_rgba(0,0,0,0.7)]"
        onClick={(event) => event.stopPropagation()}
      >
        <p className="font-[family-name:var(--font-display)] text-[42px] italic font-bold leading-none text-white">
          Take your time.
        </p>
        <p className="mt-3 text-xl leading-7 tracking-[0.5px] text-white">
          Tell everything that you want here
        </p>

        {panel === "voice" ? (
          <div className="mt-8 flex w-full flex-col items-center">
            <button
              type="button"
              onClick={recording ? finishRecording : () => void startListening()}
              aria-label={recording ? "Stop recording" : "Start voice recording"}
              className={cn(
                "relative flex size-[264px] items-center justify-center rounded-full bg-transparent cursor-pointer border",
                recording ? "border-[#fbbf24]/40" : "border-white/20"
              )}
            >
              <span
                className={cn(
                  "absolute inset-[20px] rounded-full border",
                  recording ? "border-[#fbbf24]/60" : "border-white/20"
                )}
              />
              <span
                className={cn(
                  "flex size-[192px] items-center justify-center rounded-full bg-[#af7626] shadow-[0_4px_2px_rgba(251,191,36,0.25),0_0_12px_rgba(251,191,36,0.5)]",
                  recording ? "border border-[#fbbf24]" : "border border-white/20"
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
                  {recording ? (
                    <Square className="size-14 fill-white text-white drop-shadow-[0_0_18px_rgba(251,191,36,0.84)]" />
                  ) : (
                    <Mic className="size-16 text-white drop-shadow-[0_0_18px_rgba(251,191,36,0.84)]" />
                  )}
                </motion.span>
              </span>
            </button>

            {recording ? (
              <p className="mt-4 font-mono text-sm tabular-nums tracking-wider text-[#fbbf24]">
                Recording {clock(seconds)}
              </p>
            ) : (
              <Button
                type="button"
                variant="primary"
                className="mt-7 h-12 rounded-full px-12 text-[21px] font-medium normal-case tracking-normal"
                title={audioUrl ? "Record again" : "Start"}
                onClick={() => void startListening()}
              />
            )}

            {audioUrl && !recording ? (
              <div className="mt-5 w-full rounded-2xl border border-white/10 bg-black/40 p-3 text-left">
                <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.2em] text-white/50">
                  Playback
                </p>
                <audio controls src={audioUrl} className="h-10 w-full" />
              </div>
            ) : null}

            {!recording && (
              <>
                <p className="mt-6 text-[11px] font-light uppercase tracking-[0.4em] text-white">
                  or
                </p>
                <Button
                  type="button"
                  variant="secondary"
                  className="mt-4 h-auto gap-3 rounded-[18px] border-white/10 bg-[#121212]/60 px-6 py-3 text-lg font-medium normal-case tracking-normal text-white/70 hover:bg-white/5 hover:text-white"
                  leftIcon={<Keyboard className="size-4" />}
                  title="Type"
                  onClick={openType}
                />
              </>
            )}
          </div>
        ) : (
          <div className="mt-8 flex w-full flex-col rounded-2xl border border-[#333] bg-gradient-to-r from-[#1a1a1a] to-black/20 p-[17px] text-left">
            <Textarea
              variant="soft"
              autoFocus
              value={text}
              onChange={(e) => {
                setText(e.target.value);
                baseRef.current = e.target.value;
              }}
              placeholder="Type here"
              className="min-h-[88px] resize-none rounded-none! border-0! bg-transparent! px-0! py-0! text-base leading-6 text-[#8890a4] placeholder:text-[#8890a4] shadow-none focus-visible:ring-0"
            />
            {audioUrl ? (
              <audio controls src={audioUrl} className="mt-3 h-10 w-full" />
            ) : null}
            <div className="flex items-center justify-between gap-3 pt-4">
              <Button
                type="button"
                variant="ghost"
                className="h-10 px-3 text-sm font-medium normal-case tracking-normal text-white/70"
                title="Voice"
                leftIcon={<Mic className="size-4" />}
                onClick={() => setPanel("voice")}
              />
              <Button
                type="button"
                variant={canSend ? "primary" : "secondary"}
                className={cn(
                  "h-10 gap-2 rounded-[10px] px-4 text-base font-medium normal-case tracking-normal",
                  !canSend &&
                    "border-0 bg-[#6b7280] text-[#1c1f24] hover:bg-[#6b7280]"
                )}
                title="Send"
                rightIcon={<Send className="size-5" />}
                onClick={send}
              />
            </div>
          </div>
        )}

        {panel === "voice" && (hasText || audioUrl) && !recording ? (
          <div className="mt-6 flex w-full justify-end">
            <Button
              type="button"
              variant={canSend ? "primary" : "secondary"}
              className="h-10 gap-2 rounded-[10px] px-4 text-base font-medium normal-case tracking-normal"
              title="Send"
              rightIcon={<Send className="size-5" />}
              onClick={send}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default VoiceToTextModal;

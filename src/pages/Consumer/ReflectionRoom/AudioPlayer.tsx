import { forwardRef, useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import { cn } from "@/lib/utils";
import { PRIMARY } from "./types";

type AudioPlayerProps = {
  src: string;
  className?: string;
};

const clock = (seconds: number) => {
  if (!Number.isFinite(seconds) || seconds < 0) return "00:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
};

const AudioPlayer = forwardRef<HTMLAudioElement, AudioPlayerProps>(
  ({ src, className }, ref) => {
    const innerRef = useRef<HTMLAudioElement | null>(null);
    const [playing, setPlaying] = useState(false);
    const [time, setTime] = useState(0);
    const [duration, setDuration] = useState(0);

    const setNode = (node: HTMLAudioElement | null) => {
      innerRef.current = node;
      if (typeof ref === "function") ref(node);
      else if (ref) ref.current = node;
    };

    useEffect(() => {
      const audio = innerRef.current;
      if (!audio) return;
      const onTime = () => setTime(audio.currentTime);
      const onMeta = () => {
        if (Number.isFinite(audio.duration)) setDuration(audio.duration);
      };
      const onPlay = () => setPlaying(true);
      const onPause = () => setPlaying(false);
      const onEnded = () => {
        setPlaying(false);
        setTime(audio.duration || 0);
      };
      audio.addEventListener("timeupdate", onTime);
      audio.addEventListener("loadedmetadata", onMeta);
      audio.addEventListener("durationchange", onMeta);
      audio.addEventListener("play", onPlay);
      audio.addEventListener("pause", onPause);
      audio.addEventListener("ended", onEnded);
      onMeta();
      return () => {
        audio.removeEventListener("timeupdate", onTime);
        audio.removeEventListener("loadedmetadata", onMeta);
        audio.removeEventListener("durationchange", onMeta);
        audio.removeEventListener("play", onPlay);
        audio.removeEventListener("pause", onPause);
        audio.removeEventListener("ended", onEnded);
      };
    }, [src]);

    const toggle = () => {
      const audio = innerRef.current;
      if (!audio) return;
      if (audio.paused) void audio.play();
      else audio.pause();
    };

    const seek = (clientX: number, track: HTMLDivElement) => {
      const audio = innerRef.current;
      if (!audio || !Number.isFinite(audio.duration) || audio.duration <= 0) return;
      const rect = track.getBoundingClientRect();
      const ratio = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
      audio.currentTime = ratio * audio.duration;
      setTime(audio.currentTime);
    };

    const progress = duration > 0 ? Math.min(100, (time / duration) * 100) : 0;

    return (
      <div className={cn("flex items-center gap-3", className)}>
        <audio ref={setNode} src={src} preload="metadata" className="hidden" />
        <button
          type="button"
          onClick={toggle}
          aria-label={playing ? "Pause recording" : "Play recording"}
          className="flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-full border-0 text-black shadow-[0_0_18px_rgba(251,191,36,0.35)]"
          style={{ backgroundColor: PRIMARY }}
        >
          {playing ? (
            <Pause className="size-4 fill-current" />
          ) : (
            <Play className="ml-0.5 size-4 fill-current" />
          )}
        </button>
        <span className="w-11 shrink-0 font-mono text-xs tabular-nums text-white">
          {clock(time)}
        </span>
        <div
          role="slider"
          aria-label="Recording position"
          aria-valuemin={0}
          aria-valuemax={Math.round(duration) || 0}
          aria-valuenow={Math.round(time)}
          className="relative h-1.5 min-w-0 flex-1 cursor-pointer rounded-full bg-white/15"
          onClick={(event) => seek(event.clientX, event.currentTarget)}
        >
          <span
            className="absolute inset-y-0 left-0 rounded-full"
            style={{ width: `${progress}%`, backgroundColor: PRIMARY }}
          />
          <span
            className="absolute top-1/2 size-3.5 -translate-y-1/2 rounded-full border-2 border-black"
            style={{
              left: `clamp(0px, calc(${progress}% - 7px), calc(100% - 14px))`,
              backgroundColor: PRIMARY,
            }}
          />
        </div>
        <span className="w-11 shrink-0 text-right font-mono text-xs tabular-nums text-white/45">
          {clock(duration)}
        </span>
      </div>
    );
  }
);

AudioPlayer.displayName = "AudioPlayer";

export default AudioPlayer;

import { useState } from "react";
import { Link } from "react-router-dom";
import { Mic, Music2, Pause, Play, Square } from "lucide-react";
import AnimatedContainer from "@/common/AnimatedContainer";
import Button from "@/ui/Button";
import { Textarea } from "@/ui/Textarea";
import { cn } from "@/lib/utils";

const PROMPTS = [
  "What feels unresolved in this relationship right now?",
  "Where do you hold back when honesty would help?",
  "What would clarity look like one month from now?",
];

const ReflectionRoom = () => {
  const [recording, setRecording] = useState(false);
  const [playing, setPlaying] = useState(true);
  const [promptIdx, setPromptIdx] = useState(0);
  const [notes, setNotes] = useState("");

  return (
    <div className="pb-4">
      <AnimatedContainer delay={0.05}>
        <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-white/10 min-h-[70vh] lg:min-h-[75vh] bg-[radial-gradient(ellipse_at_top,_rgba(212,175,55,0.12),_transparent_55%),linear-gradient(180deg,#05080f_0%,#0a1220_100%)]">
          {/* ambient orbs */}
          <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 size-72 rounded-full bg-primary-brand/10 blur-3xl" />
          <div className="pointer-events-none absolute bottom-0 right-0 size-64 rounded-full bg-sky-500/10 blur-3xl" />

          <div className="relative z-[1] flex flex-col min-h-[70vh] lg:min-h-[75vh] p-4 sm:p-6 lg:p-10">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-xs sm:text-sm text-secondary-text">
                <Music2 className="size-4 text-primary-brand" />
                Music / Vibe
                <button
                  type="button"
                  onClick={() => setPlaying((p) => !p)}
                  className="ml-1 inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-primary-text hover:border-primary-brand/40 cursor-pointer"
                >
                  {playing ? <Pause className="size-3" /> : <Play className="size-3" />}
                  Ambient
                </button>
              </div>
              <p className="font-mono text-sm text-muted-blue tabular-nums">04:22</p>
            </div>

            <div className="flex-1 flex flex-col items-center justify-center text-center px-2 py-10 sm:py-14">
              <p className="text-sm text-primary-brand tracking-wide">Welcome, Sarah.</p>
              <h1 className="mt-3 font-playfair text-2xl sm:text-4xl lg:text-5xl text-primary-text max-w-2xl leading-tight">
                Take a deep breath. Share what&apos;s on your mind.
              </h1>
              <p className="mt-4 text-sm sm:text-base text-secondary-text max-w-lg">
                {PROMPTS[promptIdx]}
              </p>
              <button
                type="button"
                onClick={() => setPromptIdx((i) => (i + 1) % PROMPTS.length)}
                className="mt-3 text-xs text-primary-brand hover:opacity-80 border-0 bg-transparent cursor-pointer"
              >
                Next prompt
              </button>

              {/* mic visualizer */}
              <div className="mt-10 flex items-end justify-center gap-1.5 h-16">
                {Array.from({ length: 16 }).map((_, i) => (
                  <span
                    key={i}
                    className={cn(
                      "w-1.5 rounded-full bg-primary-brand/70 origin-bottom transition-all",
                      recording ? "animate-pulse" : "opacity-40"
                    )}
                    style={{
                      height: recording
                        ? `${20 + ((i * 17) % 40)}px`
                        : `${10 + (i % 5) * 4}px`,
                      animationDelay: `${i * 40}ms`,
                    }}
                  />
                ))}
              </div>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <Button
                  variant={recording ? "danger" : "primary"}
                  size="lg"
                  leftIcon={
                    recording ? <Square className="size-4" /> : <Mic className="size-4" />
                  }
                  onClick={() => setRecording((r) => !r)}
                >
                  {recording ? "Stop Recording" : "Start Voice Reflection"}
                </Button>
                <Link to="/consumer/dashboard">
                  <Button variant="secondary" size="lg">
                    Save & Exit
                  </Button>
                </Link>
              </div>
            </div>

            <div className="mt-auto max-w-3xl mx-auto w-full">
              <label className="block text-xs text-muted-blue mb-2">
                Text reflection (optional)
              </label>
              <Textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Type what you can't say out loud yet..."
                className="min-h-[100px] bg-black/40 border-white/10 text-primary-text placeholder:text-muted-blue"
              />
            </div>
          </div>
        </div>
      </AnimatedContainer>
    </div>
  );
};

export default ReflectionRoom;

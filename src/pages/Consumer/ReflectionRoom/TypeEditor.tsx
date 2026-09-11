import { useEffect, useRef, useState } from "react";
import {
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  AlignLeft,
  Link2,
  Smile,
  Mic,
  Feather,
} from "lucide-react";
import { cn } from "@/lib/utils";

type TypeEditorProps = {
  value: string;
  onChange: (value: string) => void;
  primaryColor: string;
  onSwitchToVoice: () => void;
  placeholder?: string;
};

const TypeEditor = ({
  value,
  onChange,
  primaryColor,
  onSwitchToVoice,
  placeholder = "Share your reflection here...",
}: TypeEditorProps) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const [focused, setFocused] = useState(false);
  const [saving, setSaving] = useState(false);

  const wordCount = value.trim()
    ? value.trim().split(/\s+/).filter(Boolean).length
    : 0;

  const isEmpty = !value.trim();

  useEffect(() => {
    const el = editorRef.current;
    if (!el) return;
    if (document.activeElement === el) return;
    if (el.innerText !== value) {
      el.innerText = value;
    }
  }, [value]);

  useEffect(() => {
    if (!value) return;
    setSaving(true);
    const id = window.setTimeout(() => setSaving(false), 900);
    return () => window.clearTimeout(id);
  }, [value]);

  const exec = (command: string, arg?: string) => {
    editorRef.current?.focus();
    document.execCommand(command, false, arg);
    syncFromEditor();
  };

  const syncFromEditor = () => {
    const text = editorRef.current?.innerText ?? "";
    onChange(text);
  };

  const tools = [
    { icon: Bold, cmd: "bold", label: "Bold" },
    { icon: Italic, cmd: "italic", label: "Italic" },
    { icon: Underline, cmd: "underline", label: "Underline" },
    { icon: List, cmd: "insertUnorderedList", label: "Bullet list" },
    { icon: ListOrdered, cmd: "insertOrderedList", label: "Numbered list" },
    { icon: AlignLeft, cmd: "justifyLeft", label: "Align" },
  ] as const;

  return (
    <div
      className={cn(
        "w-full max-w-2xl mx-auto rounded-2xl border bg-black/55 backdrop-blur-xl overflow-hidden text-left shadow-[0_20px_60px_rgba(0,0,0,0.45)]",
        focused ? "border-white/25" : "border-white/15"
      )}
    >
      <div className="flex items-center justify-between gap-2 px-3 sm:px-4 py-2.5 border-b border-white/10">
        <div className="flex items-center gap-0.5 sm:gap-1 overflow-x-auto">
          {tools.map(({ icon: Icon, cmd, label }) => (
            <button
              key={cmd}
              type="button"
              title={label}
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => exec(cmd)}
              className="flex size-8 items-center justify-center rounded-lg text-white/70 hover:text-white hover:bg-white/10 border-0 bg-transparent cursor-pointer shrink-0"
            >
              <Icon className="size-3.5" />
            </button>
          ))}
          <button
            type="button"
            title="Emoji"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => exec("insertText", "✨")}
            className="flex size-8 items-center justify-center rounded-lg text-white/70 hover:text-white hover:bg-white/10 border-0 bg-transparent cursor-pointer shrink-0"
          >
            <Smile className="size-3.5" />
          </button>
          <button
            type="button"
            title="Insert link"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => {
              const url = window.prompt("Enter URL");
              if (url) exec("createLink", url);
            }}
            className="flex size-8 items-center justify-center rounded-lg text-white/70 hover:text-white hover:bg-white/10 border-0 bg-transparent cursor-pointer shrink-0"
          >
            <Link2 className="size-3.5" />
          </button>
        </div>

        <span
          className="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-semibold tracking-[0.14em] uppercase shrink-0"
          style={{
            color: primaryColor,
            borderColor: `${primaryColor}55`,
            backgroundColor: `${primaryColor}14`,
          }}
        >
          <span
            className={cn("size-1.5 rounded-full", saving && "animate-pulse")}
            style={{ backgroundColor: primaryColor }}
          />
          {saving ? "Auto-saving" : "Saved"}
        </span>
      </div>

      <div className="p-3 sm:p-4">
        <div className="relative min-h-[260px] sm:min-h-[300px] rounded-xl border border-white/10 bg-black/40 px-4 sm:px-5 py-4">
          <div
            ref={editorRef}
            contentEditable
            role="textbox"
            aria-multiline
            aria-placeholder={placeholder}
            data-placeholder={placeholder}
            suppressContentEditableWarning
            onInput={syncFromEditor}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            className={cn(
              "relative z-[1] min-h-[200px] sm:min-h-[240px] outline-none text-sm sm:text-base text-white/90 leading-relaxed whitespace-pre-wrap break-words",
              isEmpty && "empty-editor"
            )}
          />

          {isEmpty && (
            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
              <span
                className="flex size-16 items-center justify-center rounded-full border shadow-[0_0_28px_rgba(251,191,36,0.25)]"
                style={{
                  borderColor: `${primaryColor}66`,
                  backgroundColor: `${primaryColor}18`,
                  color: primaryColor,
                }}
              >
                <Feather className="size-7" />
              </span>
              <p className="mt-4 text-base font-medium text-white/80">
                A moment of stillness
              </p>
              <p className="mt-2 text-sm text-white/50 max-w-sm leading-relaxed">
                Every reflection starts with a single ripple. What is surfacing
                in your mind today?
              </p>
              <button
                type="button"
                onClick={onSwitchToVoice}
                className="pointer-events-auto mt-5 inline-flex items-center gap-2 h-9 px-4 rounded-full border text-xs font-medium text-white bg-black/45 hover:bg-black/60 cursor-pointer"
                style={{ borderColor: `${primaryColor}99` }}
              >
                <Mic className="size-3.5" style={{ color: primaryColor }} />
                Switch to Voice
              </button>
            </div>
          )}

          {!isEmpty && (
            <style>{`
              .empty-editor:empty:before {
                content: attr(data-placeholder);
                color: rgba(255,255,255,0.35);
                pointer-events: none;
              }
            `}</style>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between gap-3 px-4 sm:px-5 py-3 border-t border-white/10">
        <p className="text-xs text-white/45">Words: {wordCount}</p>
        {!isEmpty && (
          <button
            type="button"
            onClick={onSwitchToVoice}
            className="inline-flex items-center gap-1.5 text-xs text-white/70 hover:text-white border-0 bg-transparent cursor-pointer"
          >
            <Mic className="size-3.5" style={{ color: primaryColor }} />
            Switch to Voice
          </button>
        )}
      </div>
    </div>
  );
};

export default TypeEditor;

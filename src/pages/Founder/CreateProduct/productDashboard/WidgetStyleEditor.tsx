import { useRef } from "react";
import { ImagePlus, X } from "lucide-react";
import Button from "@/ui/Button";
import Input from "@/ui/Input";
import { Label } from "@/ui/Label";
import { FONT_OPTIONS, DEFAULT_WIDGET_STYLE } from "./defaults";
import type { ProductDashboardWidget, ProductWidgetStyle } from "./types";
import {
  cropFromPosition,
  resolveBackgroundPosition,
  resolveFontFamily,
} from "./widgetStyleCss";

type Props = {
  widget: ProductDashboardWidget;
  onChange: (next: ProductDashboardWidget) => void;
  onClose: () => void;
};

const ColorRow = ({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) => (
  <label className="relative flex items-center justify-between gap-3 rounded-lg bg-white/5 p-3 cursor-pointer">
    <div className="flex items-center gap-3 min-w-0">
      <span
        className="size-6 rounded border border-white/20 shrink-0"
        style={{ backgroundColor: value.startsWith("rgba") ? "#333" : value }}
      />
      <span className="text-sm text-white truncate">{label}</span>
    </div>
    <span className="text-xs text-white/40 font-mono uppercase truncate max-w-[100px]">
      {value}
    </span>
    <input
      type="color"
      value={value.startsWith("#") ? value.slice(0, 7) : "#121212"}
      onChange={(e) => onChange(e.target.value)}
      className="absolute inset-0 opacity-0 cursor-pointer"
    />
  </label>
);

const WidgetStyleEditor = ({ widget, onChange, onClose }: Props) => {
  const fileRef = useRef<HTMLInputElement>(null);
  const style = widget.style;

  const patchStyle = (patch: Partial<ProductWidgetStyle>) =>
    onChange({ ...widget, style: { ...style, ...patch } });

  const onImage = (file: File | null) => {
    if (!file || !file.type.startsWith("image/")) return;
    if (file.size > 2 * 1024 * 1024) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        patchStyle({ backgroundImage: reader.result });
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start sm:items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <button
        type="button"
        aria-label="Close"
        className="absolute inset-0 bg-black/70 backdrop-blur-sm border-0 cursor-pointer"
        onClick={onClose}
      />
      <div className="relative z-10 w-full max-w-[560px] my-4 overflow-hidden rounded-[24px] border border-white/10 bg-black shadow-xl">
        <div className="flex items-center justify-between gap-4 border-b border-white/[0.08] p-6">
          <div className="min-w-0">
            <p className="text-[11px] font-bold uppercase tracking-[2px] text-[#fbbf24]">
              Widget styling
            </p>
            <h2 className="mt-1 font-playfair text-xl text-white truncate">
              {widget.title || "Widget"}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex size-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/60 hover:text-white cursor-pointer"
          >
            <X className="size-4" />
          </button>
        </div>

        <div className="space-y-6 p-6 max-h-[min(70vh,720px)] overflow-y-auto bg-white/[0.03]">
          <div className="space-y-2">
            <Label className="text-[10px] font-bold uppercase tracking-[1px] text-white/50">
              Display title
            </Label>
            <Input
              value={widget.title}
              onChange={(e) => onChange({ ...widget, title: e.target.value })}
              placeholder="Optional override title"
            />
          </div>

          <section className="space-y-3">
            <p className="text-xs font-bold uppercase tracking-[0.7px] text-white">
              Typography
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label className="text-[10px] font-bold uppercase tracking-[1px] text-white/50">
                  Font
                </Label>
                <select
                  value={
                    style.fontFamily === "Source Serif Pro"
                      ? "Source Serif 4"
                      : FONT_OPTIONS.includes(
                            style.fontFamily as (typeof FONT_OPTIONS)[number]
                          )
                        ? style.fontFamily
                        : "Inter"
                  }
                  onChange={(e) => patchStyle({ fontFamily: e.target.value })}
                  className="w-full h-10 rounded-lg border border-white/10 bg-white/5 px-3 text-sm text-white outline-none"
                  style={{ fontFamily: resolveFontFamily(style.fontFamily) }}
                >
                  {FONT_OPTIONS.map((f) => (
                    <option
                      key={f}
                      value={f}
                      className="bg-[#121212]"
                      style={{ fontFamily: resolveFontFamily(f) }}
                    >
                      {f}
                    </option>
                  ))}
                </select>
                <p
                  className="text-xs text-white/50"
                  style={{ fontFamily: resolveFontFamily(style.fontFamily) }}
                >
                  Preview: The quick brown fox jumps over the lazy dog.
                </p>
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] font-bold uppercase tracking-[1px] text-white/50">
                  Size ({style.fontSize}px)
                </Label>
                <input
                  type="range"
                  min={12}
                  max={22}
                  value={style.fontSize}
                  onChange={(e) =>
                    patchStyle({ fontSize: Number(e.target.value) })
                  }
                  className="w-full accent-[#fbbf24]"
                />
              </div>
            </div>
            <ColorRow
              label="Title color"
              value={style.titleColor}
              onChange={(titleColor) => patchStyle({ titleColor })}
            />
            <ColorRow
              label="Body color"
              value={style.descriptionColor}
              onChange={(descriptionColor) => patchStyle({ descriptionColor })}
            />
          </section>

          <section className="space-y-3">
            <p className="text-xs font-bold uppercase tracking-[0.7px] text-white">
              Colors & borders
            </p>
            <ColorRow
              label="Background"
              value={style.backgroundColor}
              onChange={(backgroundColor) => patchStyle({ backgroundColor })}
            />
            <ColorRow
              label="Border"
              value={
                style.borderColor.startsWith("#")
                  ? style.borderColor
                  : "#333333"
              }
              onChange={(borderColor) => patchStyle({ borderColor })}
            />
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label className="text-[10px] font-bold uppercase tracking-[1px] text-white/50">
                  Border width ({style.borderWidth}px)
                </Label>
                <input
                  type="range"
                  min={0}
                  max={4}
                  value={style.borderWidth}
                  onChange={(e) =>
                    patchStyle({ borderWidth: Number(e.target.value) })
                  }
                  className="w-full accent-[#fbbf24]"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] font-bold uppercase tracking-[1px] text-white/50">
                  Radius ({style.borderRadius}px)
                </Label>
                <input
                  type="range"
                  min={0}
                  max={28}
                  value={style.borderRadius}
                  onChange={(e) =>
                    patchStyle({ borderRadius: Number(e.target.value) })
                  }
                  className="w-full accent-[#fbbf24]"
                />
              </div>
            </div>
          </section>

          <section className="space-y-3">
            <p className="text-xs font-bold uppercase tracking-[0.7px] text-white">
              Spacing
            </p>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label className="text-[10px] font-bold uppercase tracking-[1px] text-white/50">
                  Padding ({style.padding}px)
                </Label>
                <input
                  type="range"
                  min={8}
                  max={32}
                  value={style.padding}
                  onChange={(e) =>
                    patchStyle({ padding: Number(e.target.value) })
                  }
                  className="w-full accent-[#fbbf24]"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] font-bold uppercase tracking-[1px] text-white/50">
                  Gap ({style.gap}px)
                </Label>
                <input
                  type="range"
                  min={4}
                  max={24}
                  value={style.gap}
                  onChange={(e) => patchStyle({ gap: Number(e.target.value) })}
                  className="w-full accent-[#fbbf24]"
                />
              </div>
            </div>
          </section>

          <section className="space-y-3">
            <p className="text-xs font-bold uppercase tracking-[0.7px] text-white">
              Background image
            </p>
            <input
              ref={fileRef}
              type="file"
              accept="image/png,image/jpeg,image/webp"
              className="hidden"
              onChange={(e) => onImage(e.target.files?.[0] ?? null)}
            />
            {style.backgroundImage ? (
              <div className="relative h-28 rounded-xl overflow-hidden border border-white/10">
                <img
                  src={style.backgroundImage}
                  alt=""
                  className="absolute inset-0 size-full object-cover"
                  style={{
                    objectPosition: resolveBackgroundPosition(style),
                    transform: `scale(${style.backgroundCrop.scale})`,
                  }}
                />
                <button
                  type="button"
                  onClick={() => patchStyle({ backgroundImage: "" })}
                  className="absolute top-2 right-2 size-8 rounded-full bg-black/70 border-0 text-white cursor-pointer flex items-center justify-center"
                >
                  <X className="size-3.5" />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                className="flex w-full flex-col items-center gap-2 rounded-xl border border-dashed border-white/25 px-4 py-8 text-center cursor-pointer bg-transparent hover:border-[#fbbf24]/50"
              >
                <ImagePlus className="size-5 text-white/50" />
                <span className="text-sm text-white">Upload image</span>
                <span className="text-xs text-white/40">
                  PNG, JPG, WEBP · max 2 MB
                </span>
              </button>
            )}

            {style.backgroundImage && (
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label className="text-[10px] font-bold uppercase tracking-[1px] text-white/50">
                      Position
                    </Label>
                    <select
                      value={style.backgroundPosition}
                      onChange={(e) => {
                        const backgroundPosition = e.target
                          .value as ProductWidgetStyle["backgroundPosition"];
                        patchStyle({
                          backgroundPosition,
                          backgroundCrop: cropFromPosition(
                            backgroundPosition,
                            style.backgroundCrop.scale
                          ),
                        });
                      }}
                      className="w-full h-10 rounded-lg border border-white/10 bg-white/5 px-3 text-sm text-white outline-none"
                    >
                      {(
                        ["center", "top", "bottom", "left", "right"] as const
                      ).map((p) => (
                        <option key={p} value={p} className="bg-[#121212]">
                          {p}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] font-bold uppercase tracking-[1px] text-white/50">
                      Size
                    </Label>
                    <select
                      value={style.backgroundSize}
                      onChange={(e) =>
                        patchStyle({
                          backgroundSize: e.target
                            .value as ProductWidgetStyle["backgroundSize"],
                        })
                      }
                      className="w-full h-10 rounded-lg border border-white/10 bg-white/5 px-3 text-sm text-white outline-none"
                    >
                      {(["cover", "contain", "auto"] as const).map((s) => (
                        <option key={s} value={s} className="bg-[#121212]">
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] font-bold uppercase tracking-[1px] text-white/50">
                    Crop X ({style.backgroundCrop.x}%)
                  </Label>
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={style.backgroundCrop.x}
                    onChange={(e) =>
                      patchStyle({
                        backgroundCrop: {
                          ...style.backgroundCrop,
                          x: Number(e.target.value),
                        },
                      })
                    }
                    className="w-full accent-[#fbbf24]"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] font-bold uppercase tracking-[1px] text-white/50">
                    Crop Y ({style.backgroundCrop.y}%)
                  </Label>
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={style.backgroundCrop.y}
                    onChange={(e) =>
                      patchStyle({
                        backgroundCrop: {
                          ...style.backgroundCrop,
                          y: Number(e.target.value),
                        },
                      })
                    }
                    className="w-full accent-[#fbbf24]"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] font-bold uppercase tracking-[1px] text-white/50">
                    Zoom ({style.backgroundCrop.scale.toFixed(1)}×)
                  </Label>
                  <input
                    type="range"
                    min={1}
                    max={2.5}
                    step={0.1}
                    value={style.backgroundCrop.scale}
                    onChange={(e) =>
                      patchStyle({
                        backgroundCrop: {
                          ...style.backgroundCrop,
                          scale: Number(e.target.value),
                        },
                      })
                    }
                    className="w-full accent-[#fbbf24]"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] font-bold uppercase tracking-[1px] text-white/50">
                    Overlay ({Math.round(style.backgroundOverlay * 100)}%)
                  </Label>
                  <input
                    type="range"
                    min={0}
                    max={0.85}
                    step={0.05}
                    value={style.backgroundOverlay}
                    onChange={(e) =>
                      patchStyle({
                        backgroundOverlay: Number(e.target.value),
                      })
                    }
                    className="w-full accent-[#fbbf24]"
                  />
                </div>
              </div>
            )}
          </section>
        </div>

        <div className="flex gap-2 p-6 border-t border-white/[0.08]">
          <button
            type="button"
            className="flex-1 h-12 rounded-xl border border-white/10 bg-white/10 text-sm font-medium text-white cursor-pointer"
            onClick={() =>
              onChange({ ...widget, style: DEFAULT_WIDGET_STYLE() })
            }
          >
            Reset style
          </button>
          <Button
            type="button"
            variant="primary"
            className="flex-1 h-12! rounded-xl!"
            onClick={onClose}
          >
            Done
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WidgetStyleEditor;

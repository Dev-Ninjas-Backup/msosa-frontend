import type { CSSProperties } from "react";
import type { ProductWidgetStyle } from "./types";

const POSITION_BASE: Record<
  ProductWidgetStyle["backgroundPosition"],
  { x: number; y: number }
> = {
  center: { x: 50, y: 50 },
  top: { x: 50, y: 0 },
  bottom: { x: 50, y: 100 },
  left: { x: 0, y: 50 },
  right: { x: 100, y: 50 },
};

/** Map preset position → crop defaults when Founder picks a position keyword */
export const cropFromPosition = (
  position: ProductWidgetStyle["backgroundPosition"],
  scale = 1
) => ({
  ...POSITION_BASE[position],
  scale,
});

/**
 * Background position = preset anchor blended with crop fine-tune.
 * Crop 50/50 keeps the keyword position; moving crop shifts from that anchor.
 */
export const resolveBackgroundPosition = (style: ProductWidgetStyle) => {
  const base = POSITION_BASE[style.backgroundPosition];
  const x = Math.min(
    100,
    Math.max(0, base.x + (style.backgroundCrop.x - 50))
  );
  const y = Math.min(
    100,
    Math.max(0, base.y + (style.backgroundCrop.y - 50))
  );
  return `${x}% ${y}%`;
};

export const resolveBackgroundSize = (style: ProductWidgetStyle) => {
  if (style.backgroundSize === "auto") {
    return `${Math.round(style.backgroundCrop.scale * 100)}%`;
  }
  if (style.backgroundCrop.scale !== 1 && style.backgroundSize === "cover") {
    // Zoom on top of cover via larger percentage
    return `${Math.round(100 * style.backgroundCrop.scale)}%`;
  }
  return style.backgroundSize;
};

export const widgetCardStyle = (style: ProductWidgetStyle): CSSProperties => {
  const hasImage = Boolean(style.backgroundImage);

  return {
    fontFamily: style.fontFamily,
    fontSize: style.fontSize,
    color: style.descriptionColor,
    backgroundColor: style.backgroundColor,
    borderColor: style.borderColor,
    borderWidth: style.borderWidth,
    borderStyle: "solid",
    borderRadius: style.borderRadius,
    padding: style.padding,
    gap: style.gap,
    backgroundImage: hasImage
      ? `linear-gradient(rgba(0,0,0,${style.backgroundOverlay}), rgba(0,0,0,${style.backgroundOverlay})), url(${style.backgroundImage})`
      : undefined,
    backgroundPosition: hasImage
      ? resolveBackgroundPosition(style)
      : style.backgroundPosition,
    backgroundSize: hasImage ? resolveBackgroundSize(style) : undefined,
    backgroundRepeat: "no-repeat",
  };
};

"use client";

import Image, { type ImageProps } from "next/image";
import type { CSSProperties, DragEvent, MouseEvent } from "react";

type ProtectedImageProps = ImageProps;

const protectionStyle: CSSProperties = {
  userSelect: "none",
  WebkitUserSelect: "none",
  WebkitUserDrag: "none",
  WebkitTouchCallout: "none",
  pointerEvents: "none",
} as CSSProperties;

export default function ProtectedImage(props: ProtectedImageProps) {
  const { alt, style, onContextMenu, onDragStart, ...rest } = props;

  const handleContextMenu = (event: MouseEvent<HTMLImageElement>) => {
    event.preventDefault();
    onContextMenu?.(event);
  };

  const handleDragStart = (event: DragEvent<HTMLImageElement>) => {
    event.preventDefault();
    onDragStart?.(event);
  };

  return (
    <Image
      {...rest}
      alt={alt}
      draggable={false}
      onContextMenu={handleContextMenu}
      onDragStart={handleDragStart}
      style={{ ...protectionStyle, ...style }}
    />
  );
}

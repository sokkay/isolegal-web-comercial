"use client";

import { useEffect, useState } from "react";

const FONT_SIZES = [16, 18, 20] as const;
const DEFAULT_FONT_SIZE_INDEX = 0;
const STORAGE_KEY = "blog-font-size";

type BlogPostContentProps = {
  contentHtml: string;
};

export default function BlogPostContent({ contentHtml }: BlogPostContentProps) {
  const [fontSizeIndex, setFontSizeIndex] = useState(DEFAULT_FONT_SIZE_INDEX);
  const fontSize = FONT_SIZES[fontSizeIndex];

  useEffect(() => {
    const storedFontSize = Number(window.localStorage.getItem(STORAGE_KEY));
    const storedIndex = FONT_SIZES.findIndex(
      (availableFontSize) => availableFontSize === storedFontSize
    );

    if (storedIndex >= 0) {
      setFontSizeIndex(storedIndex);
    }
  }, []);

  const changeFontSize = (nextIndex: number) => {
    const safeIndex = Math.min(Math.max(nextIndex, 0), FONT_SIZES.length - 1);

    setFontSizeIndex(safeIndex);
    window.localStorage.setItem(STORAGE_KEY, String(FONT_SIZES[safeIndex]));
  };

  return (
    <div className="mt-8">
      <div className="border-text/10 mx-auto flex max-w-3xl items-center justify-between gap-3 border-y py-3">
        <span className="text-text/70 hidden text-sm font-semibold sm:inline"></span>

        <div
          className="border-text/15 bg-card-background ml-auto flex items-center rounded-xl border p-1 shadow-sm"
          role="group"
          aria-label="Cambiar tamaño del texto del artículo"
        >
          <button
            type="button"
            onClick={() => changeFontSize(fontSizeIndex - 1)}
            disabled={fontSizeIndex === 0}
            className="text-text hover:bg-primary/10 focus-visible:outline-primary flex size-11 cursor-pointer items-center justify-center rounded-lg text-base font-bold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-35 dark:text-white dark:hover:bg-white/10"
            aria-label="Disminuir tamaño del texto"
          >
            A−
          </button>

          <button
            type="button"
            onClick={() => changeFontSize(DEFAULT_FONT_SIZE_INDEX)}
            className="text-text/70 hover:bg-primary/10 focus-visible:outline-primary h-11 min-w-16 cursor-pointer rounded-lg px-2 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 dark:text-white/70 dark:hover:bg-white/10"
            aria-label="Restablecer tamaño del texto"
          >
            <span aria-live="polite">{fontSize} px</span>
          </button>

          <button
            type="button"
            onClick={() => changeFontSize(fontSizeIndex + 1)}
            disabled={fontSizeIndex === FONT_SIZES.length - 1}
            className="text-text hover:bg-primary/10 focus-visible:outline-primary flex size-11 cursor-pointer items-center justify-center rounded-lg text-xl font-bold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-35 dark:text-white dark:hover:bg-white/10"
            aria-label="Aumentar tamaño del texto"
          >
            A+
          </button>
        </div>
      </div>

      <div
        className="prose text-text/90 [&_a]:text-primary [&_a:hover]:text-primary/80 mx-auto mt-8 max-w-3xl leading-8 transition-[font-size] duration-200 select-none [&_h2]:mt-10 [&_h2]:mb-2 [&_h2]:text-3xl [&_h2]:leading-tight [&_h2]:font-extrabold [&_h2]:tracking-tight [&_h3]:mt-10 [&_h3]:mb-2 [&_h3]:text-2xl [&_h3]:leading-snug [&_h3]:font-bold [&_h4]:mt-10 [&_h4]:mb-2 [&_h4]:text-xl [&_h4]:leading-snug [&_h4]:font-semibold [&_img]:pointer-events-none [&_img]:rounded-xl [&_img]:select-none [&_img]:[-webkit-touch-callout:none] [&_img]:[-webkit-user-drag:none] [&_li]:my-0 [&_li]:pl-1 [&_li]:leading-7 [&_li_p]:my-0 [&_li_p]:leading-7 [&_li>ol]:my-1 [&_li>ol]:list-[lower-alpha] [&_li>ol]:pl-6 [&_li>ul]:my-1 [&_li>ul]:list-[circle] [&_li>ul]:pl-6 [&_ol]:my-3 [&_ol]:list-decimal [&_ol]:pl-7 [&_p]:my-6 [&_p]:leading-8 [&_ul]:my-3 [&_ul]:list-disc [&_ul]:pl-7"
        style={{ fontSize: `${fontSize}px` }}
        dangerouslySetInnerHTML={{ __html: contentHtml }}
      />
    </div>
  );
}

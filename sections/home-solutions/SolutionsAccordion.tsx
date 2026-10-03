"use client";

import ArrowRightIcon from "@/public/icons/arrow-right-alt.svg";
import type { CSSProperties, ReactNode } from "react";
import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import styles from "./home-solutions.module.css";

type SolutionPanel = {
  id: string;
  title: string;
  themeClassName?: string;
  content: ReactNode;
};

const ROTATION_MS = 8000;
const INTERACTION_PAUSE_MS = 20000;
const ROTATION_QUERY =
  "(min-width: 1024px) and (hover: hover) and (prefers-reduced-motion: no-preference)";

function subscribeToRotationEligibility(callback: () => void) {
  const media = window.matchMedia(ROTATION_QUERY);
  media.addEventListener("change", callback);
  document.addEventListener("visibilitychange", callback);
  return () => {
    media.removeEventListener("change", callback);
    document.removeEventListener("visibilitychange", callback);
  };
}

function canRotate() {
  return window.matchMedia(ROTATION_QUERY).matches && !document.hidden;
}

export default function SolutionsAccordion({
  panels,
}: {
  panels: SolutionPanel[];
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const pendingMobileScroll = useRef<number | null>(null);
  const resumeTimerRef = useRef<number | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [inView, setInView] = useState(false);
  const rotationEligible = useSyncExternalStore(
    subscribeToRotationEligibility,
    canRotate,
    () => false
  );
  const running = rotationEligible && inView && !paused;

  useEffect(() => {
    return () => {
      if (resumeTimerRef.current !== null)
        window.clearTimeout(resumeTimerRef.current);
    };
  }, []);

  function pauseRotation() {
    setPaused(true);
    if (resumeTimerRef.current !== null)
      window.clearTimeout(resumeTimerRef.current);
    resumeTimerRef.current = window.setTimeout(() => {
      resumeTimerRef.current = null;
      setPaused(false);
    }, INTERACTION_PAUSE_MS);
  }

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.25 }
    );
    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!running) return;
    const timer = window.setTimeout(
      () => setActiveIndex((index) => (index + 1) % panels.length),
      ROTATION_MS
    );
    return () => window.clearTimeout(timer);
  }, [running, activeIndex, panels.length]);

  useLayoutEffect(() => {
    if (pendingMobileScroll.current !== activeIndex) return;
    pendingMobileScroll.current = null;
    if (window.matchMedia("(min-width: 1024px)").matches) return;
    const card = triggerRefs.current[activeIndex]?.closest("article");
    if (!card) return;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const startScroll = window.scrollY;
    const startTime = performance.now();
    const margin =
      parseFloat(window.getComputedStyle(card).scrollMarginTop) || 0;
    let frame = 0;

    function animateScroll(now: number) {
      const progress = reduceMotion ? 1 : Math.min((now - startTime) / 450, 1);
      const eased = 1 - (1 - progress) ** 3;
      // The card moves while the previous panel collapses; follow its live position.
      const target = Math.max(
        0,
        card!.getBoundingClientRect().top + window.scrollY - margin
      );
      window.scrollTo({
        top: startScroll + (target - startScroll) * eased,
        behavior: "instant",
      });
      if (progress < 1) frame = window.requestAnimationFrame(animateScroll);
    }

    const cancelScroll = () => window.cancelAnimationFrame(frame);
    frame = window.requestAnimationFrame(animateScroll);
    window.addEventListener("wheel", cancelScroll, { passive: true });
    window.addEventListener("touchmove", cancelScroll, { passive: true });
    return () => {
      cancelScroll();
      window.removeEventListener("wheel", cancelScroll);
      window.removeEventListener("touchmove", cancelScroll);
    };
  }, [activeIndex]);

  function selectPanel(index: number) {
    pendingMobileScroll.current =
      index !== activeIndex && !window.matchMedia("(min-width: 1024px)").matches
        ? index
        : null;
    pauseRotation();
    setActiveIndex(index);
  }

  return (
    <div
      ref={rootRef}
      className={styles.accordion}
      onClickCapture={pauseRotation}
      onFocusCapture={pauseRotation}
      onKeyDownCapture={pauseRotation}
    >
      <div
        className={styles.deck}
        style={
          {
            "--solution-columns": panels
              .map((_, index) =>
                index === activeIndex
                  ? "minmax(5.5rem, 1fr)"
                  : "minmax(5.5rem, 0.09fr)"
              )
              .join(" "),
          } as CSSProperties
        }
      >
        {panels.map((panel, index) => {
          const active = index === activeIndex;
          const number = String(index + 1).padStart(2, "0");
          return (
            <article
              key={panel.id}
              className={`${styles.card} ${panel.themeClassName ?? ""}`}
              data-active={active}
            >
              <h3 className={styles.heading}>
                <button
                  ref={(node) => {
                    triggerRefs.current[index] = node;
                  }}
                  id={`${panel.id}-trigger`}
                  type="button"
                  className={styles.trigger}
                  aria-expanded={active}
                  aria-controls={`${panel.id}-panel`}
                  onClick={() => selectPanel(index)}
                  onKeyDown={(event) => {
                    let next: number;
                    switch (event.key) {
                      case "ArrowRight":
                      case "ArrowDown":
                        next = (index + 1) % panels.length;
                        break;
                      case "ArrowLeft":
                      case "ArrowUp":
                        next = (index - 1 + panels.length) % panels.length;
                        break;
                      case "Home":
                        next = 0;
                        break;
                      case "End":
                        next = panels.length - 1;
                        break;
                      default:
                        return;
                    }
                    event.preventDefault();
                    selectPanel(next);
                    triggerRefs.current[next]?.focus({ preventScroll: true });
                  }}
                >
                  <span className={styles.number} aria-hidden="true">
                    {number}
                  </span>
                  <span className={styles.title}>{panel.title}</span>
                  <span className={styles.arrow} aria-hidden="true">
                    <ArrowRightIcon className="size-5 fill-current" />
                  </span>
                </button>
              </h3>
              <div
                id={`${panel.id}-panel`}
                role="region"
                aria-labelledby={`${panel.id}-trigger`}
                aria-hidden={!active}
                inert={!active}
                className={styles.panel}
              >
                <div className={styles.panelInner}>{panel.content}</div>
              </div>
              {active && running && (
                <div
                  key={`${index}-${running}`}
                  className={styles.progress}
                  aria-hidden="true"
                />
              )}
            </article>
          );
        })}
      </div>
    </div>
  );
}

import { Fragment } from "react";

/**
 * Renders text as individually animatable words (<span class="w">).
 * Used by the scroll engine (data-scrub) and the hero timeline.
 * Wrap a phrase in *asterisks* to italicise it.
 */
export default function SplitWords({ text, emClassName = "italic" }: { text: string; emClassName?: string }) {
  const parts = text.split(/(\*[^*]+\*)/g).filter(Boolean);
  return (
    <>
      {parts.map((part, pi) => {
        const isEm = part.startsWith("*") && part.endsWith("*");
        const words = (isEm ? part.slice(1, -1) : part).split(/(\s+)/);
        return (
          <Fragment key={pi}>
            {words.map((w, wi) =>
              /^\s+$/.test(w) || !w ? (
                <Fragment key={wi}>{w}</Fragment>
              ) : (
                <span key={wi} className={`w${isEm ? ` ${emClassName}` : ""}`}>
                  {w}
                </span>
              )
            )}
          </Fragment>
        );
      })}
    </>
  );
}

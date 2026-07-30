import type { ReactNode } from "react";

type MobileChapterProps = {
  id: string;
  index: number;
  eyebrow: string;
  tone?: "light" | "muted" | "dark";
  children: ReactNode;
};

export default function MobileChapter({
  id,
  index,
  eyebrow,
  tone = "light",
  children,
}: MobileChapterProps) {
  const labelId = `${id}-chapter-label`;

  return (
    <section
      id={id}
      aria-labelledby={labelId}
      data-mobile-chapter
      data-mobile-tone={tone}
      className="mobile-chapter"
    >
      <div className="section-shell mobile-chapter__inner">
        <p id={labelId} className="mobile-chapter__marker">
          <span aria-hidden="true">{String(index).padStart(2, "0")}</span>
          <span>{eyebrow}</span>
        </p>
        {children}
      </div>
    </section>
  );
}

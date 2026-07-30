type MobileChapterIntroProps = {
  id: string;
  title: string;
  description?: string;
};

export default function MobileChapterIntro({
  id,
  title,
  description,
}: MobileChapterIntroProps) {
  return (
    <header className="mobile-chapter-intro">
      <h2 id={id} className="mobile-chapter-intro__title text-balance">
        {title}
      </h2>
      {description ? (
        <p className="mobile-chapter-intro__description">{description}</p>
      ) : null}
    </header>
  );
}

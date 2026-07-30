type SectionIntroProps = {
  id: string;
  title: string;
  description: string;
};

export default function SectionIntro({
  id,
  title,
  description,
}: SectionIntroProps) {
  return (
    <div className="max-w-3xl">
      <h2
        id={id}
        className="text-balance text-[2rem] font-extrabold leading-[1.08] text-navy sm:text-[2.5rem] lg:text-5xl"
      >
        {title}
      </h2>
      <p className="mt-5 max-w-2xl text-base leading-7 text-slate sm:text-[17px]">
        {description}
      </p>
    </div>
  );
}

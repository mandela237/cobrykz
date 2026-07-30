type ThreadItem = {
  id: string;
  label: string;
  detail?: string;
  state?: "active" | "complete" | "next";
};

type HomeSystemThreadProps = {
  ariaLabel: string;
  items: readonly ThreadItem[];
};

export default function HomeSystemThread({
  ariaLabel,
  items,
}: HomeSystemThreadProps) {
  return (
    <ol
      aria-label={ariaLabel}
      className="home-system-thread grid gap-0 md:grid-cols-6"
    >
      {items.map((item, index) => (
        <li
          key={item.id}
          data-thread-stage={item.id}
          data-thread-state={item.state ?? "next"}
          className="relative border-l border-border pb-7 pl-7 last:pb-0 md:border-l-0 md:border-t md:px-4 md:pb-0 md:pt-7 md:first:pl-0 md:last:pr-0"
        >
          <span
            aria-hidden="true"
            className="home-system-thread__node absolute -left-[5px] top-0 size-[9px] rounded-full border border-blue bg-white md:-top-[5px] md:left-4 md:first:left-0"
          />
          <span className="block text-[11px] font-bold text-blue">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="mt-2 block text-sm font-bold leading-5 text-navy">
            {item.label}
          </span>
          {item.detail ? (
            <span className="mt-2 block text-[13px] leading-5 text-slate">
              {item.detail}
            </span>
          ) : null}
        </li>
      ))}
    </ol>
  );
}

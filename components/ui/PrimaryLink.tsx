type PrimaryLinkProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
};

export default function PrimaryLink({
  href,
  children,
  className = "",
}: PrimaryLinkProps) {
  return (
    <a
      href={href}
      className={`action-transition inline-flex min-h-11 items-center justify-center rounded-lg bg-blue px-5 text-[13px] font-semibold text-white hover:bg-blue-dark active:bg-blue-dark ${className}`}
    >
      {children}
    </a>
  );
}

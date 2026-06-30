export default function SocialProof() {
  return (
    <section
      id="social-proof"
      aria-label="Trust indicators"
      className="bg-[#080E1C] border-y border-white/[0.06] py-3.5"
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">

        {/* Client Rating */}
        <div>
          <div className="flex items-center gap-1 mb-0.5">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="#2563EB" aria-hidden="true">
              <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
            </svg>
            <span className="text-[18px] font-black text-white leading-none">5.0</span>
          </div>
          <p className="text-[9px] font-medium uppercase tracking-[0.08em] text-white/35">
            Client Rating
          </p>
        </div>

        <div className="w-px h-7 bg-white/[0.08]" aria-hidden="true" />

        {/* Industries Served */}
        <div>
          <p className="text-[18px] font-black text-white leading-none mb-0.5">10+</p>
          <p className="text-[9px] font-medium uppercase tracking-[0.08em] text-white/35">
            Industries
          </p>
        </div>

        <div className="w-px h-7 bg-white/[0.08]" aria-hidden="true" />

        {/* Years Building */}
        <div>
          <p className="text-[18px] font-black text-white leading-none mb-0.5">5+</p>
          <p className="text-[9px] font-medium uppercase tracking-[0.08em] text-white/35">
            Years Building
          </p>
        </div>

        <div className="w-px h-7 bg-white/[0.08]" aria-hidden="true" />

        {/* Projects Delivered */}
        <div>
          <p className="text-[18px] font-black text-white leading-none mb-0.5">12+</p>
          <p className="text-[9px] font-medium uppercase tracking-[0.08em] text-white/35">
            Projects
          </p>
        </div>

      </div>
    </section>
  );
}

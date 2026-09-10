const AuthFooter = () => {
  return (
    <footer className="w-full border-t border-white/5 px-4 sm:px-8 lg:px-12 py-6 sm:py-8 flex flex-col lg:flex-row items-center justify-between gap-4">
      <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-6 gap-y-2">
        {["Enterprise Support", "System Status", "Data Processing Addendum"].map(
          (label) => (
            <a
              key={label}
              href="#"
              className="text-sm text-white/60 hover:text-white transition-colors"
            >
              {label}
            </a>
          )
        )}
      </div>
      <div className="flex flex-wrap items-center justify-center gap-3 text-sm">
        <span className="text-white/60 uppercase tracking-[0.08em]">
          Security Tier:
        </span>
        <span className="text-primary-brand font-bold uppercase tracking-[0.08em]">
          L4 Protocol
        </span>
        <span className="hidden sm:inline w-px h-3 bg-white/40" />
        <span className="text-white/60 uppercase tracking-[0.12em] text-center">
          Far Systems — Established 2026
        </span>
      </div>
    </footer>
  );
};

export default AuthFooter;

import { Bell, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { ConsumerMenuButton } from "./ConsumerSidebar";

type ConsumerHeaderProps = {
  title: string;
  description?: string;
  onMenuClick: () => void;
};

const ConsumerHeader = ({
  title,
  description,
  onMenuClick,
}: ConsumerHeaderProps) => {
  return (
    <header className="sticky top-0 z-30 bg-primary-bg/90 backdrop-blur-md border-b border-white/5">
      <div className="flex items-center justify-between gap-4 px-4 sm:px-6 lg:px-8 py-4 sm:py-5">
        {/* Left: Menu + Title */}
        <div className="flex items-start gap-2 sm:gap-3 min-w-0 flex-1">
          <ConsumerMenuButton onClick={onMenuClick} />
          <div className="min-w-0 pt-0.5 sm:pt-0">
            <h1 className="font-playfair text-xl sm:text-2xl lg:text-[28px] text-primary-text leading-tight truncate">
              {title}
            </h1>
            {description && (
              <p className="mt-1 text-xs sm:text-sm text-secondary-text max-w-xl">
                {description}
              </p>
            )}
          </div>
        </div>

        {/* Right: Search + Notification */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Search Bar */}
          <div className="relative hidden sm:block">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-secondary-text pointer-events-none" />
            <input
              type="text"
              placeholder="Search..."
              className="h-10 w-48 lg:w-56 pl-10 pr-4 rounded-xl border border-white/10 bg-white/5 text-sm text-primary-text placeholder:text-secondary-text outline-none focus:border-primary-brand/40 focus:bg-white/[0.07] transition-all"
            />
          </div>

          {/* Notification Bell */}
          <Link
            to="/consumer/notifications"
            className="relative flex size-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-secondary-text hover:text-primary-brand hover:border-primary-brand/40 transition-colors"
            aria-label="Notifications"
          >
            <Bell className="size-5" />
            <span className="absolute top-1.5 right-1.5 size-2 rounded-full bg-primary-brand" />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default ConsumerHeader;
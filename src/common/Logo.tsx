import { cn } from "@/lib/utils";
import farSystemsLogo from "@/assets/banner logo.png";
import logoIcon from "@/assets/logo.png";

interface LogoProps {
  className?: string;
  imgClassName?: string;
  collapsed?: boolean;
}

const Logo = ({ className, imgClassName, collapsed }: LogoProps) => {
  return (
    <div className={cn("flex items-center justify-center select-none w-full", className)}>
      {collapsed ? (
        <img
          src={logoIcon}
          alt="FAR"
          className={cn("size-10 object-contain mx-auto shrink-0", imgClassName)}
        />
      ) : (
        <div className="flex items-center gap-2.5 px-2">
          <img
            src={farSystemsLogo}
            alt="FAR SYSTEMS"
            className={cn("h-11 w-auto max-w-[200px] object-contain shrink-0", imgClassName)}
          />
        </div>
      )}
    </div>
  );
};

export default Logo;

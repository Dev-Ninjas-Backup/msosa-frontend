import { ReactNode } from "react";

interface CommonWrapperProps {
  children: ReactNode;
  className?: string;
}

const CommonWrapper = ({ children, className = "" }: CommonWrapperProps) => {
  return (
    <div
      className={`max-w-[1840px] mx-auto my-auto w-full px-4 sm:px-6 lg:px-8 xl:px-10 ${className}`}
    >
      {children}
    </div>
  );
};

export default CommonWrapper;

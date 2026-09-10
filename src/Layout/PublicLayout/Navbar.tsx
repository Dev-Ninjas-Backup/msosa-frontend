import React, { useEffect, useRef, useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import CommonWrapper from "@/common/CommonWrapper";
import PrimaryButton from "@/common/PrimaryButton";
import logo from "@/assets/logo.png";

const Navbar: React.FC = () => {
  const [isSolutionsOpen, setIsSolutionsOpen] = useState(false);
  const [isResourcesOpen, setIsResourcesOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const solutionsRef = useRef<HTMLDivElement>(null);
  const resourcesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (solutionsRef.current && !solutionsRef.current.contains(target)) {
        setIsSolutionsOpen(false);
      }
      if (resourcesRef.current && !resourcesRef.current.contains(target)) {
        setIsResourcesOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const closeMobileMenu = () => setIsMenuOpen(false);

  const navLinkClass =
    "text-sm font-medium tracking-wider text-primary-text hover:text-primary-brand transition-colors whitespace-nowrap";

  return (
    <header className="sticky top-0 z-40 bg-transparent text-primary-text border-none">
      <CommonWrapper className="">
        <div className="relative flex h-16 sm:h-20 lg:h-22 items-center justify-between gap-3">
          {/* Logo */}
          <Link
            to="/"
            className="group flex items-center gap-2 sm:gap-3 no-underline shrink-0 min-w-0 z-10"
          >
            <img
              src={logo}
              alt="FAR SYSTEMS Logo"
              className="size-10 sm:size-12 lg:size-15 object-contain transition-transform duration-300 group-hover:scale-105 shrink-0"
            />
            <span className="leading-none flex flex-col justify-center min-w-0">
              <span className="block text-lg sm:text-xl lg:text-2xl font-bold tracking-[0.1em] text-gradient truncate">
                FAR SYSTEMS
                <sup className="ml-0.5 text-[10px] tracking-normal text-primary-brand">
                  TM
                </sup>
              </span>
              <span className="mt-1 hidden xl:block text-[10px] font-normal tracking-[0.2em] text-secondary-text uppercase leading-[15px] max-w-[280px]">
                Building Visibility Systems for Individuals and Organizations.
              </span>
            </span>
          </Link>

          {/* Desktop nav links — center, slightly left */}
          <nav
            className="absolute left-[40%] xl:left-[42%] top-1/2 -translate-x-1/2 -translate-y-1/2 hidden lg:flex items-center gap-4 xl:gap-5"
            aria-label="Main navigation"
          >
            <div className="relative" ref={solutionsRef}>
              <button
                type="button"
                onClick={() => {
                  setIsSolutionsOpen((prev) => !prev);
                  setIsResourcesOpen(false);
                }}
                className={`flex items-center gap-1 ${navLinkClass}`}
              >
                SOLUTIONS
                <ChevronDown
                  className={`h-4 w-4 transition-transform duration-200 ${
                    isSolutionsOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isSolutionsOpen && (
                <div className="absolute top-full left-0 mt-2 w-48 rounded-md border border-white/10 bg-black/95 py-2 shadow-lg backdrop-blur-sm z-50">
                  <Link
                    to="/solutions/individual"
                    className="block px-4 py-2 text-sm text-primary-text hover:bg-white/5 hover:text-primary-brand"
                    onClick={() => setIsSolutionsOpen(false)}
                  >
                    For Individuals
                  </Link>
                  <Link
                    to="/solutions/organization"
                    className="block px-4 py-2 text-sm text-primary-text hover:bg-white/5 hover:text-primary-brand"
                    onClick={() => setIsSolutionsOpen(false)}
                  >
                    For Organizations
                  </Link>
                </div>
              )}
            </div>

            <Link to="/platform" className={navLinkClass}>
              PLATFORM
            </Link>

            <Link to="/about" className={navLinkClass}>
              ABOUT US
            </Link>

            <div className="relative" ref={resourcesRef}>
              <button
                type="button"
                onClick={() => {
                  setIsResourcesOpen((prev) => !prev);
                  setIsSolutionsOpen(false);
                }}
                className={`flex items-center gap-1 ${navLinkClass}`}
              >
                RESOURCES
                <ChevronDown
                  className={`h-4 w-4 transition-transform duration-200 ${
                    isResourcesOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isResourcesOpen && (
                <div className="absolute top-full left-0 mt-2 w-48 rounded-md border border-white/10 bg-black/95 py-2 shadow-lg backdrop-blur-sm z-50">
                  <Link
                    to="/resources/blog"
                    className="block px-4 py-2 text-sm text-primary-text hover:bg-white/5 hover:text-primary-brand"
                    onClick={() => setIsResourcesOpen(false)}
                  >
                    Blog
                  </Link>
                  <Link
                    to="/resources/docs"
                    className="block px-4 py-2 text-sm text-primary-text hover:bg-white/5 hover:text-primary-brand"
                    onClick={() => setIsResourcesOpen(false)}
                  >
                    Documentation
                  </Link>
                  <Link
                    to="/resources/support"
                    className="block px-4 py-2 text-sm text-primary-text hover:bg-white/5 hover:text-primary-brand"
                    onClick={() => setIsResourcesOpen(false)}
                  >
                    Support
                  </Link>
                </div>
              )}
            </div>

            <Link to="/pricing" className={navLinkClass}>
              PRICING
            </Link>
          </nav>

          {/* Desktop CTAs (right) */}
          <div className="hidden lg:flex items-center gap-3 xl:gap-5 shrink-0 z-10">
            <a
              href="https://www.farsystems.ai"
              className="hidden xl:inline text-primary-brand text-sm font-medium tracking-wider hover:opacity-80 transition-opacity"
            >
              www.farsystems.ai
            </a>

            <div className="hidden xl:block w-px h-6 bg-border" />

            <div className="flex items-center gap-2 xl:gap-4">
              <Link to="/login">
                <PrimaryButton variant="outline" size="lg">
                  LOGIN
                </PrimaryButton>
              </Link>
              <Link to="/register">
                <PrimaryButton
                  variant="primary"
                  size="lg"
                  className="text-black!"
                >
                  GET STARTED
                </PrimaryButton>
              </Link>
            </div>
          </div>

          {/* Hamburger — mobile + tablet */}
          <button
            type="button"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            onClick={() => setIsMenuOpen((open) => !open)}
            className="border-0 bg-transparent p-2 text-white lg:hidden shrink-0 z-10"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile / tablet menu */}
        {isMenuOpen && (
          <nav
            className="border-t border-white/10 py-4 flex flex-col gap-4 lg:hidden"
            aria-label="Mobile navigation"
          >
            <div className="flex flex-col gap-1">
              <div>
                <button
                  type="button"
                  onClick={() => setIsSolutionsOpen((prev) => !prev)}
                  className="flex w-full items-center justify-between py-2 text-sm font-medium tracking-wider text-primary-text"
                >
                  SOLUTIONS
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${
                      isSolutionsOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isSolutionsOpen && (
                  <div className="ml-3 flex flex-col gap-1 border-l border-white/10 pl-3">
                    <Link
                      to="/solutions/individual"
                      className="py-1.5 text-sm text-secondary-text"
                      onClick={closeMobileMenu}
                    >
                      For Individuals
                    </Link>
                    <Link
                      to="/solutions/organization"
                      className="py-1.5 text-sm text-secondary-text"
                      onClick={closeMobileMenu}
                    >
                      For Organizations
                    </Link>
                  </div>
                )}
              </div>

              <Link
                to="/platform"
                className="py-2 text-sm font-medium tracking-wider text-primary-text"
                onClick={closeMobileMenu}
              >
                PLATFORM
              </Link>

              <Link
                to="/about"
                className="py-2 text-sm font-medium tracking-wider text-primary-text"
                onClick={closeMobileMenu}
              >
                ABOUT US
              </Link>

              <div>
                <button
                  type="button"
                  onClick={() => setIsResourcesOpen((prev) => !prev)}
                  className="flex w-full items-center justify-between py-2 text-sm font-medium tracking-wider text-primary-text"
                >
                  RESOURCES
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${
                      isResourcesOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isResourcesOpen && (
                  <div className="ml-3 flex flex-col gap-1 border-l border-white/10 pl-3">
                    <Link
                      to="/resources/blog"
                      className="py-1.5 text-sm text-secondary-text"
                      onClick={closeMobileMenu}
                    >
                      Blog
                    </Link>
                    <Link
                      to="/resources/docs"
                      className="py-1.5 text-sm text-secondary-text"
                      onClick={closeMobileMenu}
                    >
                      Documentation
                    </Link>
                    <Link
                      to="/resources/support"
                      className="py-1.5 text-sm text-secondary-text"
                      onClick={closeMobileMenu}
                    >
                      Support
                    </Link>
                  </div>
                )}
              </div>

              <Link
                to="/pricing"
                className="py-2 text-sm font-medium tracking-wider text-primary-text"
                onClick={closeMobileMenu}
              >
                PRICING
              </Link>
            </div>

            <a
              href="https://www.farsystems.ai"
              className="text-primary-brand text-sm font-medium tracking-wider hover:opacity-80 transition-opacity"
            >
              www.farsystems.ai
            </a>

            <div className="flex flex-col gap-3">
              <Link to="/login" onClick={closeMobileMenu}>
                <PrimaryButton
                  variant="outline"
                  className="w-full border-secondary-brand text-primary-brand hover:text-white hover:bg-white/5"
                >
                  LOGIN
                </PrimaryButton>
              </Link>
              <Link to="/register" onClick={closeMobileMenu}>
                <PrimaryButton
                  variant="primary"
                  className="w-full text-[#000000]"
                >
                  GET STARTED
                </PrimaryButton>
              </Link>
            </div>
          </nav>
        )}
      </CommonWrapper>
    </header>
  );
};

export default Navbar;

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

  return (
    <header className="sticky top-0 z-40 bg-transparent text-primary-text border-none">
      <CommonWrapper className="">
        <div className="flex h-22 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="group flex items-center gap-3 no-underline">
            <img
              src={logo}
              alt="FAR SYSTEMS Logo"
              className="size-15 object-contain transition-transform duration-300 group-hover:scale-105"
            />
            <span className="leading-none flex flex-col justify-center">
              <span className="block text-2xl font-bold tracking-[0.1em] text-gradient">
                FAR SYSTEMS
                <sup className="ml-0.5 text-[10px] tracking-normal text-primary-brand">
                  TM
                </sup>
              </span>
              <span className="mt-1 block text-[10px] font-normal tracking-[0.2em] text-secondary-text uppercase leading-[15px]">
                Building Visibility Systems for Individuals and Organizations.
              </span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav
            className="hidden items-center gap-6 md:flex"
            aria-label="Main navigation"
          >
            {/* Navigation Links */}
            <div className="flex items-center gap-5">
              {/* Solutions Dropdown */}
              <div className="relative" ref={solutionsRef}>
                <button
                  type="button"
                  onClick={() => {
                    setIsSolutionsOpen((prev) => !prev);
                    setIsResourcesOpen(false);
                  }}
                  className="flex items-center gap-1 text-sm font-medium tracking-wider text-primary-text hover:text-primary-brand transition-colors"
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

              <Link
                to="/platform"
                className="text-sm font-medium tracking-wider text-primary-text hover:text-primary-brand transition-colors"
              >
                PLATFORM
              </Link>

              <Link
                to="/about"
                className="text-sm font-medium tracking-wider text-primary-text hover:text-primary-brand transition-colors"
              >
                ABOUT US
              </Link>

              {/* Resources Dropdown */}
              <div className="relative" ref={resourcesRef}>
                <button
                  type="button"
                  onClick={() => {
                    setIsResourcesOpen((prev) => !prev);
                    setIsSolutionsOpen(false);
                  }}
                  className="flex items-center gap-1 text-sm font-medium tracking-wider text-primary-text hover:text-primary-brand transition-colors"
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

              <Link
                to="/pricing"
                className="text-sm font-medium tracking-wider text-primary-text hover:text-primary-brand transition-colors"
              >
                PRICING
              </Link>
            </div>

            <div className="w-px h-6 bg-border" />

            <a
              href="https://www.farsystems.ai"
              className="text-primary-brand text-sm font-medium tracking-wider hover:opacity-80 transition-opacity"
            >
              www.farsystems.ai
            </a>

            <div className="flex items-center gap-4">
              <Link to="/login">
                <PrimaryButton variant="outline" size="lg">
                  LOGIN
                </PrimaryButton>
              </Link>
              <Link to="/register">
                <PrimaryButton variant="primary" size="lg" className="text-black!">
                  GET STARTED
                </PrimaryButton>
              </Link>
            </div>
          </nav>

          {/* Hamburger Button (same as before) */}
          <button
            type="button"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            onClick={() => setIsMenuOpen((open) => !open)}
            className="border-0 bg-transparent p-2 text-white md:hidden"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu (same structure as before + navigation links) */}
        {isMenuOpen && (
          <nav
            className="border-t border-white/10 py-4 flex flex-col gap-4 md:hidden"
            aria-label="Mobile navigation"
          >
            {/* Navigation Links for Mobile */}
            <div className="flex flex-col gap-1 px-2">
              {/* Solutions */}
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

              {/* Resources */}
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
              className="text-primary-brand text-sm font-medium tracking-wider hover:opacity-80 transition-opacity px-2"
            >
              www.farsystems.ai
            </a>

            <div className="flex flex-col gap-3 px-2">
              <Link to="/login" onClick={closeMobileMenu}>
                <PrimaryButton
                  variant="outline"
                  className="w-full border-secondary-brand text-primary-brand hover:text-white hover:bg-white/5"
                >
                  LOGIN
                </PrimaryButton>
              </Link>
              <Link to="/register" onClick={closeMobileMenu}>
                <PrimaryButton variant="primary" className="w-full text-[#000000]">
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
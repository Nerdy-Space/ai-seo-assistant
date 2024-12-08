"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { FiMenu, FiX, FiChevronDown } from "react-icons/fi";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const menuRef = useRef<HTMLDivElement | null>(null); // For mobile menu
  const dropdownRef = useRef<HTMLDivElement | null>(null); // For dropdown menu

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="py-6 px-10 bg-[#f4fafd] ">
      <div className="max-w-[1440px] flex items-center justify-between mx-auto">
        <Link href="/" className="text-3xl font-bold">
          AI Assistant
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-x-4">
          <Link href="/">Home</Link>
          <div className="relative" ref={dropdownRef}>
            <button className="flex items-center gap-x-2 focus:outline-none" onClick={toggleDropdown}>
              Tools <FiChevronDown />
            </button>
            {isDropdownOpen && (
              <div className="absolute top-full mt-2 bg-white shadow-md rounded-lg py-2 w-48 z-[100]">
                <Link href="/ab-testing" className="block px-4 py-2 hover:bg-gray-100">A/B Testing</Link>
                <Link href="/open-graph-generator" className="block px-4 py-2 hover:bg-gray-100">OG Generator</Link>
                <Link href="/google-index-checker" className="block px-4 py-2 hover:bg-gray-100">Google Index Checker</Link>
                <Link href="/single-article" className="block px-4 py-2 hover:bg-gray-100">AI Article</Link>
                <Link href="/serp" className="block px-4 py-2 hover:bg-gray-100">SERP</Link>
                <Link href="/google-rank-checker" className="block px-4 py-2 hover:bg-gray-100">Google Rank Checker</Link>
              </div>
            )}
          </div>

          {/* Display sign-in or sign-out button */}
          <SignedOut>
            <SignInButton>
              <button className="px-4 py-2 bg-blue-500 text-white rounded">Sign In</button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="focus:outline-none z-[100]">
            {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-70 flex flex-col items-center space-y-6 pt-20 text-white md:hidden z-[1000]" ref={menuRef}>
            <Link href="/" onClick={() => setIsMenuOpen(false)}>Home</Link>
            <button className="flex items-center gap-x-2 focus:outline-none" onClick={toggleDropdown}>
              Tools <FiChevronDown />
            </button>
            {isDropdownOpen && (
              <div className="flex flex-col space-y-4 text-center">
                <Link href="/ab-testing" onClick={() => setIsMenuOpen(false)}>A/B Testing</Link>
                <Link href="/open-graph-generator" onClick={() => setIsMenuOpen(false)}>OG Generator</Link>
                <Link href="/google-index-checker" onClick={() => setIsMenuOpen(false)}>Google Index Checker</Link>
                <Link href="/serp" onClick={() => setIsMenuOpen(false)}>SERP</Link>
                <Link href="/google-rank-checker" onClick={() => setIsMenuOpen(false)}>Google Rank Checker</Link>
                <Link href="/single-article" onClick={() => setIsMenuOpen(false)}>AI Article</Link>
              </div>
            )}

            {/* Sign In Button for Mobile */}
            <SignedOut>
              <SignInButton>
                <button className="px-4 py-2 bg-blue-500 text-white rounded">Sign In</button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;

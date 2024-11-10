import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="container mx-auto px-4 py-6 flex items-center justify-between">
      <div className="text-2xl font-bold">Logo</div>
      <div className="hidden md:flex space-x-6">
        <Link href="/" legacyBehavior passHref className="hover:text-blue-300">
          A/B Testing
        </Link>
        <Link
          href="/open-graph-generator"
          legacyBehavior
          passHref
          className="hover:text-blue-300"
        >
          OG Generator
        </Link>
        <Link
          href="/google-index-checker"
          legacyBehavior
          passHref
          className="hover:text-blue-300"
        >
          Google Index Checker
        </Link>
      </div>
      <div className="flex space-x-4">
        <Button
          variant="outline"
          className="bg-white text-blue-900 hover:bg-blue-100"
        >
          Login
        </Button>
        <Button className="bg-white text-blue-900 hover:bg-blue-100">
          Get Started
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;

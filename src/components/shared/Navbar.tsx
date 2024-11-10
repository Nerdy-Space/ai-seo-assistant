import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { auth } from "@/app/auth";
import Image from "next/image";
import Logout from "@/components/auth/Logout";
import Login from "../auth/Login";

const Navbar = async () => {
  const session = await auth();

  return (
    <nav className="container mx-auto px-4 py-6 flex items-center justify-between">
      <div className="text-2xl font-bold">
        <Link href="/" legacyBehavior passHref>
          Logo
        </Link>
      </div>
      <div className="hidden md:flex space-x-6">
        <Link
          href="/ab-testing"
          legacyBehavior
          passHref
          className="hover:text-blue-300 transition-colors"
        >
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

      {session?.user ? (
        <>
          <div className="flex items-center gap-3">
            <h2>{`${session?.user?.name}`}</h2>
            <Image
              className="rounded-xl"
              src={session?.user?.image || ""}
              alt={session?.user?.name || ""}
              width={72}
              height={72}
            />
            <Logout />
          </div>
        </>
      ) : (
        <div className="flex space-x-4">
          <Login />
          <Button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white transition-colors">
            Get Started
          </Button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

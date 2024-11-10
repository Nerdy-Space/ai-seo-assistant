import React from 'react';
import { Button } from "@/components/ui/button"
import Link from 'next/link';

const Navbar = () => {
    return (
        // <div className="flex items-center justify-center py-4 px-10 bg-gray-200 gap-x-6">
        //     <Link href="/" legacyBehavior passHref>
        //         A/B Testing
        //     </Link>
        //     <Link href="/open-graph-generator" legacyBehavior passHref>
        //         OG Generator
        //     </Link>
        //     <Link href="/google-index-checker" legacyBehavior passHref>
        //         Google Index Checker
        //     </Link>
        // </div>
        <nav className="container mx-auto px-4 py-6 flex items-center justify-between">
        <div className="text-2xl font-bold">Logo</div>
        <div className="hidden md:flex space-x-6">
          <Link href="#" className="hover:text-blue-300">SEO Tool 1</Link>
          <Link href="#" className="hover:text-blue-300">SEO Tool 2</Link>
          <Link href="#" className="hover:text-blue-300">SEO Tool 3</Link>
        </div>
        <div className="flex space-x-4">
          <Button variant="outline" className="bg-white text-blue-900 hover:bg-blue-100">Login</Button>
          <Button className="bg-white text-blue-900 hover:bg-blue-100">Get Started</Button>
        </div>
      </nav>
    );
};

export default Navbar;
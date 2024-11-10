import React from 'react';
import Link from 'next/link';

const Navbar = () => {
    return (
        <div className="flex items-center justify-center py-4 px-10 bg-gray-200 gap-x-6">
            <Link href="/" legacyBehavior passHref>
                A/B Testing
            </Link>
            <Link href="/open-graph-generator" legacyBehavior passHref>
                OG Generator
            </Link>
            <Link href="/google-index-checker" legacyBehavior passHref>
                Google Index Checker
            </Link>
        </div>
    );
};

export default Navbar;
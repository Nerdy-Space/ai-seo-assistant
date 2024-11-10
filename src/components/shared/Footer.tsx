import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-blue-800 py-8">
      <div className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <h3 className="font-bold mb-4">Company</h3>
          <ul className="space-y-2">
            <li>
              <Link href="#" className="hover:text-blue-300">
                About Us
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-blue-300">
                Careers
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-blue-300">
                Contact
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold mb-4">Products</h3>
          <ul className="space-y-2">
            <li>
              <Link href="#" className="hover:text-blue-300">
                SEO Tool 1
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-blue-300">
                SEO Tool 2
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-blue-300">
                SEO Tool 3
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold mb-4">Resources</h3>
          <ul className="space-y-2">
            <li>
              <Link href="#" className="hover:text-blue-300">
                Blog
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-blue-300">
                Guides
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-blue-300">
                Webinars
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold mb-4">Legal</h3>
          <ul className="space-y-2">
            <li>
              <Link href="#" className="hover:text-blue-300">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-blue-300">
                Terms of Service
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-blue-300">
                Cookie Policy
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

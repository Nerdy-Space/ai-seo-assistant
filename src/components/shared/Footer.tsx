import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-t from-gray-900 to-transparent py-8">
      <div className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <h3 className="font-bold mb-4 text-blue-300">Company</h3>
          <ul className="space-y-2">
            <li>
              <Link
                href="#"
                className="text-blue-100 hover:text-blue-300 transition-colors"
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="text-blue-100 hover:text-blue-300 transition-colors"
              >
                Careers
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="text-blue-100 hover:text-blue-300 transition-colors"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold mb-4 text-blue-300">Products</h3>
          <ul className="space-y-2">
            <li>
              <Link
                href="/ab-testing"
                legacyBehavior
                passHref
                className="hover:text-blue-300 transition-colors"
              >
                A/B Testing
              </Link>
            </li>
            <li>
              <Link
                href="/open-graph-generator"
                legacyBehavior
                passHref
                className="hover:text-blue-300"
              >
                OG Generator
              </Link>
            </li>
            <li>
              <Link
                href="/google-index-checker"
                legacyBehavior
                passHref
                className="hover:text-blue-300"
              >
                Google Index Checker
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold mb-4 text-blue-300">Resources</h3>
          <ul className="space-y-2">
            <li>
              <Link
                href="#"
                className="text-blue-100 hover:text-blue-300 transition-colors"
              >
                Blog
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="text-blue-100 hover:text-blue-300 transition-colors"
              >
                Guides
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="text-blue-100 hover:text-blue-300 transition-colors"
              >
                Webinars
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold mb-4 text-blue-300">Legal</h3>
          <ul className="space-y-2">
            <li>
              <Link
                href="#"
                className="text-blue-100 hover:text-blue-300 transition-colors"
              >
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="text-blue-100 hover:text-blue-300 transition-colors"
              >
                Terms of Service
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="text-blue-100 hover:text-blue-300 transition-colors"
              >
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

"use client";
import React from 'react';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-[#f4fafd] py-10 mt-16">
            <div className="max-w-[1440px] mx-auto px-4 md:px-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* About Section */}
                    <div className="flex flex-col items-start">
                        <h3 className="text-xl font-semibold text-[#1F2937] mb-4">AI SEO Assistant</h3>
                        <p className="text-sm text-[#6B7280]">
                            Your go-to tool for optimizing your website&apos;s SEO with advanced AI insights and recommendations.
                        </p>
                    </div>

                    {/* Links Section */}
                    <div className="flex flex-col items-start">
                        <h3 className="text-xl font-semibold text-[#1F2937] mb-4">Quick Links</h3>
                        <ul className="space-y-2 text-sm text-[#6B7280]">
                            <li><a href="/about" className="hover:text-[#3B82F6]">About Us</a></li>
                            <li><a href="/features" className="hover:text-[#3B82F6]">Features</a></li>
                            <li><a href="/pricing" className="hover:text-[#3B82F6]">Pricing</a></li>
                            <li><a href="/contact" className="hover:text-[#3B82F6]">Contact</a></li>
                            <li><a href="/faq" className="hover:text-[#3B82F6]">FAQ</a></li>
                        </ul>
                    </div>

                    {/* Social Media Section */}
                    <div className="flex flex-col items-start">
                        <h3 className="text-xl font-semibold text-[#1F2937] mb-4">Follow Us</h3>
                        <div className="flex space-x-4">
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-[#3B82F6] hover:text-[#1F2937]">
                                <FaFacebookF size={20} />
                            </a>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-[#3B82F6] hover:text-[#1F2937]">
                                <FaTwitter size={20} />
                            </a>
                            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-[#3B82F6] hover:text-[#1F2937]">
                                <FaLinkedinIn size={20} />
                            </a>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-[#3B82F6] hover:text-[#1F2937]">
                                <FaInstagram size={20} />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Copyright Section */}
                <div className="mt-10 border-t border-[#E5E7EB] pt-4 text-center text-sm text-[#6B7280]">
                    <p>&copy; {new Date().getFullYear()} AI SEO Assistant. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

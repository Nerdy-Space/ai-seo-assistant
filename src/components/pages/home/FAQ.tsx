"use client";
import React, { useState } from 'react';

// Define the structure of FAQ data
const FAQ = () => {
    const faqs = [
        { question: "What is the AI SEO Assistant?", answer: "The AI SEO Assistant is a tool designed to help optimize your website's SEO by providing automated insights and recommendations." },
        { question: "How do I start a free trial?", answer: "Click the 'Start Your Free Trial' button on the homepage to sign up. No credit card is required." },
        { question: "Can I cancel anytime?", answer: "Yes, you can cancel your subscription at any time from your account settings." },
    ];
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="max-w-[1340px] mx-auto mt-14 px-6 md:px-10 rounded-lg shadow-xl">
            <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
                <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_600px_at_50%_200px,#C9EBFF,transparent)] opacity-90"></div>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-center text-[#F5A622] mb-8">Frequently Asked Questions</h2>
            <div className="space-y-4">
                {faqs.map((faq, index) => (
                    <div key={index} className="border-b border-[#E5E7EB] pb-4">
                        <button
                            onClick={() => toggleFAQ(index)}
                            className="w-full text-left flex justify-between items-center text-lg font-semibold text-[#1F2937] focus:outline-none"
                        >
                            {faq.question}
                            <span className="text-[#3B82F6] text-xl">
                                {openIndex === index ? '-' : '+'}
                            </span>
                        </button>
                        <div
                            className={`overflow-hidden transition-all duration-300 ${openIndex === index ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}
                        >
                            <p className="mt-2 text-sm text-[#6B7280]">
                                {faq.answer}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FAQ;

"use client";
import React from 'react';

const Banner = () => {
    return (
        <div className="max-w-[1440px] mx-auto pt-20 pb-16 px-4 md:px-10">
            {/* Grid Background with Radial Gradient */}
            <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
                <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_600px_at_50%_200px,#C9EBFF,transparent)] opacity-90"></div>
            </div>

            <div className='flex flex-col items-center text-center'>
                {/* Header with slight shadow */}
                <h2 className="text-3xl md:text-5xl font-extrabold text-[#1F2937] mb-3 drop-shadow-md z-[-1]">
                    AI SEO Assistant
                </h2>
                <h2 className="text-3xl md:text-5xl font-extrabold text-[#1F2937] mb-6 drop-shadow-md z-[-1]">
                    The Only Tool You&apos;ll Need
                </h2>

                {/* Subheading Text */}
                <p className="text-base md:text-lg font-medium text-[#2D3748] mt-2 mb-8 leading-relaxed max-w-2xl">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempora, similique dicta modi placeat deserunt dolorem labore quod et earum quae.
                </p>

                <button className="bg-[#3B82F6] text-white text-sm md:text-base py-3 px-8 rounded-full shadow-md transition duration-300 transform hover:bg-[#2563EB] hover:shadow-lg hover:scale-105 mb-4">
                    Try Now
                </button>

                {/* Small CTA Note */}
                <p className="text-xs md:text-sm text-gray-500">No credit card required • Instant access</p>
            </div>
        </div>
    );
};

export default Banner;

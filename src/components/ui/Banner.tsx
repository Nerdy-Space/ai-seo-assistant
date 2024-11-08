"use client";
import React from 'react';

type BannerProps = {
    header: string;
    desc: string;
};

const Banner: React.FC<BannerProps> = ({ header, desc }) => {
    return (
        <div>
            <h2 className="text-3xl font-bold text-blue-950">{header}</h2>
            <p className="text-lg mt-2 mb-4">{desc}</p>            
        </div>
    );
};

export default Banner;

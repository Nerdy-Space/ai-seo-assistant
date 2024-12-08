import React from 'react';

// Define the structure of the `data` prop using TypeScript
type ToolData = {
    name: string;
    description: string;
    icon: JSX.Element;
    link: string;
};

const ToolCard: React.FC<{ data: ToolData }> = ({ data: { name, description, icon, link } }) => {
    return (
        <div className="w-full p-6 bg-white shadow-lg rounded-lg flex flex-col items-center border border-[#E5E7EB] hover:shadow-2xl transition-shadow">
            <div className="mb-4 text-[#3B82F6]">{icon}</div>
            <h3 className="text-xl font-semibold text-[#1F2937] mb-3 text-center">{name}</h3>
            <p className="text-sm text-[#6B7280] mb-6 text-center">{description}</p>
            <a href={link} className="text-sm font-semibold text-[#3B82F6] hover:underline">
                Start Trial
            </a>
        </div>
    );
};

export default ToolCard;

import React from 'react';
import ToolCard from './ToolCard';
import { AiOutlineExperiment, AiOutlineSearch, AiOutlineCheckCircle, AiOutlineProfile } from 'react-icons/ai';
import { MdContentPaste, MdTitle } from 'react-icons/md';
import { FaFileAlt } from 'react-icons/fa';

const Tools = () => {
    const datas = [
        {
            id: 1,
            name: 'A/B Testing',
            icon: <AiOutlineExperiment size={32} className="text-blue-500" />,
            description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolore amet ab, assumenda numquam deleniti temporibus iure vel esse, aspernatur blanditiis voluptatum pariatur delectus doloribus facilis quisquam totam eum illo atque.',
            link: '/ab-testing'
        },
        {
            id: 2,
            name: 'Google Index Checker',
            icon: <AiOutlineSearch size={32} className="text-green-500" />,
            description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolore amet ab, assumenda numquam deleniti temporibus iure vel esse, aspernatur blanditiis voluptatum pariatur delectus doloribus facilis quisquam totam eum illo atque.',
            link: '/google-index-checker'
        },
        {
            id: 3,
            name: 'Google Rank Checker',
            icon: <AiOutlineCheckCircle size={32} className="text-yellow-500" />,
            description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolore amet ab, assumenda numquam deleniti temporibus iure vel esse, aspernatur blanditiis voluptatum pariatur delectus doloribus facilis quisquam totam eum illo atque.',
            link: '/google-rank-checker'
        },
        {
            id: 4,
            name: 'Open Graph Generator',
            icon: <AiOutlineProfile size={32} className="text-purple-500" />,
            description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolore amet ab, assumenda numquam deleniti temporibus iure vel esse, aspernatur blanditiis voluptatum pariatur delectus doloribus facilis quisquam totam eum illo atque.',
            link: '/open-graph-generator'
        },
        {
            id: 5,
            name: 'SERP',
            icon: <AiOutlineSearch size={32} className="text-red-500" />,
            description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolore amet ab, assumenda numquam deleniti temporibus iure vel esse, aspernatur blanditiis voluptatum pariatur delectus doloribus facilis quisquam totam eum illo atque.',
            link: '/serp'
        },
        {
            id: 6,
            name: 'AI Content Writer',
            icon: <MdContentPaste size={32} className="text-blue-500" />,
            description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolore amet ab, assumenda numquam deleniti temporibus iure vel esse, aspernatur blanditiis voluptatum pariatur delectus doloribus facilis quisquam totam eum illo atque.',
            link: '/ai-content-writer'
        },
        {
            id: 7,
            name: 'Write Single Article',
            icon: <FaFileAlt size={32} className="text-indigo-500" />,
            description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolore amet ab, assumenda numquam deleniti temporibus iure vel esse, aspernatur blanditiis voluptatum pariatur delectus doloribus facilis quisquam totam eum illo atque.',
            link: '/write-article'
        },
        {
            id: 8,
            name: 'Custom Post Title Pattern',
            icon: <MdTitle size={32} className="text-teal-500" />,
            description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolore amet ab, assumenda numquam deleniti temporibus iure vel esse, aspernatur blanditiis voluptatum pariatur delectus doloribus facilis quisquam totam eum illo atque.',
            link: '/custom-post-title'
        },
        {
            id: 9,
            name: 'Optimized AI Title Generation',
            icon: <MdTitle size={32} className="text-orange-500" />,
            description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolore amet ab, assumenda numquam deleniti temporibus iure vel esse, aspernatur blanditiis voluptatum pariatur delectus doloribus facilis quisquam totam eum illo atque.',
            link: '/ai-title-generation'
        },
        {
            id: 10,
            name: 'SEO Optimized AI Articles',
            icon: <FaFileAlt size={32} className="text-blue-500" />,
            description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolore amet ab, assumenda numquam deleniti temporibus iure vel esse, aspernatur blanditiis voluptatum pariatur delectus doloribus facilis quisquam totam eum illo atque.',
            link: '/seo-articles'
        },
    ];

    return (
        <div className="max-w-[1440px] mx-auto mt-10 px-4 md:px-10">
            <div className='grid md:grid-cols-3 gap-4 grid-cols-1'>
                {datas.map((tool) => (
                    <ToolCard key={tool.id} data={tool} />
                ))}
            </div>
        </div>
    );
};

export default Tools;

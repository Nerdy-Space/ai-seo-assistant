import GraphGenerator from '@/components/pages/ogGenerator/Generate';
import React from 'react';
import { auth } from '../auth';
import { redirect } from 'next/navigation';

const OpenGraphGenerator = async() => {
    const session = await auth();

    if (!session?.user) redirect("/");
    return (
        <div>
            <GraphGenerator/>
        </div>
    );
};

export default OpenGraphGenerator;
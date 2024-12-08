import Sidebar from '@/components/pages/dashboard/Sidebar';
import DashboardHome from '@/components/pages/dashboard/ToolUsage';
import React from 'react';

const Dashboard = () => {
    return (
        <div className="flex">
            {/* <Sidebar /> */}
            <main className="flex-grow">
                <DashboardHome />
            </main>
        </div>

    );
};

export default Dashboard;
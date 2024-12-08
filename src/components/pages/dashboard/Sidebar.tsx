"use client";

const Sidebar = () => {
    return (
        <div className="h-screen w-64 bg-blue-50 shadow-lg flex flex-col">
            <div className="p-6 border-b border-blue-100">
                <h1 className="text-2xl font-bold text-blue-700">Dashboard</h1>
            </div>
            <nav className="flex-grow p-4">
                <ul className="space-y-4">
                    <li>
                        <a href="/dashboard" className="text-blue-700 font-medium hover:text-blue-500">
                            Home
                        </a>
                    </li>
                    <li>
                        <a href="/dashboard/ab-testing" className="text-blue-700 font-medium hover:text-blue-500">
                            A/B Testing
                        </a>
                    </li>
                    <li>
                        <a href="/dashboard/google-index-checker" className="text-blue-700 font-medium hover:text-blue-500">
                            Google Index Checker
                        </a>
                    </li>
                    <li>
                        <a href="/dashboard/google-rank-checker" className="text-blue-700 font-medium hover:text-blue-500">
                            Google Rank Checker
                        </a>
                    </li>
                </ul>
            </nav>
            <div className="p-4 border-t border-blue-100">
                <a href="/logout" className="text-red-500 font-medium hover:text-red-400">
                    Logout
                </a>
            </div>
        </div>
    );
};

export default Sidebar;

"use client"

// import { useEffect, useState } from "react"
// // import Cookies from "js-cookie"
// import { Activity, Globe, Search, FileSearch, Bot, BarChart } from 'lucide-react'

// // Map tools to their respective icons
// const toolIcons = {
//     "AB Testing": Activity,
//     "Google Index Checker": Globe,
//     "Google Rank Checker": Search,
//     "OG Tag Generator": FileSearch,
//     "AI Article": Bot,
//     "SERP": BarChart,
// }

export default function DashboardHome() {
    // const [toolUsage, setToolUsage] = useState<{ [key: string]: number }>({})
    // const [totalUses, setTotalUses] = useState(0)

    // useEffect(() => {
    //     const tools = [
    //         "AB Testing",
    //         "Google Index Checker",
    //         "Google Rank Checker",
    //         "OG Tag Generator",
    //         "AI Article",
    //         "SERP",
    //     ]

    //     const usageData: { [key: string]: number } = {}
    //     let total = 0

        // tools.forEach((tool) => {
        //     const toolCount = Cookies.get(tool) ? parseInt(Cookies.get(tool)!, 10) : 0
        //     usageData[tool] = toolCount
        //     total += toolCount
        // })

        // setToolUsage(usageData)
        // setTotalUses(total)
    // }, [])

    return (
        <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900">Tool Usage</h2>
                <p className="mt-2 text-sm text-gray-600">
                    Total uses across all tools: 0
                </p>
            </div>
            {/* <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {Object.entries(toolUsage).map(([tool, count]) => {
                    const IconComponent = toolIcons[tool as keyof typeof toolIcons]
                    const percentage = ((count / Math.max(totalUses, 1)) * 100).toFixed(1)
                    return (
                        <div key={tool} className="bg-white rounded-lg shadow-md overflow-hidden transition-all hover:shadow-lg">
                            <div className="px-6 py-4 flex items-center justify-between border-b border-gray-200">
                                <h3 className="text-lg font-semibold text-gray-900">{tool}</h3>
                                <IconComponent className="h-6 w-6 text-gray-400" />
                            </div>
                            <div className="px-6 py-4">
                                <div className="text-3xl font-bold text-gray-900">{count}</div>
                                <p className="text-sm text-gray-600">
                                    {percentage}% of total usage
                                </p>
                                <div className="mt-4 h-2 w-full bg-gray-200 rounded-full">
                                    <div
                                        className="h-2 rounded-full bg-blue-500 transition-all"
                                        style={{ width: `${percentage}%` }}
                                    />
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div> */}
        </div>
    )
}


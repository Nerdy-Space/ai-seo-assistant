"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

const Checker = () => {
    const { isSignedIn } = useUser();
    const router = useRouter();

    useEffect(() => {
        if (!isSignedIn) {
            router.push("/"); // Redirect to the home or sign-in page
        }
    }, [isSignedIn, router]);

    const [url, setUrl] = useState("");
    const [results, setResults] = useState(null);

    const handleSearch = async (url: string) => {
        try {
            const response = await axios.post(
                "https://google.serper.dev/search",
                { q: url },
                {
                    headers: {
                        "Content-Type": "application/json",
                        "X-API-KEY": "02262635a723f488eb69ebcd461e62902067fc97",
                    },
                }
            );
            setResults(response.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const handleCheckIndex = async () => {
        if (url) {
            handleSearch(url);
        }
    };

    return (
        <div className="max-w-[1440px] mx-auto px-4 pt-10 pb-16">
            <div className="relative p-6 bg-white shadow-md rounded-lg">
                {/* Grid Background with Radial Gradient */}
                <div className="absolute inset-0 -z-10 h-full w-full bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
                    <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_600px_at_50%_200px,#C9EBFF,transparent)] opacity-90"></div>
                </div>

                <h2 className="text-3xl font-bold text-[#1F2937] mb-6 text-center drop-shadow-md">
                    Google Rank Checker
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                    <div className="p-4 bg-gray-100 rounded-lg shadow-sm">
                        <h3 className="text-lg font-semibold mb-2">Enter URL</h3>
                        <div className="space-y-4">
                            <div>
                                <Input
                                    value={url}
                                    onChange={(e) => setUrl(e.target.value)}
                                    placeholder="Enter page URL"
                                    className="w-full"
                                />
                            </div>
                            <Button
                                onClick={handleCheckIndex}
                                className="w-full bg-[#3B82F6] text-white hover:bg-[#2563EB]"
                            >
                                Check Rank
                            </Button>
                        </div>
                    </div>
                </div>

                {results && (
                    <div className="mt-10 bg-gray-50 p-6 rounded-lg shadow-inner">
                        <h4 className="font-medium text-gray-800 mb-4">Search Result</h4>
                        <p className="text-gray-700 mb-2">
                            {/* Status: {results?.status || "No data"} */}
                        </p>
                        <p className="text-gray-700">
                            {/* Position: {results?.position || "N/A"} */}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Checker;

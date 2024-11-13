"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";

const Checker = () => {
    const [url, setUrl] = useState("");
    const [results, setResults] = useState(null);

    const handleSearch = async (url: string) => {
        try {
            const response = await axios.post(
                "https://google.serper.dev/search",
                {
                    q: url,
                    // engine: 'google'
                },
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

    console.log(results)

    const handleCheckIndex = async () => {
        if (url) {
            handleSearch(url);
        }
    };

    return (
        <div className="flex gap-x-4 p-4 max-w-[1440px] mx-auto pt-10">
            <div className="md:w-[60vw]">
                <h2 className="font-semibold text-xl mb-4">Google Rank Checker</h2>
                <div className="mb-4">
                    <label className="block">Enter URL</label>
                    <Input
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        placeholder="Enter page URL"
                    />
                </div>
                <Button onClick={handleCheckIndex}>Check Rank</Button>
            </div>
            <div className="md:w-[40vw]">
                <h2 className="font-semibold text-xl mb-4">Search Result</h2>
                {/* {status && (
                    <div>
                        <Button className={status === "Indexed" ? "bg-green-500" : "bg-red-500"}>{status}</Button>
                    </div>
                )} */}
            </div>
        </div>
    );
};

export default Checker;

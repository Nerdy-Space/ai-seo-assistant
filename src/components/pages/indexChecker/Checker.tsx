"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";

const IndexChecker = () => {
    const [url, setUrl] = useState("");
    const [status, setStatus] = useState<string | null>(null);

    const checkGoogleIndex = async (url: string) => {
        const googleAPIKey = process.env.GOOGLE_API_KEY; // Store API Key in environment variables
        const cseID = process.env.GOOGLE_CLIENT_ID; 
        try {
            const response = await axios.get('https://www.googleapis.com/customsearch/v1', {
                params: {
                    key: googleAPIKey,
                    cx: cseID,
                    q: url, // Search for the URL
                },
            });
            console.log(response)
            if (response.status === 200) {
                if (response.data.includes("did not match any documents")) {
                    setStatus("Not Indexed");
                } else {
                    setStatus("Indexed");
                }
            }
        } catch (error) {
            console.error("Error checking index status:", error);
            setStatus("Could not fetch index status.");
        }
    };

    const handleCheckIndex = async () => {
        if (url) {
            checkGoogleIndex(url);
        }
    };

    return (
        <div className="flex gap-x-4 p-4 max-w-[1440px] mx-auto">
            <div className="w-[50%]">
                <h2 className="font-semibold text-xl mb-4">Google Index Checker</h2>
                <div className="mb-4">
                    <label className="block">Enter URL</label>
                    <Input
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        placeholder="Enter page URL"
                    />
                </div>
                <Button onClick={handleCheckIndex}>Check Index Status</Button>
            </div>
            <div className="w-[50%]">
                <h2 className="font-semibold text-xl mb-4">Index Status</h2>
                {status && (
                    <div>
                        <Textarea value={status} readOnly rows={6} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default IndexChecker;

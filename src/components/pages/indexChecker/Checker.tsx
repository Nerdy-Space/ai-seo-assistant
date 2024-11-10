"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
import axios from "axios";

const Checker = () => {
    const [url, setUrl] = useState("");
    const [status, setStatus] = useState<string | null>(null);

    const checkGoogleIndex = async (url: string) => {
        // const googleAPIKey = process.env.GOOGLE_API_KEY; // Store API Key in environment variables
        // const cseID = process.env.GOOGLE_CLIENT_ID; 
        try {
            const response = await axios.get('https://www.googleapis.com/customsearch/v1', {
                params: {
                    key: "AIzaSyDL-_hcJVgTr882tQyzol37O8rVASB3Di8",
                    cx: "614710ddc97744721",
                    q: url, // Search for the URL
                },
            });
            console.log(response)
            if (response.status === 200) {
                if (Number(response.data.searchInformation.totalResults) < 1) {
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
        <div className="flex gap-x-4 p-4 container mx-auto min-h-screen">
            <div className="md:w-[60vw]">
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
            <div className="md:w-[40vw]">
                <h2 className="font-semibold text-xl mb-4">Index Status</h2>
                {status && (
                    <div>
                        <Button className={status === "Indexed" ? "bg-green-500" : "bg-red-500"}>{status}</Button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Checker;

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
            router.push("/"); // Redirect to the home or sign-in page if not signed in
        }
    }, [isSignedIn, router]);

    const [url, setUrl] = useState("");
    const [status, setStatus] = useState<string | null>(null);

    const checkGoogleIndex = async (url: string) => {
        try {
            const response = await axios.get("https://www.googleapis.com/customsearch/v1", {
                params: {
                    key: "AIzaSyDL-_hcJVgTr882tQyzol37O8rVASB3Di8",
                    cx: "614710ddc97744721",
                    q: url,
                },
            });

            if (response.status === 200) {
                setStatus(
                    Number(response.data.searchInformation.totalResults) < 1
                        ? "Not Indexed"
                        : "Indexed"
                );
            }
        } catch (error) {
            console.error("Error checking index status:", error);
            setStatus("Could not fetch index status.");
        }
    };

    const handleCheckIndex = () => {
        if (url) {
            checkGoogleIndex(url);
        }
    };

    return (
        <div className="flex flex-col items-center p-6 max-w-4xl mx-auto">
            <div className="w-full mb-6">
                <h2 className="text-2xl font-semibold mb-4 text-center">Google Index Checker</h2>
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                    <Input
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        placeholder="Enter page URL"
                        className="flex-1"
                    />
                    <Button onClick={handleCheckIndex} className="bg-[#3B82F6] text-white hover:bg-[#2563EB]">Check Index</Button>
                </div>
            </div>
            <div className="w-full text-center">
                <h3 className="text-xl font-semibold mb-4">Index Status</h3>
                {status && (
                    <div>
                        <Button
                            className={`px-6 py-2 font-medium ${status === "Indexed" ? "bg-green-500" : "bg-red-500"
                                }`}
                        >
                            {status}
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Checker;

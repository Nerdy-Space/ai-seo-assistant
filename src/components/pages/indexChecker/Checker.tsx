"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import ReactConfetti from "react-confetti";


const Checker = () => {
    const { isLoaded, isSignedIn } = useUser();
    const router = useRouter();

    useEffect(() => {
        if (!isLoaded) return; // Wait until the user state is loaded
        if (!isSignedIn) {
            router.push("/"); // Redirect to sign-in if not signed in
        }
    }, [isLoaded, isSignedIn, router]);

    const [url, setUrl] = useState("");
    const [status, setStatus] = useState<string | null>(null);
    const [showConfetti, setShowConfetti] = useState(false);

    const checkGoogleIndex = async (url: string) => {
        const count = parseInt(Cookies.get("Google Index Checker") || "0", 10);
        Cookies.set("Google Index Checker", (count + 1).toString());
        try {
            const response = await axios.get("https://www.googleapis.com/customsearch/v1", {
                params: {
                    key: "AIzaSyDL-_hcJVgTr882tQyzol37O8rVASB3Di8",
                    cx: "614710ddc97744721",
                    q: url,
                },
            });

            if (response.status === 200) {
                const isIndexed = Number(response.data.searchInformation.totalResults) > 0;
                setStatus(isIndexed ? "Indexed" : "Not Indexed");
                showResultPopup(isIndexed);
            }
        } catch (error) {
            console.error("Error checking index status:", error);
            setStatus("Could not fetch index status.");
            showErrorPopup();
        }
    };

    const showResultPopup = (isIndexed: boolean) => {
        if (isIndexed) {
            setShowConfetti(true);
            Swal.fire({
                title: "🎉 Congratulations!",
                text: "Your URL is indexed by Google!",
                icon: "success",
                confirmButtonText: "Great!",
                didClose: () => setShowConfetti(false),
            });
        } else {
            Swal.fire({
                title: "😢 Not Indexed",
                text: "Your URL is not indexed by Google yet.",
                icon: "error",
                confirmButtonText: "Try Again",
            });
        }
    };

    const showErrorPopup = () => {
        Swal.fire({
            title: "🚨 Error",
            text: "Could not fetch the index status. Please try again later.",
            icon: "warning",
            confirmButtonText: "Okay",
        });
    };

    const handleCheckIndex = () => {
        if (url) {
            checkGoogleIndex(url);
        }
    };

    if (!isLoaded || !isSignedIn) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="w-16 h-16 border-4 border-t-4 border-blue-500 rounded-full animate-spin"></div>
                <p className="ml-4 text-blue-500">Loading user session...</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center p-6 max-w-4xl mx-auto min-h-[80vh]">
            {showConfetti && <ReactConfetti />}
            <div className="w-full mb-6">
                <h2 className="text-2xl font-semibold mb-4 text-center">Google Index Checker</h2>
                <div className="flex flex-col justify-center items-center gap-4">
                    <Input
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        placeholder="Enter page URL"
                        className="flex-1 py-3"
                    />
                    <Button
                        onClick={handleCheckIndex}
                        className="bg-[#3B82F6] text-white hover:bg-[#2563EB]"
                    >
                        Check Index
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Checker;

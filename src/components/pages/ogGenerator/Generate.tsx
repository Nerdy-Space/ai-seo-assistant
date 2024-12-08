"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

const GraphGenerator = () => {
    const { isSignedIn } = useUser();
    const router = useRouter();
    useEffect(() => {
        // Redirect to the sign-in page if the user is not signed in
        if (!isSignedIn) {
            router.push("/");  // Replace "/sign-in" with your sign-in page route
        }
    }, [isSignedIn, router]);

    const [title, setTitle] = useState("");
    const [type, setType] = useState("");
    const [description, setDescription] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [url, setUrl] = useState("");
    const [ogTags, setOgTags] = useState("");

    // Initialize tag count on mount, only if it doesn't already exist
    useEffect(() => {
        const tagCount = parseInt(Cookies.get("OG Tag Generator") || "0", 10);
        Cookies.set("OG Tag Generator", tagCount.toString()); // Ensure no unnecessary increments happen on mount
    }, []);

    const generateTags = () => {
        // Get current count (no increase on initial mount)
        const tagCount = parseInt(Cookies.get("OG Tag Generator") || "0", 10);

        // Construct OG tags using form data
        const generatedTags = `
            <meta property="og:title" content="${title || 'Demo Title'}" />
            <meta property="og:type" content="${type || 'website'}" />
            <meta property="og:description" content="${description || 'This is a demo description.'}" />
            <meta property="og:image" content="${imageUrl || 'https://imagelink.come'}" />
            <meta property="og:url" content="${url || 'https://example.com'}" />
        `.replace(/^\s+/gm, "");

        setOgTags(generatedTags);

        // Optionally, increment tag count only on button click, if needed
        Cookies.set("OG Tag Generator", (tagCount + 1).toString());
    };

    const handleCopy = () => {
        if (ogTags) {
            navigator.clipboard.writeText(ogTags).then(
                () => alert("Copied to clipboard!"),
                (err) => alert("Failed to copy: " + err)
            );
        }
    };

    return (
        <div className="max-w-[1440px] mx-auto pt-10 px-4 md:px-10">
            <div className="relative p-6 bg-white shadow-md rounded-lg">
                {/* Grid Background with Radial Gradient */}
                <div className="absolute inset-0 -z-10 h-full w-full bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
                    <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_600px_at_50%_200px,#C9EBFF,transparent)] opacity-90"></div>
                </div>

                <h2 className="text-3xl font-bold text-[#1F2937] mb-6 text-center drop-shadow-md">
                    Open Graph Tag Generator
                </h2>

                <div className="flex flex-col md:flex-row gap-6">
                    {/* Input Section */}
                    <div className="md:w-[60vw]">
                        <h3 className="font-semibold text-xl mb-4">Generate Open Graph Tags</h3>

                        <div className="mb-4">
                            <label className="block text-gray-700">Title</label>
                            <Input
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Enter page title"
                                className="w-full"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700">Type</label>
                            <Input
                                value={type}
                                onChange={(e) => setType(e.target.value)}
                                placeholder="Enter page type"
                                className="w-full"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700">Description</label>
                            <Textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Enter page description"
                                className="w-full"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700">Image URL</label>
                            <Input
                                value={imageUrl}
                                onChange={(e) => setImageUrl(e.target.value)}
                                placeholder="Enter image URL"
                                className="w-full"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700">Page URL</label>
                            <Input
                                value={url}
                                onChange={(e) => setUrl(e.target.value)}
                                placeholder="Enter page URL"
                                className="w-full"
                            />
                        </div>

                        <Button
                            onClick={generateTags} // Trigger generateTags on click
                            className="w-full bg-[#3B82F6] text-white hover:bg-[#2563EB]"
                        >
                            Generate OG Tags
                        </Button>
                    </div>

                    {/* Preview Section */}
                    <div className="md:w-[40vw]">
                        <h3 className="font-semibold text-xl mb-4">Generated OG Tags</h3>
                        {ogTags && (
                            <div>
                                <h4 className="font-semibold mb-2">Code Preview</h4>
                                <pre className="p-4 bg-gray-100 border rounded overflow-x-auto">
                                    {ogTags}
                                </pre>
                                <Button
                                    onClick={handleCopy}
                                    className="mt-4 w-full bg-[#2563EB] text-white hover:bg-[#3B82F6]"
                                >
                                    Copy to Clipboard
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GraphGenerator;

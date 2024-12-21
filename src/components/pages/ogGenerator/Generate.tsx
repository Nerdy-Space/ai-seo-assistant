"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import Image from "next/image";

const GraphGenerator = () => {
    const { isLoaded, isSignedIn, user } = useUser();
      const router = useRouter();
  
      useEffect(() => {
          if (!isLoaded) return; // Wait until the user state is loaded
          if (!isSignedIn) {
              router.push("/"); // Redirect to sign-in if not signed in
          }
      }, [isLoaded, isSignedIn, router]);

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

    if (!isLoaded || !isSignedIn) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="w-16 h-16 border-4 border-t-4 border-blue-500 rounded-full animate-spin"></div>
                <p className="ml-4 text-blue-500">Loading user session...</p>
            </div>
        );
    }
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
                    <div className="md:w-[50vw]">
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
                    <div className="md:w-[50vw]">
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
             <div className="mt-6">
                    <h3 className="font-semibold text-lg mb-2">Result Preview</h3>
                    <p>See how your website will look on social media platforms. This live preview ensures your metadata aligns with your content and branding.</p>
                    {ogTags && 
                    <div className="border p-4 rounded shadow grid lg:md:grid-cols-4 gap-x-4 mt-4">
                        <div>
                            <h4 className="text-xl font-bold">Facebook</h4>
                            <div className="border-[1px] border-gray-300 mt-4 w-full">
                                <Image
                                    width={300}
                                    height={300}
                                    src={imageUrl || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQpZaeWxczipxrTdSIThz5hmwrRYhEeeAl5A&s'}
                                    alt="Preview Image"
                                    className="w-full h-auto object-cover"
                                />
                                <div className="p-4 bg-gray-100">
                                    <a href={url || "#"} className="text-gray-500 inline-block break-all uppercase text-[14px]">
                                        {url || "example.com"}
                                    </a>
                                    <p className="text-gray-600 font-semibold uppercase text-[18px]">{title.length > 23 ? title.substring(0, 23) + ' ...' : title || "Demo Title Demo Title Demo Title..."}</p>
                                    <p className="text-gray-500 text-[16px] uppercase">{description.length > 25 ? description.substring(0, 25) + '...' : description || "This is a demo description."}</p>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h4 className="text-xl font-bold">X (Twitter)</h4>
                            <div className=" mt-4 w-full relative">
                                <Image
                                    width={300}
                                    height={300}
                                    src={imageUrl || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQpZaeWxczipxrTdSIThz5hmwrRYhEeeAl5A&s'}
                                    alt="Preview Image"
                                    className="w-full h-auto object-cover rounded-lg relative"
                                />
                                <a href={url || "#"} className="text-[#fff] p-[4px] absolute bg-gray-400 inline-block break-all text-[11px] bottom-[4%] rounded-lg">
                                    {url || "example.com"}
                                </a>
                            </div>
                        </div>
                        <div>
                            <h4 className="text-xl font-bold">LinkedIn</h4>
                            <div className="border-[1px] border-gray-300 mt-4 w-full">
                                <Image
                                    width={300}
                                    height={300}
                                    src={imageUrl || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQpZaeWxczipxrTdSIThz5hmwrRYhEeeAl5A&s'}
                                    alt="Preview Image"
                                    className="w-full h-auto object-cover"
                                />
                                <div className="p-4 ">
                                    <p className="text-gray-600 font-semibold uppercase text-[18px]">{title || "Demo Title"}</p>
                                    <a href={url || "#"} className="text-gray-500 inline-block break-all uppercase text-[14px]">
                                        {url || "example.com"}
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h4 className="text-xl font-bold">Discord</h4>
                            <div className="bg-[#2F3136] p-4 mt-4 w-full rounded-md">
                                <div className="">
                                    <a href={url || "#"} className="text-gray-200 inline-block break-all text-[14px]">
                                        {url || "example.com"}
                                    </a>
                                    <p className="text-[#00B0F4] font-semibold capitalize text-[18px] py-2 ">{title || "Demo Title "}</p>
                                    <p className="text-gray-200 text-[16px] capitalize">{description.length > 25 ? description.substring(0, 25) + '...' : description || "This is a demo description."}</p>
                                </div>
                                <Image
                                    width={300}
                                    height={300}
                                    src={imageUrl || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQpZaeWxczipxrTdSIThz5hmwrRYhEeeAl5A&s'}
                                    alt="Preview Image"
                                    className="w-full h-auto object-cover rounded-lg mt-2"
                                />

                            </div>
                        </div>
                    </div>
}
                </div>
        </div>
    );
};

export default GraphGenerator;

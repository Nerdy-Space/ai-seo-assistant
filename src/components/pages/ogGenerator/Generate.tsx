"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

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

    const generateTags = () => {
        const generatedTags = `
            <meta property="og:title" content="${title || 'Demo Title'}" />
            <meta property="og:type" content="${type || 'website'}" />
            <meta property="og:description" content="${description || 'This is a demo description.'}" />
            <meta property="og:image" content="${imageUrl || 'https://imagelink.come'}" />
            <meta property="og:url" content="${url || 'https://example.com'}" />
        `.replace(/^\s+/gm, "");

        setOgTags(generatedTags);
    };
    useEffect(() => {
        generateTags()
    }, [])

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
            <div className="flex flex-col md:flex-row gap-6 ">
                {/* Input Section */}
                <div className="md:w-[60vw]">
                    <h2 className="font-semibold text-xl mb-4">Generate Open Graph Tags</h2>

                    <div className="mb-4">
                        <label className="block">Title</label>
                        <Input
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Enter page title"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block">Type</label>
                        <Input
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                            placeholder="Enter page type"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block">Description</label>
                        <Textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Enter page description"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block">Image URL</label>
                        <Input
                            value={imageUrl}
                            onChange={(e) => setImageUrl(e.target.value)}
                            placeholder="Enter image URL"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block">Page URL</label>
                        <Input
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            placeholder="Enter page URL"
                        />
                    </div>

                    <Button onClick={generateTags} className="w-full md:w-auto">
                        Generate OG Tags
                    </Button>
                </div>

                {/* Preview Section */}
                <div className="md:w-[40vw]">
                    <h2 className="font-semibold text-xl mb-4">Generated OG Tags</h2>
                    {ogTags && (
                        <div>
                            <h3 className="font-semibold mb-2">Code Preview</h3>
                            <pre className="p-2 bg-gray-100 border rounded overflow-x-auto">
                                <code>{ogTags}</code>
                            </pre>
                            <Button className="mt-4 w-full md:w-auto" onClick={handleCopy}>
                                Copy to Clipboard
                            </Button>
                        </div>
                    )}
                </div>
            </div>
            <div className="mt-6">
                <h3 className="font-semibold text-lg mb-2">Result Preview</h3>
                <p>See how your website will look on social media platforms. This live preview ensures your metadata aligns with your content and branding.</p>
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
                                <p className="text-gray-600 font-semibold uppercase text-[18px]">{title.length > 23 ? title.substring(0, 23) + ' ...' : title || "Demo Title Demo Title Demo Title Demo Title Demo Title..."}</p>
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
                            <a href={url || "#"} className="text-[#fff] p-[4px] absolute bg-gray-400 inline-block break-all text-[11px] bottom-[4%] right-[74.5%] rounded-lg">
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
            </div>
        </div>
    );
};

export default GraphGenerator;
"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const GraphGenerator = () => {
    const [title, setTitle] = useState("");
    const [type, setType] = useState("");
    const [description, setDescription] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [url, setUrl] = useState("");
    const [ogTags, setOgTags] = useState("");

    const generateTags = () => {
        const generatedTags = `
      <meta property="og:title" content="${title}" />
      <meta property="og:type" content="${type}" />
      <meta property="og:description" content="${description}" />
      <meta property="og:image" content="${imageUrl}" />
      <meta property="og:url" content="${url}" />
    `;
        setOgTags(generatedTags);
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
        <div className="flex gap-x-4 p-4 max-w-[1440px] mx-auto">
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

                <Button onClick={generateTags}>Generate OG Tags</Button>
            </div>

            <div className="md:w-[40vw]">
                <h2 className="font-semibold text-xl mb-4">Generated OG Tags</h2>
                {ogTags && (
                    <div>
                        <Textarea value={ogTags} readOnly rows={10} />
                        <Button className="mt-4" onClick={handleCopy}>
                            Copy to Clipboard
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default GraphGenerator;

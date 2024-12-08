"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Copy, CheckCircle, Download } from 'lucide-react';
import OpenAI from "openai";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Cookies from "js-cookie";

const GenerateArticle = () => {

    const { isSignedIn } = useUser();
    const router = useRouter();
    useEffect(() => {
        // Redirect to the sign-in page if the user is not signed in
        if (!isSignedIn) {
            router.push("/");  // Replace "/sign-in" with your sign-in page route
        }
    }, [isSignedIn, router]);

    const [loading, setLoading] = useState(false);
    const [copied, setCopied] = useState(false);
    const [formData, setFormData] = useState({
        keywords: [] as string[],
        topics: "",
        length: "",
        tone: "",
        sections: "",
    });
    const [currentKeyword, setCurrentKeyword] = useState("");
    const [generatedContent, setGeneratedContent] = useState<{
        title: string;
        content: string;
        slug: string;
        metaDescription: string;
    } | null>(null);
    const [generateImage, setGenerateImage] = useState(false);
    const [generatedImage, setGeneratedImage] = useState("");
    const [imageSize, setImageSize] = useState("1024x1024");

    const handleKeywordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCurrentKeyword(e.target.value);
    };

    const handleKeywordKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" || e.key === ",") {
            e.preventDefault();
            if (currentKeyword.trim()) {
                setFormData((prev) => ({
                    ...prev,
                    keywords: [...prev.keywords, currentKeyword.trim()],
                }));
                setCurrentKeyword("");
            }
        }
    };

    const removeKeyword = (index: number) => {
        setFormData((prev) => ({
            ...prev,
            keywords: prev.keywords.filter((_, i) => i !== index),
        }));
    };

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const generatePrompt = () => {
        return `Create a blog post about ${formData.topics}. Write it in a standard, ${formData.tone} tone. Use transition words. Use active voice. Write over ${formData.length} words. Use very creative titles for the blog post. Add a title for each section. Ensure there are a minimum of ${formData.sections} sections. Each section should have a minimum of two paragraphs. Include the following keywords: "${formData.keywords}". Create a good slug for this post and a meta description with a maximum of 100 words and add it to the end of the blog post.`;
    };

    const handleGenerate = async () => {
          const aiCount = parseInt(Cookies.get("aiArticle") || "0", 10); // Get current count or default to 0
    Cookies.set("aiArticle", aiCount + 1); // Increment and update
        try {
            setLoading(true);
            const openai = new OpenAI({ apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY, dangerouslyAllowBrowser: true });

            const completion = await openai.chat.completions.create({
                model: "gpt-4",
                messages: [
                    {
                        role: "system",
                        content: "You are a professional content writer.",
                    },
                    {
                        role: "user",
                        content: generatePrompt(),
                    },
                ],
            });

            const content = completion.choices[0].message.content || "";
            const titleMatch = content.match(/Title: "(.*?)"/);
            const slugMatch = content.match(/Slug: (.*?)\n/);
            const metaDescriptionMatch = content.match(/Meta Description: (.*?)\n/i);
            const cleanedContent = content
                .replace(/Title: ".*?"/, "")
                .replace(/Slug: .*?\n/, "")
                .replace(/Meta Description: .*?\n/i, "");

            setGeneratedContent({
                title: titleMatch ? titleMatch[1] : "Untitled",
                content: cleanedContent.trim(),
                slug: slugMatch ? slugMatch[1] : "",
                metaDescription: metaDescriptionMatch ? metaDescriptionMatch[1] : "",
            });

            if (generateImage) {
                const imageResponse = await openai.images.generate({
                    model: "dall-e-3",
                    prompt: `Create a high-quality, detailed image related to ${formData.topics}`,
                    n: 1,
                    size: imageSize as "1024x1024" | "1792x1024" | "1024x1792",
                });
                setGeneratedImage(imageResponse.data[0].url || "");
            }
        } catch (error) {
            console.error("Error generating content:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleCopy = () => {
        if (generatedContent) {
            navigator.clipboard.writeText(generatedContent.content);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    const handleDownloadImage = async () => {
        if (generatedImage) {
            try {
                const response = await fetch(generatedImage);
                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);
                const link = document.createElement("a");
                link.href = url;
                link.download = "generated-image.png";
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            } catch (error) {
                console.error("Error downloading image:", error);
            }
        }
    };



    const tones = [
        { value: "exciting", label: "Exciting" },
        { value: "informative", label: "Informative" },
        { value: "funny", label: "Funny" },
        { value: "entertaining", label: "Entertaining" },
        { value: "educational", label: "Educational" },
        { value: "inspiring", label: "Inspiring" },
        { value: "creative", label: "Creative" },
        { value: "inspirational", label: "Inspirational" },
        { value: "motivational", label: "Motivational" },
        { value: "professional", label: "Professional" },
        { value: "casual", label: "Casual" },
        { value: "relaxing", label: "Relaxing" },
        { value: "romantic", label: "Romantic" },
        { value: "transactional", label: "Transactional" },
        { value: "optimistic", label: "Optimistic" },
        { value: "witty", label: "Witty" },
    ]
    return (
        <div className="max-w-[1440px] mx-auto py-10 px-4 md:px-10">
            <h1 className="text-4xl font-bold text-center mb-10">Advanced Content Generator</h1>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                    <div className="space-y-8 bg-[#f5f5f5] p-2 rounded">
                        <div className="bg-white p-4 rounded-lg shadow-md">
                            <h2 className="text-2xl font-bold mb-4">Content Settings</h2>
                            <div className="space-y-4">
                                <div>
                                    <label
                                        htmlFor="keywords"
                                        className="block text-sm font-medium text-gray-700 mb-1"
                                    >
                                        Keywords
                                    </label>
                                    <Input
                                        id="keywords"
                                        name="keywords"
                                        value={currentKeyword}
                                        onChange={handleKeywordChange}
                                        onKeyDown={handleKeywordKeyDown}
                                        placeholder="Enter keywords and press Enter or Comma"
                                    />
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        {formData.keywords.map((keyword, index) => (
                                            <button
                                                key={index}
                                                className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm flex items-center gap-2"
                                                onClick={() => removeKeyword(index)}
                                            >
                                                {keyword}
                                                <span className="text-red-500 font-bold">×</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="topics" className="block text-sm font-medium text-gray-700 mb-1">Topics</label>
                                    <Input
                                        id="topics"
                                        name="topics"
                                        value={formData.topics}
                                        onChange={handleInputChange}
                                        placeholder="Enter main topic"
                                    />
                                </div>
                                <div className="flex items-center gap-x-2 w-full">
                                    <div className="w-full">
                                        <label htmlFor="length" className="w-full text-sm font-medium text-gray-700 mb-1">Content Length (words)</label>
                                        <Input
                                            id="length"
                                            name="length"
                                            value={formData.length}
                                            onChange={handleInputChange}
                                            placeholder="Enter desired word count"
                                            type="number"
                                            min="100"
                                        />
                                    </div>
                                    <div className="w-full">
                                        <label htmlFor="sections" className="w-full text-sm font-medium text-gray-700 mb-1">Sections</label>
                                        <Input
                                            id="sections"
                                            name="sections"
                                            value={formData.sections}
                                            onChange={handleInputChange}
                                            placeholder="Enter desired section count"
                                            type="number"
                                            min="1"
                                            max="20"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="tone" className="block text-sm font-medium text-gray-700 mb-1">Tone of voice</label>
                                    <Select
                                        value={formData.tone}
                                        onValueChange={(value) => setFormData({ ...formData, tone: value })}>
                                        <SelectTrigger className="w-[180px]">
                                            <SelectValue placeholder="Select tone" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {tones.map((tone) => (
                                                <SelectItem key={tone.value} value={tone.value}>{tone.label}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white p-4 rounded-lg shadow-md">
                            <h2 className="text-2xl font-bold mb-4">Media Settings</h2>
                            <div className="space-y-4">
                                <div className="flex items-center space-x-3">
                                    <input
                                        type="checkbox"
                                        id="generate-image"
                                        checked={generateImage}
                                        onChange={(e) => setGenerateImage(e.target.checked)}
                                        className="w-5 h-5 rounded text-blue-600 focus:ring-blue-500"
                                    />
                                    <label htmlFor="generate-image" className="text-sm font-medium text-gray-700">
                                        Generate Image with DALL-E
                                    </label>
                                </div>
                                {/* {generateImage && ( */}
                                <div>
                                    <label htmlFor="image-size" className="block text-sm font-medium text-gray-700 mb-1">Image Size</label>
                                    <Select
                                        value={imageSize}
                                        onValueChange={(value) => setImageSize(value)}>
                                        <SelectTrigger className="w-[180px]">
                                            <SelectValue placeholder="Size" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="1024x1024">Square (1024x1024)</SelectItem>
                                            <SelectItem value="1792x1024">Landscape (1792x1024)</SelectItem>
                                            <SelectItem value="1024x1792">Portrait (1024x1792)</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                {/* )} */}
                            </div>
                        </div>
                        <Button
                            onClick={handleGenerate}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg font-semibold rounded-lg transition duration-300 ease-in-out"
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                    Generating...
                                </>
                            ) : (
                                "Generate Content"
                            )}
                        </Button>
                    </div>
                    {generateImage && generatedImage && (
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-2xl font-bold">Generated Image</h2>
                                <Button
                                    onClick={handleDownloadImage}
                                    variant="outline"
                                    size="sm"
                                    className="flex items-center"
                                >
                                    <Download className="h-4 w-4 mr-2" />
                                    Download
                                </Button>
                            </div>
                            <div className="rounded-lg overflow-hidden">
                                <Image
                                width={500}
                                height={500}
                                    src={generatedImage} alt="Generated content" className="w-full h-auto" />
                            </div>
                        </div>
                    )}
                </div>
                <div className="space-y-8">
                    {generatedContent && (
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-2xl font-bold">Generated Content</h2>
                                <Button
                                    onClick={handleCopy}
                                    variant="outline"
                                    size="sm"
                                    className="flex items-center"
                                >
                                    {copied ? (
                                        <CheckCircle className="h-4 w-4 mr-2" />
                                    ) : (
                                        <Copy className="h-4 w-4 mr-2" />
                                    )}
                                    {copied ? "Copied!" : "Copy"}
                                </Button>
                            </div>
                            <div className="prose max-w-none">
                                <h1 className="text-3xl font-bold mb-4">{generatedContent.title}</h1>
                                <div dangerouslySetInnerHTML={{ __html: generatedContent.content.replace(/\n/g, '<br />') }} />
                                <div className="mt-4">
                                    <h3 className="text-xl font-semibold">Slug:</h3>
                                    <p>{generatedContent.slug}</p>
                                </div>
                                <div className="mt-4">
                                    <h3 className="text-xl font-semibold">Meta Description:</h3>
                                    <p>{generatedContent.metaDescription}</p>
                                </div>
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
};

export default GenerateArticle;
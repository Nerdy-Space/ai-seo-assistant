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
  const { isLoaded, isSignedIn, user } = useUser();
    const router = useRouter();
    const loaderTexts = [
  "Something great is cooking...",
  "A legendary content is about to be born...",
  "Unleashing the power of words...",
  "Crafting a masterpiece just for you...",
  "Stirring the cauldron of creativity...",
  "Weaving a tapestry of brilliant ideas...",
  "Summoning the muses of inspiration...",
  "Brewing a potion of engaging content...",
  "Unlocking the secrets of captivating writing...",
  "Channeling the spirit of wordsmith wizards..."
];

    useEffect(() => {
        if (!isLoaded) return; // Wait until the user state is loaded
        if (!isSignedIn) {
            router.push("/"); // Redirect to sign-in if not signed in
        }
    }, [isLoaded, isSignedIn, router]);

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
    const [loaderText, setLoaderText] = useState("");

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
        const aiCount = parseInt(Cookies.get("AI Article") || "0", 10);
        Cookies.set("AI Article", (aiCount + 1).toString());
        try {
  setLoading(true);
  let currentTextIndex = 0;
  const loaderTextInterval = setInterval(() => {
      setLoaderText(loaderTexts[currentTextIndex]);
      currentTextIndex = (currentTextIndex + 1) % loaderTexts.length;
    }, 3000);

  const openai = new OpenAI({ apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY, dangerouslyAllowBrowser: true });

  const completion = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      { role: "system", content: "You are a professional content writer." },
      { role: "user", content: generatePrompt() },
    ],
  });

  clearInterval(loaderTextInterval);

  const content = completion.choices[0].message.content || "";
  const titleMatch = content.match(/Title: "(.*?)"/);
  const slugMatch = content.match(/Slug: (.*?)\n/);
  const metaDescriptionMatch = content.match(/Meta Description: (.*?)\n/i);

  const cleanedContent = content
    .replace(/Title: ".*?"/, "")
    .replace(/Slug: .*?\n/, "")
    .replace(/Meta Description: .*?\n/i, "")
   .replace(/(Section \d+)/gi, "<strong>$1</strong>");

   if (generateImage) {
                const imageResponse = await openai.images.generate({
                    model: "dall-e-3",
                    prompt: `Create a high-quality, detailed image related to ${formData.topics}`,
                    n: 1,
                    size: imageSize as "1024x1024" | "1792x1024" | "1024x1792",
                });
                setGeneratedImage(imageResponse.data[0].url || "");
            }

  setGeneratedContent({
    title: titleMatch ? titleMatch[1] : "Untitled",
    content: cleanedContent.trim(),
    slug: slugMatch ? slugMatch[1] : "",
    metaDescription: metaDescriptionMatch ? metaDescriptionMatch[1] : "",
  });

  

} catch (error) {
  console.error("Error generating content:", error);
} finally {
  setLoading(false);
  setLoaderText("");
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


    if (!isLoaded || !isSignedIn) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="w-16 h-16 border-4 border-t-4 border-blue-500 rounded-full animate-spin"></div>
                <p className="ml-4 text-blue-500">Loading user session...</p>
            </div>
        );
    }

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
                          Generate Content
                        </Button>
                    </div>
                    {loading ? (
                                <div className="flex flex-col gap-y-2 justify-center items-center w-full h-full">
                                    <Loader2 className="h-12 w-12 animate-spin" color="#3059E3"/>
                                </div>
                            ): generateImage && generatedImage && (
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
                    
                    {loading ? (
                                <div className="flex flex-col gap-y-2 justify-center items-center w-full h-full">
                                    <Loader2 className="h-12 w-12 animate-spin" color="#3059E3"/>
                                   <p className="text-md text-[#333]"> {loaderText || "Generating..."}</p>
                                </div>
                            ) : generatedContent && (
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
                                <div className="mb-6 p-4 bg-gray-100 rounded-lg">
                                    <h3 className="text-xl font-semibold mb-2">Title:</h3>
                                    <p className="text-3xl font-bold">{generatedContent.title}</p>
                                </div>
                                <div className="mb-6 p-4 bg-gray-100 rounded-lg">
          <h3 className="text-xl font-semibold mb-2">Content:</h3>
          <div dangerouslySetInnerHTML={{ __html: generatedContent.content.replace(/\n/g, '<br />') }} />
        </div>
                                <div className="mb-6 p-4 bg-gray-100 rounded-lg">
                                    <h3 className="text-xl font-semibold mb-2">Slug:</h3>
                                    <p>{generatedContent.slug}</p>
                                </div>
                                <div className="p-4 bg-gray-100 rounded-lg">
                                    <h3 className="text-xl font-semibold mb-2">Meta Description:</h3>
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


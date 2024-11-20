"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Copy, CheckCircle } from "lucide-react";
// import { useToast } from "@/components/ui/use-toast";
import ReactMarkdown from "react-markdown";
import OpenAI from "openai";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

const GenerateArticle = () => {
    // const { toast } = useToast();
    const [loading, setLoading] = useState(false);
    const [copied, setCopied] = useState(false);
    const [formData, setFormData] = useState({
        keywords: "",
        topics: "",
        length: "",
    });
    const [generatedContent, setGeneratedContent] = useState("");
    const { isSignedIn } = useUser();
    const router = useRouter();
    useEffect(() => {
        // Redirect to the sign-in page if the user is not signed in
        if (!isSignedIn) {
            router.push("/");  // Replace "/sign-in" with your sign-in page route
        }
    }, [isSignedIn, router]);
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
        return `Create a blog post about ${formData.topics}. Write it in a standard, human readable tone. Use transition words. Use active voice. Write over ${formData.length} words. Use very creative titles for the blog post. Add a title for each section. Ensure there are a minimum of 9 sections. Each section should have a minimum of two paragraphs. Include the following keywords: "${formData.keywords}". Create a good slug for this post and a meta description with a maximum of 100 words and add it to the end of the blog post.`;
    };

    const handleGenerate = async () => {
        try {
            setLoading(true);
            const openai = new OpenAI({
                apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
            });

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

            setGeneratedContent(completion.choices[0].message.content || "");
            // toast({
            //     title: "Content Generated!",
            //     description: "Your content has been generated successfully.",
            // });
        } catch (error) {
            // toast({
            //     title: "Error",
            //     description: "Failed to generate content. Please try again.",
            //     variant: "destructive",
            // });
            console.error("Error generating content:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(generatedContent);
        setCopied(true);
        // toast({
        //     title: "Copied!",
        //     description: "Content copied to clipboard.",
        // });
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="max-w-[1440px] mx-auto pt-10 px-4 md:px-10">
            <div className="relative p-6 bg-white shadow-md rounded-lg">
                {/* Grid Background with Radial Gradient */}
                <div className="absolute inset-0 -z-10 h-full w-full bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
                    <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_600px_at_50%_200px,#C9EBFF,transparent)] opacity-90"></div>
                </div>

                <h2 className="text-3xl font-bold text-[#1F2937] mb-6 text-center">
                    Content Generator
                </h2>

                <div className="flex flex-col md:flex-row gap-6">
                    {/* Input Section */}
                    <div className="md:w-1/2 space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Keywords
                            </label>
                            <Input
                                name="keywords"
                                value={formData.keywords}
                                onChange={handleInputChange}
                                placeholder="Enter keywords (comma-separated)"
                                className="w-full"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Topics
                            </label>
                            <Input
                                name="topics"
                                value={formData.topics}
                                onChange={handleInputChange}
                                placeholder="Enter main topic"
                                className="w-full"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Content Length (words)
                            </label>
                            <Input
                                name="length"
                                value={formData.length}
                                onChange={handleInputChange}
                                placeholder="Enter desired word count"
                                type="number"
                                min="100"
                                className="w-full"
                            />
                        </div>

                        <Button
                            onClick={handleGenerate}
                            className="w-full bg-blue-600 hover:bg-blue-700"
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Generating...
                                </>
                            ) : (
                                "Generate Content"
                            )}
                        </Button>
                    </div>

                    {/* Output Section */}
                    <div className="md:w-1/2">
                        <div className="relative">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Generated Content
                            </label>
                            <div className="min-h-[500px] p-4 bg-gray-50 rounded-lg border">
                                <div className="absolute top-2 right-2">
                                    {generatedContent && (
                                        <Button
                                            onClick={handleCopy}
                                            variant="outline"
                                            size="icon"
                                            className="h-8 w-8"
                                        >
                                            {copied ? (
                                                <CheckCircle className="h-4 w-4 text-green-500" />
                                            ) : (
                                                <Copy className="h-4 w-4" />
                                            )}
                                        </Button>
                                    )}
                                </div>
                                <div className="prose prose-sm max-w-none">
                                    <ReactMarkdown>{generatedContent}</ReactMarkdown>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GenerateArticle;
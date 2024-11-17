"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

// Define types for the API response
type SerpResult = {
    link: string;
    title: string;
    snippet: string;
};

type ApiResponse = {
    organic: SerpResult[];
    totalResults: number;
};

type Country = {
    code: string;
    name: string;
};

type Language = {
    code: string;
    name: string;
};

const SerpChecker = () => {
    const { isSignedIn } = useUser();
    const router = useRouter();

    useEffect(() => {
        if (!isSignedIn) {
            router.push("/"); // Redirect to the sign-in page if not signed in
        }
    }, [isSignedIn, router]);

    const [search, setSearch] = useState<string>("");
    const [country, setCountry] = useState<string>("United States");
    const [language, setLanguage] = useState<string>("");
    const [device, setDevice] = useState<string>("desktop");
    const [results, setResults] = useState<ApiResponse | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [resultsPerPage] = useState<number>(10);
    const [countries, setCountries] = useState<Country[]>([]);
    const [languages, setLanguages] = useState<Language[]>([]);

    // Fetch country data
    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const response = await axios.get("https://restcountries.com/v3.1/all");
                setCountries(response.data.map((country: { cca2: string; name: { common: string } }) => ({
                    code: country.cca2,
                    name: country.name.common,
                })));
            } catch (error) {
                console.error("Error fetching countries:", error);
            }
        };
        fetchCountries();
    }, []);

    // Fetch language data
    useEffect(() => {
        const fetchLanguages = async () => {
            try {
                const response = await axios.get("https://libretranslate.com/languages"); // Example API
                setLanguages(response.data.map((lang: { code: string; name: string }) => ({
                    code: lang.code,
                    name: lang.name,
                })));
            } catch (error) {
                console.error("Error fetching languages:", error);
            }
        };
        fetchLanguages();
    }, []);

    // Fetch search results with pagination
    const handleSearch = async () => {
        try {
            const task_id = '02201650-1073-0066-2000-1d132bb28897';
            const postRequest = await axios({
                method: 'post',
                url: `https://api.dataforseo.com/v3/serp/google/organic/task_post`,
                auth: {
                    username: 'aiman@outdated.digital',
                    password: 'Shafi234@#'
                },
                headers: {
                    'Content-Type': 'application/json',
                },
                data: [{
                    keyword: search,
                    location_name: country,
                    device: device,
                    language_name: language
                }]
            });

            const response = await axios({
                method: 'get',
                url: `https://api.dataforseo.com/v3/serp/google/organic/task_get/regular/${task_id}`,
                auth: {
                    username: 'aiman@outdated.digital',
                    password: 'Shafi234@#'
                },
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const result = response.data.tasks;
            setResults(result);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    // Get the current page's results
    const getPagedResults = () => {
        if (!results) return [];
        const startIndex = (currentPage - 1) * resultsPerPage;
        const endIndex = startIndex + resultsPerPage;
        return results.organic.slice(startIndex, endIndex);
    };

    // Handle page change
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    // Calculate total number of pages
    const totalPages = results ? Math.ceil(results.totalResults / resultsPerPage) : 0;

    return (
        <div className="max-w-[1440px] mx-auto px-4 pt-10 pb-16">
            <div className="relative p-6 bg-white shadow-md rounded-lg">
                {/* Grid Background with Radial Gradient */}
                <div className="absolute inset-0 -z-10 h-full w-full bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
                    <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_600px_at_50%_200px,#C9EBFF,transparent)] opacity-90"></div>
                </div>

                <h2 className="text-3xl font-bold text-[#1F2937] mb-6 text-center drop-shadow-md">
                    SERP Checker Tool
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                    <div className="p-4 bg-gray-100 rounded-lg shadow-sm">
                        <h3 className="text-lg font-semibold mb-2">Search Query</h3>
                        <Input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Enter search keyword"
                            className="w-full bg-[#fff]"
                        />
                    </div>

                    <div className="p-4 bg-gray-100 rounded-lg shadow-sm">
                        <h3 className="text-lg font-semibold mb-2">Select Country</h3>
                        <select
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                            className="w-full p-2 border rounded-lg"
                        >
                            {countries.map((country) => (
                                <option key={country.code} value={country.name}>
                                    {country.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="p-4 bg-gray-100 rounded-lg shadow-sm">
                        <h3 className="text-lg font-semibold mb-2">Select Language</h3>
                        <select
                            value={language}
                            onChange={(e) => setLanguage(e.target.value)}
                            className="w-full p-2 border rounded-lg"
                        >
                            {languages.map((lang) => (
                                <option key={lang.code} value={lang.code}>
                                    {lang.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="p-4 bg-gray-100 rounded-lg shadow-sm">
                        <h3 className="text-lg font-semibold mb-2">Device</h3>
                        <select
                            value={device}
                            onChange={(e) => setDevice(e.target.value)}
                            className="w-full p-2 border rounded-lg"
                        >
                            <option value="desktop">Desktop</option>
                            <option value="mobile">Mobile</option>
                        </select>
                    </div>
                </div>

                <div className="mt-8 space-y-4">
                    <Button
                        onClick={handleSearch}
                        className="w-full bg-[#3B82F6] text-white hover:bg-[#2563EB]"
                    >
                        Search
                    </Button>
                </div>

                {/* Results Section */}
                {results && results.organic.length > 0 && (
                    <div className="mt-10 bg-gray-50 p-6 rounded-lg shadow-inner">
                        <h4 className="font-medium text-gray-800 mb-4">
                            Total Results: {results.totalResults}
                        </h4>
                        {getPagedResults().map((result, index) => (
                            <div key={index} className="mb-4 p-4 bg-white rounded-lg shadow-sm">
                                <h5 className="font-semibold text-lg text-blue-600">{result.title}</h5>
                                <p className="text-gray-700 mb-2">{result.snippet}</p>
                                <a
                                    href={result.link}
                                    className="text-blue-500 hover:underline"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    View Full Result
                                </a>
                            </div>
                        ))}

                        {/* Pagination Controls */}
                        <div className="flex justify-between mt-6">
                            <Button
                                disabled={currentPage === 1}
                                onClick={() => handlePageChange(currentPage - 1)}
                            >
                                Previous
                            </Button>
                            <div className="flex space-x-2">
                                {Array.from({ length: totalPages }, (_, index) => (
                                    <Button
                                        key={index}
                                        onClick={() => handlePageChange(index + 1)}
                                        className={currentPage === index + 1 ? "bg-blue-500 text-white" : ""}
                                    >
                                        {index + 1}
                                    </Button>
                                ))}
                            </div>
                            <Button
                                disabled={currentPage === totalPages}
                                onClick={() => handlePageChange(currentPage + 1)}
                            >
                                Next
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SerpChecker;

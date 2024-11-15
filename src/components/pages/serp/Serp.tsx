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
        // Redirect to the sign-in page if the user is not signed in
        if (!isSignedIn) {
            router.push("/");  // Replace "/sign-in" with your sign-in page route
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
            console.log(postRequest)

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

    // Handle pagination
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        handleSearch();
    };

    return (
        <div className="max-w-[1440px] mx-auto pt-10 px-4 md:px-10">
            <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-[60vw]">
                    {/* Search Query */}
                    <h2 className="font-semibold text-xl mb-4">SERP Checker</h2>
                    <div className="mb-4">
                        <label className="block">Search Query</label>
                        <Input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Enter your search query"
                        />
                    </div>

                    {/* Country Selection */}
                    <div className="mb-4">
                        <label className="block">Country</label>
                        <select
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                            className="border-[1px] border-[#ddd] p-2 rounded-lg w-full"
                        >
                            {countries.map((country) => (
                                <option key={country.code} value={country.name}>
                                    {country.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Language Selection */}
                    <div className="mb-4">
                        <label className="block">Language</label>
                        <select
                            value={language}
                            onChange={(e) => setLanguage(e.target.value)}
                            className="border-[1px] border-[#ddd] p-2 rounded-lg w-full"
                        >
                            {languages.map((lang) => (
                                <option key={lang.code} value={lang.name}>
                                    {lang.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Device Selection */}
                    <div className="mb-4">
                        <label className="block">Device</label>
                        <select
                            value={device}
                            onChange={(e) => setDevice(e.target.value)}
                            className="border-[1px] border-[#ddd] p-2 rounded-lg w-full"
                        >
                            <option value="desktop">Desktop</option>
                            <option value="mobile">Mobile</option>
                        </select>
                    </div>

                    {/* Search Button */}
                    <Button onClick={handleSearch} className="w-full md:w-auto">
                        Check SERP
                    </Button>
                </div>

                {/* Results Section */}
                <div className="md:w-[40vw]">
                    <h2 className="font-semibold text-xl mb-4">Search Results ({results?.organic ? results.organic.length : 0})</h2>
                    {results ? (
                        <div className="bg-gray-100 p-4 rounded">
                            {results.organic && results.organic.length > 0 ? (
                                results.organic.map((result, index) => (
                                    <div key={index} className="mb-4">
                                        <a
                                            href={result.link}
                                            className="text-blue-500 font-semibold"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            {result.title}
                                        </a>
                                        <p className="text-gray-600">{result.snippet}</p>
                                    </div>
                                ))
                            ) : (
                                <p>No results found.</p>
                            )}
                        </div>
                    ) : (
                        <p>Enter search criteria and click Check SERP to view results.</p>
                    )}

                    {/* Pagination */}
                    {results && results.totalResults > 10 && (
                        <div className="mt-4">
                            <Button
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                            >
                                Previous
                            </Button>
                            <span className="mx-2">{currentPage}</span>
                            <Button
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={results.totalResults <= currentPage * resultsPerPage}
                            >
                                Next
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SerpChecker;

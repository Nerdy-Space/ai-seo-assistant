"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select"; // Assuming a Select component is available in your UI library
import axios from "axios";

// Define types for the API response
type SerpResult = {
    link: string;
    title: string;
    snippet: string;
};

type ApiResponse = {
    organic: SerpResult[];
    totalResults: number; // Assuming the API returns the total number of results
};

const SerpChecker = () => {
    const [search, setSearch] = useState<string>("");
    const [country, setCountry] = useState<string>("US");
    const [location, setLocation] = useState<string>("");
    const [dateRange, setDateRange] = useState<string>("");
    const [results, setResults] = useState<ApiResponse | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [resultsPerPage] = useState<number>(10);
    const [countries, setCountries] = useState<string[]>([]); // Holds country options

    // Fetch country data
    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const response = await axios.get("https://restcountries.com/v3.1/all"); // Example API
                setCountries(response.data.map((country: any) => ({
                    code: country.cca2,
                    name: country.name.common,
            } catch (error) {
                console.error("Error fetching countries:", error);
            }
        };
        fetchCountries();
    }, []);

    // Fetch search results with pagination
    const handleSearch = async () => {
        try {
            const response = await axios.post<ApiResponse>(
                "https://google.serper.dev/search",
                {
                    q: search,
                    location: location,
                    gl: country,
                    tbs: dateRange,
                    start: (currentPage - 1) * resultsPerPage, // Pagination offset
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        "X-API-KEY": "02262635a723f488eb69ebcd461e62902067fc97",
                    },
                }
            );
            setResults(response.data);
            setError(null); // Clear any previous errors
        } catch (error) {
            console.error("Error fetching data:", error);
            setError("An error occurred while fetching the results. Please try again.");
        }
    };

    // Handle pagination
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        handleSearch();
    };

    return (
        <div className="max-w-[1440px] mx-auto pt-10 px-4">            
                <div className="md:w-[60vw]">
                    {/* Search Query */}
                    <div className="flex flex-col md:flex-row gap-6">
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
                                <option key={country.code} value={country.code}>
                                    {country.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Location */}
                    <div className="mb-4">
                        <label className="block">Location</label>
                        <Input
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            placeholder="Enter location (optional)"
                        />
                    </div>

                    {/* Date Range */}
                    <div className="mb-4">
                        <label className="block">Date Range</label>
                        <select
                            value={dateRange}
                            onChange={(e) => setDateRange(e.target.value)}
                            className="border-[1px] border-[#ddd] p-2 rounded-lg w-full"
                        >
                            <option value="">Any time</option>
                            <option value="qdr:h">Past hour</option>
                            <option value="qdr:d">Past 24 hours</option>
                            <option value="qdr:w">Past week</option>
                            <option value="qdr:m">Past month</option>
                            <option value="qdr:y">Past year</option>
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

"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie"; // Import js-cookie
import { ChevronDown, ChevronUp, ExternalLink } from 'lucide-react'

// Define types for the API response
type SerpResult = {
    type: string;
    rank_group: number;
    rank_absolute: number;
    domain: string;
    title: string;
    description: string;
    url: string;
    breadcrumb: string;
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
    const [results, setResults] = useState<SerpResult[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [resultsPerPage] = useState<number>(10);
    const [countries, setCountries] = useState<Country[]>([]);
    const [languages, setLanguages] = useState<Language[]>([]);
    const [loading, setLoading] = useState<boolean>(false); // For loader state

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
            setLoading(true); // Show loader when search starts
            // Post request to create task
            const postRequest = await axios({
                method: 'post',
                url: `https://api.dataforseo.com/v3/serp/google/organic/task_post`,
                auth: {
                    username: 'aiman@outdated.digital',
                    password: `${process.env.NEXT_PUBLIC_SEO_KEY}`
                },
                headers: {
                    'Content-Type': 'application/json',
                },
                data: [{
                    keyword: search,
                    location_name: country,
                    device: device,
                    language_name: "English",
                    priority: 2
                }]
            });

            const taskId = postRequest.data.tasks[0].id;
            // Store the task ID in cookies for 1 day
            Cookies.set('taskId', taskId, { expires: 1 });

            let taskReady = false;

            // Check task readiness every 2 minutes
            while (!taskReady) {
                await new Promise(resolve => setTimeout(resolve, 120)); // Wait 2 minutes
                const checkTaskReady = await axios({
                    method: 'get',
                    url: `https://api.dataforseo.com/v3/serp/google/organic/tasks_ready`,
                    auth: {
                        username: 'aiman@outdated.digital',
                        password: `${process.env.NEXT_PUBLIC_SEO_KEY}`
                    },
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                const taskIdsReady = checkTaskReady.data.tasks.map((task: { id: string }) => task.id);
                if (taskIdsReady.includes(taskId)) {
                    taskReady = true;
                }
            }

            // Once task is ready, fetch the results
            const response = await axios({
                method: 'get',
                url: `https://api.dataforseo.com/v3/serp/google/organic/task_get/regular/${taskId}`,
                auth: {
                    username: 'aiman@outdated.digital',
                    password: `${process.env.NEXT_PUBLIC_SEO_KEY}`
                },
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            console.log(response.data)
            setResults(response.data.tasks[0].result[0].items); // Set results
            setLoading(false); // Hide loader when data is fetched
        } catch (error) {
            console.error("Error fetching data:", error);
            setLoading(false); // Hide loader on error
        }
    };

    // Get the current page's results
    const getPagedResults = () => {
        const startIndex = (currentPage - 1) * resultsPerPage;
        const endIndex = startIndex + resultsPerPage;
        return results.slice(startIndex, endIndex);
    };

    // Handle page change
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    // Calculate total number of pages
    const totalPages = results ? Math.ceil(results.length / resultsPerPage) : 0;

    return (
        <div className="max-w-[1440px] mx-auto px-4 pt-10 pb-16">
            <div className="relative p-6 bg-white shadow-md rounded-lg">
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

                {/* Show Loader */}
                {loading && (
                    <div className="mt-6 text-center">
                        <div className="w-16 h-16 border-4 border-t-4 border-blue-500 border-solid rounded-full animate-spin mx-auto"></div>
                        <p className="mt-2 text-sm text-gray-500">It might take a few minutes</p>
                    </div>
                )}


                {/* Results Section */}
                {!loading && results && results.length > 0 && (
          <div className="mt-10 bg-gray-50 p-6 rounded-lg shadow-inner">
            <h4 className="font-medium text-gray-800 mb-4">Total Results: {results.length}</h4>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="p-3 text-left font-semibold text-gray-600">Rank</th>
                    <th className="p-3 text-left font-semibold text-gray-600">Title</th>
                    <th className="p-3 text-left font-semibold text-gray-600">Domain</th>
                    <th className="p-3 text-left font-semibold text-gray-600">URL</th>
                  </tr>
                </thead>
                <tbody>
                  {getPagedResults().map((result, index) => (
                    <tr
                      key={index}
                      className={`border-b border-gray-200 ${index % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-blue-50 transition-colors duration-150`}
                    >
                      <td className="p-3 text-gray-800">{result.rank_absolute}</td>
                      <td className="p-3 text-gray-800 font-medium">{result.title}</td>
                      <td className="p-3 text-gray-600">{result.domain}</td>
                      <td className="p-3 text-blue-600 hover:text-blue-800">
                        <a
                          href={result.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center"
                        >
                          <span className="truncate max-w-xs">{result.url}</span>
                          <ExternalLink className="ml-2 h-4 w-4" />
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex justify-between items-center mt-6">
              <div className="text-sm text-gray-600">
                Showing {(currentPage - 1) * resultsPerPage + 1} to{" "}
                {Math.min(currentPage * resultsPerPage, results.length)} of {results.length} results
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-3 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  <ChevronUp className="h-4 w-4" />
                </Button>
                <span className="text-sm text-gray-600">
                  Page {currentPage} of {totalPages}
                </span>
                <Button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-3 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        )}
            </div>
        </div>
    );
};

export default SerpChecker;

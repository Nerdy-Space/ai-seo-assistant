"use client";
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

interface Variant {
    name: string;
    conversions: number;
    visitors: number;
}

interface ParsedVariant {
    name: string;
    conversions: number;
    visitors: number;
    conversionRate: number;
}

interface Result {
    name: string;
    improvement: string;
    significance: boolean;
    certainty: string;
}

interface CalculationResult {
    baseline: ParsedVariant;
    bestVariant: ParsedVariant;
    bestImprovement: string;
    results: Result[];
    isSignificant: boolean;
}

const Calculator: React.FC = () => {
    const { isSignedIn } = useUser();
    const router = useRouter();

    useEffect(() => {
        if (!isSignedIn) {
            router.push("/"); // Redirect to the home or sign-in page
        }
    }, [isSignedIn, router]);

    const [variants, setVariants] = useState<Variant[]>([
        { name: "A", conversions: 90, visitors: 1000 },
        { name: "B", conversions: 120, visitors: 1000 },
    ]);

    const [result, setResult] = useState<CalculationResult | null>(null);

    const addVariant = () => {
        const newVariantName = String.fromCharCode(65 + variants.length);
        setVariants([
            ...variants,
            { name: newVariantName, conversions: 0, visitors: 1000 },
        ]);
    };

    const updateVariant = (
        index: number,
        field: "conversions" | "visitors",
        value: number
    ) => {
        const updatedVariants = [...variants];
        updatedVariants[index][field] = value;
        setVariants(updatedVariants);
    };

    const calculateSignificance = () => {
        const abTestingCount = parseInt(Cookies.get("AB Testing") || "0", 10); // Get current count or default to 0
        Cookies.set("AB Testing", (abTestingCount + 1).toString()); // Increment and update (convert to string before setting)

    
        const parsedVariants: ParsedVariant[] = variants.map((variant) => ({
            name: variant.name,
            conversions: variant.conversions,
            visitors: variant.visitors,
            conversionRate: (variant.conversions / variant.visitors) * 100,
        }));

        const baseline = parsedVariants[0];
        if (!baseline.conversions || !baseline.visitors) {
            alert("Please enter valid numbers for all fields.");
            return;
        }

        let bestVariant = baseline;
        let bestImprovement = 0;
        let isSignificant = false;

        const results = parsedVariants.slice(1).map((variant) => {
            const improvement =
                ((variant.conversionRate - baseline.conversionRate) /
                    baseline.conversionRate) *
                100;

            // Calculate Z-score for statistical significance
            const p1 = baseline.conversions / baseline.visitors;
            const p2 = variant.conversions / variant.visitors;
            const pPool =
                (baseline.conversions + variant.conversions) /
                (baseline.visitors + variant.visitors);
            const zScore =
                (p2 - p1) /
                Math.sqrt(
                    pPool * (1 - pPool) * (1 / baseline.visitors + 1 / variant.visitors)
                );

            const pValue = 1 - (1 / (1 + Math.exp(-zScore))); // Approximation of p-value
            const significance = pValue < 0.05;
            const certainty = Math.min(100, Math.abs(zScore) * 100);

            if (improvement > bestImprovement) {
                bestImprovement = improvement;
                bestVariant = variant;
            }

            if (significance) {
                isSignificant = true;
            }

            return {
                name: variant.name,
                improvement: improvement.toFixed(2),
                significance,
                certainty: `${certainty.toFixed(2)}%`,
            };
        });

        setResult({
            baseline,
            bestVariant,
            bestImprovement: bestImprovement.toFixed(2),
            results,
            isSignificant,
        });
    };


    
    return (
        <div className="max-w-[1440px] mx-auto px-4 pt-10 pb-16">
            <div className="relative p-6 bg-white shadow-md rounded-lg">
                {/* Grid Background with Radial Gradient */}
                <div className="absolute inset-0 -z-10 h-full w-full bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
                    <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_600px_at_50%_200px,#C9EBFF,transparent)] opacity-90"></div>
                </div>

                <h2 className="text-3xl font-bold text-[#1F2937] mb-6 text-center drop-shadow-md">
                    A/B Testing Significance Calculator
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                    {variants.map((variant, index) => (
                        <div key={index} className="p-4 bg-gray-100 rounded-lg shadow-sm">
                            <h3 className="text-lg font-semibold mb-2">
                                Variant {variant.name}
                            </h3>
                            <div className="space-y-2">
                                <div>
                                    <label className="block font-medium text-gray-700">
                                        Visitors:
                                    </label>
                                    <Input
                                        type="number"
                                        value={variant.visitors}
                                        className="w-full"
                                        onChange={(e) =>
                                            updateVariant(index, "visitors", parseInt(e.target.value))
                                        }
                                    />
                                </div>
                                <div>
                                    <label className="block font-medium text-gray-700">
                                        Conversions:
                                    </label>
                                    <Input
                                        type="number"
                                        value={variant.conversions}
                                        className="w-full"
                                        onChange={(e) =>
                                            updateVariant(
                                                index,
                                                "conversions",
                                                parseInt(e.target.value)
                                            )
                                        }
                                    />
                                </div>
                                <div>
                                    <label className="block font-medium text-gray-700">
                                        Conversion Rate:
                                    </label>
                                    <p className="text-gray-800">
                                        {((variant.conversions / variant.visitors) * 100).toFixed(
                                            2
                                        )}
                                        %
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-8 space-y-4">
                    <Button
                        variant="outline"
                        onClick={addVariant}
                        className="w-full text-[#3B82F6] border-[#3B82F6] hover:bg-[#3B82F6] hover:text-white"
                    >
                        Add Variant
                    </Button>
                    <Button
                        onClick={calculateSignificance}
                        className="w-full bg-[#3B82F6] text-white hover:bg-[#2563EB]"
                    >
                        Calculate
                    </Button>
                </div>

                {result && (
                    <div className="mt-10 bg-gray-50 p-6 rounded-lg shadow-inner">
                        <p className="text-lg font-semibold text-gray-800 mb-4">
                            {result.isSignificant
                                ? "Your A/B test is statistically significant!"
                                : "Unfortunately, your results are not statistically significant."}
                        </p>
                        <p className="text-gray-700">
                            Best Variant: Test &quot;{result.bestVariant.name}&quot;
                            converted {result.bestImprovement}% better than Test
                            &quot;{result.baseline.name}&quot;.
                        </p>
                        <h4 className="mt-4 font-medium text-gray-800">Detailed Comparison:</h4>
                        {result.results.map((res) => (
                            <div key={res.name} className="mt-2">
                                <p>
                                    Test &quot;{res.name}&quot; converted {res.improvement}%
                                    better than Test &quot;{result.baseline.name}&quot;.
                                </p>
                                <p>Certainty: {res.certainty}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Calculator;

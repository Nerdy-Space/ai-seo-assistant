"use client";
import React, { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

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
        // Redirect to the sign-in page if the user is not signed in
        if (!isSignedIn) {
            router.push("/");  // Replace "/sign-in" with your sign-in page route
        }
    }, [isSignedIn, router]);
    const [variants, setVariants] = useState<Variant[]>([
        { name: 'A', conversions: 90, visitors: 1000 },
        { name: 'B', conversions: 120, visitors: 1000 }
    ]);
    const [result, setResult] = useState<CalculationResult | null>(null);

    const addVariant = () => {
        const newVariantName = String.fromCharCode(65 + variants.length);
        setVariants([...variants, { name: newVariantName, conversions: 1000, visitors: 1000 }]);
    };

    const updateVariant = (index: number, field: 'conversions' | 'visitors', value: number) => {
        const updatedVariants = [...variants];
        updatedVariants[index][field] = value;
        setVariants(updatedVariants);
    };

    const calculateSignificance = () => {
        const parsedVariants: ParsedVariant[] = variants.map(variant => ({
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

        const results = parsedVariants.slice(1).map(variant => {
            // Calculate improvement as a relative percentage (not absolute)
            const improvement = ((baseline.conversionRate - variant.conversionRate) / variant.conversionRate) * 100;

            // Calculate Z-score for significance
            const p1 = baseline.conversions / baseline.visitors;
            const p2 = variant.conversions / variant.visitors;
            const pPool = (baseline.conversions + variant.conversions) / (baseline.visitors + variant.visitors);
            const zScore = (p1 - p2) / Math.sqrt(pPool * (1 - pPool) * (1 / baseline.visitors + 1 / variant.visitors));
            const certainty = Math.min(100, Math.abs(zScore) * 10); // Adjust certainty based on Z-score, capped at 100%

            if (improvement > bestImprovement) {
                bestImprovement = improvement;
                bestVariant = variant;
            }

            // Calculate significance
            const pValue = Math.exp(-0.717 * Math.abs(zScore) - 0.416 * zScore * zScore); // Approximate p-value from Z-score
            const significance = pValue < 0.05;

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
            isSignificant
        });
    };
// comment

    return (
        <div className="max-w-[1440px] mx-auto px-4 pt-10">
            <div className="flex gap-x-4">
                <div className="md:w-[60vw]">
                    <h2 className="font-semibold text-xl mb-4">A/B Testing Significance Calculator</h2>

                    {variants.map((variant, index) => (
                        <div key={index} className="mb-2">
                            <h3 className="underline font-medium text-lg">Variant {variant.name}</h3>
                            <div className="flex items-center gap-x-4 w-full">
                                <div className='w-full'>
                                    <label>Visitors:</label>
                                    <Input
                                        type="number"
                                        value={variant.visitors}
                                        className="w-full"
                                        onChange={(e) => updateVariant(index, 'visitors', parseInt(e.target.value))}
                                    />
                                </div>
                                <div className='w-full'>
                                    <label>Conversions:</label>
                                    <Input
                                        type="number"
                                        value={variant.conversions}
                                        className="w-full"
                                        onChange={(e) => updateVariant(index, 'conversions', parseInt(e.target.value))}
                                    />
                                </div>
                                <div className='w-full'>
                                    <label>Conversion rate</label>
                                    <p>{((variant.conversions / variant.visitors) * 100).toFixed(2)}%</p>
                                </div>

                            </div>
                        </div>
                    ))}

                    <div className='mt-10'>
                        <Button
                            variant="outline"
                            onClick={addVariant}
                            className="mb-2 w-full">Add Variant</Button>
                        <Button
                            onClick={calculateSignificance}
                            className="mb-2 w-full">Calculate</Button>
                    </div>
                </div>

                <div className="md:w-[40vw]">
                    <h3 className="font-semibold text-xl mb-4">Results:</h3>
                    {result && (
                        <div className="result">                           
                            <p className="font-medium text-lg mb-4">
                                {result.isSignificant
                                    ? "Your A/B test is statistically significant!"
                                    : "Unfortunately, your results are not statistically significant."
                                }
                            </p>
                            <p>
                                Best Variant: Test &quot;{result.bestVariant.name}&quot; converted {result.bestImprovement}% better than Test &quot;{result.baseline.name}&quot;.
                            </p>
                            <p>
                                I am {result.results[0].certainty} certain that the changes in Test &quot;{result.bestVariant.name}&quot; will improve your conversion rate.
                            </p>

                            <h4 className="mt-4">Detailed Comparison:</h4>
                            {result.results.map(res => (
                                <div key={res.name} className="mt-2">
                                    <p>Test &quot;{res.name}&quot; converted {res.improvement}% better than Test &quot;{result.baseline.name}&quot;.</p>
                                    <p>Certainty: {res.certainty}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Calculator;

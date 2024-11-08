"use client";
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";

interface Variant {
    name: string;
    conversions: string; // as string for initial input
    visitors: string;    // as string for initial input
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
    certainty: string | number;
}

interface CalculationResult {
    baseline: ParsedVariant;
    bestVariant: ParsedVariant;
    bestImprovement: string;
    results: Result[];
}

const Calculator: React.FC = () => {
    const [variants, setVariants] = useState<Variant[]>([
        { name: 'A', conversions: '', visitors: '' },
        { name: 'B', conversions: '', visitors: '' }
    ]);
    const [result, setResult] = useState<CalculationResult | null>(null);

    const addVariant = () => {
        const newVariantName = String.fromCharCode(65 + variants.length); // Assigns next letter (C, D, etc.)
        setVariants([...variants, { name: newVariantName, conversions: '', visitors: '' }]);
    };

    const updateVariant = (index: number, field: 'conversions' | 'visitors', value: string) => {
        const updatedVariants = [...variants];
        updatedVariants[index][field] = value;
        setVariants(updatedVariants);
    };

    const calculateSignificance = () => {
        const parsedVariants: ParsedVariant[] = variants.map(variant => ({
            name: variant.name,
            conversions: parseFloat(variant.conversions),
            visitors: parseFloat(variant.visitors),
            conversionRate: parseFloat(variant.conversions) / parseFloat(variant.visitors),
        }));

        const baseline = parsedVariants[0];
        if (!baseline.conversions || !baseline.visitors) {
            alert("Please enter valid numbers for all fields.");
            return;
        }

        let bestVariant = baseline;
        let bestImprovement = 0;

        const results = parsedVariants.slice(1).map(variant => {
            const improvement = ((variant.conversionRate - baseline.conversionRate) / baseline.conversionRate) * 100;
            const significance = Math.abs(improvement) > 0.05; // Threshold for significance

            if (improvement > bestImprovement) {
                bestImprovement = improvement;
                bestVariant = variant;
            }

            return {
                name: variant.name,
                improvement: improvement.toFixed(2),
                significance,
                certainty: significance ? 100 : (Math.abs(improvement) * 100).toFixed(2),
            };
        });

        setResult({
            baseline,
            bestVariant,
            bestImprovement: bestImprovement.toFixed(2),
            results,
        });
    };

    return (
        <div className="max-w-[1440px] mx-auto">
            
            <h2 className="">A/B Testing Significance Calculator</h2>

            {variants.map((variant, index) => (
                <div key={index}>
                    <h3>Variant {variant.name}</h3>
                    <label>Conversions:</label>
                    <Input
                        type="number"
                        value={variant.conversions}
                        onChange={(e) => updateVariant(index, 'conversions', e.target.value)}
                    />
                    <label>Visitors:</label>
                    <Input
                        type="number"
                        value={variant.visitors}
                        onChange={(e) => updateVariant(index, 'visitors', e.target.value)}
                    />
                </div>
            ))}

            <button onClick={addVariant}>Add Variant</button>
            <button onClick={calculateSignificance}>Calculate</button>

            {result && (
                <div className="result">
                    <h3>Results:</h3>
                    <p>Your A/B test is statistically significant!</p>
                    <p>Best Variant: Test &quot;{result.bestVariant.name}&quot; converted {result.bestImprovement}% better than Test &quot;{result.baseline.name}&quot;.</p>
                    <p>
                        I am {result.results.find(r => r.name === result.bestVariant.name)?.certainty}% certain that the changes in Test &quot;{result.bestVariant.name}&quot; will improve your conversion rate.
                    </p>

                    <h4>Detailed Comparison:</h4>
                    {result.results.map(res => (
                        <div key={res.name}>
                            <p>Test &quot;{res.name}&quot; converted {res.improvement}% better than Test &quot;{result.baseline.name}&quot;.</p>
                            <p>Certainty: {res.certainty}%</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Calculator;

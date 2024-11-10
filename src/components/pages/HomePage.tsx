"use client";

import { Badge } from "@/components/ui/badge"
import { useState } from "react"
import { ChevronRight, BarChart, Search, Link as LinkIcon, Zap } from "lucide-react"

export default function HomePage() {

  const [activeFeature, setActiveFeature] = useState(0)

  const features = [
    { icon: Search, title: "Advanced keyword research", description: "Discover high-value keywords to target with our AI-powered research tool." },
    { icon: BarChart, title: "Content optimization", description: "Get real-time suggestions to optimize your content for better search engine rankings." },
    { icon: LinkIcon, title: "Competitor analysis", description: "Analyze your competitors' strategies and find opportunities to outrank them." },
    { icon: Zap, title: "Backlink opportunities", description: "Identify and secure high-quality backlink opportunities to boost your domain authority." },
  ]

  return (
    <div>
      {/* Hero Section */}
      <main className="flex-grow container mx-auto px-4 py-12 flex flex-col items-center justify-center text-center">
        <Badge variant="secondary" className="mb-4 text-blue-200 bg-white/10 backdrop-blur-sm px-3 py-1 text-sm">
          AI-Powered SEO
        </Badge>
        <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-200 to-blue-400">Revolutionize Your SEO Strategy</h1>
        <p className="text-xl mb-12 max-w-2xl text-blue-100">
          Harness the power of AI to boost your website&apos;s visibility and dominate search rankings.
        </p>

        {/* Content Box */}
        <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-lg w-full max-w-5xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h2 className="text-3xl font-bold mb-4 text-blue-200">Intelligent SEO Analysis</h2>
              <div className="space-y-4">
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className={`flex items-center p-4 rounded-lg transition-all cursor-pointer ${
                      activeFeature === index ? 'bg-blue-500/20' : 'hover:bg-blue-500/10'
                    }`}
                    onClick={() => setActiveFeature(index)}
                  >
                    <feature.icon className="w-6 h-6 mr-4 text-blue-300" />
                    <div>
                      <h3 className="font-semibold text-blue-200">{feature.title}</h3>
                      <p className="text-sm text-blue-100">{feature.description}</p>
                    </div>
                    <ChevronRight className={`w-5 h-5 ml-auto transition-transform ${
                      activeFeature === index ? 'rotate-90' : ''
                    }`} />
                  </div>
                ))}
              </div>
            </div>
            <div className="relative w-full h-[400px] bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl overflow-hidden">
              <div className="absolute inset-0 bg-[url('/placeholder.svg?height=400&width=400')] bg-cover bg-center mix-blend-overlay opacity-50"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <h3 className="text-2xl font-bold mb-2">{features[activeFeature].title}</h3>
                  <p className="text-sm max-w-xs">{features[activeFeature].description}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
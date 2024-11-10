import { Badge } from "@/components/ui/badge"
import Image from "next/image"

export default function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <main className="flex-grow container mx-auto px-4 py-12 flex flex-col items-center justify-center text-center">
        <Badge variant="secondary" className="mb-4 text-blue-900 bg-white px-3 py-1 text-sm">
          AI-Powered SEO
        </Badge>
        <h1 className="text-4xl md:text-6xl font-bold mb-4">Revolutionize Your SEO Strategy</h1>
        <p className="text-xl mb-8 max-w-2xl">
          Harness the power of AI to boost your website&apos;s visibility and dominate search rankings.
        </p>

        {/* Content Box */}
        <div className="bg-blue-800 p-6 rounded-lg shadow-lg w-full max-w-4xl">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="text-left">
              <h2 className="text-2xl font-bold mb-4">Intelligent SEO Analysis</h2>
              <ul className="list-disc list-inside space-y-2">
                <li>Advanced keyword research</li>
                <li>Content optimization suggestions</li>
                <li>Competitor analysis</li>
                <li>Backlink opportunities</li>
              </ul>
            </div>
            <div className="order-first md:order-last">
              <Image
                src="https://images.unsplash.com/photo-1519337364444-c5eeec430101?q=80&w=1928&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="AI SEO Assistant"
                width={400}
                height={300}
                className="rounded-lg"
              />
            </div>
          </div>
        </div>
      </main> 
    </div>
  )
}
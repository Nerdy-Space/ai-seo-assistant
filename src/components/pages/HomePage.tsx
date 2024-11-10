import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import Link from "next/link"

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

      {/* Footer */}
      <footer className="bg-blue-800 py-8">
        <div className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold mb-4">Company</h3>
            <ul className="space-y-2">
              <li><Link href="#" className="hover:text-blue-300">About Us</Link></li>
              <li><Link href="#" className="hover:text-blue-300">Careers</Link></li>
              <li><Link href="#" className="hover:text-blue-300">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">Products</h3>
            <ul className="space-y-2">
              <li><Link href="#" className="hover:text-blue-300">SEO Tool 1</Link></li>
              <li><Link href="#" className="hover:text-blue-300">SEO Tool 2</Link></li>
              <li><Link href="#" className="hover:text-blue-300">SEO Tool 3</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><Link href="#" className="hover:text-blue-300">Blog</Link></li>
              <li><Link href="#" className="hover:text-blue-300">Guides</Link></li>
              <li><Link href="#" className="hover:text-blue-300">Webinars</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><Link href="#" className="hover:text-blue-300">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-blue-300">Terms of Service</Link></li>
              <li><Link href="#" className="hover:text-blue-300">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  )
}
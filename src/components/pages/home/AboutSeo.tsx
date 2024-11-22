import React from 'react';
import { Search, Globe, BarChart } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card"

const AboutSeo = () => {
  return (
    <div className="max-w-[1440px] mx-auto py-16 px-4 md:px-10 bg-gradient-to-b from-white to-gray-100">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-primary mb-8">
        Understanding SEO: Your Key to Online Success
      </h2>
      <Card className="mb-8">
        <CardContent className="pt-6">
          <p className="text-lg leading-relaxed mb-4">
            <span className="font-semibold text-primary">Search Engine Optimization (SEO)</span> is the cornerstone of a strong online presence. But what exactly is SEO, and why is it so crucial for your business? Let's break it down in simple terms.
          </p>
          <p className="text-lg leading-relaxed mb-4">
            At its core, SEO is about making your website more visible and attractive to search engines like Google. When someone searches for products or services related to your business, you want your website to appear at the top of the results. That's where SEO comes in.
          </p>
          <p className="text-lg leading-relaxed mb-4">
            Think of SEO as the process of fine-tuning your website to speak the language of search engines. This involves optimizing various elements such as your content, website structure, and even the way other sites link to yours. By doing so, you're essentially telling search engines, "Hey, my website is a valuable resource for people looking for this information!"
          </p>
          <p className="text-lg leading-relaxed">
            But why is this important? Well, higher visibility in search results means more potential customers can find you easily. It's like having a prime location in the digital marketplace. Good SEO practices lead to increased organic traffic, better brand awareness, and ultimately, more opportunities to convert visitors into customers.
          </p>
        </CardContent>
      </Card>
      <div className="flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center space-x-4">
          <Search className="w-8 h-8 text-primary" />
          <p className="text-lg"><span className="font-semibold">Improved Visibility:</span> Climb to the top of search results</p>
        </div>
        <div className="flex items-center space-x-4">
          <Globe className="w-8 h-8 text-primary" />
          <p className="text-lg"><span className="font-semibold">Wider Reach:</span> Connect with your target audience effectively</p>
        </div>
        <div className="flex items-center space-x-4">
          <BarChart className="w-8 h-8 text-primary" />
          <p className="text-lg"><span className="font-semibold">Better Performance:</span> Boost your website's overall effectiveness</p>
        </div>
      </div>
      <div className="mt-12 text-center">
        <p className="text-xl text-muted-foreground mb-6">
          Ready to harness the power of SEO and elevate your online presence?
        </p>
        <button className="bg-primary text-primary-foreground hover:bg-primary/90 text-lg py-3 px-8 rounded-full shadow-md transition duration-300 transform hover:scale-105">
          Start Your SEO Journey Now
        </button>
      </div>
    </div>
  );
};

export default AboutSeo;


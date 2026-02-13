"use client";

import { useState } from "react";
import { InputSection } from "@/components/InputSection";
import { GeneratedContent, ResultsSection } from "@/components/ResultsSection";

export default function Home() {
  const [data, setData] = useState<GeneratedContent | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async (url: string) => {
    setIsLoading(true);
    setError(null);
    setData(null);

    try {
      // 1. Scrape
      const scrapeRes = await fetch("/api/scrape", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ url })
      });
      const scrapeData = await scrapeRes.json();
      if (!scrapeData.success) throw new Error(scrapeData.error || "Failed to scrape content. Please check the URL.");

      // 2. Generate
      const genRes = await fetch("/api/generate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ 
              content: scrapeData.data.content, 
              originalUrl: url 
          })
      });
      const genData = await genRes.json();
      if (!genData.success) throw new Error(genData.error || "Failed to generate content. Please try again.");

      setData(genData.data);

    } catch (e: any) {
      setError(e.message || "An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col">
      <header className="w-full border-b p-4 flex justify-between items-center bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="font-bold text-xl tracking-tight">AI Content<span className="text-primary">Repurposer</span></div>
        <div className="text-sm text-muted-foreground">upGrowth Assessment</div>
      </header>

      <div className="flex-1 flex flex-col items-center w-full">
        <InputSection onGenerate={handleGenerate} isLoading={isLoading} />
        
        {error && (
            <div className="w-full max-w-lg p-4 mb-8 bg-destructive/10 text-destructive rounded-lg border border-destructive/20 text-center">
                {error.toLowerCase().includes("quota") || error.includes("429") ? (
                  <>
                    <strong>High Traffic! 🚦</strong>
                    <p className="text-sm mt-1">We're on the free tier of Google Gemini. Please wait 60 seconds and try again.</p>
                  </>
                ) : error.toLowerCase().includes("scrape") || error.includes("404") || error.toLowerCase().includes("url") ? (
                  <>
                    <strong>Unable to Read Blog 🚫</strong>
                    <p className="text-sm mt-1">Is the URL public? Sometimes firewalls block scrapers. Try a different article.</p>
                  </>
                ) : error.toLowerCase().includes("safety") || error.toLowerCase().includes("blocked") ? (
                  <>
                    <strong>Content Flagged ⚠️</strong>
                    <p className="text-sm mt-1">The AI refused to process this content due to safety guidelines.</p>
                  </>
                ) : (
                  <>
                    <strong>Error</strong>
                    <p className="text-sm mt-1">{error}</p>
                  </>
                )}
            </div>
        )}

        {data && (
          <div className="w-full bg-secondary/20 flex-1 py-10 border-t">
             <ResultsSection data={data} />
          </div>
        )}
      </div>
    </main>
  );
}

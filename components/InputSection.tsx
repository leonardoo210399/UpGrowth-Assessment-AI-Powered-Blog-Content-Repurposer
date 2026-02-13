"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, ArrowRight } from "lucide-react";

export function InputSection({ onGenerate, isLoading }: { onGenerate: (url: string) => void, isLoading: boolean }) {
  const [url, setUrl] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;
    onGenerate(url);
  };

  return (
    <section className="flex flex-col items-center justify-center py-20 px-4 text-center space-y-8 max-w-3xl mx-auto">
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/50 text-secondary-foreground text-sm font-medium">
          <Sparkles className="w-4 h-4 text-primary" />
          <span>AI-Powered Content Repurposing</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground">
          Turn Blog Posts into <span className="text-primary">Viral Content</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Paste a URL instantly generate LinkedIn posts, Twitter threads, and SEO metadata.
        </p>
      </div>

      <Card className="w-full max-w-lg shadow-lg border-muted">
        <CardContent className="p-2">
          <form onSubmit={handleSubmit} className="flex gap-2 p-1">
            <Input 
              placeholder="https://upgrowth.in/blog/..." 
              className="border-0 focus-visible:ring-0 shadow-none text-base h-12"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
            <Button size="lg" className="h-12 px-6" disabled={isLoading}>
              {isLoading ? (
                "Processing..."
              ) : (
                <>
                  Generate <ArrowRight className="ml-2 w-4 h-4" />
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </section>
  );
}

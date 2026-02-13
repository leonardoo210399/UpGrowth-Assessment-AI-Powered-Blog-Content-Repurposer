"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, Check, Linkedin, Twitter, Video, Search } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export interface GeneratedContent {
  linkedin: { type: string; content: string }[];
  twitter: string[];
  seo: { title: string; description: string };
  video: { title: string; scriptOutline: string };
}

export function ResultsSection({ data }: { data: GeneratedContent }) {
    const [activeTab, setActiveTab] = useState<"linkedin" | "twitter" | "seo" | "video">("linkedin");
    const [copied, setCopied] = useState<string | null>(null);

    const handleCopy = (text: string, id: string) => {
        navigator.clipboard.writeText(text);
        setCopied(id);
        setTimeout(() => setCopied(null), 2000);
    };

    return (
        <div className="w-full max-w-5xl mx-auto p-4 space-y-8 animate-in fade-in slide-in-from-bottom-10 duration-500">
            {/* Tabs */}
            <div className="flex flex-wrap justify-center gap-2">
                {[
                    { id: "linkedin", label: "LinkedIn", icon: Linkedin },
                    { id: "twitter", label: "Twitter", icon: Twitter },
                    { id: "seo", label: "SEO Meta", icon: Search },
                    { id: "video", label: "Video", icon: Video },
                ].map((tab) => (
                    <Button
                        key={tab.id}
                        variant={activeTab === tab.id ? "default" : "outline"}
                        onClick={() => setActiveTab(tab.id as any)}
                        className="gap-2"
                    >
                        <tab.icon className="w-4 h-4" />
                        {tab.label}
                    </Button>
                ))}
            </div>

            {/* Content Area */}
            <div className="grid gap-6">
                {activeTab === "linkedin" && (
                    <div className="grid md:grid-cols-2 gap-4">
                        {data.linkedin.map((post, i) => (
                            <ResultCard 
                                key={i} 
                                title={`${post.type} Post`} 
                                content={post.content} 
                                onCopy={() => handleCopy(post.content, `li-${i}`)}
                                isCopied={copied === `li-${i}`}
                            />
                        ))}
                    </div>
                )}

                {activeTab === "twitter" && (
                    <Card>
                        <CardHeader>
                            <CardTitle>Twitter Thread</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {data.twitter.map((tweet, i) => (
                                <div key={i} className="p-3 bg-muted/50 rounded-lg text-sm border">
                                    {tweet}
                                </div>
                            ))}
                            <Button 
                                variant="outline" 
                                className="w-full mt-2" 
                                onClick={() => handleCopy(data.twitter.join("\n\n"), "tw-all")}
                            >
                                {copied === "tw-all" ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                                Copy Full Thread
                            </Button>
                        </CardContent>
                    </Card>
                )}

                {activeTab === "seo" && (
                    <Card>
                        <CardHeader>
                            <CardTitle>SEO Metadata</CardTitle>
                            <CardDescription>Optimized for high CTR</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Meta Title ({data.seo.title.length} chars)</label>
                                <div className="p-3 bg-muted rounded-md text-sm font-mono">{data.seo.title}</div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Meta Description ({data.seo.description.length} chars)</label>
                                <div className="p-3 bg-muted rounded-md text-sm font-mono">{data.seo.description}</div>
                            </div>
                        </CardContent>
                    </Card>
                )}

                 {activeTab === "video" && (
                    <Card>
                        <CardHeader>
                            <CardTitle>Video Strategy</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Video Title</label>
                                <div className="p-3 bg-muted rounded-md text-lg font-semibold">{data.video.title}</div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Description / Script Outline</label>
                                <div className="p-3 bg-muted rounded-md text-sm whitespace-pre-wrap">{data.video.scriptOutline}</div>
                            </div>
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    );
}

function ResultCard({ title, content, onCopy, isCopied }: { title: string, content: string, onCopy: () => void, isCopied: boolean }) {
    return (
        <Card className="h-full flex flex-col">
            <CardHeader className="pb-3">
                <CardTitle className="text-base">{title}</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 text-sm text-muted-foreground whitespace-pre-wrap">
                {content}
            </CardContent>
            <div className="p-4 pt-0 mt-auto">
                <Button variant="secondary" className="w-full" onClick={onCopy}>
                    {isCopied ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                    {isCopied ? "Copied" : "Copy to Clipboard"}
                </Button>
            </div>
        </Card>
    )
}

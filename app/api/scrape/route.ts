import { NextRequest, NextResponse } from "next/server";
import { scrapeUrl } from "@/lib/scraper";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { url } = body;

        if (!url) {
            return NextResponse.json({ error: "URL is required" }, { status: 400 });
        }

        console.log("Scraping URL:", url);
        const data = await scrapeUrl(url);
        
        return NextResponse.json({
            success: true,
            data: data
        });

    } catch (error: any) {
        console.error("Scrape error:", error);
        return NextResponse.json({ 
            success: false, 
            error: error.message || "Internal server error" 
        }, { status: 500 });
    }
}

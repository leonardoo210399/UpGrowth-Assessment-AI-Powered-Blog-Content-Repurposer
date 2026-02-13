import * as cheerio from "cheerio";
import { type NextRequest, NextResponse } from "next/server";
import validUrl from "valid-url";

export async function scrapeUrl(url: string) {
    try {
        if (!validUrl.isWebUri(url)) {
            throw new Error("Invalid URL provided");
        }

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout

        const response = await fetch(url, {
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
            },
            signal: controller.signal,
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
            throw new Error(`Failed to fetch URL: ${response.status} ${response.statusText}`);
        }

        const html = await response.text();
        const $ = cheerio.load(html);

        // Remove scripts, styles, and other non-content elements
        $("script").remove();
        $("style").remove();
        $("nav").remove();
        $("footer").remove();
        $("iframe").remove();
        $("noscript").remove();

        // Strategy to find the main content
        // 1. Specific selectors for popular sites
        // 2. Semantic HTML5 tags
        // 3. Generic class names
        let content = "";
        
        const selectors = [
            ".entry-content", // WordPress standard
            "article",        // HTML5 standard
            "main",           // HTML5 standard
            "#content",
            ".post-content",
            ".blog-content",
            ".article-body",
            ".story-body",
        ];

        for (const selector of selectors) {
            const element = $(selector);
            if (element.length > 0) {
                // Get text, trim, and collapse whitespace
                content = element.first().text().replace(/\s+/g, " ").trim();
                if (content.length > 500) break; // Found substantial content
            }
        }

        // Fallback: if no specific selector worked, try body but it might be dirty
        if (!content || content.length < 200) {
             content = $("body").text().replace(/\s+/g, " ").trim();
        }

        // Final sanity check
        if (!content || content.length < 100) {
            throw new Error("Could not extract meaningful content from this page");
        }

        // Limit content length to avoid token limits (approx 15k chars is plenty for a blog)
        return {
            title: $("title").text().trim() || "Untitled",
            content: content.substring(0, 15000),
            originalUrl: url
        };

    } catch (error: any) {
        if (error.name === 'AbortError') {
             throw new Error("Request timed out (server took too long to respond)");
        }
        throw error;
    }
}

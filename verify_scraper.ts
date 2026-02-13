
import { scrapeUrl } from './lib/scraper';

async function test(url: string) {
    console.log(`Testing URL: ${url}`);
    try {
        const result = await scrapeUrl(url);
        console.log("✅ Success!");
        console.log("Title:", result.title);
        console.log("Content Length:", result.content.length);
        console.log("Snippet:", result.content.substring(0, 100) + "...");
    } catch (error: any) {
        console.error("❌ Failed:", error.message);
    }
    console.log("-----------------------------------");
}

(async () => {
    // 1. Valid upGrowth URL 
    await test("https://upgrowth.in/case-study/how-we-helped-lendingkart-achieve-business-growth-of-20-through-google-ads/");
    
    // 2. Another Valid site 
    await test("https://techcrunch.com/2024/02/12/vibe-coding-is-real/"); 

    // 3. Known 404
    await test("https://upgrowth.in/case-studies/this-does-not-exist");

    // 4. Invalid URL
    await test("not-a-url");
})();

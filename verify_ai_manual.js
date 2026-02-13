
// verify_ai.js
// Simple script to call the AI API directly (simulating a request)
// NOTE: Since we can't easily fetch our own localhost API from a node script without the server running,
// we will verify this by running the dev server and using curl.

console.log("To verify AI generation, please start the dev server:");
console.log("npm run dev");
console.log("\nThen run this curl command in another terminal:");
console.log(`
curl -X POST http://localhost:3000/api/generate \\
-H "Content-Type: application/json" \\
-d '{
  "originalUrl": "https://upgrowth.in/case-study/lendingkart",
  "content": "Lendingkart is a fintech company that provides working capital loans to SMEs. We helped them scale their user acquisition by 300% using a mix of programmatic SEO and performance marketing. Previously they relied heavily on cold calling. We shifted their focus to inbound leads via high-intent search queries."
}'
`);

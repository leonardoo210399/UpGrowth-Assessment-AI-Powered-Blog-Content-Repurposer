# AI Blog Content Repurposer (Vibe Coder Assessment)

**A production-ready tool that transforms any blog post URL into high-performing social media assets instantly.**

![Project Status](https://img.shields.io/badge/Status-Completed-success) ![Stack](https://img.shields.io/badge/Stack-Next.js_14-black) ![AI](https://img.shields.io/badge/AI-Gemini_3_Flash-blue)

## 🚀 Live Demo

[https://up-growth-assessment-ai-powered-blo.vercel.app](https://up-growth-assessment-ai-powered-blo.vercel.app)

> Note: Production deployment on Vercel.

## 📋 The Assignment

**Goal:** Build an AI-powered tool that takes a blog URL, extracts content, and generates specific marketing assets (LinkedIn posts, Twitter threads, SEO meta, Video scripts).
**Constraints:** 3-5 hours effort, Free-tier deployment, Public GitHub repo.

## ✨ Features

### 1. Robust Content Extraction (`/api/scrape`)

- **Universal Scraper**: Uses `cheerio` with intelligent selectors (`entry-content`, `article`, `main`) to handle WordPress, custom sites, and generic blogs.
- **Sanitization**: Automatically removes scripts, styles, and navigational clutter to feed clean text to the AI.
- **Error Resilience**: User-friendly feedback for Rate Limits (429), Content Safety Blocks, 404s, and un-scrapable content.

### 2. High-Quality AI Generation (`/api/generate`)

- **Generative AI**: Google Gemini 3 Flash Preview (via Vercel AI SDK) for fast, structured, and context-aware repurposing.
- **Persona**: Expert Content Marketer with a "Vibe Coder" tone (modern, punchy, viral).
- **Structured JSON**: No hallucinated formatting. The API returns strict JSON for the UI to render.

### 3. Generated Assets

- **👔 LinkedIn Posts (3 Variations)**:
  - _Educational_: Value-first, bullet points.
  - _Controversial_: Strong opinion/hook to drive engagement.
  - _Story_: Narrative-driven personal angle.
- **🐦 Twitter Thread**: A cohesive 5-7 tweet thread (Hooks -> Value -> CTA).
- **🔍 SEO Metadata**: Optimized Meta Title & Description (high CTR focus).
- **🎥 Video Strategy**: YouTube-style Title & Script Outline.

### 4. Polished UI/UX

- **Responsive Design**: Mobile-friendly layout using Tailwind CSS.
- **Interactive**: Real-time loading states, error feedback, and one-click "Copy" for all assets.
- **Modern Tech**: Built with `shadcn/ui` components for accessibility and aesthetics.

## 🛠️ Tech Stack & Reasoning

| Choice                            | Reasoning (2-3 Sentences)                                                                                                                                                                            |
| :-------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Next.js 14 (App Router)**       | Chosen for its unified architecture. API routes (`/api/scrape`) live alongside the UI, simplifying deployment and avoiding CORS issues. React Server Components ensure fast initial load.            |
| **Tailwind CSS + shadcn/ui**      | Speed of development. `shadcn/ui` provides accessible, copy-paste components (Cards, Tabs, Inputs) that look professional out of the box, allowing me to focus on logic rather than CSS.             |
| **Vercel AI SDK**                 | The gold standard for AI integration in Next.js. It simplifies streaming, structured object generation (`generateObject`), and provider abstraction, making the code cleaner and easier to maintain. |
| **Google Gemini 3 Flash Preview** | Selected for its **speed** and **generous free tier**. It processes long blog contexts instantly and is cost-effective compared to GPT-4, adhering to the "no paid API keys required" constraint.    |
| **Cheerio**                       | Lightweight and fast. Unlike Puppeteer/Playwright (headless browsers), Cheerio parses HTML directly, which is faster and less resource-intensive for simple text extraction tasks.                   |

## 🤖 AI Tools Used

- **Google Gemini 3 Flash Preview**: The core intelligence engine for content repurposing.
- **Vercel AI SDK**: Framework for connecting the frontend to the LLM.
- **Google Deepmind Agent**: Assisted with boilerplate code generation (shadcn setup), debugging extraction logic, and refining the "Expert Marketer" system prompt.

## ⏱️ Time Log (Rough Breakdown)

| Activity                | Time Spent   | Notes                                                         |
| :---------------------- | :----------- | :------------------------------------------------------------ |
| **1. Planning & Setup** | ~20 mins     | Tech stack selection, project initialization.                 |
| **2. Scraper Service**  | ~50 mins     | Implementing generic extraction, handling 404s/timeouts.      |
| **3. UI Development**   | ~60 mins     | Building `InputSection`, `ResultsSection`, Responsive layout. |
| **4. AI Integration**   | ~40 mins     | Prompt engineering (Persona), Vercel SDK setup, JSON schema.  |
| **5. Polish & Deploy**  | ~10 mins     | Loading states, Copy functionality, README, Deployment.       |
| **Total**               | **~3 Hours** | Fits perfectly within the 3-5 hour estimated effort.          |

## 🚀 Setup Instructions (Local)

1.  **Clone the repository**:

    ```bash
    git clone https://github.com/leonardoo210399/UpGrowth-Assessment-AI-Powered-Blog-Content-Repurposer.git
    cd UpGrowth-Assessment-AI-Powered-Blog-Content-Repurposer
    ```

2.  **Install dependencies**:

    ```bash
    npm install
    ```

3.  **Configure Environment Variables**:
    Create a `.env` file in the root directory and add your Google Gemini API Key:

    ```env
    GEMINI_API_KEY=your_api_key_here
    ```

4.  **Run Development Server**:

    ```bash
    npm run dev
    ```

5.  **Open in Browser**:
    Navigate to `http://localhost:3000`.

## 🔮 Future Improvements (Next 2 Hours)

If I had more time, I would add:

1.  **User Authentication**: To save generation history and allow users to revisit past results.
2.  **Tone Selector**: A dropdown to let users choose between "Professional", "Funny", or "Viral" tones before generating.
3.  **Direct Integration**: "Post to LinkedIn" button using the LinkedIn API to publish directly from the dashboard.
4.  **Url Metadata Preview**: Show the blog's OG image/title as a card after pasting the URL to confirm it's the right link.

---

**Submitted by:** Aditya Fulzele
**For:** upGrowth Digital LLP Assessment

# AI Blog Content Repurposer

An AI-powered application that instantly transforms any blog post URL into viral social media assets (LinkedIn, Twitter, SEO, Video).

## Overview

This tool was built to bridge the gap between long-form content and platform-specific short-form needs. It leverages:

- **Content Extraction**: A robust Node.js scraper (`cheerio`) that intelligently parses blog content from various DOM structures (e.g., standard WordPress, Medium, custom sites).
- **Generative AI**: Google Gemini 1.5 Flash (via Vercel AI SDK) for fast, structured, and context-aware repurposing.

## Features

- **Input**: Takes any valid URL.
- **Extraction**: Handles `entry-content`, `article`, `main`, and fallback selectors.
- **AI Output**:
  - 👔 **LinkedIn**: 3 Distinct variations (Educational, Controversial, Story).
  - 🐦 **Twitter**: A full 5-7 tweet thread (optimized for engagement).
  - 🔍 **SEO**: Meta Title & Description optimized for CTR.
  - 🎥 **Video**: YouTube Title & Script Outline.
- **UI/UX**:
  - Clean, modern interface using **shadcn/ui**.
  - One-click "Copy to Clipboard" functionality.
  - Real-time loading states and error handling.

## Tech Stack Choices

- **Next.js 14 (App Router)**: Chosen for its server-side capabilities (easy API routes for scraping) and React Server Components for performance.
- **Tailwind CSS + shadcn/ui**: Selected to ensure a professional, consistent design system without reinventing the wheel. It allows for rapid UI iteration.
- **Vercel AI SDK + Google Gemini**: Used for its type-safe structured output generation (`generateObject`) and Gemini's generous free tier/speed (Flash 1.5).
- **Cheerio**: Preferred over Puppeteer for speed and lower resource overhead. Most blogs are static enough for simple HTML parsing.

## Setup Instructions

1.  **Clone the repository**:

    ```bash
    git clone https://github.com/yourusername/ai-content-repurposer.git
    cd ai-content-repurposer
    ```

2.  **Install dependencies**:

    ```bash
    npm install
    ```

3.  **Configure Environment Variables**:
    Create a `.env` file in the root directory:

    ```env
    GEMINI_API_KEY=your_google_gemini_api_key
    ```

4.  **Run Development Server**:

    ```bash
    npm run dev
    ```

5.  **Access the App**:
    Open `http://localhost:3000` in your browser.

## AI Tools Used

- **Google Gemini 1.5 Flash**: For the core content generation logic.
- **Vercel AI SDK**: For seamless integration with Next.js.
- **AI Coding Assistant**: Used for scaffolding components and refining prompt engineering strategies.

## Future Improvements (Next 2 Hours)

- **User Authentication**: To save generation history per user.
- **Custom Tone Selector**: Allow users to toggle between "Professional", "Casual", or "Viral" tones.
- **Direct Publishing**: Integrate LinkedIn/Twitter APIs to post directly from the dashboard.

---

Built for the upGrowth Assessment.

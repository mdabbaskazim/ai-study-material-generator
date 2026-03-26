import axios from "axios";

const RAG_API_URL = process.env.RAG_API_URL;

/**
 * Fetches relevant context from the local RAG API.
 * @param {string} query - The search topic (e.g., "Deadlock prevention").
 * @param {number} topK - How many chunks to retrieve (default 5).
 */
export async function fetchContextFromRAG(query, topK = 5) {
  try {
    const response = await axios.post(
      RAG_API_URL,
      {
        query: query,
        top_k: topK
      },
      {
        // ⏱️ VERY important: Local RAG (CPU) can take 5-10 seconds.
        // If you don't set this, your app might time out too early.
        timeout: 15000 
      }
    );

    // Safety check: Did we get results?
    if (!response.data || !response.data.results || response.data.results.length === 0) {
      return { context: "", sources: [] };
    }

    // 1. Extract Sources (for citation if needed later)
    const sources = response.data.results.map((item) => ({
      source: item.source,
      page: item.page,
      score: item.score
    }));

    // 2. Format Context String
    // We number them (1), (2)... so the AI knows which part is which.
    const context = response.data.results
      .map((item, idx) => `(${idx + 1}) ${item.content}`)
      .join("\n\n");

    return { context, sources };

  } catch (error) {
    console.error("❌ RAG fetch failed:", error.response?.data || error.message);
    // Return empty context so the app doesn't crash, it just works without RAG.
    return { context: "", sources: [] };
  }
}
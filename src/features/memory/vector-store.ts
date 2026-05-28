// Semantic Memory Cache & Light RAG Store
// Remembers previous successful keywords searches and crawl details to prevent redundant API latency.

export interface VectorDocument {
  id: string;
  query: string;
  payload: any;
  createdAt: string;
}

const semanticMemoryDb: Map<string, VectorDocument> = new Map();

// Helper to calculate simple Jaro-Winkler or Cosine Similarity likeness for query checks
function calculateStringLikeness(str1: string, str2: string): number {
  const s1 = str1.toLowerCase().trim();
  const s2 = str2.toLowerCase().trim();
  if (s1 === s2) return 1.0;

  const matches = s1.split(" ").filter(word => s2.includes(word));
  return matches.length / Math.max(s1.split(" ").length, s2.split(" ").length);
}

export function saveSemanticMemory(query: string, payload: any): VectorDocument {
  const id = `mem_${Date.now()}`;
  const doc: VectorDocument = {
    id,
    query,
    payload,
    createdAt: new Date().toISOString()
  };
  semanticMemoryDb.set(query.toLowerCase(), doc);
  return doc;
}

export function querySemanticMemory(query: string, threshold = 0.85): VectorDocument | null {
  const q = query.toLowerCase().trim();
  
  // Exact match fast-path
  const exact = semanticMemoryDb.get(q);
  if (exact) return exact;

  // Semantic similarity fallback
  for (const [key, doc] of semanticMemoryDb.entries()) {
    const similarity = calculateStringLikeness(q, key);
    if (similarity >= threshold) {
      console.log(`[Memory RAG] Discovered semantic match: "${query}" matches cached key "${key}" (${Math.round(similarity * 100)}%)`);
      return doc;
    }
  }

  return null;
}

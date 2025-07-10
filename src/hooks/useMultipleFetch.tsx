import { useState, useEffect } from "react";

export function useMultipleFetches(urls: string[]) {
  const [results, setResults] = useState<(any | null)[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    async function fetchAll() {
      setLoading(true);
      setError(null);
      setResults([]);

      try {
        const data = await Promise.all(
          urls.map(async (url) => {
            const res = await fetch(url, { signal });
            if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);
            return await res.json();
          })
        );
        setResults(data);
      } catch (err: any) {
        if (err.name === "AbortError") {
          // aborted fetched
          return;
        }
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchAll();
    return () => {
      controller.abort();
    };
  }, [urls]);

  return { results, loading, error };
}

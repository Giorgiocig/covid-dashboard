import { useEffect, useState } from "react";

export const useFetch = (url: string | null) => {
  const [data, setData] = useState<{ [key: string]: any }[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<null | string>(null);
  useEffect(() => {
    if (!url) return;
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(url);
        const json = await res.json();
        setData(json.data || []);
        setIsLoading(false);
      } catch (error) {
        console.error("Errore:", error);
        setError(String(error));
      }
    };
    fetchData();
  }, [url]);
  return { data, isLoading, error };
};

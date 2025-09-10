import { fetchVideos } from "@/services/api";
import { useState, useEffect } from "react";

export function useFetchVideos() {
  const [videos, setVideos] = useState([]); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchVideos()
      .then((data) => {
        setVideos(Array.isArray(data) ? data : data?.videos || []);
      })
      .catch((err) => console.error("Error fetching videos:", err))
      .finally(() => setLoading(false));
  }, []);

  return { videos, loading };
}

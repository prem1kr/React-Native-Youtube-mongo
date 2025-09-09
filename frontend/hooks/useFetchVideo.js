import { fetchVideos } from "@/services/api";
import { useState, useEffect } from "react";

export function useFetchVideos() {
  const [videos, setVideos] = useState({ videos: [] }); // match backend
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchVideos()
      .then((data) => setVideos(data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return { videos, loading };
}

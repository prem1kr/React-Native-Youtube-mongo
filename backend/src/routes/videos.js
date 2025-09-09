const express = require("express");
const router = express.Router();
const Video = require("../models/Video.js");
const { fetchYouTubeMetadata } = require("../controllers/youtubeController.js");

router.get("/", async (req, res) => {
  try {
    const videos = await Video.find({}, { _id: 0, videoId: 1 }).lean();
    const videoIds = videos.map(v => v.videoId);

    if (!videoIds.length) return res.json({ videos: [] });

    const apiKey = process.env.YOUTUBE_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: "YouTube API key not configured on server." });
    }

    const enriched = await fetchYouTubeMetadata(videoIds, apiKey);

    // Maintain DB order
    const enrichedMap = new Map(enriched.map(e => [e.videoId, e]));
    const final = videoIds.map(id => enrichedMap.get(id) || { videoId: id });

    res.json({ videos: final });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;

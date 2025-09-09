require("dotenv").config();
const mongoose = require("mongoose");
const Video = require("./src/models/Video.js");
const { fetchYouTubeMetadata } = require("./src/controllers/youtubeController.js");

const MONGODB_URI = process.env.MONGODB_URI;
const API_KEY = process.env.YOUTUBE_API_KEY;

if (!MONGODB_URI || !API_KEY) {
  console.error("Please set MONGODB_URI and YOUTUBE_API_KEY in .env");
  process.exit(1);
}

const VIDEO_IDS = [
  "TAKXUlC9OB8",
  "PdYuDMdED1E",
  "3qhhFOJ9yX0",
  "bUxd3jqCr94",
  "uaEQYtaJol4",
  "t0Q2otsqC4I",
  "MKHVBV_a2YI",
  "HNIt0Ougk0k",
  "_GE6zf_hH48",
  "Gkysb_8N9os",
];

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("Connected to MongoDB");

    for (const videoId of VIDEO_IDS) {
      await Video.updateOne(
        { videoId },
        { $setOnInsert: { videoId } },
        { upsert: true }
      );
    }
    console.log("Video IDs inserted.");

    const metadata = await fetchYouTubeMetadata(VIDEO_IDS, API_KEY);

    // Step 3: Update each document with metadata
    for (const video of metadata) {
      await Video.updateOne(
        { videoId: video.videoId },
        {
          $set: {
            title: video.title,
            channel: video.channelTitle,
            thumbnail: video.thumbnails.high?.url || "",
            duration: video.duration,
          },
        }
      );
      console.log(`Metadata updated: ${video.title}`);
    }

    console.log("Seed complete with dynamic YouTube metadata.");
    process.exit(0);
  } catch (err) {
    console.error("Seeding error:", err);
    process.exit(1);
  }
}

seed();

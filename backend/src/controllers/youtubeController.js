const axios = require("axios");

/**
 * Fetch YouTube metadata for multiple video IDs
 * @param {string[]} videoIds
 * @param {string} apiKey
 * @returns {Promise<Array>}
 */
async function fetchYouTubeMetadata(videoIds = [], apiKey) {
  if (!videoIds.length) return [];

  const idParam = videoIds.join(",");
  const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails&id=${encodeURIComponent(idParam)}&key=${apiKey}`;

  const resp = await axios.get(url);
  const items = resp.data.items || [];

  return items.map(item => {
    const { id, snippet, contentDetails } = item;
    return {
      videoId: id,
      title: snippet.title,
      channelTitle: snippet.channelTitle,
      thumbnails: snippet.thumbnails,
      duration: iso8601DurationToSeconds(contentDetails?.duration || "")
    };
  });
}

/**
 * Convert ISO 8601 duration (PT#H#M#S) to seconds
 * @param {string} isoDuration
 * @returns {number}
 */
function iso8601DurationToSeconds(isoDuration) {
  if (!isoDuration) return 0;
  const match = isoDuration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return 0;
  const hours = parseInt(match[1] || "0", 10);
  const minutes = parseInt(match[2] || "0", 10);
  const seconds = parseInt(match[3] || "0", 10);
  return hours * 3600 + minutes * 60 + seconds;
}

module.exports = { fetchYouTubeMetadata, iso8601DurationToSeconds };

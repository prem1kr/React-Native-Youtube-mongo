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
  const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${encodeURIComponent(idParam)}&key=${apiKey}`;

  const resp = await axios.get(url);
  const items = resp.data.items || [];

  const channelIds = [...new Set(items.map(item => item.snippet.channelId))];
  const channelLogos = await fetchChannelLogos(channelIds, apiKey);

  return items.map(item => {
    const { id, snippet, contentDetails, statistics } = item;
    return {
      videoId: id,
      title: snippet.title,
      channelTitle: snippet.channelTitle,
      thumbnails: snippet.thumbnails,
      duration: iso8601DurationToMinutes(contentDetails?.duration || ""),
      views: formatViews(parseInt(statistics?.viewCount || "0", 10)), 
      publishedAt: snippet.publishedAt,
      channelLogo: channelLogos[snippet.channelId] || null
    };
  });
}

/**
 * Format number of views in millions (e.g., 1.2M)
 * @param {number} views
 * @returns {string}
 */
function formatViews(views) {
  if (views >= 1_000_000) {
    return (views / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
  } else if (views >= 1_000) {
    return (views / 1_000).toFixed(1).replace(/\.0$/, "") + "K";
  }
  return views.toString();
}

/**
 * Fetch channel logos for given channel IDs
 * @param {string[]} channelIds
 * @param {string} apiKey
 * @returns {Promise<Object>} { channelId: logoUrl }
 */
async function fetchChannelLogos(channelIds = [], apiKey) {
  if (!channelIds.length) return {};

  const idParam = channelIds.join(",");
  const url = `https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${encodeURIComponent(idParam)}&key=${apiKey}`;

  const resp = await axios.get(url);
  const items = resp.data.items || [];

  const logos = {};
  items.forEach(item => {
    logos[item.id] = item.snippet.thumbnails?.default?.url || null;
  });

  return logos;
}

/**
 * Convert ISO 8601 duration (PT#H#M#S) to minutes
 * @param {string} isoDuration
 * @returns {number} duration in minutes
 */
function iso8601DurationToMinutes(isoDuration) {
  if (!isoDuration) return 0;
  const match = isoDuration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return 0;

  const hours = parseInt(match[1] || "0", 10);
  const minutes = parseInt(match[2] || "0", 10);
  const seconds = parseInt(match[3] || "0", 10);

  return hours * 60 + minutes + (seconds > 0 ? 1 : 0);
}

module.exports = { fetchYouTubeMetadata, iso8601DurationToMinutes };

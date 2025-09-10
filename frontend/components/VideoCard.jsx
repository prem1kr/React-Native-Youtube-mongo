import { useRouter } from "expo-router";
import { TouchableOpacity, Image, StyleSheet } from "react-native";
import { Text, View } from "react-native";

function formatDuration(seconds) {
  if (!seconds) return "";
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  if (hrs > 0) {
    return `${hrs}:${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  }
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

export default function VideoCard({ video }) {
  const router = useRouter();

  const thumbnailUrl =
    video?.thumbnails?.high?.url ||
    video?.thumbnails?.medium?.url ||
    video?.thumbnails?.default?.url ||
    "https://via.placeholder.com/300x200.png?text=No+Thumbnail";

  const durationText = formatDuration(video?.duration || 0);

  const channelLogoUrl =
    video?.channelLogo ||
    "https://via.placeholder.com/50x50.png?text=No+Logo";

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => router.push(`/video/${video.videoId}`)}
    >
      <View style={styles.thumbnailWrapper}>
        <Image source={{ uri: thumbnailUrl }} style={styles.thumbnail} />
        {durationText ? (
          <View style={styles.durationBadge}>
            <Text style={styles.durationText}>{durationText}</Text>
          </View>
        ) : null}
      </View>

      <View style={styles.infoRow}>
        <View style={styles.logoWrapper}>
          <Image source={{ uri: channelLogoUrl }} style={styles.channelLogo} />
        </View>

        <View style={styles.infoRight}>
          <Text style={styles.channel}>{video.channelTitle}</Text>

          <Text style={styles.title} numberOfLines={2}>
            {video.title}
          </Text>

          <Text style={styles.meta}>
            {video.views ? `${video.views} views · ` : ""}
            {video.publishedAt
              ? new Date(video.publishedAt).toLocaleDateString()
              : ""}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: { marginBottom: 20 },
  thumbnailWrapper: { position: "relative" },
  thumbnail: { width: "100%", height: 200, borderRadius: 10 },
  durationBadge: {
    position: "absolute",
    bottom: 8,
    right: 8,
    backgroundColor: "rgba(0,0,0,0.8)",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  durationText: { color: "#fff", fontSize: 12, fontWeight: "bold" },
  infoRow: { flexDirection: "row", alignItems: "center", marginTop: 8, paddingHorizontal: 5 },
  logoWrapper: { flex: 0.1, alignItems: "center" },
  channelLogo: { width: 36, height: 36, borderRadius: 18 },
  infoRight: { flex: 0.9, paddingLeft: 8 },
  channel: { color: "#aaa", fontSize: 14, marginBottom: 2 },
  title: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  meta: { color: "#aaa", fontSize: 13, marginTop: 2 },
});

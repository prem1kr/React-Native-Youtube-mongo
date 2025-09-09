import { useRouter } from "expo-router"; 
import { TouchableOpacity, Image, StyleSheet } from "react-native";
import { Text, View } from "react-native";

export default function VideoCard({ video }) {
  const router = useRouter();

  // Fallback thumbnail (or pick another quality like medium, default)
  const thumbnailUrl =
    video?.thumbnails?.high?.url ||
    video?.thumbnails?.medium?.url ||
    video?.thumbnails?.default?.url ||
    "https://via.placeholder.com/300x200.png?text=No+Thumbnail";

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => router.push(`/video/${video.videoId}`)}
    >
      <Image source={{ uri: thumbnailUrl }} style={styles.thumbnail} />
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={2}>
          {video.title}
        </Text>
        <Text style={styles.channel}>{video.channelTitle}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: { marginBottom: 15 },
  thumbnail: { width: "100%", height: 200, borderRadius: 10 },
  info: { marginTop: 8, paddingHorizontal: 5 },
  title: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  channel: { color: "#aaa", fontSize: 14, marginTop: 2 },
});

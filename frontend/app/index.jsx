import VideoCard from "@/components/VideoCard";
import { useFetchVideos } from "@/hooks/useFetchVideo";
import { FlatList, SafeAreaView, StyleSheet, Text, Platform, View, Dimensions } from "react-native";

export default function HomeScreen() {
  const { videos, loading } = useFetchVideos();

  if (loading) {
    return (
      <SafeAreaView style={styles.center}>
        <Text style={{ color: "#fff" }}>Loading...</Text>
      </SafeAreaView>
    );
  }

  // ✅ Web: Grid view with full height
  if (Platform.OS === "web") {
    return (
      <View style={styles.webContainer}>
        <FlatList
          data={videos.videos}
          keyExtractor={(item) => item.videoId}
          renderItem={({ item }) => (
            <View style={styles.gridItem}>
              <VideoCard video={item} />
            </View>
          )}
          numColumns={3} // 3 equal columns
          columnWrapperStyle={styles.columnWrapper}
          contentContainerStyle={styles.webContent}
        />
      </View>
    );
  }

  // ✅ Mobile: Vertical list
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={videos.videos}
        keyExtractor={(item) => item.videoId}
        renderItem={({ item }) => <VideoCard video={item} />}
        contentContainerStyle={{ padding: 10 }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#121212",
  },

  webContainer: {
    flex: 1,
    width: "100%",
    height: Dimensions.get("window").height,
    backgroundColor: "#121212",
    alignItems: "center",
  },
  webContent: {
    padding: 20,
  },
  columnWrapper: {
    justifyContent: "space-between",
    marginBottom: 20, 
  },
  gridItem: {
    flex: 1,
    marginHorizontal: 10, 
    maxWidth: "35%",     
  },
});

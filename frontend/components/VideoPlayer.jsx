import React, { useState, useCallback } from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  Text,
  FlatList,
  ActivityIndicator,
  StatusBar,
} from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";
import { useFetchVideos } from "../hooks/useFetchVideo.js";
import VideoCard from "./VideoCard.jsx";

export default function VideoPlayer({ videoId: initialVideoId }) {
  const [videoId, setVideoId] = useState(initialVideoId);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const { videos, loading } = useFetchVideos();

  const currentVideo = videos.find((v) => v.videoId === videoId);

  // Handle fullscreen toggle
  const onFullScreenChange = useCallback((status) => {
    setIsFullScreen(status);
    StatusBar.setHidden(status, "fade");
  }, []);

  return (
    <View style={styles.container}>
      {/* --- Fixed Player --- */}
      <View
        style={[
          styles.videoWrapper,
          isFullScreen && styles.fullScreenVideoWrapper,
        ]}
      >
        <YoutubePlayer
          height={
            isFullScreen
              ? Dimensions.get("window").height
              : Dimensions.get("window").width * 0.56
          }
          width={isFullScreen ? Dimensions.get("window").width : "100%"}
          play={true}
          videoId={videoId}
          onFullScreenChange={onFullScreenChange}
          initialPlayerParams={{
            autoplay: false,
            modestbranding: true, 
            rel: false,           
            controls: true,
            disablekb: 1,         
            origin: "https://www.youtube.com", 
          }}
        />
      </View>

      {!isFullScreen && (
        <>
          {loading ? (
            <ActivityIndicator
              size="large"
              color="#fff"
              style={{ marginTop: 20 }}
            />
          ) : (
            <FlatList
              data={videos.filter((v) => v.videoId !== videoId)}
              keyExtractor={(item) => item.videoId}
              renderItem={({ item }) => (
                <VideoCard
                  video={item}
                  onPress={() => setVideoId(item.videoId)}
                />
              )}
              contentContainerStyle={{ paddingBottom: 20 }}
              ListHeaderComponent={
                <>
                  {/* Current video info */}
                  <View style={styles.infoContainer}>
                    <Text style={styles.videoTitle}>
                      {currentVideo?.title || "Loading"}
                    </Text>
                    <Text style={styles.meta}>
                      {currentVideo?.views
                        ? `${currentVideo.views} views · `
                        : ""}
                      {currentVideo?.publishedAt
                        ? new Date(
                            currentVideo.publishedAt
                          ).toLocaleDateString()
                        : ""}
                    </Text>
                  </View>

                  <Text style={styles.suggestedHeader}>Suggested Videos</Text>
                </>
              }
            />
          )}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
  },
  videoWrapper: {
    borderRadius: 16,
    overflow: "hidden",
    margin: 10,
    backgroundColor: "#000",
  },
  fullScreenVideoWrapper: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 999,
    margin: 0,
    borderRadius: 0,
    backgroundColor: "#000",
  },
  infoContainer: {
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  videoTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  meta: {
    color: "#aaa",
    fontSize: 13,
    marginTop: 2,
  },
  suggestedHeader: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginVertical: 8,
    marginLeft: 12,
  },
});

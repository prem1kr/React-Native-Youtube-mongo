import React, { useState, useCallback, useEffect } from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  Text,
  FlatList,
  ActivityIndicator,
  StatusBar,
  Platform,
} from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";
import { useFetchVideos } from "../hooks/useFetchVideo.js";
import VideoCard from "./VideoCard.jsx";

export default function VideoPlayer({ videoId: initialVideoId }) {
  const [videoId, setVideoId] = useState(initialVideoId);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(Dimensions.get("window").width);

  const { videos, loading } = useFetchVideos();
  const currentVideo = videos.find((v) => v.videoId === videoId);

  const onFullScreenChange = useCallback((status) => {
    setIsFullScreen(status);
    StatusBar.setHidden(status, "fade");
  }, []);

  useEffect(() => {
    const subscription = Dimensions.addEventListener("change", ({ window }) => {
      setWindowWidth(window.width);
    });
    return () => subscription?.remove();
  }, []);

  const isDesktop = Platform.OS === "web" && windowWidth >= 480;

  
if (isDesktop) {
let suggestedNumColumns;
if (windowWidth > 1080) {
  suggestedNumColumns = 2;
} else {
  suggestedNumColumns = 1;
}

  return (
    <View style={styles.webContainer}>
      <View style={styles.leftPane}>
        <View style={[styles.videoWrapper, isFullScreen && styles.fullScreenVideoWrapper]}>
          <YoutubePlayer
            height={(windowWidth * 0.7) * 0.56}
            width="100%"
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

        <View style={styles.infoContainer}>
          <Text style={styles.videoTitle}>{currentVideo?.title || "Loading"}</Text>
          <Text style={styles.meta}>
            {currentVideo?.views ? `${currentVideo.views} views · ` : ""}
            {currentVideo?.publishedAt
              ? new Date(currentVideo.publishedAt).toLocaleDateString()
              : ""}
          </Text>
        </View>
      </View>

      <View style={styles.rightPane}>
        <Text style={styles.suggestedHeader}>Suggested Videos</Text>
        {loading ? (
          <ActivityIndicator size="large" color="#fff" />
        ) : (
          <View
            style={[
              styles.suggestedGrid,
              suggestedNumColumns > 1
                ? { gridTemplateColumns: "1fr 1fr" }
                : { gridTemplateColumns: "1fr" },
            ]}
          >
            {videos
              .filter((v) => v.videoId !== videoId)
              .map((video) => (
                <VideoCard
                  key={video.videoId}
                  video={video}
                  onPress={() => setVideoId(video.videoId)}
                />
              ))}
          </View>
        )}
      </View>
    </View>
  );
}


  return (
    <View style={styles.container}>
      <View style={[styles.videoWrapper, isFullScreen && styles.fullScreenVideoWrapper]}>
        <YoutubePlayer
          height={isFullScreen ? Dimensions.get("window").height : windowWidth * 0.56}
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
          <View style={styles.infoContainer}>
            <Text style={styles.videoTitle}>{currentVideo?.title || "Loading"}</Text>
            <Text style={styles.meta}>
              {currentVideo?.views ? `${currentVideo.views} views · ` : ""}
              {currentVideo?.publishedAt
                ? new Date(currentVideo.publishedAt).toLocaleDateString()
                : ""}
            </Text>
          </View>

          <Text style={styles.suggestedHeader}>Suggested Videos</Text>
          {loading ? (
            <ActivityIndicator size="large" color="#fff" style={{ marginTop: 20 }} />
          ) : (
            <FlatList
              data={videos.filter((v) => v.videoId !== videoId)}
              keyExtractor={(item) => item.videoId}
              renderItem={({ item }) => (
                <VideoCard video={item} onPress={() => setVideoId(item.videoId)} />
              )}
              contentContainerStyle={{ paddingBottom: 20 }}
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
    marginBottom: 10,
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
    marginBottom: 10,
  },
  webContainer: {
  display: "grid",
  gridTemplateColumns: "60% 40%",
  width: "100%",
  height: "100vh", 
  backgroundColor: "#121212",
  gap: 20,
  padding: 20,
},
leftPane: {
  display: "flex",
  flexDirection: "column",
  gap: 20,
  height: "100%",
},
rightPane: {
  overflowY: "auto",
  height: "100%", 
},
suggestedGrid: {
  display: "grid",
 
  gap: 10,
},

});

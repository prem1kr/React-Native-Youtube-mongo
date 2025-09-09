import React from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";

export default function VideoPlayer({ videoId }) {
  return (
    <View style={styles.container}>
      <YoutubePlayer
        height={Dimensions.get("window").width * 0.56}
        play={true}
        videoId={videoId}
        initialPlayerParams={{
          autoplay: false,
          modestbranding: false, 
          rel: false,           
          controls: true,       
          showinfo: true,      
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
});

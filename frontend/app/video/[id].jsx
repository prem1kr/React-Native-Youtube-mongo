import { useLocalSearchParams } from "expo-router"; 
import { SafeAreaView, StyleSheet, Platform, View, Dimensions } from "react-native";
import VideoPlayer from "@/components/VideoPlayer";

export default function VideoDetail() {
  const { id } = useLocalSearchParams();

  if (Platform.OS === "web") {
    return (
      <View style={styles.webContainer}>
        <VideoPlayer videoId={id} />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <VideoPlayer videoId={id} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#000" 
  },
  webContainer: {
    width: "100%",
    height: Dimensions.get("window").height, 
    backgroundColor: "#000",
  },
});

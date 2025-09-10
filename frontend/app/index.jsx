import VideoCard from "@/components/VideoCard";
import { useFetchVideos } from "@/hooks/useFetchVideo";
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  Platform,
  View,
  Dimensions,
} from "react-native";
import { useState, useEffect } from "react";

export default function HomeScreen() {
  const { videos, loading } = useFetchVideos();
  const [numColumns, setNumColumns] = useState(1);
  const [itemWidth, setItemWidth] = useState("100%");

  // calculate number of columns and item width dynamically
  const calculateColumns = () => {
    const screenWidth = Dimensions.get("window").width;
    let columns = 1;

    if (screenWidth > 1600) columns = 5;
    else if (screenWidth > 1200) columns = 4;
    else if (screenWidth > 900) columns = 3;
    else if (screenWidth > 600) columns = 2;

    setNumColumns(columns);
    setItemWidth(`${100 / columns - 2}%`);
  };

  useEffect(() => {
    calculateColumns();
    const subscription = Dimensions.addEventListener("change", calculateColumns);
    return () => subscription?.remove();
  }, []);

  if (loading) {
    return (
      <SafeAreaView style={styles.center}>
        <Text style={{ color: "#fff" }}>Loading...</Text>
      </SafeAreaView>
    );
  }

  const flatListKey = `flatlist-${numColumns}`; // force FlatList to re-render on column change

  if (Platform.OS === "web") {
    return (
      <View style={styles.webContainer}>
        <FlatList
          key={flatListKey} // use dynamic key
          data={videos}
          keyExtractor={(item) => item.videoId}
          renderItem={({ item }) => (
            <View style={[styles.gridItem, { maxWidth: itemWidth }]}>
              <VideoCard video={item} />
            </View>
          )}
          numColumns={numColumns}
          columnWrapperStyle={
            numColumns > 1 ? { justifyContent: "flex-start", marginBottom: 20 } : null
          }
          contentContainerStyle={styles.webContent}
        />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={videos}
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
  gridItem: {
    flex: 1,
    marginHorizontal: 10,
  },
});

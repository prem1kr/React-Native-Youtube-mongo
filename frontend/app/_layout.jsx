import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

export default function Layout() {
  return (
    <>
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: "#0f0f0f" }, 
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
            fontSize: 18, 
            color: "#ff0000", 
          },
          headerTitleAlign: "left", 
          headerShadowVisible: false,
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            title: "MongoTube",
            headerRight: () => (
              <View style={{ flexDirection: "row", marginRight: 6 }}>
                <Ionicons
                  name="notifications-outline"
                  size={22}
                  color="#fff"
                  style={{ marginHorizontal: 6 }}
                />
                <Ionicons
                  name="search"
                  size={22}
                  color="#fff"
                  style={{ marginHorizontal: 6 }}
                />
                <MaterialIcons
                  name="mic-none"
                  size={22}
                  color="#fff"
                  style={{ marginHorizontal: 6 }}
                />
              </View>
            ),
          }}
        />
      </Stack>

      <StatusBar style="light" backgroundColor="#0f0f0f" />
    </>
  );
}

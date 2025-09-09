import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function Layout() {
  return (
    <>
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: "#1e1e1e" },
          headerTintColor: "#fff",
        }}
      />
      <StatusBar style="light" />
    </>
  );
}

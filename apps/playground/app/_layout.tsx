import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: "#09090B" },
        headerTintColor: "#FAFAFA",
        contentStyle: { backgroundColor: "#09090B" }
      }}
    />
  );
}

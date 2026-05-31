import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function Home() {
  return (
    <View style={styles.screen}>
      <Text style={styles.eyebrow}>Storeshots Playground</Text>
      <Text style={styles.title}>Generate store screenshots from app routes.</Text>
      <Text style={styles.body}>This sample route tree is used to test Storeshots discovery and capture.</Text>
      <View style={styles.links}>
        <Link href="/profile" style={styles.link}>Profile</Link>
        <Link href="/subscription" style={styles.link}>Subscription</Link>
        <Link href="/settings" style={styles.link}>Settings</Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    gap: 18,
    padding: 28,
    backgroundColor: "#09090B"
  },
  eyebrow: {
    color: "#3B82F6",
    fontSize: 13,
    fontWeight: "700",
    textTransform: "uppercase"
  },
  title: {
    color: "#FAFAFA",
    fontSize: 36,
    fontWeight: "800",
    lineHeight: 42
  },
  body: {
    color: "#A1A1AA",
    fontSize: 17,
    lineHeight: 25
  },
  links: {
    gap: 12,
    marginTop: 10
  },
  link: {
    color: "#22C55E",
    fontSize: 16,
    fontWeight: "700"
  }
});

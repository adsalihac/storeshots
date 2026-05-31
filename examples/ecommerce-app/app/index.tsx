import { StyleSheet, Text, View } from "react-native";

export default function Storefront() {
  return (
    <View style={styles.screen}>
      <Text style={styles.eyebrow}>Storefront</Text>
      <Text style={styles.title}>Curated tools for mobile teams.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    padding: 28,
    backgroundColor: "#09090B"
  },
  eyebrow: {
    color: "#3B82F6",
    fontSize: 14,
    fontWeight: "800"
  },
  title: {
    marginTop: 12,
    color: "#FAFAFA",
    fontSize: 34,
    fontWeight: "900",
    lineHeight: 40
  }
});

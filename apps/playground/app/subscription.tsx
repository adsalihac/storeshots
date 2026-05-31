import { StyleSheet, Text, View } from "react-native";

export default function Subscription() {
  return (
    <View style={styles.screen}>
      <Text style={styles.eyebrow}>Pro</Text>
      <Text style={styles.title}>Ship screenshots faster.</Text>
      <View style={styles.card}>
        <Text style={styles.price}>$12</Text>
        <Text style={styles.body}>per project, per month</Text>
      </View>
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
    color: "#22C55E",
    fontSize: 14,
    fontWeight: "800",
    textTransform: "uppercase"
  },
  title: {
    marginTop: 12,
    color: "#FAFAFA",
    fontSize: 34,
    fontWeight: "800",
    lineHeight: 40
  },
  card: {
    marginTop: 28,
    padding: 24,
    borderRadius: 24,
    backgroundColor: "#111111",
    borderWidth: 1,
    borderColor: "#27272A"
  },
  price: {
    color: "#FAFAFA",
    fontSize: 46,
    fontWeight: "900"
  },
  body: {
    color: "#A1A1AA",
    fontSize: 16
  }
});

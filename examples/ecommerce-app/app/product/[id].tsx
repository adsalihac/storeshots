import { StyleSheet, Text, View } from "react-native";

export default function Product() {
  return (
    <View style={styles.screen}>
      <Text style={styles.eyebrow}>Dynamic route</Text>
      <Text style={styles.title}>Product detail</Text>
      <Text style={styles.body}>Shotify reports this route as /product/:id.</Text>
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
    fontWeight: "800"
  },
  title: {
    marginTop: 12,
    color: "#FAFAFA",
    fontSize: 34,
    fontWeight: "900"
  },
  body: {
    marginTop: 12,
    color: "#A1A1AA",
    fontSize: 17
  }
});

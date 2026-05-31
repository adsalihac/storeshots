import { StyleSheet, Text, View } from "react-native";

export default function Checkout() {
  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Checkout</Text>
      <Text style={styles.body}>Fast purchase flow for App Store screenshots.</Text>
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
  title: {
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

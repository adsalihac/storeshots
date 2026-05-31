import { StyleSheet, Text, View } from "react-native";

export default function Profile() {
  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Profile</Text>
      <Text style={styles.body}>This route becomes /profile.</Text>
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
    fontSize: 36,
    fontWeight: "800"
  },
  body: {
    marginTop: 12,
    color: "#A1A1AA",
    fontSize: 17
  }
});

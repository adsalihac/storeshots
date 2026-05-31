import { StyleSheet, Text, View } from "react-native";

export default function Courses() {
  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Courses</Text>
      <Text style={styles.body}>A stable screenshot route for a course catalog.</Text>
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

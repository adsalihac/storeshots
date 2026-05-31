import { StyleSheet, Text, View } from "react-native";

export default function Profile() {
  return (
    <View style={styles.screen}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>S</Text>
      </View>
      <Text style={styles.title}>Developer profile</Text>
      <Text style={styles.body}>A clean route for testing person-focused App Store screenshots.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 28,
    backgroundColor: "#09090B"
  },
  avatar: {
    alignItems: "center",
    justifyContent: "center",
    width: 96,
    height: 96,
    borderRadius: 30,
    backgroundColor: "#3B82F6"
  },
  avatarText: {
    color: "#FFFFFF",
    fontSize: 38,
    fontWeight: "800"
  },
  title: {
    marginTop: 28,
    color: "#FAFAFA",
    fontSize: 30,
    fontWeight: "800"
  },
  body: {
    marginTop: 10,
    color: "#A1A1AA",
    textAlign: "center",
    fontSize: 16,
    lineHeight: 24
  }
});

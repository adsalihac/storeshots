import { StyleSheet, Text, View } from "react-native";

const rows = ["Simulator", "Route fixtures", "Image quality", "CI export"];

export default function Settings() {
  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Screenshot settings</Text>
      {rows.map((row) => (
        <View key={row} style={styles.row}>
          <Text style={styles.rowText}>{row}</Text>
          <Text style={styles.status}>Enabled</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    gap: 12,
    padding: 28,
    backgroundColor: "#09090B"
  },
  title: {
    marginBottom: 18,
    color: "#FAFAFA",
    fontSize: 30,
    fontWeight: "800"
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 18,
    borderRadius: 18,
    backgroundColor: "#111111",
    borderWidth: 1,
    borderColor: "#27272A"
  },
  rowText: {
    color: "#FAFAFA",
    fontSize: 16,
    fontWeight: "700"
  },
  status: {
    color: "#22C55E",
    fontSize: 13,
    fontWeight: "800"
  }
});

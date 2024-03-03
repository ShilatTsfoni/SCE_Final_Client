import { View, Text, StyleSheet } from "react-native";

function Processing() {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.text}>עובדים על זה ...</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  textContainer: {
    width: 327,
    height: 40,
    top: 386,
  },
  text: {
    fontFamily: "Caravan",
    fontWeight: 900,
    fontSize: 36,
    lineHeight: 40,
    textAlign: "center",
  },
});

export default Processing;

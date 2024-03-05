import { TouchableOpacity, Text, StyleSheet } from "react-native";

function BackButton({ onPress, title }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 4,
    borderRadius: 4,
  },
  buttonText: {
    color: "#5C5C66",
    fontFamily: "Assistant",
    fontWeight: "600",
    fontSize: 16,
    lineHeight: 24,
    alignSelf: "flex-end",
  },
});

export default BackButton;

import { StyleSheet, Text, TouchableOpacity } from "react-native";

function LinkButton({ title, onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={styles.linkText}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  linkText: {
    color: "#007AFF",
    textDecorationLine: "underline",
    fontSize: 16,
  },
});

export default LinkButton;

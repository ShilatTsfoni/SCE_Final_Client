import { TouchableOpacity, Text, StyleSheet } from "react-native";

function CustomButton({ onPress, title, buttonColor, textColor, borderColor }) {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor: buttonColor, borderColor: borderColor },
      ]}
      onPress={onPress}
    >
      <Text style={[styles.buttonText, { color: textColor }]}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 4,
    borderWidth: 1,
  },
  buttonText: {
    fontFamily: "Assistant",
    fontSize: 16,
    fontWeight: 600,
    textAlign: "center",
    lineHeight: 24,
  },
});

export default CustomButton;

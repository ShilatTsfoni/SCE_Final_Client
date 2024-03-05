import { View, Text, StyleSheet } from "react-native";
import { Icon } from "@rneui/themed";

function CustomMessage({ message, borderColor, iconName, iconColor }) {
  return (
    <View style={[styles.container, { borderColor: borderColor }]}>
      <Icon name={iconName} color={iconColor} style={styles.icon} />
      <Text style={styles.text}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row-reverse",
    alignItems: "center",
    width: 300,
    height: 56,
    borderRadius: 4,
    borderWidth: 1,
    padding: 16,
    alignSelf: "center",
  },
  text: {
    fontFamily: "Assistant",
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 24,
    textAlign: "right",
    flex: 1,
  },
  icon: {
    marginLeft: 8,
  },
});

export default CustomMessage;

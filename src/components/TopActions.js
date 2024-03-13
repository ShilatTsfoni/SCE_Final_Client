import { TouchableOpacity, View } from "react-native";
import { Ionicons, AntDesign } from "@expo/vector-icons";

function TopActions() {
  return (
    <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
      <TouchableOpacity onPress={() => {}}>
        <AntDesign name="hearto" color="#ED4B9E" size={24} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => {}}>
        <AntDesign name="sharealt" color="#0A100D" size={24} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => {}}>
        <Ionicons name="arrow-forward" color="#0A100D" size={24} />
      </TouchableOpacity>
    </View>
  );
}

export default TopActions;

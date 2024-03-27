import { TouchableOpacity, View } from "react-native";
import { Ionicons, AntDesign } from "@expo/vector-icons";

function TopActions() {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 16,
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <TouchableOpacity onPress={() => {}}>
          <AntDesign name="hearto" color="#ED4B9E" size={24} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {}} style={{ marginLeft: 20 }}>
          <AntDesign name="sharealt" color="#0A100D" size={24} />
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={() => {}}>
        <Ionicons name="arrow-forward" color="#0A100D" size={24} />
      </TouchableOpacity>
    </View>
  );
}

export default TopActions;

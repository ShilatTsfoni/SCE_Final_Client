import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Messages from "../views/userViews/Messages";
import ChatWindow from "../views/userViews/ChatWindow";

const Stack = createNativeStackNavigator();

function HomeNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTransparent: true,
        headerShown: false,
        animation: "slide_from_right",
      }}
    >
      <Stack.Screen name="messagesPage" component={Messages} />
      <Stack.Screen name="ChatWindow" component={ChatWindow} />
    </Stack.Navigator>
  );
}

export default HomeNavigator;

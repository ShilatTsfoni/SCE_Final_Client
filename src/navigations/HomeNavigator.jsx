import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomePage from "../views/userViews/HomePage";
import ActivityScreen from "../views/userViews/ActivityScreen";

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
      <Stack.Screen name="Home" component={HomePage} />
      <Stack.Screen name="ActivityScreen" component={ActivityScreen} />
    </Stack.Navigator>
  );
}

export default HomeNavigator;

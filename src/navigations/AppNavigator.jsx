import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeNavigator from "./HomeNavigator";
import SearchScreen from "../views/userViews/SearchScreen";
import MyActivity from "../views/userViews/MyActivity.js";
import ProfilePage from "../views/userViews/ProfilePage.js";
import { StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerTransparent: true,
        headerShown: false,
        animation: "slide_from_right",
        tabBarLabelStyle: { fontSize: 12, padding: 0 },
        tabBarStyle: { backgroundColor: "#ffffff" },
      }}
    >
      <Tab.Screen
        name="HomePage"
        component={HomeNavigator}
        options={{
          tabBarLabel: "בית",
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="MyActivity"
        component={MyActivity}
        options={{
          tabBarLabel: "פעילויות",
          tabBarIcon: ({ color, size }) => (
            <Icon name="list-alt" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="SearchScreen"
        component={SearchScreen}
        options={{
          tabBarLabel: "חיפוש",
          tabBarIcon: ({ color, size }) => (
            <Icon name="search" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="ProfilePage"
        component={ProfilePage}
        options={{
          tabBarLabel: "פרופיל",
          tabBarIcon: ({ color, size }) => (
            <Icon name="user" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default AppNavigator;

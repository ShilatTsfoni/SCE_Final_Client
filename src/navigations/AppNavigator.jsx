import React, { useContext } from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeNavigator from "./HomeNavigator";
import SearchScreen from "../views/userViews/SearchScreen";
import MyActivity from "../views/userViews/MyActivity.js";
import ProfilePage from "../views/userViews/ProfilePage.js";
import MessagesNavigator from "./MessagesNavigator.jsx";
import NotificationsScreen from "../views/userViews/NotificationsScreen.js";
import { StyleSheet, View, Text } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { NotificationContext } from "../contexts/NotificationContext"; // Import the NotificationContext

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  const { hasNewMessage } = useContext(NotificationContext); // Access notification state
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
        name="NotificationsScreen"
        component={NotificationsScreen}
        options={{
          tabBarLabel: "תהראות",
          tabBarIcon: ({ color, size }) => (
            <Icon name="bell" size={size} color={color} />
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
      <Tab.Screen
        name="MessagesNavigator"
        component={MessagesNavigator}
        options={{
          tabBarLabel: "הודעות",
          tabBarIcon: ({ color, size }) => (
            <View>
              <Icon name="envelope" size={size} color={color} />
              {hasNewMessage && (
                <View
                  style={{
                    position: "absolute",
                    right: -6,
                    top: -3,
                    backgroundColor: "red",
                    borderRadius: 6,
                    width: 12,
                    height: 12,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{ color: "white", fontSize: 8, fontWeight: "bold" }}
                  >
                    !
                  </Text>
                </View>
              )}
            </View>
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

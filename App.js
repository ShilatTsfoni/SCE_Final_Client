import React, { useState, useEffect, useContext } from "react";
import { View, ActivityIndicator, StyleSheet, Button } from "react-native";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Ensure AsyncStorage is imported

import { AuthContext, AuthProvider } from "./src/contexts/AuthContext";
import AuthNavigator from "./src/navigations/AuthNavigator";
import AppNavigator from "./src/navigations/AppNavigator";
import TokenProvider from "./src/contexts/TokenProvider"; // Import the TokenProvider

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "white",
  },
};

export function AppContent() {
  //const [initialRouteName, setInitialRouteName] = useState("WelcomeScreen");
  const [isReady, setIsReady] = useState(false);
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();
        await Font.loadAsync({
          // Font assets
          Caravan: require("./assets/fonts/caravan_90_aaa.otf"),
          Assistant: require("./assets/fonts/assistant_variablefont_wght.ttf"),
          Inter: require("./assets/fonts/Inter-VariableFont_slnt,wght.ttf"),
        });

        // await AsyncStorage.removeItem("userToken");
        // await AsyncStorage.removeItem("onboarding");

        // Fetch the token from AsyncStorage
        const token = await AsyncStorage.getItem("userToken");
        const onbaording = await AsyncStorage.getItem("onboarding");
        console.log("token", token);
        console.log("onbaording", onbaording);
        // if (token && onbaording === "True") {
        //   setInitialRouteName("HomePage"); // Adjust based on your app's logic
        // } else if (token) {
        //   setInitialRouteName("OnboardingStart");
        // } else {
        //   setInitialRouteName("WelcomeScreen");
        // }

        setIsAuthenticated(!!token); // Set authenticated state based on token presence
        setIsReady(true);
        await SplashScreen.hideAsync();
      } catch (error) {
        console.warn("An error occurred during app preparation:", error);
        setIsReady(true); // Ensure readiness in case of error
      }
    }

    prepare();
  }, []);

  if (!isReady) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  console.log("isAuthenticated", isAuthenticated);
  return (
    <NavigationContainer theme={theme}>
      {isAuthenticated ? <AppNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <TokenProvider>
        <AppContent />
      </TokenProvider>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

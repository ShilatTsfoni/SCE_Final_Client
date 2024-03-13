import React, { useState, useEffect } from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Ensure AsyncStorage is imported

import AuthNavigator from "./src/navigations/AuthNavigator";
import TokenProvider from "./src/contexts/TokenProvider"; // Import the TokenProvider

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "white",
  },
};

export default function App() {
  const [initialRouteName, setInitialRouteName] = useState("WelcomeScreen");
  const [isReady, setIsReady] = useState(false);

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

        // Fetch the token from AsyncStorage
        const token = await AsyncStorage.getItem("userToken");
        if (token) {
          setInitialRouteName("OnboardingStart"); // Adjust based on your app's logic
        } else {
          setInitialRouteName("WelcomeScreen");
        }

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

  return (
    <TokenProvider>
      <NavigationContainer theme={theme}>
        <AuthNavigator initialRouteName={initialRouteName} />
      </NavigationContainer>
    </TokenProvider>
  );
}

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

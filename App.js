import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthNavigator from "./src/navigations/AuthNavigator";

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "white",
  },
};

export default function App() {
  const [fontsLoaded] = useFonts({
    Caravan: require("./assets/fonts/caravan-90-aaa.otf"),
    Assistant: require("./assets/fonts/Assistant-VariableFont_wght.ttf"),
  });
  const [initialRouteName, setInitialRouteName] = useState('WelcomeScreen');
  const [isReady, setIsReady] = useState(false); // New state to manage readiness

  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();
        const token = await AsyncStorage.getItem('userToken');
        console.log("Token check:", token ? `Found: ${token}` : "Not found");

        if (token) {
          setInitialRouteName('OnboardingStart');
        }
      } catch (error) {
        console.error("An error occurred during app preparation:", error);
      } finally {
        // Move fontsLoaded check and splash screen hiding into finally block
        if (fontsLoaded) {
          await SplashScreen.hideAsync();
          setIsReady(true); // Only set ready when everything is loaded
        }
      }
    }

    prepare();
  }, [fontsLoaded]);

  if (!isReady) { // Use isReady to control the rendering
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <NavigationContainer theme={theme}>
      <AuthNavigator initialRouteName={initialRouteName} />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

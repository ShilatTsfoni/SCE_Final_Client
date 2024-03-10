import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import * as Font from 'expo-font'; // Import the Font module
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
  const [initialRouteName, setInitialRouteName] = useState('WelcomeScreen');
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      let fontsLoadedSuccessfully = false;
      try {
        await SplashScreen.preventAutoHideAsync();

        // Manually load fonts
        await Font.loadAsync({
          Caravan: require("./assets/fonts/caravan_90_aaa.otf"),
          Assistant: require("./assets/fonts/assistant_variablefont_wght.ttf"),
        });
        fontsLoadedSuccessfully = true; // Set this flag to true after fonts are loaded

        const token = await AsyncStorage.getItem('userToken');
        if (token) {
          setInitialRouteName('OnboardingStart');
        }
        
        setTimeout(() => {
          if (!fontsLoadedSuccessfully) {
            console.warn('Fonts not loaded within expected time. Proceeding with app...');
          }
          setIsReady(true);
        }, 5000); // This timeout serves as a fallback
      } catch (error) {
        console.error("An error occurred during app preparation:", error);
      } finally {
        if (fontsLoadedSuccessfully) {
          await SplashScreen.hideAsync();
          setIsReady(true);
        }
      }
    }
  
    prepare();
  }, []); // Removed the dependency on fontsLoaded

  if (!isReady) {
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

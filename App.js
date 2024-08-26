import React, { useState, useEffect, useContext } from 'react'
import { View, ActivityIndicator, StyleSheet, Button } from 'react-native'
import { NavigationContainer, DefaultTheme } from '@react-navigation/native'
import * as Font from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'
import AsyncStorage from '@react-native-async-storage/async-storage' // Ensure AsyncStorage is imported

import { AuthContext, AuthProvider } from './src/contexts/AuthContext'
import AuthNavigator from './src/navigations/AuthNavigator'
import AppNavigator from './src/navigations/AppNavigator'
import TokenContext, {
  tokenContext,
  TokenProvider
} from './src/contexts/TokenContext' // Import the TokenProvider
import { UserContext, UserProvider } from './src/contexts/userContext'
import webSocketManager from './src/managers/WebSocketManager'
import {
  NotificationProvider,
  NotificationContext
} from './src/contexts/NotificationContext' // Import the notification context

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'white'
  }
}

export function AppContent () {
  //const [initialRouteName, setInitialRouteName] = useState("WelcomeScreen");
  const [isReady, setIsReady] = useState(false)
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext)
  const { token, setToken } = useContext(TokenContext)
  const {hasNewMessage, setHasNewMessage,hasnewfr,setHasNewFR} = useContext(NotificationContext);
  const {
    setUserid,
    setFirst_name,
    setLast_name,
    setEmail,
    setCity,
    setVolunteer_frequency,
    setVolunteer_categories,
    setMost_important,
    setAllow_notifications,
    setFriends,
    setPhone,
    setBirthday,
    setOnboarding
  } = useContext(UserContext)

  useEffect(() => {
   
    async function prepare () {
      try {
        await SplashScreen.preventAutoHideAsync()
        await Font.loadAsync({
          // Font assets
          Caravan: require('./assets/fonts/caravan_90_aaa.otf'),
          Assistant: require('./assets/fonts/assistant_variablefont_wght.ttf'),
          Inter: require('./assets/fonts/Inter-VariableFont_slnt,wght.ttf')
        })
        const user_token = await AsyncStorage.getItem('userToken')
        const userid = await AsyncStorage.getItem('user_id')
        setIsAuthenticated(!!user_token) // Set authenticated state based on token presence
        setIsReady(true)
        setToken(user_token)
        setUserid(userid)
        if (user_token) {
          const response = await fetch(
            'http://10.0.2.2:8000/api/account/users/' + userid,
            { headers: { Authorization: 'Bearer ' + user_token } }
          )
            .then(response => {
              if (!response.ok) {
                console.log(response)
                throw new Error('Network response was not ok')
              }
              return response.json()
            })
            .then(async data => {
              console.log(data)
              setFirst_name(data.first_name)
              setLast_name(data.last_name)
              setEmail(data.email)
              setCity(data.city)
              //setVolunteer_frequency(data.volunteer_frequency.toString())
              //setVolunteer_categories(data.volunteer_categories.toString())
              setMost_important(data.most_important)
              setAllow_notifications(data.allow_notifications.toString())
              setFriends(data.friends.toString())
              setPhone(data.phone)
              setBirthday(data.birth_day)
              setOnboarding(data.setOnboarding)
              webSocketManager.connect(userid, user_token,{
                setHasNewMessage,
                setHasNewFR});
              
            })
        }
        await SplashScreen.hideAsync()
      } catch (error) {
        console.warn('An error occurred during app preparation:', error)
        setIsReady(true) // Ensure readiness in case of error
      }
    }

    prepare()
  }, [])

  if (!isReady) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size='large' color='#0000ff' />
      </View>
    )
  }

  console.log('isAuthenticated', isAuthenticated)
  return (
    <NavigationContainer theme={theme}>
      {isAuthenticated ? <AppNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  )
}

export default function App () {
  return (
    <AuthProvider>
      <TokenProvider>
        <UserProvider>
          <NotificationProvider>
            <AppContent />
          </NotificationProvider>
        </UserProvider>
      </TokenProvider>
    </AuthProvider>
  )
}

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

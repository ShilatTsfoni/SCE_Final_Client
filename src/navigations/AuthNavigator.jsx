import { createNativeStackNavigator } from "@react-navigation/native-stack";

import WelcomeScreen from "../views/WelcomeScreen";
import PhoneNumber from "../views/SignUp/PhoneNumber";
import OTP from "../views/SignUp/OTP";
import OnboardingStart from "../views/BasicInfo/OnboardingStart";
import PersonalDetails from "../views/BasicInfo/PersonalDetails";
import Gender from "../views/BasicInfo/Gender";
import BirthDate from "../views/BasicInfo/BirthDate";
import City from "../views/BasicInfo/City";
import StartPage from "../views/preferences/StartPage";
import Frequency from "../views/preferences/Frequency";
import Skills from "../views/preferences/Skills";
import ImportancePage from "../views/preferences/ImportancePage";
import NotificationsPage from "../views/preferences/NotificationsPage";
import SharingContacts from "../views/preferences/SharingContacts";
import UploadProfilePicture from "../views/preferences/UploadProfilePicture";
import ConfirmationScreen from "../views/ConfirmationScreen";
import LoginPage from "../views/Login/LoginPage";
/* import HomePage from "../views/userViews/HomePage";
import ActivityScreen from "../views/userViews/ActivityScreen";
import SearchScreen from "../views/userViews/SearchScreen";
import SettingsScreen from "../views/userViews/SettingsScreen";
 */
const AuthStack = createNativeStackNavigator();

function AuthNavigator() {
  return (
    <AuthStack.Navigator
      initialRouteName={WelcomeScreen} // Accept initialRouteName dynamically
      screenOptions={{
        headerTransparent: true,
        headerShown: true,
        animation: "slide_from_right",
      }}
    >
      <AuthStack.Screen name="WelcomeScreen" component={WelcomeScreen} />
      <AuthStack.Screen name="LoginPage" component={LoginPage} />
      <AuthStack.Screen name="PhoneNumber" component={PhoneNumber} />
      <AuthStack.Screen name="OTP" component={OTP} />
      <AuthStack.Screen name="OnboardingStart" component={OnboardingStart} />
      <AuthStack.Screen name="PersonalDetails" component={PersonalDetails} />
      <AuthStack.Screen name="Gender" component={Gender} />
      <AuthStack.Screen name="BirthDate" component={BirthDate} />
      <AuthStack.Screen name="City" component={City} />
      <AuthStack.Screen name="StartPage" component={StartPage} />
      <AuthStack.Screen name="Frequency" component={Frequency} />
      <AuthStack.Screen name="Skills" component={Skills} />
      <AuthStack.Screen name="ImportancePage" component={ImportancePage} />
      <AuthStack.Screen
        name="NotificationsPage"
        component={NotificationsPage}
      />
      <AuthStack.Screen name="SharingContacts" component={SharingContacts} />
      <AuthStack.Screen
        name="UploadProfilePicture"
        component={UploadProfilePicture}
      />
      <AuthStack.Screen
        name="ConfirmationScreen"
        component={ConfirmationScreen}
      />
      {/*need to remove to other navigator after setting all the user settings*/}
      {/* <Stack.Screen name="HomePage" component={HomePage} />
      <Stack.Screen name="ActivityScreen" component={ActivityScreen} />
      <Stack.Screen name="SearchScreen" component={SearchScreen} />
      <Stack.Screen name="SettingsScreen" component={SettingsScreen} /> */}
    </AuthStack.Navigator>
  );
}

export default AuthNavigator;

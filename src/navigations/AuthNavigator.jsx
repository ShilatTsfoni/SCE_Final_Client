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

const Stack = createNativeStackNavigator();

function AuthNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTransparent: true,
        headerShown: true,
        animation: "slide_from_right",
      }}
    >
      <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
      <Stack.Screen name="PhoneNumber" component={PhoneNumber} />
      <Stack.Screen name="OTP" component={OTP} />
      <Stack.Screen name="OnboardingStart" component={OnboardingStart} />
      <Stack.Screen name="PersonalDetails" component={PersonalDetails} />
      <Stack.Screen name="Gender" component={Gender} />
      <Stack.Screen name="BirthDate" component={BirthDate} />
      <Stack.Screen name="City" component={City} />
      <Stack.Screen name="StartPage" component={StartPage} />
      <Stack.Screen name="Frequency" component={Frequency} />
      <Stack.Screen name="Skills" component={Skills} />
      <Stack.Screen name="ImportancePage" component={ImportancePage} />
      <Stack.Screen name="NotificationsPage" component={NotificationsPage} />
      <Stack.Screen name="SharingContacts" component={SharingContacts} />
      <Stack.Screen
        name="UploadProfilePicture"
        component={UploadProfilePicture}
      />
      <Stack.Screen name="ConfirmationScreen" component={ConfirmationScreen} />
    </Stack.Navigator>
  );
}

export default AuthNavigator;

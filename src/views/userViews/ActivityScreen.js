import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import TopActions from "../../components/TopActions";
import ImagesSwipeSlide from "../../components/ImagesSwipeSlide";
import { useState } from "react";
import { Feather, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import LinkButton from "../../components/LinkButton";
import { useNavigation, useRoute } from "@react-navigation/native";
import CustomButton from "../../components/CustomButton";
import AsyncStorage from "@react-native-async-storage/async-storage";

const screenWidth = Dimensions.get("window").width;
const buttonWidth = (screenWidth - 16 * 3) / 2; // Subtracting padding and spacing between buttons

function ActivityScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { eventId, source, eventData } = route.params;
  const [userId, setUserId] = useState("");

  const handleApprove = async () => {
    console.log("approved");
    navigation.goBack();
  };

  const handleCancel = async () => {
    try {
      const user_id = await AsyncStorage.getItem("user_id");
      if (!user_id) {
        console.log("No id found");
        return;
      }
      setUserId(user_id);
      console.log("user id:", user_id);
      console.log("event id:", eventId);
      const data = {
        user: userId,
        event: eventId,
        stsus: null,
      };
      const response = await fetch(
        "http://10.0.2.2:8000/api/events/" + eventId + "/cancel/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      if (response.ok) {
        console.log("Succesfully Canceled");
        navigation.navigate("HomePage");
      } else {
        throw new Error("Failed to cancel the event");
      }
    } catch (error) {
      console.error("Error canceling the event:", error.message);
    }
  };

  const handleSignNow = async () => {
    try {
      const user_id = await AsyncStorage.getItem("user_id");
      if (!user_id) {
        console.log("No id found");
        return;
      }
      setUserId(user_id);
      console.log("user id:", user_id);
      console.log("event id:", eventId);
      const data = {
        user: userId,
        event: eventId,
        stsus: null,
      };
      const response = await fetch(
        "http://10.0.2.2:8000/api/events/" + eventId + "/apply/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      if (response.ok) {
        console.log("Application successful");
      } else {
        throw new Error("Failed to apply to the event");
      }
    } catch (error) {
      console.error("Error applying to event:", error.message);
    }
  };

  const images = [
    require("../../../assets/images/org1.png"),
    require("../../../assets/images/example.jpg"),
    require("../../../assets/images/org1.png"),
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleIndexChange = (index) => {
    setCurrentIndex(index);
  };

  return (
    <View style={styles.container}>
      <TopActions />
      <ScrollView>
        <View style={styles.descriptionContainer}>
          <View style={styles.namelogoContainer}>
            <View style={styles.headingContent}>
              <Text style={[styles.text, { fontWeight: "bold" }]}>
                {eventData[0]}
              </Text>
              <Text style={[styles.text, { fontWeight: "normal" }]}>
                {eventData[1]}
              </Text>
            </View>
            <Image
              source={require("../../../assets/images/org1.png")}
              style={styles.image}
            />
          </View>
          <View style={styles.organizationMedia}>
            <ImagesSwipeSlide
              images={images}
              currentIndex={currentIndex}
              onIndexChange={handleIndexChange}
            />
          </View>
        </View>
        <View style={styles.infoContainer}>
          <View style={[styles.infotActivity, { height: 83 }]}>
            <Text style={styles.textheading}>על הפעילות</Text>
            <Text style={styles.textContent}>{eventData[5]}</Text>
          </View>
          <View style={styles.divider} />
          <View style={[styles.infotActivity, { height: 64 }]}>
            <View style={styles.iconText}>
              <Text style={[styles.text, { fontWeight: "bold" }]}>
                מועד הפעילות
              </Text>
              <Feather
                name="clock"
                color="#003EAC"
                size={24}
                style={{ marginLeft: 8 }}
              />
            </View>
            <Text style={styles.textContent}>
              {eventData[2]} | יום ה' | {eventData[3]}-{eventData[4]}{" "}
            </Text>
          </View>
          <View style={styles.divider} />
          <View style={[styles.infotActivity, { height: 64 }]}>
            <View style={styles.iconText}>
              <Text style={[styles.text, { fontWeight: "bold" }]}>
                מיקום הפעילות
              </Text>
              <Ionicons
                name="location-outline"
                color="#003EAC"
                size={24}
                style={{ marginLeft: 8 }}
              />
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <LinkButton onPress={() => {}} title={"ניווט ליעד"} />
              <Text style={styles.textContent}>
                שדרות שאול המלך 27, תל אביב
              </Text>
            </View>
          </View>
          <View style={styles.divider} />
          <View style={[styles.infotActivity, { height: 72 }]}>
            <View style={styles.iconText}>
              <Text style={[styles.text, { fontWeight: "bold" }]}>
                יצירת קשר{" "}
              </Text>
              <MaterialCommunityIcons
                name="phone-outline"
                color="#003EAC"
                size={24}
                style={{ marginLeft: 8 }}
              />
            </View>
            <Text style={styles.textContent}>--להוסיף אייקונים--</Text>
          </View>
          <View style={styles.divider} />
          <View style={[styles.infotActivity, { height: 60 }]}>
            <Text style={styles.textheading}>עד מתי אפשר לבטל השתתפות</Text>
            <Text style={styles.textContent}>
              עד 24 שעות לפני תחילת הפעילות.{" "}
            </Text>
          </View>
          <View style={styles.divider} />
          <View style={[styles.infotActivity, { height: 116 }]}>
            <Text style={styles.textheading}>על הארגון</Text>
            <Text style={styles.textContent}>{eventData[6]}</Text>
          </View>
          <View style={styles.divider} />
        </View>
      </ScrollView>
      {source === "VolunteerCard" && (
        <View style={styles.buttonContainer}>
          <CustomButton
            title="ביטול פעילות"
            onPress={handleCancel}
            buttonColor={"#FFFFFF"}
            textColor={"#1355CB"}
            borderColor={"#1355CB"}
            style={styles.button}
          />
          <CustomButton
            title="אגיע לפעילות"
            onPress={handleApprove}
            buttonColor={"#1355CB"}
            textColor={"#FFFFFF"}
            borderColor={"#1355CB"}
            style={styles.button}
          />
        </View>
      )}
      {source === "VolunteerOffer" && (
        <View style={{ width: 327, height: 48, left: 33, marginBottom: 5 }}>
          <CustomButton
            title="הירשם עכשיו"
            onPress={handleSignNow}
            buttonColor={"#1355CB"}
            textColor={"#FFFFFF"}
            borderColor={"#1355CB"}
            style={styles.signButton}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 100,
    alignContent: "right",
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: "right",
  },
  descriptionContainer: {
    width: 375,
    height: 350,
  },
  namelogoContainer: {
    width: 375,
    height: 80,
    padding: 16,
    gap: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 40,
    marginBottom: 16,
  },
  organizationMedia: {
    flex: 1,
    width: 375,
    height: 270,
    borderRadius: 8,
  },
  headingContent: {
    width: 283,
    height: 48,
  },
  text: {
    fontFamily: "Assistant",
    fontSize: 18,
    lineHeight: 24,
    textAlign: "right",
  },
  image: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderColor: "#B9B9C9",
    borderWidth: 2,
    top: 2,
  },
  infoContainer: {
    width: 375,
    height: 731,
    padding: 16,
    gap: 24,
  },
  infotActivity: {
    width: 343,
    gap: 10,
  },
  textheading: {
    fontFamily: "Inter",
    fontSize: 18,
    lineHeight: 27,
    textAlign: "right",
    fontWeight: "bold",
  },
  textContent: {
    fontFamily: "Inter",
    fontSize: 16,
    lineHeight: 24,
    textAlign: "right",
    fontWeight: "normal",
  },
  divider: {
    width: 343,
    borderBottomWidth: 1,
    borderBottomColor: "#CCCCCC",
    marginHorizontal: 8,
  },
  iconText: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    marginTop: 16,
    marginBottom: 5,
  },
  button: {
    width: buttonWidth,
    height: 48,
    borderRadius: 4,
    padding: 12,
    justifyContent: "center",
  },
  signButton: {
    width: 327,
    height: 48,
    borderRadius: 4,
    padding: 16,
  },
});

export default ActivityScreen;

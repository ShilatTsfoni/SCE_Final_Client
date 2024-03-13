import {
  Button,
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

function ActivityScreen(id) {
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
                התנדבות בכיכר החטופים
              </Text>
              <Text style={[styles.text, { fontWeight: "normal" }]}>
                בונות אלטרנטיבה
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
            <Text style={styles.textContent}>
              אחראי משמרת, ניהול כמה תחומים במקביל ועבודה בצוות רחב.{" "}
            </Text>
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
              24.03.2024 | יום ה' | 12:00-16:00{" "}
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
            <Text style={styles.textContent}>
              בונות אלטרנטיבה הינה עמותה אקטיביסטית של נשים שתומכות בעזרה
              למשפחות החטופים ובמגוון רחב של התנדבויות.{" "}
            </Text>
          </View>
          <View style={styles.divider} />
        </View>
      </ScrollView>
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
});

export default ActivityScreen;

import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Switch,
  StyleSheet,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Picker } from "@react-native-picker/picker";
import profilePic from "../../../assets/images/profile1.jpg";

const ProfilePage = () => {
  const [personalDetailsVisible, setPersonalDetailsVisible] = useState(false);
  const [volunteerPreferencesVisible, setVolunteerPreferencesVisible] =
    useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [contactsEnabled, setContactsEnabled] = useState(false);
  const [privacyVisible, setPrivacyVisible] = useState(false);
  const [settingsVisible, setSettingsVisible] = useState(false);

  const [availability, setAvailability] = useState("");
  const [skills, setSkills] = useState(["לארוז חבילות", "כיכר החטופים"]);
  const [importance, setImportance] = useState("");

  const toggleSkill = (skill) => {
    if (skills.includes(skill)) {
      setSkills(skills.filter((item) => item !== skill));
    } else {
      setSkills([...skills, skill]);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.pageTitle}>הפרופיל שלי</Text>
      <TouchableOpacity
        style={styles.category}
        onPress={() => setPersonalDetailsVisible(!personalDetailsVisible)}
      >
        <Icon
          name={personalDetailsVisible ? "angle-up" : "angle-down"}
          size={24}
        />
        <Text style={styles.categoryTitle}>פרטים אישיים</Text>
      </TouchableOpacity>
      {personalDetailsVisible && (
        <View style={styles.categoryContent}>
          <View style={styles.profileContainer}>
            <View style={styles.profileDetails}>
              <TextInput
                style={styles.input}
                placeholder="שם מלא"
                defaultValue="יעל כהן"
              />
              <TextInput
                style={styles.input}
                placeholder="טלפון"
                defaultValue="050-1234567"
                editable={false}
              />
            </View>
            <Image source={profilePic} style={styles.profileImage} />
          </View>
          <TextInput
            style={styles.input}
            placeholder="אימייל"
            defaultValue="yael@example.com"
          />
          <TextInput
            style={styles.input}
            placeholder="מין"
            defaultValue="נקבה"
          />
          <TextInput
            style={styles.input}
            placeholder="תאריך לידה"
            defaultValue="01/01/1990"
          />
          <TextInput
            style={styles.input}
            placeholder="עיר מגורים"
            defaultValue="תל אביב"
          />
        </View>
      )}

      <TouchableOpacity
        style={styles.category}
        onPress={() =>
          setVolunteerPreferencesVisible(!volunteerPreferencesVisible)
        }
      >
        <Icon
          name={volunteerPreferencesVisible ? "angle-up" : "angle-down"}
          size={24}
        />
        <Text style={styles.categoryTitle}>העדפות התנדבות</Text>
      </TouchableOpacity>
      {volunteerPreferencesVisible && (
        <View style={styles.categoryContent}>
          <Text style={styles.label}>זמינות</Text>
          <Picker
            selectedValue={availability}
            onValueChange={(itemValue) => setAvailability(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="פחות מפעם בשבוע" value="פחות מפעם בשבוע" />
            <Picker.Item label="פעם בשבוע" value="פעם בשבוע" />
            <Picker.Item label="יותר מפעם בשבוע" value="יותר מפעם בשבוע" />
            <Picker.Item label="כשצריך" value="כשצריך" />
          </Picker>

          <Text style={styles.label}>כישורים ויכולות</Text>
          {[
            "לארוז חבילות",
            "לחדש בתים",
            "להסיע או לשנע",
            "לתרום ולמסור",
            "לגייס",
            "כיכר החטופים",
          ].map((skill) => (
            <TouchableOpacity
              key={skill}
              style={[
                styles.skillButton,
                skills.includes(skill) && styles.skillButtonSelected,
              ]}
              onPress={() => toggleSkill(skill)}
            >
              <Text
                style={[
                  styles.skillButtonText,
                  skills.includes(skill) && styles.skillButtonTextSelected,
                ]}
              >
                {skill}
              </Text>
            </TouchableOpacity>
          ))}

          <Text style={styles.label}>חשיבות</Text>
          <Picker
            selectedValue={importance}
            onValueChange={(itemValue) => setImportance(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="להתנדב עם חברים" value="להתנדב עם חברים" />
            <Picker.Item label="קרוב לבית" value="קרוב לבית" />
            <Picker.Item
              label="לעסוק במקצוע וביכשורים שלי"
              value="לעסוק במקצוע וביכשורים שלי"
            />
            <Picker.Item label='החמ"ל שלי' value='החמ"ל שלי' />
          </Picker>
        </View>
      )}

      <View style={styles.switchCategory}>
        <Switch
          value={notificationsEnabled}
          onValueChange={setNotificationsEnabled}
        />
        <Text style={styles.categoryTitle}>התראות</Text>
      </View>

      <View style={styles.switchCategory}>
        <Switch value={contactsEnabled} onValueChange={setContactsEnabled} />
        <Text style={styles.categoryTitle}>הוספת אנשי קשר</Text>
      </View>

      <TouchableOpacity
        style={styles.category}
        onPress={() => setPrivacyVisible(!privacyVisible)}
      >
        <Icon name={privacyVisible ? "angle-up" : "angle-down"} size={24} />
        <Text style={styles.categoryTitle}>פרטיות</Text>
      </TouchableOpacity>
      {privacyVisible && <View style={styles.emptyContent}></View>}

      <TouchableOpacity
        style={styles.category}
        onPress={() => setSettingsVisible(!settingsVisible)}
      >
        <Icon name={settingsVisible ? "angle-up" : "angle-down"} size={24} />
        <Text style={styles.categoryTitle}>הגדרות</Text>
      </TouchableOpacity>
      {settingsVisible && <View style={styles.emptyContent}></View>}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "white",
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    marginTop: 30,
  },
  category: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  categoryContent: {
    padding: 10,
    backgroundColor: "#f9f9f9",
  },

  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
    marginLeft: 10,
  },
  profileDetails: {
    flex: 1,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    textAlign: "right",
  },
  switchCategory: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  emptyContent: {
    height: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    textAlign: "right",
  },
  picker: {
    marginBottom: 10,
  },
  skillButton: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 5,
  },
  skillButtonSelected: {
    backgroundColor: "#e6f4ff",
  },
  skillButtonText: {
    textAlign: "center",
  },
  skillButtonTextSelected: {
    color: "#007bff",
  },
});

export default ProfilePage;

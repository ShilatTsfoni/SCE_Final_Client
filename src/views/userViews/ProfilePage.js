import React, { useState,useContext ,useEffect} from "react";
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
import { UserContext } from "../../contexts/userContext"; // Corrected import
import TokenContext from "../../contexts/TokenContext";
import { SelectList } from "react-native-dropdown-select-list";
import CustomButton from "../../components/CustomButton";

const ProfilePage = () => {
  const [CityName, setCityName] = useState("");
  const [isEnteredCityName, setIsEnteredCityName] = useState(false);
  const [cities, setCities] = useState([]);
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

  const {userid,first_name,last_name,phone,email,gender,city,birthday,setAllow_notifications} = useContext(UserContext);
  const {token} = useContext(TokenContext);
  useEffect(() => {
    // Fetch cities data from the server
    fetchCities();
  }, []);
  const fetchCities = async () => {
    try {
      const response = await fetch("http://10.0.2.2:8000/api/account/cities/");
      if (response.ok) {
        const data = await response.json();
        // Update cities state with the fetched data
        setCities(data);
      } else {
        console.error("Failed to fetch cities data");
      }
    } catch (error) {
      console.error("Error fetching cities data:", error);
    }
  };
  const handleCityNameChange = (city) => {
    setCityName(city);
    setIsEnteredCityName(true);
    console.log("Selected city: ", city);
  };
  const handlePersonalUpdate = () => {
    if (CityName) {
      const url = "http://10.0.2.2:8000/api/account/update/" + userid + "/";
      const data = {
        city: CityName,
      };
      fetch(url, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
          "Authorization":`Bearer ${token}`,
        },
        body: JSON.stringify(data),})
    }
  };
  const handleNotificationUpdate = (value) => {
    setNotificationsEnabled(value)
    const url = "http://10.0.2.2:8000/api/account/update/" + userid + "/";
    const data = {
      allow_notifications: !notificationsEnabled,
    };
    const response = fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        "Authorization":`Bearer ${token}`,
      },
      body: JSON.stringify(data),})
    if (response.ok){
      setAllow_notifications(!notificationsEnabled)
    }
  };
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
                defaultValue ={`${first_name} ${last_name}`}
                editable={false}  // This makes the TextInput read-only
              />
              <TextInput
                style={styles.input}
                placeholder="טלפון"
                defaultValue={`${phone}`}
                editable={false}
              />
            </View>
            <Image source={profilePic} style={styles.profileImage} />
          </View>
          <TextInput
            style={styles.input}
            placeholder="אימייל"
            defaultValue={`${email}`}
            editable={false}
          />
          <TextInput
            style={styles.input}
            placeholder="מין"
            defaultValue={`${gender}`}
            editable={false}
          />
          <TextInput
            style={styles.input}
            placeholder="תאריך לידה"
            defaultValue={`${birthday}`}
            editable={false}
          />
            <View>
              <SelectList
              placeholder={`${city}`}
              defaultValue = {`${city}`}
              searchPlaceholder="חיפוש"
              setSelected={handleCityNameChange}
              data={cities}
              save="value"
              fontFamily="Assistant"
              boxStyles={styles.input}
              dropdownItemStyles={styles.dropdown}
              arrowAlign="left"
            />
            <CustomButton
            style={styles.button}
            title="שמור"
            onPress={handlePersonalUpdate}
            buttonColor={isEnteredCityName ? "#1355CB" : "#B9B9C9"}
            textColor={isEnteredCityName ? "#FFFFFF" : "#5C5C66"}
            borderColor={isEnteredCityName ? "#1355CB" : "#B9B9C9"}
            disabled={!isEnteredCityName}
          />
          </View>
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
          onValueChange={handleNotificationUpdate}
        />
        <Text style={styles.categoryTitle}>התראות</Text>
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

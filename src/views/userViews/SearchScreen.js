import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Modal,
  Button,
} from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import TokenContext from "../../contexts/TokenContext";
import { UserContext } from "../../contexts/userContext";

const staticPeople = [
  { id: 1, firstName: "יוסי", lastName: "כהן" },
  { id: 2, firstName: "רוני", lastName: "כהן" },
  // ניתן להוסיף אנשים נוספים
];

const SearchScreen = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTab, setSelectedTab] = useState("events");
  const [selectedItem, setSelectedItem] = useState(null);
  const [eventsData, setEventsData] = useState([]);
  const [usersData,setUsersData] = useState([]);
  const [organizations, setOrganizations] = useState({});
  const { token } = useContext(TokenContext);
  const { userid } = useContext(UserContext);
  const [isRegistered, setIsRegistered] = useState(false);
  const [isFriend, setIsFriend] = useState(false);
  const [selectedVolunteer, setSelectedVolunteer] = useState(null);
  const navigation = useNavigation();

  useFocusEffect(
    React.useCallback(() => {
      // Reset search query and selected items when the screen is focused
      setSearchQuery("");
      setSelectedItem(null);
      setSelectedVolunteer(null);
      setIsRegistered(false);
      setIsFriend(false)
    }, [])
  );

  useEffect(() => {
    const fetchEvents= async () => {
      try {
        const response = await fetch(`http://10.0.2.2:8000/api/events/?search=${searchQuery}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.ok) {
          const data = await response.json();
          console.log("Fetched Events:", data.results);
          setEventsData(data.results);

          const uniqueOrganizationIds = [
            ...new Set(data.results.map((event) => event.id)),
          ];
        } else {
          console.error("Failed to fetch Events data");
        }
      } catch (error) {
        console.error("Error fetching Events data:", error);
      }
    };
    const fetchUsers= async () => {
      try {
        const response = await fetch(`http://10.0.2.2:8000/api/account/users/?search=${searchQuery}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.ok) {
          const data = await response.json();
          console.log("Fetched users:", data.results);
          setUsersData(data.results);

          const uniqueUserIds = [
            ...new Set(data.results.map((user) => user.id)),
          ];
        } else {
          console.error("Failed to fetch users data");
        }
      } catch (error) {
        console.error("Error fetching users data:", error);
      }
    };
    fetchEvents();
    fetchUsers();
  }, [searchQuery]);

  const handleItemPress = (item) => {
    if (selectedTab === "events") {
      handleVolunteerPress(item);
    } else if (selectedTab === "people") {
      setSelectedItem(item); // Set the selected person to trigger the modal
    }
  };

  const handleVolunteerPress = async (volunteer) => {
    const userAlreadyRegistered = await checkIfUserRegistered(volunteer);
    console.log("userId:", userid);
    console.log("User Registered:", userAlreadyRegistered);
    console.log("Volunteer Selected:", volunteer);
    setIsRegistered(userAlreadyRegistered);
    setSelectedVolunteer(volunteer);
  };

  const checkIfUserRegistered = (event) => {
    console.log("Check If User Registered - Events Data:", event);
    if (event.volunteers && Array.isArray(event.volunteers)) {
      const isUserRegistered = event.volunteers.some(
        (volunteer) => Number(volunteer) === Number(userid)
      );
      console.log("Check If User Registered:", isUserRegistered);
      return isUserRegistered;
    }
    return false;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const calculateEndTime = (startDate, duration) => {
    const start = new Date(startDate);
    const [hours, minutes, seconds] = duration.split(":").map(Number);
    start.setHours(start.getHours() + hours);
    start.setMinutes(start.getMinutes() + minutes);
    return start.toTimeString().slice(0, 5);
  };

  const renderTabContent = () => {
    if (searchQuery.trim() === "") {
      return null;
    }

    if (selectedTab === "events") {
      if (!Array.isArray(eventsData) || eventsData.length === 0) {
        return <Text>לא נמצאו משמרות.</Text>;
      }

      return (
        <FlatList
          data={eventsData}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => handleVolunteerPress(item)}
              style={styles.resultItem}
            >
              <Text style={styles.resultText}>{item.name}</Text>
              <Text style={styles.resultText}>
                ארגון: {item.organization.name|| "טוען..."}
              </Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      );
    } else if (selectedTab === "people") {
      return (
        <FlatList
          data={usersData}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => handleItemPress(item)}
              style={styles.resultItem}
            >
              <Text style={styles.resultText}>
                {item.first_name} {item.last_name}
              </Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      );
    }
  };

  return (
    <View
      style={[
        styles.container,
        searchQuery.trim() === "" ? styles.noSearch : styles.withSearch,
      ]}
    >
      <Text style={styles.headerText}>עמוד חיפוש</Text>
      <Text style={styles.subHeaderText}>כאן תוכלו לחפש משמרות או אנשים</Text>
      <TextInput
        style={styles.searchInput}
        placeholder="חפש כאן..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      {searchQuery.trim() === "" && (
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[
              styles.tabButton,
              selectedTab === "events" && styles.activeTab,
            ]}
            onPress={() => setSelectedTab("events")}
          >
            <Text
              style={[
                styles.tabText,
                selectedTab === "events" && styles.activeTabText,
              ]}
            >
              משמרות
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.tabButton,
              selectedTab === "people" && styles.activeTab,
            ]}
            onPress={() => setSelectedTab("people")}
          >
            <Text
              style={[
                styles.tabText,
                selectedTab === "people" && styles.activeTabText,
              ]}
            >
              אנשים
            </Text>
          </TouchableOpacity>
        </View>
      )}
      {renderTabContent()}
      <Modal
        visible={!!selectedVolunteer || !!selectedItem}
        transparent={true}
        animationType="slide"
        onRequestClose={() => {
          setSelectedVolunteer(null);
          setSelectedItem(null);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {selectedVolunteer && (
              <>
                <Text style={styles.modalText}>
                  שם המשמרת: {selectedVolunteer.name}
                </Text>
                <Text style={styles.modalText}>
                  ארגון:{" "}
                  {selectedVolunteer.organization.name || "לא זמין"}
                </Text>
                <Text style={styles.modalText}>
                  תיאור: {selectedVolunteer.description || "לא זמין"}
                </Text>
                <Text style={styles.modalText}>
                  תאריך: {formatDate(selectedVolunteer.start_date) || "לא זמין"}
                </Text>
                <Text style={styles.modalText}>
                  שעות:{" "}
                  {new Date(selectedVolunteer.start_date)
                    .toTimeString()
                    .slice(0, 5)}{" "}
                  -{" "}
                  {calculateEndTime(
                    selectedVolunteer.start_date,
                    selectedVolunteer.duration
                  ) || "לא זמין"}
                </Text>
                {!isRegistered && (
                  <Button
                    title="מידע נוסף והרשמה"
                    onPress={() =>
                      navigation.navigate("ActivityScreen", {
                        eventId: selectedVolunteer.id,
                        source: "VolunteerOffer",
                        eventData: {
                          id: selectedVolunteer.id,
                          name: selectedVolunteer.name,
                          organization:
                            selectedVolunteer.organization.name,
                          description: selectedVolunteer.description,
                          startDate: selectedVolunteer.start_date,
                          duration: selectedVolunteer.duration,
                          volunteers: selectedVolunteer.volunteers,
                          organization_id: selectedVolunteer.organization.id,
                        },
                      })
                    }
                  />
                )}
                <Button
                  title="סגור"
                  onPress={() => setSelectedVolunteer(null)}
                />
              </>
            )}
            {selectedItem && (
              <>
                <Text style={styles.modalText}>
                  שם: {selectedItem.first_name} {selectedItem.last_name}
                </Text>
                <Button title="סגור" onPress={() => setSelectedItem(null)} />
                {!selectedItem.friends.map(String).includes(String(userid)) && (
                  <Button
                    title="הוסף חבר"
                    onPress={async () => {
                      try {
                        const response = await fetch(`http://10.0.2.2:8000/api/account/users/${selectedItem.id}/friendrequest/`, {
                          headers: { Authorization: `Bearer ${token}` },
                          method: 'POST',
                        });
                        if (response.ok) {
                          console.log("success");
                        } else {
                          console.error("error");
                        }
                      } catch (error) {
                        console.error(error);
                      }
                    }
                  }
                />)} 
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    marginTop: 50,
  },
  noSearch: {
    paddingTop: 80,
  },
  withSearch: {
    paddingTop: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  subHeaderText: {
    fontSize: 16,
    color: "#666",
    marginBottom: 20,
    textAlign: "center",
  },
  searchInput: {
    width: "100%",
    padding: 10,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    textAlign: "right",
  },
  tabContainer: {
    flexDirection: "row-reverse",
    justifyContent: "space-around",
    marginTop: 20,
    width: "100%",
  },
  tabButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
  },
  activeTab: {
    backgroundColor: "#e0e0e0",
    borderRadius: 20,
  },
  tabText: {
    fontSize: 16,
    color: "#000",
  },
  activeTabText: {
    color: "#007AFF",
    fontWeight: "bold",
  },
  personItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  personText: {
    fontSize: 16,
    textAlign: "right",
  },
  resultItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    backgroundColor: "#f9f9f9",
  },
  resultText: {
    fontSize: 16,
    textAlign: "right",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
  },
  modalText: {
    fontSize: 18,
    marginBottom: 10,
  },
});

export default SearchScreen;

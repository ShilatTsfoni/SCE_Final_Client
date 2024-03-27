import { StyleSheet, View, Text, FlatList, ScrollView } from "react-native";
import VolunteerCard from "../../components/VolunteerCard";
import VolunteerOffer from "../../components/VolunteerOffer";
import imageExmp from "../../../assets/images/example.jpg";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

function HomePage() {
  const navigation = useNavigation();
  const [nextVolunteeringData, setNextVolunteeringData] = useState([]); // State to hold next volunteering data
  const [volunteerOfferData, setVolunteerOfferData] = useState([]); // State to hold volunteer offer data
  const [hasEvents, setHasEvents] = useState(false); // State to track whether the user has events

  useEffect(() => {
    fetchVolunteerData();
  }, []);

  const fetchVolunteerData = async () => {
    try {
      const user_id = await AsyncStorage.getItem("user_id");
      console.log("User ID:", user_id);
      if (!user_id) {
        console.log("No id found");
        return;
      }
      // Check if user_id is a string, if not, convert it
      if (typeof user_id !== "string") {
        user_id = String(user_id);
      }
      const response = await fetch("http://10.0.2.2:8000/api/events/");
      if (response.ok) {
        const data = await response.json();
        console.log("Fetched data:", data);
        // Filter events where the current user's ID is in the volunteers array
        const userEvents = data.filter((event) => {
          console.log("Event:", event);
          console.log("User ID:", user_id);
          console.log("Volunteers:", event.volunteers);
          const volunteerIds = event.volunteers.map((id) => String(id));
          return volunteerIds.includes(user_id);
        });
        const userOffers = data.filter((event) => {
          console.log("Event:", event);
          console.log("User ID:", user_id);
          console.log("Volunteers:", event.volunteers);
          const volunteerIds = event.volunteers.map((id) => String(id));
          return !volunteerIds.includes(user_id);
        });
        console.log("Filtered events:", userEvents);
        console.log("Filtered events offers:", userOffers);
        setNextVolunteeringData(userEvents);
        setVolunteerOfferData(userOffers);
        setHasEvents(userEvents.length > 0); // Set hasEvents based on whether userEvents is empty or not
      } else {
        console.error("Failed to fetch volunteer data");
      }
    } catch (error) {
      console.error("Error fetching volunteer data:", error);
    }
  };

  // Function to format date as DD.MM.YYYY
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${padZero(day)}.${padZero(month)}.${year}`;
  };

  // Function to pad zero for single-digit numbers
  const padZero = (num) => {
    return num < 10 ? `0${num}` : num;
  };

  // Define a function to render each VolunteerCard
  const renderVolunteerCardItem = ({ item }) => {
    // Ensure startDate is in ISO format
    const startDate = new Date(item.start_date);

    // Manual parsing of date string
    const parsedStartDate =
      startDate instanceof Date && !isNaN(startDate)
        ? startDate.toISOString().split("T")[0]
        : "Invalid Date";
    const parsedStartTime =
      startDate instanceof Date && !isNaN(startDate)
        ? startDate.toISOString().split("T")[1].slice(0, 5)
        : "Invalid Date";

    // Parse duration string to get hours and minutes
    const durationParts = item.duration.split(":");
    const durationHours = parseInt(durationParts[0], 10);
    const durationMinutes = parseInt(durationParts[1], 10);

    // Calculate end time
    const endTime = new Date(
      startDate.getTime() + (durationHours * 60 + durationMinutes) * 60000
    );
    const parsedEndTime =
      endTime instanceof Date && !isNaN(endTime)
        ? endTime.toISOString().split("T")[1].slice(0, 5)
        : "Invalid Date";

    console.log("startDate:", startDate);
    console.log(
      "time, date, org, id:",
      parsedStartTime,
      parsedStartDate,
      item.organization,
      item.id
    );
    console.log("endTime:", parsedEndTime);

    return (
      <VolunteerCard
        organizationName={item.organization.name}
        location={"גמליאל 5, תל אביב"}
        date={formatDate(parsedStartDate)}
        time={parsedStartTime}
        id={item.id}
        navigation={navigation}
        eventData={[
          item.name,
          item.organization.name,
          formatDate(parsedStartDate),
          parsedStartTime,
          parsedEndTime,
          item.description,
          item.organization.description,
          item.organization.contact_name,
          item.organization.contact_phone,
        ]}
      />
    );
  };

  // Define a function to render each VolunteerOffer
  const renderVolunteerOfferItem = ({ item }) => {
    // Ensure startDate is in ISO format
    const startDate = new Date(item.start_date);

    // Manual parsing of date string
    const parsedStartDate =
      startDate instanceof Date && !isNaN(startDate)
        ? startDate.toISOString().split("T")[0]
        : "Invalid Date";
    const parsedStartTime =
      startDate instanceof Date && !isNaN(startDate)
        ? startDate.toISOString().split("T")[1].slice(0, 5)
        : "Invalid Date";

    // Parse duration string to get hours and minutes
    const durationParts = item.duration.split(":");
    const durationHours = parseInt(durationParts[0], 10);
    const durationMinutes = parseInt(durationParts[1], 10);

    // Calculate end time
    const endTime = new Date(
      startDate.getTime() + (durationHours * 60 + durationMinutes) * 60000
    );
    const parsedEndTime =
      endTime instanceof Date && !isNaN(endTime)
        ? endTime.toISOString().split("T")[1].slice(0, 5)
        : "Invalid Date";

    console.log("startDate:", startDate);
    console.log(
      "time, date, org, id:",
      parsedStartTime,
      parsedStartDate,
      item.organization,
      item.id
    );
    console.log("endTime:", parsedEndTime);

    return (
      <VolunteerOffer
        organizationName={item.organization.name}
        location={"גמליאל 5, תל אביב"}
        date={formatDate(parsedStartDate)}
        time={parsedStartTime}
        imageSource={imageExmp}
        id={item.id}
        navigation={navigation}
        eventData={[
          item.name,
          item.organization.name,
          formatDate(parsedStartDate),
          parsedStartTime,
          parsedEndTime,
          item.description,
          item.organization.description,
          item.organization.contact_name,
          item.organization.contact_phone,
        ]}
      />
    );
  };

  return (
    <View style={styles.container}>
      {hasEvents && ( // Conditionally render NextVolunteeringData if user has events
        <View style={styles.nextVolunteeringContainer}>
          <View style={styles.headingContainer}>
            <Text style={styles.heading}>ההתנדבויות הבאות שלי</Text>
          </View>
          {/* Render FlatList to display VolunteerCard components */}
          <FlatList
            data={nextVolunteeringData}
            renderItem={renderVolunteerCardItem}
            keyExtractor={(item) => item.id} // Provide a unique key for each item
            ItemSeparatorComponent={() => <View style={{ height: 16 }} />} // Add separator component
            contentContainerStyle={{ paddingBottom: 16 }} // Add paddingBottom to avoid cutoff
          />
        </View>
      )}
      <View style={styles.volunteerOfferContainer}>
        <View style={styles.headingContainer}>
          <Text style={styles.heading}>הצעות התנדבות עבורי</Text>
        </View>
        <FlatList
          data={volunteerOfferData}
          renderItem={renderVolunteerOfferItem}
          keyExtractor={(item) => item.id}
          horizontal
          inverted
          ItemSeparatorComponent={() => <View style={{ width: 8 }} />}
          //contentContainerStyle={{}}
        />
      </View>
      <View style={styles.volunteerOfferContainer}>
        <View style={styles.headingContainer}>
          <Text style={styles.heading}>איפה החברים שלי מתנדבים</Text>
        </View>
        <FlatList
          data={volunteerOfferData}
          renderItem={renderVolunteerOfferItem}
          keyExtractor={(item) => item.id}
          horizontal
          inverted
          ItemSeparatorComponent={() => <View style={{ width: 8 }} />}
          //contentContainerStyle={{}}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 100,
  },
  nextVolunteeringContainer: {
    flex: 1,
    width: 374,
    height: 250,
    gap: 16,
  },
  volunteerOfferContainer: {
    height: 250,
    width: 359,
    marginTop: -20,
    left: -10,
  },
  headingContainer: {
    width: 374,
    height: 33,
    padding: 12,
    gap: 10,
  },
  heading: {
    width: 350,
    height: 33,
    fontFamily: "Inter",
    fontWeight: "700",
    fontSize: 22,
    lineHeight: 33,
    textAlign: "right",
  },
});

export default HomePage;

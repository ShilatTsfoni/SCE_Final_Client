import { StyleSheet, View, Text, FlatList, ScrollView } from "react-native";
import VolunteerCard from "../../components/VolunteerCard";
import VolunteerOffer from "../../components/VolunteerOffer";
import imageExmp from "../../../assets/images/example.jpg";
import { useNavigation } from "@react-navigation/native";
import { useCallback,useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LogoutButton from "../../components/LogoutButton";
import { handleLogout } from "../SignUp/OTP";
import { AuthContext } from "../../contexts/AuthContext";
import TokenContext from "../../contexts/TokenContext";
import { useFocusEffect } from '@react-navigation/native';
import { UserContext } from "../../contexts/userContext"; // Corrected import

//---------------------------------------------------------------------------
function getCurrentDate() {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}
//---------------------------------------------------------------------------
function HomePage() {

  const navigation = useNavigation();
  const [nextVolunteeringData, setNextVolunteeringData] = useState([]); // State to hold next volunteering data
  const [volunteerOfferData, setVolunteerOfferData] = useState([]); // State to hold volunteer offer data
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  const {token} = useContext(TokenContext);
  const [filter_url,setFilter_url] = useState([]);
  const [newVolunteeringEvents,setNewVolunteeringEvents] = useState([]);
  
  const {userid,first_name,last_name,friends,most_important} = useContext(UserContext);
  const prefrences_dict = {'Friends':'התנדבויות עם החברים שלי','Distance':'התנדבויות קרובות אלי','Profession':'התנדבויות במקצוע שלי','Organization':'התנדבויות בארגונים שלי','New':'התנדבויות חדשות'};
  
  //---------------------------------------------------------------------------
  useFocusEffect(
    useCallback(() => {
      fetch_next_events();
      fetch_volunteer_offers();
      fetch_new_events();
    }, [fetch_next_events,fetch_volunteer_offers,fetch_new_events])
  );
  //---------------------------------------------------------------------------
  const fetch_next_events = useCallback(async () => {//
      try {
        const currentDate = getCurrentDate();
        console.log(userid);
        const response = await fetch(`http://10.0.2.2:8000/api/events/?volunteers=self&start_date_after=${currentDate}`,{headers:{"Authorization":`Bearer  ${token}`}});
        if (response.ok) {
          const data = await response.json();
          setNextVolunteeringData(data.results);
        }
      } catch (error) {
        console.error("error retrieving next events data from server:", error);
      }
    });
//---------------------------------------------------------------------------
  const fetch_volunteer_offers =useCallback( async () => {
    try {
      if (most_important == 'Friends'){
        setFilter_url("friends");
      }
      const currentDate = getCurrentDate();
      console.log("filters " + filter_url)
      const response = await fetch(`http://10.0.2.2:8000/api/events/?volunteers=${filter_url}&start_date_after=${currentDate}`,{headers:{"Authorization":`Bearer ${token}`}});
      if (response.ok) {//
        const data = await response.json();//
        console.log("Fetched data:", data);
        setVolunteerOfferData(data.results);
      } else {
        console.error("Failed to fetch volunteer data");
      }
    } catch (error) {
      console.error("Error fetching volunteer data:", error);
    }
  });
  //---------------------------------------------------------------------------

  const fetch_new_events = useCallback(async () => {//
    try {
      const currentDate = getCurrentDate();
      console.log(userid);
      const response = await fetch(`http://10.0.2.2:8000/api/events/?ordering=-start_date`,{headers:{"Authorization":`Bearer ${token}`}});
      if (response.ok) {
        const data = await response.json();
        setNewVolunteeringEvents(data.results);
      }
    } catch (error) {
      console.error("error retrieving next events data from server:", error);
    }
  });
  //---------------------------------------------------------------------------
  // Function to format date as DD.MM.YYYY
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();//
    //return `${padZero(day)}.${padZero(month)}.${year}`;
    return `${year}.${padZero(month)}.${padZero(day)}`;
  };
  //---------------------------------------------------------------------------
  // Function to pad zero for single-digit numbers
  const padZero = (num) => {
    return num < 10 ? `0${num}` : num;
  };
  //---------------------------------------------------------------------------
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
    return (
      <VolunteerCard
        eventName = {item.name}
        organizationName={item.organization.name}
        location={item.location}
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
          item.description,//
          item.organization.description,
          item.organization.contact_name,
          item.organization.contact_phone,
        ]}
      />
    );
  };
  //---------------------------------------------------------------------------

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


    return (
      <VolunteerOffer
        eventName = {item.name}
        organizationName={item.organization.name}
        location={item.location}
        date={formatDate(parsedStartDate)}
        time={parsedStartTime}//
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
//---------------------------------------------------------------------------

  return (
    <View style={styles.container}>
      <View style={{ left: 150 }}>
        <LogoutButton
          onPress={() => handleLogout(setIsAuthenticated)}
          title={"התנתק/י"}
        />
      </View>
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
      <View style={styles.volunteerOfferContainer}>
        <View style={styles.headingContainer}>
          <Text style={styles.heading}>{prefrences_dict[most_important]}</Text>
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
          <Text style={styles.heading}>{prefrences_dict['New']} </Text>
        </View>
        <FlatList
          data={newVolunteeringEvents}
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

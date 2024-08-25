import React, { useCallback, useContext, useEffect, useState } from "react";
import { StyleSheet, View, Text, FlatList } from "react-native";
import VolunteerCard from "../../components/VolunteerCard";
import { useNavigation } from "@react-navigation/native";
import { useFocusEffect } from "@react-navigation/native";
import { AuthContext } from "../../contexts/AuthContext";
import TokenContext from "../../contexts/TokenContext";
import { UserContext } from "../../contexts/userContext";

function getCurrentDate() {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

const MyActivity = () => {
  const navigation = useNavigation();
  const [nextVolunteeringData, setNextVolunteeringData] = useState([]); // State to hold next volunteering data
  const { token } = useContext(TokenContext);
  const { userid } = useContext(UserContext);

  useFocusEffect(
    useCallback(() => {
      fetch_next_events();
    }, [fetch_next_events])
  );

  const fetch_next_events = useCallback(async () => {
    try {
      const currentDate = getCurrentDate();
      const response = await fetch(
        `http://10.0.2.2:8000/api/events/?volunteers=self&start_date_after=${currentDate}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.ok) {
        const data = await response.json();
        setNextVolunteeringData(data.results);
      }
    } catch (error) {
      console.error("error retrieving next events data from server:", error);
    }
  });

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${year}.${padZero(month)}.${padZero(day)}`;
  };

  const padZero = (num) => {
    return num < 10 ? `0${num}` : num;
  };

  const renderVolunteerCardItem = ({ item }) => {
    const startDate = new Date(item.start_date);
    const parsedStartDate =
      startDate instanceof Date && !isNaN(startDate)
        ? startDate.toISOString().split("T")[0]
        : "Invalid Date";
    const parsedStartTime =
      startDate instanceof Date && !isNaN(startDate)
        ? startDate.toISOString().split("T")[1].slice(0, 5)
        : "Invalid Date";

    const durationParts = item.duration.split(":");
    const durationHours = parseInt(durationParts[0], 10);
    const durationMinutes = parseInt(durationParts[1], 10);

    const endTime = new Date(
      startDate.getTime() + (durationHours * 60 + durationMinutes) * 60000
    );
    const parsedEndTime =
      endTime instanceof Date && !isNaN(endTime)
        ? endTime.toISOString().split("T")[1].slice(0, 5)
        : "Invalid Date";

    return (
      <VolunteerCard
        eventName={item.name}
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
      <Text style={styles.heading}>הפעילויות הבאות שלי</Text>
      <FlatList
        data={nextVolunteeringData}
        renderItem={renderVolunteerCardItem}
        keyExtractor={(item) => item.id.toString()}
        ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
        contentContainerStyle={{ paddingBottom: 16 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 80,
  },
  heading: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "right",
    marginBottom: 20,
  },
});

export default MyActivity;

import { StyleSheet, View, Text, FlatList, ScrollView } from "react-native";
import VolunteerCard from "../../components/VolunteerCard";
import VolunteerOffer from "../../components/VolunteerOffer";
import imageExmp from "../../../assets/images/example.jpg";
import { useNavigation } from "@react-navigation/native";

function HomePage() {
  const navigation = useNavigation();

  const nextVolunteeringData = [
    {
      id: "1",
      organizationName: 'חמ"ל נשות המילואים',
      location: "גמליאל 5, תל אביב",
      date: "15.03.2024",
      time: "16:00",
    },
    {
      id: "2",
      organizationName: "חמ״ל שם ארוך מאוד מאוד מאוד מאוד מאוד ",
      location: "גמליאל 5, תל אביב",
      date: "27.03.2024",
      time: "16:00",
    },
    {
      id: "3",
      organizationName: 'חמ"ל נשות המילואים',
      location: "גמליאל 5, תל אביב",
      date: "27.03.2024",
      time: "16:00",
    },
  ];
  const volunteerOfferData = [
    {
      id: "1",
      organizationName: 'חמ"ל נשות המילואים',
      location: "גמליאל 5, תל אביב",
      date: "13.03.2024",
      time: "16:00",
      navigation: navigation,
    },
    {
      id: "2",
      organizationName: "חמ״ל שם ארוך מאוד מאוד מאוד מאוד מאוד ",
      location: "גמליאל 5, תל אביב",
      date: "27.03.2024",
      time: "16:00",
      navigation: navigation,
    },
  ];

  // Define a function to render each VolunteerCard
  const renderVolunteerCardItem = ({ item }) => (
    <VolunteerCard
      organizationName={item.organizationName}
      location={item.location}
      date={item.date}
      time={item.time}
      id={item.id}
    />
  );

  // Define a function to render each VolunteerOffer
  const renderVolunteerOfferItem = ({ item }) => (
    <VolunteerOffer
      organizationName={item.organizationName}
      location={item.location}
      date={item.date}
      time={item.time}
      imageSource={imageExmp}
      navigation={item.navigation}
    />
  );

  return (
    <View style={styles.container}>
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
          <Text style={styles.heading}>הצעות התנדבות עבורי</Text>
        </View>
        <FlatList
          data={volunteerOfferData}
          renderItem={renderVolunteerOfferItem}
          keyExtractor={(item) => item.id}
          horizontal
          ItemSeparatorComponent={() => <View style={{ width: 8 }} />}
          contentContainerStyle={{
            paddingStart: 40,
          }}
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
          ItemSeparatorComponent={() => <View style={{ width: 8 }} />}
          contentContainerStyle={{
            paddingStart: 40,
          }}
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

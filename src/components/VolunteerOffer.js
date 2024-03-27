import { useNavigation } from "@react-navigation/native";
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const windowWidth = Dimensions.get("window").width;

function VolunteerOffer({
  organizationName,
  location,
  date,
  time,
  imageSource,
  id,
  eventData,
}) {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate("ActivityScreen", {
      eventId: id,
      source: "VolunteerOffer",
      eventData: eventData,
    });
  };
  return (
    <TouchableOpacity onPress={handlePress} style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={imageSource} style={styles.image} />
      </View>
      <Text
        style={styles.headingOfferText}
        numberOfLines={1}
        ellipsizeMode="tail"
      >
        {organizationName}
      </Text>
      <Text style={styles.offerText}>
        {location} | {time} | {date}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "flex-end",
    width: 294,
    borderRadius: 12,
    padding: 16,
    gap: 16,
    alignSelf: "center",
    backgroundColor: "#F5F5F5",
  },
  imageContainer: {
    alignItems: "center",
    marginTop: -16,
    marginBottom: -10,
  },
  image: {
    left: 15,
    width: windowWidth - 100,
    height: windowWidth / 4,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  headingOfferText: {
    fontFamily: "Inter",
    fontSize: 18,
    fontWeight: "600",
    textAlign: "right",
    lineHeight: 27,
    color: "#060606",
  },
  offerText: {
    fontFamily: "Inter",
    fontSize: 14,
    fontWeight: "400",
    textAlign: "right",
    lineHeight: 21,
    color: "#060606",
  },
});

export default VolunteerOffer;

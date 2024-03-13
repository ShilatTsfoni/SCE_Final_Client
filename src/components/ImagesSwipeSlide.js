import {
  Image,
  ScrollView,
  StyleSheet,
  View,
  useWindowDimensions,
} from "react-native";

function ImagesSwipeSlide({ images, currentIndex, onIndexChange }) {
  const windowWidth = useWindowDimensions().width;

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={(event) => {
          const slideWidth = event.nativeEvent.layoutMeasurement.width;
          const currentIndex = Math.floor(
            event.nativeEvent.contentOffset.x / slideWidth
          );
          onIndexChange(currentIndex);
        }}
      >
        {images.map((image, index) => (
          <View key={index} style={[styles.slide, { width: windowWidth }]}>
            <Image source={image} style={styles.image} />
          </View>
        ))}
      </ScrollView>
      <View style={styles.navigation}>
        {images.map((_, index) => (
          <View
            key={index}
            style={[
              styles.navigationPoint,
              currentIndex === index && styles.activeNavigationPoint,
            ]}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  slide: {
    flex: 1,
  },
  image: {
    width: 343,
    height: 254,
    borderRadius: 16,
  },
  navigation: {
    position: "absolute",
    bottom: 8,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "center",
  },
  navigationPoint: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#B9B9C9",
    marginHorizontal: 4,
  },
  activeNavigationPoint: {
    backgroundColor: "#007AFF",
  },
});

export default ImagesSwipeSlide;

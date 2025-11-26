import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Platform,
  TouchableOpacity,
  Alert,
} from "react-native";
import * as Location from "expo-location";
import { useNavigation } from "@react-navigation/native";

const ResultScreen = ({ route }) => {
  const navigation = useNavigation();
  const suggestions =
    route?.params?.suggestions && Array.isArray(route.params.suggestions)
      ? route.params.suggestions
      : [];

  const userInput = route?.params?.userInput || "";

  const requestLocationAndNavigate = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        if (Platform.OS === "web") {
          alert("Location access denied. Using default location (Delhi).");
        } else {
          Alert.alert("Permission Denied", "Location access is required.");
        }

        navigation.navigate("NearbyHospitalScreen", {
          lat: 28.6139,
          lng: 77.2090,
        });
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;

      navigation.navigate("NearbyHospitalScreen", {
        lat: latitude,
        lng: longitude,
      });
    } catch (error) {
      console.warn("🌐 Location fetch failed:", error.message);

      if (Platform.OS === "web") {
        alert("Unable to fetch location. Using default location (Delhi).");
      } else {
        Alert.alert("Error", "Unable to fetch location. Using default location.");
      }

      navigation.navigate("NearbyHospitalScreen", {
        lat: 28.6139,
        lng: 77.2090,
      });
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Your Symptoms Card */}
      <View style={styles.symptomCard}>
        <Text style={styles.symptomLabel}>Your Symptoms:</Text>
        <Text style={styles.symptomValue}>{userInput}</Text>
      </View>

      {/* Header */}
      <View style={styles.headerBox}>
        <Text style={styles.headerTitle}>Based on your symptoms</Text>
        <Text style={styles.subHeader}>Possible Conditions</Text>
      </View>

      {/* Disclaimer */}
      <View style={styles.warningBox}>
        <Text style={styles.disclaimer}>
          Important Note: These are AI-generated suggestions. Please consult a doctor for accurate diagnosis.
        </Text>
      </View>

      {/* Suggestions */}
      {suggestions.length === 0 ? (
        <Text style={styles.noData}>No suggestions available. Please try again.</Text>
      ) : (
        suggestions.map((item, index) => (
          <Pressable
            key={index}
            style={({ hovered }) => [
              styles.card,
              hovered && Platform.OS === "web" ? styles.cardHover : null,
            ]}
          >
            <Text style={styles.conditionName}>
              {item.name} – {item.percentage}%
            </Text>
            <Text style={styles.description}>{item.description}</Text>
            {item.mostLikely && (
              <Text style={styles.mostLikely}>Most Likely Match</Text>
            )}
            <View style={styles.progressBar}>
              <View
                style={[
                  styles.progressFill,
                  { width: `${item.percentage}%` },
                ]}
              />
            </View>
          </Pressable>
        ))
      )}

      {/* Find Doctors Button */}
      <TouchableOpacity style={styles.findBtn} onPress={requestLocationAndNavigate}>
        <Text style={styles.findBtnText}>Find Nearby Hospitals</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex:1,
    padding: 20,
    backgroundColor: "#E6F4FE",   
  },
  headerBox: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 12,
    
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#D9E2EC",
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000000ff",
  },
  subHeader: {
    fontSize: 14,
    color: "#000000ff",
    marginTop: 2,
  },
  symptomCard: {
    marginTop: 30,
backgroundColor: "#1D3D47",    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#D9E2EC",
  },
  symptomLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#ffffffff",
    marginBottom: 4,
  },
  symptomValue: {
    fontSize: 14,
    color: "#ffffffff",
  },
  warningBox: {
    backgroundColor: "#FFF4CC",
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
  },
  disclaimer: {
    color: "#D00000",
    fontSize: 13,
  },
  noData: {
    fontSize: 14,
    color: "#555",
    marginTop: 20,
    textAlign: "center",
  },
  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  cardHover: {
    backgroundColor: "#E6F4FE",
    transform: [{ scale: 1.02 }],
  },
  conditionName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1D3D47",
  },
  description: {
    fontSize: 14,
    color: "#555",
    marginVertical: 4,
  },
  mostLikely: {
    fontSize: 13,
    color: "#eb4b4bff",
    fontWeight: "600",
  },
  progressBar: {
    height: 8,
    backgroundColor: "#eee",
    borderRadius: 4,
    marginTop: 8,
  },
  progressFill: {
    height: 8,
backgroundColor: "#1D3D47",    borderRadius: 4,
  },
  findBtn: {
    marginTop: 10,
    bottom:10,
backgroundColor: "#1D3D47",    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    
  },
  findBtnText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ResultScreen;
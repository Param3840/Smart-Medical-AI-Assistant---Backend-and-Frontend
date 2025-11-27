import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Platform,
  Linking,
} from "react-native";

export default function NearbyHospitalScreen({ route }) {
  const { lat, lng } = route.params || {};
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("📍 Fetching hospitals for:", lat, lng);

    if (!lat || !lng) {
      Alert.alert("Error", "Missing location coordinates.");
      setLoading(false);
      return;
    }

    fetch(`https://smartmedicalai-backend-4.onrender.com/geo-location?lat=${lat}&lng=${lng}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Server error");
        }
        return res.json();
      })
      .then((data) => {
        console.log("✅ GeoAPI response:", data);
        setHospitals(data.hospitals || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("❌ GeoAPI error:", err.message);
        Alert.alert(
          "Error",
          "Unable to fetch hospitals. Please check your location or network."
        );
        setLoading(false);
      });
  }, [lat, lng]);

  const openMapLocation = (name, locationHint) => {
    const query = encodeURIComponent(`${name} ${locationHint || ""}`);
    const url = `https://www.google.com/maps/search/?api=1&query=${query}`;
    Platform.OS === "web" ? window.open(url, "_blank") : Linking.openURL(url);
  };

  const openVisitInfo = (name) => {
    const query = encodeURIComponent(`${name} hospital`);
    const url = `https://www.google.com/search?q=${query}`;
    Platform.OS === "web" ? window.open(url, "_blank") : Linking.openURL(url);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#00A88E" />
        <Text style={{ marginTop: 10 }}>Fetching nearby hospitals...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recommended Hospitals</Text>
      <Text style={styles.subtitle}>Specialists near your location</Text>

      {hospitals.length === 0 ? (
        <Text style={{ textAlign: "center", marginTop: 20 }}>
          No hospitals found near your location.
        </Text>
      ) : (
        <FlatList
          data={hospitals}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.detail}>📍 {item.address}</Text>
              {item.distance !== undefined && (
                <Text style={styles.detail}>
                  📏 Distance: {(item.distance / 1000).toFixed(2)} km
                </Text>
              )}
              <View style={styles.actions}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => openMapLocation(item.name, item.address)}
                >
                  <Text style={styles.buttonText}>📍 Map</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => openVisitInfo(item.name)}
                >
                  <Text style={styles.buttonText}>🌐 Visit Info</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#E6F4FE",  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#E6F2EF",
  },
  title: {
    marginTop:30,
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#000000ff",
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
    color: "#555",
  },
  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    elevation: 3,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#015022ff",
  },
  detail: {
    fontSize: 14,
    marginTop: 4,
    color: "#333",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
  },
  button: {
     backgroundColor: "#1D3D47",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 6,
  },
  buttonText: {
    fontWeight: "bold",
    color: "#ffffffff",
  },
});
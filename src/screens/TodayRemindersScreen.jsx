import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function TodayRemindersScreen({ onBack }) {
  const [todayReminders, setTodayReminders] = useState([]);

  useEffect(() => {
    const loadToday = async () => {
      try {
        const saved = await AsyncStorage.getItem("reminders");
        const savedCompleted = await AsyncStorage.getItem("completedReminders");
        const savedMissed = await AsyncStorage.getItem("missedReminders");

        const today = new Date().toDateString();
        const active = saved ? JSON.parse(saved) : [];
        const completed = savedCompleted ? JSON.parse(savedCompleted) : [];
        const missed = savedMissed ? JSON.parse(savedMissed) : [];

        // ✅ Filter missed reminders whose date is today only
        const missedToday = missed.filter((r) => {
          const rDate = new Date(r.time);
          return rDate.toDateString() === today;
        });

        const all = [...active, ...completed, ...missedToday];

        const filtered = all.filter((r) => {
          const rDate = new Date(r.time);
          return rDate.toDateString() === today;
        });

        setTodayReminders(filtered);
      } catch (err) {
        console.error("Failed to load today reminders", err);
      }
    };

    loadToday();
  }, []);

  const getStatusStyle = (status) => {
    switch (status) {
      case "completed":
        return { color: "green", fontWeight: "bold" };
      case "missed":
        return { color: "red", fontWeight: "bold" };
      case "pending":
        return { color: "orange", fontWeight: "bold" };
      default:
        return { color: "#555" };
    }
  };

  const renderItem = ({ item }) => {
    const date = new Date(item.time);
    const formattedDate = date.toLocaleDateString("en-US");
    const formattedTime = date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    return (
      <View style={styles.card}>
        <Text style={styles.title}>{item.title}</Text>
        <View style={styles.datetimeRow}>
          <View style={styles.datetimeColumn}>
            <Text style={styles.dateText}>📅 Date: {formattedDate}</Text>
            <Text style={styles.timeText}>⏰ Time: {formattedTime}</Text>
          </View>
          <View style={styles.repeatBox}>
            <Text style={styles.repeatText}>🔁 {item.repeat}</Text>
          </View>
        </View>
        <Text style={styles.description}>{item.description}</Text>
        <Text style={styles.status}>
          Status: <Text style={getStatusStyle(item.status)}>{item.status}</Text>
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Today's Reminders</Text>

      <FlatList
        data={[...todayReminders].sort((a, b) => new Date(a.time) - new Date(b.time))}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListEmptyComponent={<Text style={styles.empty}>No reminders for today</Text>}
      />

      <TouchableOpacity style={styles.backButton} onPress={onBack}>
        <Text style={styles.backText}>← Back</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#E6F4FE", padding: 20 },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    marginTop: 30,
    color: "#000000ff",
  },
  card: {
    backgroundColor: "#ffffffff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
  },
  title: { fontSize: 18, fontWeight: "bold", marginBottom: 8 },
  datetimeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 6,
  },
  datetimeColumn: {
    flexDirection: "column",
  },
  dateText: {
    fontSize: 14,
    color: "#555",
    marginBottom: 2,
    fontWeight: "500",
  },
  timeText: {
    fontWeight: "500",
    fontSize: 14,
    color: "#555",
  },
  repeatBox: {
    backgroundColor: "#f0f0f0",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    alignSelf: "flex-start",
  },
  repeatText: {
    fontSize: 13,
    color: "#333",
  },
  description: { fontSize: 14, color: "#555" },
  status: { fontSize: 14, color: "#000", marginTop: 6 },
  empty: { textAlign: "center", marginTop: 50, color: "#999" },
  backButton: {
    marginBottom: 30,
    padding: 12,
 backgroundColor: "#1D3D47",
    borderRadius: 8,
    alignItems: "center",
  },
  backText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});
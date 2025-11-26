import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function CompletedScreen({ onBack }) {
  const [completedReminders, setCompletedReminders] = useState([]);

  useEffect(() => {
    const loadCompleted = async () => {
      try {
        const saved = await AsyncStorage.getItem("completedReminders");
        if (saved) {
          const parsed = JSON.parse(saved);
          setCompletedReminders(parsed);
        }
      } catch (err) {
        console.error("Failed to load completed reminders", err);
      }
    };
    loadCompleted();
  }, []);

  const handleDelete = async (id) => {
    try {
      const updatedCompleted = completedReminders.filter((r) => r.id !== id);
      setCompletedReminders(updatedCompleted);
      await AsyncStorage.setItem("completedReminders", JSON.stringify(updatedCompleted));
    } catch (err) {
      console.error("Failed to delete reminder", err);
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
          Status: <Text style={styles.completed}>Completed</Text>
        </Text>

        <TouchableOpacity onPress={() => handleDelete(item.id)}>
          <Text style={styles.deleteText}>🗑️ Delete</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Completed Reminders</Text>

      <FlatList
        data={completedReminders}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListEmptyComponent={
          <Text style={styles.empty}>No completed reminders</Text>
        }
      />

      <TouchableOpacity
        style={styles.backButton}
        onPress={() => {
          onBack(); // ✅ Triggers checkReminderStatus() in ReminderScreen
        }}
      >
        <Text style={styles.backText}>← Back</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E6F4FE",
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 40,
    marginBottom: 20,
    color: "#000000ff",
  },
  card: {
    backgroundColor: "#ffffffff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
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
    fontWeight: "500",
    fontSize: 14,
    color: "#555",
    marginBottom: 2,
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
  description: {
    fontSize: 14,
    color: "#555",
  },
  status: {
    fontSize: 14,
    color: "#000000ff",
    marginTop: 4,
    fontWeight: "500",
  },
  completed: {
    marginTop: 4,
    color: "#155a00ff",
  },
  deleteText: {
    color: "red",
    fontWeight: "bold",
    marginTop: 8,
  },
  empty: {
    textAlign: "center",
    marginTop: 50,
    color: "#999",
  },
  backButton: {
    padding: 12,
    backgroundColor: "#1D3D47",
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 30,
  },
  backText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
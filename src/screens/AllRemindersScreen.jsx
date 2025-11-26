import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function AllRemindersScreen({ onBack }) {
  const [groupedReminders, setGroupedReminders] = useState([]);

  useEffect(() => {
    const loadAll = async () => {
      try {
        const savedPending = await AsyncStorage.getItem("reminders");
        const savedCompleted = await AsyncStorage.getItem("completedReminders");
        const savedMissed = await AsyncStorage.getItem("missedReminders");

        const pending = savedPending ? JSON.parse(savedPending) : [];
        const completed = savedCompleted ? JSON.parse(savedCompleted) : [];
        const missed = savedMissed ? JSON.parse(savedMissed) : [];

        const grouped = [
          { title: "✅ Completed", data: completed },
          { title: "❌ Missed", data: missed },
          { title: "🕒 Pending", data: pending },
        ];

        setGroupedReminders(grouped);
      } catch (err) {
        console.error("Failed to load all reminders", err);
      }
    };

    loadAll();
  }, []);

  const getStatusStyle = (status) => {
    switch (status) {
      case "completed":
        return styles.completed;
      case "missed":
        return styles.missed;
      case "pending":
        return styles.pending;
      default:
        return styles.defaultStatus;
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
        <Text style={styles.statusLabel}>
          Status: <Text style={getStatusStyle(item.status)}>{item.status}</Text>
        </Text>
      </View>
    );
  };

  const totalCount = groupedReminders.reduce((sum, group) => sum + group.data.length, 0);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>All Reminders</Text>

      <View style={styles.summaryRow}>
        <Text style={styles.summaryText}>
          ✅ Completed: {groupedReminders[0]?.data.length || 0}
        </Text>
        <Text style={styles.summaryText}>
          ❌ Missed: {groupedReminders[1]?.data.length || 0}
        </Text>
        <Text style={styles.summaryText}>
          🕒 Pending: {groupedReminders[2]?.data.length || 0}
        </Text>
        <Text style={styles.summaryText}>📋 Total: {totalCount}</Text>
      </View>

      <FlatList
        data={groupedReminders.flatMap((group) =>
          group.data.length > 0
            ? [{ header: group.title, isHeader: true }, ...group.data]
            : []
        )}
        keyExtractor={(item, index) => item.id || `header-${index}`}
        renderItem={({ item }) =>
          item.isHeader ? (
            <Text style={styles.sectionHeader}>{item.header}</Text>
          ) : (
            renderItem({ item })
          )
        }
        ListEmptyComponent={<Text style={styles.empty}>No reminders found</Text>}
      />

      <TouchableOpacity style={styles.backButton} onPress={onBack}>
        <Text style={styles.backText}>← Back</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1,
     backgroundColor: "#E6F4FE",
      padding: 20 
    },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 30,
    marginBottom: 20,
    color: "#000000ff",
  },
  summaryRow: {
    marginBottom: 15,
  },
  summaryText: {
    fontSize: 16,
    color: "#333",
    marginBottom: 4,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000000ff",
    marginTop: 20,
    marginBottom: 10,
  },
  card: {
        backgroundColor: "#fff",
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
  },
  timeText: {
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
  statusLabel: {
    fontSize: 14,
    marginTop: 6,
  },
  completed: {
    color: "green",
    fontWeight: "bold",
  },
  missed: {
    color: "red",
    fontWeight: "bold",
  },
  pending: {
    color: "orange",
    fontWeight: "bold",
  },
  defaultStatus: {
    color: "#333",
  },
  empty: { textAlign: "center", marginTop: 50, color: "#999" },
  backButton: {
    marginTop: 20,
    marginBottom: 30,
    padding: 12,
    backgroundColor: "#1D3D47",
    borderRadius: 8,
    alignItems: "center",
  },
  backText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});
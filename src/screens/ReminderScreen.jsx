import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Modal,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AddReminderModal from "./AddReminderModal";

export default function ReminderScreen() {
  const [reminders, setReminders] = useState([]);
  const [completedReminders, setCompletedReminders] = useState([]);
  const [missedReminders, setMissedReminders] = useState([]);
  const [filter, setFilter] = useState("all");
  const [showModal, setShowModal] = useState(false);

  const checkReminderStatus = async () => {
    try {
      const saved = await AsyncStorage.getItem("reminders");
      const savedCompleted = await AsyncStorage.getItem("completedReminders");
      const savedMissed = await AsyncStorage.getItem("missedReminders");

      const now = new Date();
      const active = saved ? JSON.parse(saved) : [];
      const completed = savedCompleted ? JSON.parse(savedCompleted) : [];
      const missedRaw = savedMissed ? JSON.parse(savedMissed) : [];

      const missed = active
        .filter((r) => new Date(r.time) < now && r.status === "pending")
        .map((r) => ({ ...r, status: "missed" }));

      const updatedActive = active.filter(
        (r) => !(new Date(r.time) < now && r.status === "pending")
      );

      const updatedMissed = [
        ...missedRaw,
        ...missed.filter(
          (newMissed) => !missedRaw.some((old) => old.id === newMissed.id)
        ),
      ];

      await AsyncStorage.setItem("missedReminders", JSON.stringify(updatedMissed));
      await AsyncStorage.setItem("reminders", JSON.stringify(updatedActive));

      setReminders(updatedActive);
      setCompletedReminders(completed);
      setMissedReminders(updatedMissed);
    } catch (err) {
      console.error("Failed to check reminder status", err);
    }
  };

  useEffect(() => {
    checkReminderStatus();
    const interval = setInterval(() => {
      checkReminderStatus();
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const getFilteredReminders = () => {
    const today = new Date().toDateString();
    switch (filter) {
      case "completed":
        return completedReminders;
      case "missed":
        return missedReminders.filter(
          (r) => new Date(r.time).toDateString() === today
        );
      case "today":
        return [...reminders, ...completedReminders, ...missedReminders].filter(
          (r) => new Date(r.time).toDateString() === today
        );
      default:
        return [...reminders, ...completedReminders, ...missedReminders];
    }
  };

  const handleComplete = async (id) => {
    const all = [...reminders, ...missedReminders];
    const completed = all.find((r) => r.id === id);
    if (completed) {
      completed.status = "completed";

      const updatedReminders = reminders.filter((r) => r.id !== id);
      const updatedMissed = missedReminders.filter((r) => r.id !== id);

      await AsyncStorage.setItem("reminders", JSON.stringify(updatedReminders));
      await AsyncStorage.setItem("missedReminders", JSON.stringify(updatedMissed));

      const savedCompleted = await AsyncStorage.getItem("completedReminders");
      const parsedCompleted = savedCompleted ? JSON.parse(savedCompleted) : [];
      const updatedCompleted = [...parsedCompleted, completed];
      await AsyncStorage.setItem("completedReminders", JSON.stringify(updatedCompleted));

      checkReminderStatus();
    }
  };

  const handleDelete = async (id) => {
    const updatedReminders = reminders.filter((r) => r.id !== id);
    const updatedMissed = missedReminders.filter((r) => r.id !== id);
    const updatedCompleted = completedReminders.filter((r) => r.id !== id);

    await AsyncStorage.setItem("reminders", JSON.stringify(updatedReminders));
    await AsyncStorage.setItem("missedReminders", JSON.stringify(updatedMissed));
    await AsyncStorage.setItem("completedReminders", JSON.stringify(updatedCompleted));

    checkReminderStatus();
  };

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

  const getCounts = () => {
    const today = new Date().toDateString();
    return {
      all: reminders.length + completedReminders.length + missedReminders.length,
      today: [...reminders, ...completedReminders, ...missedReminders].filter(
        (r) => new Date(r.time).toDateString() === today
      ).length,
      missed: missedReminders.filter(
        (r) => new Date(r.time).toDateString() === today
      ).length,
      completed: completedReminders.length,
    };
  };

  const counts = getCounts();

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.heading}>My Reminders</Text>
        <TouchableOpacity style={styles.addButton} onPress={() => setShowModal(true)}>
          <Text style={styles.addText}>+ Add</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.grid}>
  <View style={styles.row}>
    <TouchableOpacity
      style={[
        styles.box,
        filter === "all" && styles.boxActive,
      ]}
      onPress={() => setFilter("all")}
      activeOpacity={0.7}
    >
      <Text style={styles.boxLabel}>ALL</Text>
      <Text style={styles.boxCount}>{counts.all}</Text>
    </TouchableOpacity>
    <TouchableOpacity
      style={[
        styles.box,
        filter === "today" && styles.boxActive,
      ]}
      onPress={() => setFilter("today")}
      activeOpacity={0.7}
    >
      <Text style={styles.boxLabel}>TODAY</Text>
      <Text style={styles.boxCount}>{counts.today}</Text>
    </TouchableOpacity>
  </View>
  <View style={styles.row}>
    <TouchableOpacity
      style={[
        styles.box,
        filter === "missed" && styles.boxActive,
      ]}
      onPress={() => setFilter("missed")}
      activeOpacity={0.7}
    >
      <Text style={styles.boxLabel}>MISSED</Text>
      <Text style={styles.boxCount}>{counts.missed}</Text>
    </TouchableOpacity>
    <TouchableOpacity
      style={[
        styles.box,
        filter === "completed" && styles.boxActive,
      ]}
      onPress={() => setFilter("completed")}
      activeOpacity={0.7}
    >
      <Text style={styles.boxLabel}>COMPLETED</Text>
      <Text style={styles.boxCount}>{counts.completed}</Text>
    </TouchableOpacity>
  </View>
</View>

      <FlatList
        data={getFilteredReminders().sort((a, b) => new Date(a.time) - new Date(b.time))}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          const date = new Date(item.time);
          const formattedDate = date.toLocaleDateString("en-US");
          const formattedTime = date.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          });

          return (
            <View style={styles.card}>
              <TouchableOpacity onPress={() => handleComplete(item.id)}>
                <View style={styles.checkbox} />
              </TouchableOpacity>
              <View style={styles.details}>
                <Text style={styles.task}>{item.title}</Text>
                <Text style={styles.description}>{item.description}</Text>
                <View style={styles.datetimeRow}>
                  <View style={styles.datetimeColumn}>
                    <Text style={styles.dateText}>📅 Date: {formattedDate}</Text>
                    <Text style={styles.timeText}>⏰ Time: {formattedTime}</Text>
                  </View>
                  <View style={styles.repeatBox}>
                    <Text style={styles.repeatText}>🔁 {item.repeat}</Text>
                  </View>
                </View>
                <Text style={styles.status}>
                  Status: <Text style={getStatusStyle(item.status)}>{item.status}</Text>
                </Text>
                <View style={styles.cardFooter}>
                  <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => handleDelete(item.id)}
                  >
                    <Text style={styles.deleteButtonText}>Delete</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          );
        }}
        ListEmptyComponent={<Text style={styles.empty}>No reminders</Text>}
      />

      <Modal visible={showModal} animationType="slide">
        <AddReminderModal
          onClose={() => setShowModal(false)}
          onCreate={async (newReminder) => {
            const reminderWithDate = {
              ...newReminder,
              createdAt: new Date().toISOString(),
              status: "pending",
            };

            const updatedReminders = [...reminders, reminderWithDate];
            setReminders(updatedReminders);
            await AsyncStorage.setItem("reminders", JSON.stringify(updatedReminders));
            checkReminderStatus();
            setShowModal(false);
          }}
        />
      </Modal>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
  flex: 1,
  backgroundColor: "#E6F4FE",
  paddingHorizontal: 20,
  paddingTop: 10, // was 20
},

  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    marginTop: 40,
  },

  heading: { fontSize: 24, fontWeight: "bold", color: "#000000ff" },

  addButton: {
    backgroundColor: "#1D3D47",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },

  addText: { color: "#fff", fontSize: 16, fontWeight: "bold" },

  filterGrid: {
  flexDirection: "row",
  flexWrap: "wrap",
  justifyContent: "space-between",
  // marginBottom: 4, // was 12
},

  filterBox: {
    width: "48%",
    aspectRatio: 1.5,
    backgroundColor: "#ccc",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
    paddingVertical: 4,
    paddingHorizontal: 4,
  },

  filterBoxActive: {
    backgroundColor: "#1D3D47",
  },

  filterLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },

  filterCount: {
    fontSize: 12,
    color: "#fff",
    marginTop: 2,
  },

 card: {
  backgroundColor: "#fff",
  borderRadius: 10,
  padding: 12,
  marginBottom: 6, 
  flexDirection: "row",
  alignItems: "flex-start",
},

  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#1D3D47",
    marginRight: 12,
    marginTop: 6,
  },

  details: {
    flex: 1,
  },
  task: {
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 2,
  },

  description: {
    fontSize: 13,
    color: "#555",
    marginBottom: 4,
  },

  datetimeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },

  datetimeColumn: {
    flexDirection: "column",
  },

  dateText: {
    fontSize: 13,
    color: "#333",
  },

  timeText: {
    fontSize: 13,
    color: "#333",
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

  status: {
    fontSize: 14,
    marginTop: 4,
  },

  cardFooter: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 8,
  },

  deleteButton: {
    backgroundColor: "#c93131ff",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },

  deleteButtonText: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "bold",
  },

  empty: {
    textAlign: "center",
    marginTop: 50,
    color: "#999",
  },
  grid: {
  marginBottom: 8,
},

row: {
  flexDirection: "row",
  justifyContent: "space-between",
  marginBottom: 6,
},

box: {
  flex: 1,
  backgroundColor: "#ccc",
  borderRadius: 8,
  paddingVertical: 14,
  marginHorizontal: 5,
  alignItems: "center",
  justifyContent: "center",
  elevation: 2,
},

boxActive: {
  backgroundColor: "#1D3D47",
},

boxLabel: {
  fontSize: 14,
  fontWeight: "bold",
  color: "#fff",
},

boxCount: {
  fontSize: 18,
  fontWeight: "bold",
  color: "#fff",
  marginTop: 4,
},
});
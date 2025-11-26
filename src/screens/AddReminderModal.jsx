import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Switch,
  Platform,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import * as Notifications from "expo-notifications";

export default function AddReminderModal({ onClose, onCreate }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [repeat, setRepeat] = useState("Once");
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const getCombinedDateTime = () => {
    const combined = new Date(date);
    combined.setHours(time.getHours());
    combined.setMinutes(time.getMinutes());
    combined.setSeconds(0);
    return combined;
  };

  const scheduleNotification = async (reminder) => {
    if (!notificationsEnabled || Platform.OS === "web") return;

    let trigger;
    const combinedTime = new Date(reminder.time);

    if (repeat === "Once") {
      trigger = combinedTime;
    } else if (repeat === "Every Hour") {
      trigger = { seconds: 3600, repeats: true };
    } else if (repeat === "Every 2 Hours") {
      trigger = { seconds: 7200, repeats: true };
    } else if (repeat === "Every Day") {
      trigger = {
        hour: combinedTime.getHours(),
        minute: combinedTime.getMinutes(),
        repeats: true,
      };
    }

    await Notifications.scheduleNotificationAsync({
      content: {
        title: reminder.title,
        body: reminder.description || "Reminder alert!",
        sound: true,
      },
      trigger,
    });
  };

  const handleCreate = () => {
    const combinedDateTime = getCombinedDateTime();
    const newReminder = {
      id: Date.now().toString(),
      title,
      description,
      time: combinedDateTime.toISOString(),
      repeat,
      notificationsEnabled,
      status: "pending",
    };
    onCreate(newReminder);
    scheduleNotification(newReminder);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Create Reminder</Text>

      <Text style={styles.label}>Title *</Text>
      <TextInput
        style={styles.input}
        placeholder="E.g., Drink Water"
        value={title}
        onChangeText={setTitle}
      />

      <Text style={styles.label}>Description</Text>
      <TextInput
        style={[styles.input, { height: 80 }]}
        placeholder="Add details about this reminder..."
        value={description}
        onChangeText={setDescription}
        multiline
      />

      <Text style={styles.label}>Select Date *</Text>
      <TouchableOpacity style={styles.input} onPress={() => setShowDatePicker(true)}>
        <Text style={styles.timeText}>{date.toDateString()}</Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setShowDatePicker(false);
            if (event.type === "set" && selectedDate) setDate(selectedDate);
          }}
        />
      )}

      <Text style={styles.label}>Select Time *</Text>
      <TouchableOpacity style={styles.input} onPress={() => setShowTimePicker(true)}>
        <Text style={styles.timeText}>
          {time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </Text>
      </TouchableOpacity>
      {showTimePicker && (
        <DateTimePicker
          value={time}
          mode="time"
          display="default"
          onChange={(event, selectedTime) => {
            setShowTimePicker(false);
            if (event.type === "set" && selectedTime) setTime(selectedTime);
          }}
        />
      )}

      <Text style={styles.label}>Repeat Interval *</Text>
      <View style={styles.input}>
        <Picker
          selectedValue={repeat}
          onValueChange={(value) => setRepeat(value)}
          style={{ height: 50 }}
          dropdownIconColor="#a83279"
        >
          <Picker.Item label="Once" value="Once" />
          <Picker.Item label="Every Hour" value="Every Hour" />
          <Picker.Item label="Every 2 Hours" value="Every 2 Hours" />
          <Picker.Item label="Every Day" value="Every Day" />
        </Picker>
      </View>

      <View style={styles.switchRow}>
        <Text style={styles.label}>Enable Notifications</Text>
        <Switch value={notificationsEnabled} onValueChange={setNotificationsEnabled} />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleCreate}>
        <Text style={styles.buttonText}>Create Reminder</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={onClose}>
        <Text style={styles.cancel}>Cancel</Text>
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
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#000000ff",
  },
  label: {
    fontSize: 16,
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: Platform.OS === "ios" ? 12 : 10,
    marginBottom: 20,
    backgroundColor: "#f9f9f9",
  },
  timeText: {
    fontSize: 16,
    color: "#333",
  },
  switchRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#1D3D47",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  cancel: {
    textAlign: "center",
    color: "#000000ff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";

export default function MedicalRightsScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>⚖️ Medical Rights in India</Text>

      <Text style={styles.section}>1. Right to Emergency Medical Care</Text>
      <Text style={styles.text}>
        Every person has the right to receive emergency medical treatment,
        whether in a public or private hospital. No hospital can deny care in
        emergencies. This is protected under Article 21 of the Constitution
        (Right to Life).
      </Text>

      <Text style={styles.section}>2. Right to Health</Text>
      <Text style={styles.text}>
        The Supreme Court interprets the Right to Health as part of Article 21.
        It includes access to medical care, hygiene, and a healthy environment.
      </Text>

      <Text style={styles.section}>3. Labour & Health Safety Laws</Text>
      <Text style={styles.text}>
        New labour codes (2025) ensure free health check-ups, safe working
        conditions, and social security for workers. These reforms protect
        employee health and well-being.
      </Text>

      <Text style={styles.section}>4. Emergency Helplines</Text>
      <Text style={styles.text}>📞 108 – Ambulance</Text>
      <Text style={styles.text}>📞 112 – All-in-one emergency</Text>
      <Text style={styles.text}>📞 1098 – Child helpline</Text>

      <Text style={styles.section}>5. Legal Protection</Text>
      <Text style={styles.text}>
        In the landmark case *Parmanand Katara v. Union of India*, the Supreme
        Court ruled that doctors must treat patients in emergencies without
        waiting for legal formalities.
      </Text>

      <Text style={styles.footer}>Stay informed. Stay protected. 🛡️</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#F5F9FF",
    flex: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#1D3D47",
    marginTop:30,
    marginBottom: 20,
    textAlign: "center",
  },
  section: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1D3D47",
    marginTop: 16,
    marginBottom: 6,
  },
  text: {
    fontSize: 14,
    color: "#4A6572",
    marginBottom: 8,
  },
  footer: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1D3D47",
    marginTop: 30,
    textAlign: "center",
  },
});
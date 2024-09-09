import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { Link } from "expo-router";

export default function Page() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Welcome to BillingApp</Text>
        <Text style={styles.subtitle}>Effortless Billing & Invoicing</Text>
      </View>
      <TouchableOpacity style={styles.button}>
        <Link href="/(tabs)/menu">
          <Text style={styles.buttonText}>Get Started</Text>
        </Link>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
    padding: 20,
  },
  header: {
    marginBottom: 50,
    alignItems: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#333",
  },
  subtitle: {
    fontSize: 18,
    color: "#666",
    marginTop: 10,
    textAlign: "center",
    maxWidth: 280,
  },
  button: {
    backgroundColor: "#4CAF50",
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 30,
  },
  buttonText: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "600",
  },
});

import {
  View,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";

import useStore from "../zustand/zustand";

export default function Page() {
  const { users, updateUser, setCashier, cashier, number } = useStore();
  const [cashierName, setCashierName] = useState(cashier);

  const handleSetCashier = () => {
    setCashier(cashierName);
  };

  return (
    <View style={styles.inputContainer}>
      <Text style={styles.billNumberText}>Bill number</Text>
      <Text style={styles.billNumber}>{number}</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Cashier Name"
        value={cashierName}
        onChangeText={(text) => setCashierName(text)}
      />
      <TouchableOpacity style={styles.button} onPress={handleSetCashier}>
        <Text style={styles.buttonText}>Set Cashier</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5fcff",
  },
  text: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
  },
  input: {
    width: "80%",
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    fontSize: 20,
  },
  inputContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  billNumberText: {
    fontSize: 38,
    fontWeight: "bold",
    marginBottom: 5,
  },
  billNumber: {
    fontSize: 36,
    marginBottom: 15,
  },
  button: {
    backgroundColor: "#007BFF", // Button background color
    paddingVertical: 10, // Vertical padding
    paddingHorizontal: 20, // Horizontal padding
    borderRadius: 5, // Rounded corners
    marginTop: 10, // Space above button
  },
  buttonText: {
    color: "white", // Text color
    fontSize: 18, // Font size
    textAlign: "center", // Center text
  },
});

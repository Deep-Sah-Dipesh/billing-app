import { View, TextInput, Button, StyleSheet, Text } from "react-native";
import React, { useState } from "react";

import useStore from "../zustand/zustand";

export default function Page() {
  const { users, updateUser, setCashier, cashier, number } = useStore();
  const [cashierName, setCashierName] = useState(cashier);
  const handle = () => {};

  const handleSetCashier = () => {
    setCashier(cashierName);
  };

  return (
    <View style={styles.inputContainer}>
      <Text>Bill number</Text>
      <Text>{number}</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Cashier Name"
        value={cashierName}
        onChangeText={(text) => setCashierName(text)}
      />
      <Button title="Set Cashier" onPress={handleSetCashier} />
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
  },
  inputContainer: {
    marginTop: 20,
    alignItems: "center",
  },
});

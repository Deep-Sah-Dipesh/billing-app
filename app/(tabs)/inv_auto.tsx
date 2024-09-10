import React, { useState, useRef, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Button,
  Alert,
} from "react-native";
import { Card, Divider } from "react-native-paper";
import useStore from "../zustand/zustand";
import * as MediaLibrary from "expo-media-library";
import { captureRef } from "react-native-view-shot";

const InvoiceScreen: React.FC = () => {
  const { user, updateUser, setCashier, cashier, setNumber, number } =
    useStore();
  const [cashierName, setCashierName] = useState(cashier);
  const [name, setname] = useState("");
  const invoiceRef = useRef(null);
  const imageRef = useRef(null);

  const onSaveImageAsync = async () => {
    const { status } = await MediaLibrary.requestPermissionsAsync();
    if (status !== "granted") {
      alert("Permission to access media library is required!");
      return;
    }

    try {
      if (imageRef.current) {
        const localUri = await captureRef(imageRef.current, {
          height: 440,
          quality: 1,
          format: "png", // specify format for better compatibility
        });

        await MediaLibrary.saveToLibraryAsync(localUri);
        alert("Invoice saved to gallery!");
      } else {
        alert("Error: Ref is null");
      }
    } catch (e) {
      alert("Error capturing the view", e);
      console.log(e);
    }
  };
  const handleSetCashier = () => {
    setCashier(cashierName);
  };

  const invoiceData = {
    restaurantName: "Chhinnamasta Snacks",
    address:
      "Near Aashiya Party Palace, Hanuman Nagar Road, Rajbiraj-11, Saptari",
    contact: "980**********",
    billNo: number,
    cashier: cashier,
    items: user,
    customer: name,
  };

  const totalQty = invoiceData.items.reduce(
    (total, item) => total + item.qty,
    0,
  );
  const totalAmount = invoiceData.items.reduce(
    (total, item) => total + item.qty * item.rate,
    0,
  );

  const currentDate = new Date();
  const date = currentDate.toLocaleDateString();
  const time = currentDate.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const handle = () => {
    fetch("http://192.168.195.54:3001", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((response) => response.json())
      .then((result) => {
        setNumber(result.Number);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.head}>Review and Print Invoice</Text>
      <View>
        <Card ref={imageRef} style={styles.card}>
          <Card.Content>
            <Text style={styles.title}>{invoiceData.restaurantName}</Text>
            <Text style={styles.text}>{invoiceData.address}</Text>
            <Text style={styles.text}>Contact: {invoiceData.contact}</Text>

            <Divider style={styles.divider} />

            <View style={styles.row}>
              <Text style={styles.text}>Date: {date}</Text>
              <Text style={styles.text}>Time: {time}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.text}>Bill No: {invoiceData.billNo}</Text>
              <Text style={styles.text}>Cashier: {invoiceData.cashier}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.text}>Customer: {invoiceData.customer}</Text>
              <Text style={styles.text}>Contact: {"             "}</Text>
            </View>

            <Divider style={styles.divider} />

            <View style={styles.rowHeader}>
              <Text style={[styles.headerText, styles.noColumn]}>No.</Text>
              <Text style={[styles.headerText, styles.itemColumn]}>Item</Text>
              <Text style={[styles.headerText, styles.qtyColumn]}>Qty</Text>
              <Text style={[styles.headerText, styles.rateColumn]}>Rate</Text>
              <Text style={[styles.headerText, styles.amountColumn]}>Amt.</Text>
            </View>

            {invoiceData.items.map((item, index) => (
              <View key={index} style={styles.row}>
                <Text style={[styles.text, styles.noColumn, { fontSize: 27 }]}>
                  {index + 1}
                </Text>
                <Text
                  style={[styles.text, styles.itemColumn, , { fontSize: 27 }]}
                >
                  {item.name}
                </Text>
                <Text
                  style={[styles.text, styles.qtyColumn, , { fontSize: 27 }]}
                >
                  {item.qty}
                </Text>
                <Text
                  style={[styles.text, styles.rateColumn, , { fontSize: 27 }]}
                >
                  {item.rate.toFixed(1)}
                </Text>
                <Text
                  style={[styles.text, styles.amountColumn, , { fontSize: 27 }]}
                >
                  {(item.qty * item.rate).toFixed(1)}
                </Text>
              </View>
            ))}

            <Divider style={styles.divider} />

            <View style={styles.row}>
              <Text
                style={[
                  styles.text,
                  styles.noColumn,
                  { fontWeight: "bold", fontSize: 24 },
                ]}
              >
                Total Qty: {totalQty}
              </Text>
              <Text style={(styles.text, { fontWeight: "bold", fontSize: 24 })}>
                Total Amount: ₹{totalAmount.toFixed(1)}
              </Text>
            </View>
            <View>
              <Text style={styles.text}>Thank you for visiting!</Text>
            </View>
          </Card.Content>
        </Card>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter Customer Name"
          value={name}
          onChangeText={(text) => setname(text)}
        />
        <Button
          title="Set customer"
          onPress={() => {
            setname(name);
          }}
        />

        <Button title="Save Bill" onPress={onSaveImageAsync} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  head: {
    fontSize: 34,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
  },
  text: {
    fontSize: 24,
    marginVertical: 1,
    textAlign: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 1,
  },
  rowHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 3,
    fontWeight: "bold",
  },
  headerText: {
    fontSize: 26,
    fontWeight: "bold",
  },
  noColumn: {
    flex: 1,
    textAlign: "left",
  },
  itemColumn: {
    flex: 2.5,
    textAlign: "left",
  },
  qtyColumn: {
    flex: 1,
    textAlign: "center",
  },
  rateColumn: {
    flex: 1,
    textAlign: "center",
  },
  amountColumn: {
    flex: 1,
    textAlign: "right",
  },
  divider: {
    marginVertical: 8,
  },
  inputContainer: {
    marginTop: 20,
    alignItems: "center",
    display: "flex",
  },
  input: {
    width: "80%",
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  card: {
    backgroundColor: "white", // Add this line
  },
});

export default InvoiceScreen;

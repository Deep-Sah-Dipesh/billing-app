import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  Button,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import useStore from "../zustand/zustand";
interface MenuItem {
  id: number;
  name: string;
  image: string;
  rate: number;
}

const MenuScreen: React.FC = () => {
  const navigation = useNavigation();
  const { users, setUsers } = useStore();

  // Define your menu items
  const menuItems: MenuItem[] = [
    {
      id: 1,
      name: "Special Tea",
      image: require("./Tea.png"),
      rate: 30.0,
    },
    {
      id: 2,
      name: "Coffee",
      image: require("./Coffee.png"),
      rate: 40.0,
    },
    {
      id: 3,
      name: "Samosa",
      image: require("./Samosa.png"),
      rate: 15.0,
    },
    {
      id: 4,
      name: "Pakoda",
      image: require("./Pakoda.png"),
      rate: 10.0,
    },
    {
      id: 5,
      name: "Jalebi",
      image: require("./Jalebi.png"),
      rate: 20.0,
    },
  ];

  // State to manage quantities
  const [quantities, setQuantities] = useState<{ [key: number]: number }>({});

  // Function to handle increment
  const handleIncrement = (id: number) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [id]: (prevQuantities[id] || 0) + 1,
    }));
  };

  // Function to handle decrement
  const handleDecrement = (id: number) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [id]: prevQuantities[id] > 0 ? prevQuantities[id] - 1 : 0,
    }));
  };

  // Function to clear/reset all selections
  const handleReset = () => {
    setQuantities({});
    setUsers([]);
  };

  // Function to proceed and navigate to InvoiceScreen
  const handleProceed = () => {
    const selectedItems = menuItems.filter((item) => quantities[item.id]);
    const invoiceData = selectedItems.map((item) => ({
      ...item,
      qty: quantities[item.id],
    }));
    console.log(invoiceData);
    setUsers(invoiceData);

    navigation.navigate("inv_auto", { invoiceData });
  };

  const renderItem = ({ item }: { item: MenuItem }) => (
    <View style={styles.menuItem}>
      <Image source={item.image} style={styles.image} />
      <View style={styles.detailsContainer}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.rate}>₹{item.rate.toFixed(1)}</Text>
      </View>
      <View style={styles.quantityContainer}>
        <TouchableOpacity
          onPress={() => handleDecrement(item.id)}
          style={styles.button}
        >
          <Text style={styles.buttonText}>-</Text>
        </TouchableOpacity>
        <Text style={styles.quantityText}>{quantities[item.id] || 0}</Text>
        <TouchableOpacity
          onPress={() => handleIncrement(item.id)}
          style={styles.button}
        >
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={menuItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.menuContainer}
      />
      <View style={styles.footer}>
        <Button title="Clear/Reset" onPress={handleReset} />
        <Button title="Proceed" onPress={handleProceed} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  menuContainer: {
    padding: 15,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 2,
    borderBottomColor: "#ddd",
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  detailsContainer: {
    flex: 2,
    marginLeft: 15,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
  },
  rate: {
    fontSize: 18,
    color: "#887",
    fontWeight: "bold",
    marginTop: 4,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#ddd",
    padding: 8,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  quantityText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
});

export default MenuScreen;

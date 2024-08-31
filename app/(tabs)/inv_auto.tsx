import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Card, Divider } from 'react-native-paper';
import useStore from '../zustand/zustand';

const InvoiceScreen: React.FC = () => {

  const { users, updateUser } = useStore();

  console.log(users,"Hithesh");


  const invoiceData = {
    restaurantName: 'Rasta Tea & Snacks',
    address: 'Near Aashiya Party Palace, Hanuman Nagar Road, Rajbiraj-11, Saptari',
    contact: '9807115363, 7779978803',
    billNo: '001',
    cashier: 'Sachin',
    items: users,
  };

  // Calculate total quantity and amount dynamically
  const totalQty = invoiceData.items.reduce((total, item) => total + item.qty, 0);
  const totalAmount = invoiceData.items.reduce((total, item) => total + item.qty * item.rate, 0);

  const currentDate = new Date();
  const date = currentDate.toLocaleDateString();
  const time = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.head}>Review and Print Invoice</Text>
      <Card>
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
          
          <Divider style={styles.divider} />
          
          <View style={styles.rowHeader}>
            <Text style={[styles.headerText, styles.noColumn]}>No.</Text>
            <Text style={[styles.headerText, styles.itemColumn]}>Item</Text>
            <Text style={[styles.headerText, styles.qtyColumn]}>Qty</Text>
            <Text style={[styles.headerText, styles.rateColumn]}>Rate</Text>
            <Text style={[styles.headerText, styles.amountColumn]}>Amount</Text>
          </View>
          
          {invoiceData.items.map((item, index) => (
            <View key={index} style={styles.row}>
              <Text style={[styles.text, styles.noColumn]}>{index + 1}</Text>
              <Text style={[styles.text, styles.itemColumn]}>{item.name}</Text>
              <Text style={[styles.text, styles.qtyColumn]}>{item.qty}</Text>
              <Text style={[styles.text, styles.rateColumn]}>{item.rate.toFixed(1)}</Text>
              <Text style={[styles.text, styles.amountColumn]}>{(item.qty * item.rate).toFixed(1)}</Text>
            </View>
          ))}
          
          <Divider style={styles.divider} />
          
          <View style={styles.row}>
            <Text style={[styles.text, styles.noColumn]}>Total Qty: {totalQty}</Text>
            <Text style={styles.text}>Total Amount: ₹{totalAmount.toFixed(1)}</Text>
          </View>
          <View>
          <Text style={styles.text}>Thank you for visiting!</Text>
          </View>
        </Card.Content>
      </Card>
      <view>
        <input  value="cashier name" onClick={() => window.print} />

      </view>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  head: {
    fontSize: 21,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '',
    marginBottom: 10,
  },
  title: {
    fontSize: 19,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  text: {
    fontSize: 14,
    marginVertical: 1,
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 3,
  },
  rowHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 3,
    fontWeight: 'bold',
  },
  headerText: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  noColumn: {
    flex: 1,
    textAlign: 'left',
  },
  itemColumn: {
    flex: 2.5,
    textAlign: 'left',
  },
  qtyColumn: {
    flex: 1,
    textAlign: 'center',
  },
  rateColumn: {
    flex: 1,
    textAlign: 'center',
  },
  amountColumn: {
    flex: 1,
    textAlign: 'right',
  },
  divider: {
    marginVertical: 8,
  },
});

export default InvoiceScreen;

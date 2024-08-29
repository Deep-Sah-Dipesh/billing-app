import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Card, Divider } from 'react-native-paper';

interface MenuItem {
  id: number;
  name: string;
  rate: number;
  qty: number;
}

interface InvoiceScreenProps {
  route: {
    params: {
      selectedItems: MenuItem[];
    };
  };
}

const InvoiceScreen: React.FC<InvoiceScreenProps> = ({ route }) => {
  const { selectedItems } = route.params;

  // Calculate total quantity and amount
  const totalQty = selectedItems.reduce((sum, item) => sum + item.qty, 0);
  const totalAmount = selectedItems.reduce((sum, item) => sum + item.qty * item.rate, 0);

  const currentDate = new Date();
  const date = currentDate.toLocaleDateString();
  const time = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Card>
        <Card.Content>
          <Text style={styles.title}>Rasta Tea & Snacks</Text>
          <Text style={styles.text}>Near Aashiya Party Palace, Hanuman Nagar Road, Rajbiraj-11, Saptari</Text>
          <Text style={styles.text}>Contact: 9807115363, 7779978803</Text>
          
          <Divider style={styles.divider} />
          
          <View style={styles.row}>
            <Text style={styles.text}>Date: {date}</Text>
            <Text style={styles.text}>Time: {time}</Text>
          </View>
          
          <View style={styles.row}>
            <Text style={styles.text}>Bill No: 001</Text>
            <Text style={styles.text}>Cashier: Sachin</Text>
          </View>
          
          <Divider style={styles.divider} />
          
          <View style={styles.rowHeader}>
            <Text style={[styles.headerText, styles.noColumn]}>No.</Text>
            <Text style={[styles.headerText, styles.itemColumn]}>Item</Text>
            <Text style={[styles.headerText, styles.qtyColumn]}>Qty</Text>
            <Text style={[styles.headerText, styles.rateColumn]}>Rate</Text>
            <Text style={[styles.headerText, styles.amountColumn]}>Amount</Text>
          </View>
          
          {selectedItems.map((item, index) => (
            <View key={item.id} style={styles.row}>
              <Text style={[styles.text, styles.noColumn]}>{index + 1}</Text>
              <Text style={[styles.text, styles.itemColumn]}>{item.name}</Text>
              <Text style={[styles.text, styles.qtyColumn]}>{item.qty}</Text>
              <Text style={[styles.text, styles.rateColumn]}>₹{item.rate.toFixed(1)}</Text>
              <Text style={[styles.text, styles.amountColumn]}>₹{(item.qty * item.rate).toFixed(1)}</Text>
            </View>
          ))}
          
          <Divider style={styles.divider} />
          
          <View style={styles.row}>
            <Text style={[styles.text, styles.noColumn]}>Total Qty: {totalQty}</Text>
            <Text style={styles.text}>Total Amount: ₹{totalAmount.toFixed(1)}</Text>
          </View>
          <Text style={styles.thankYouText}>Thank you for visiting!</Text>
        </Card.Content>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
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
  thankYouText: {
    marginTop: 15,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default InvoiceScreen;

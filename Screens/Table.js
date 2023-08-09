import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const TableHeader = ({ headers }) => {
  return (
    <View style={styles.headerContainer}>
      {headers.map((header, index) => (
        <Text key={index} style={styles.headerText}>
          {header}
        </Text>
      ))}
    </View>
  );
};

const TableRow = ({ item, index }) => {
    const count = index + 1;
  return (
    <View style={styles.rowContainer}>
      <Text style={styles.cellText}>{count}</Text>
      <Text style={styles.cellText}>{item.quantity}</Text>
      <Text style={styles.cellText}>{item.ProductName}</Text>
      <Text style={styles.cellText}> Rs {item.WholesalePrice}</Text>
      <Text style={styles.cellText}> Rs {item.quantity*item.WholesalePrice }</Text>
    </View>
  );
};

const Table = ({ data, headers }) => {
    return (
      <View style={styles.tableContainer}>
        <TableHeader headers={headers} />
        <FlatList
          data={data}
          keyExtractor={(item) => item.key}
          renderItem={({ item, index }) => <TableRow item={item} index={index} />}
        />
      </View>
    );
  };

const styles = StyleSheet.create({
  tableContainer: {
justifyContent:"center",
height:300,
    // borderWidth: 1,
    // borderColor: 'black',
    // borderRadius:10,
    
    marginTop: 10,
    
  },
  headerContainer: {
    flexDirection: 'row',justifyContent:"space-evenly",
    backgroundColor: '#0f034b',
    // borderRadius:10,
    padding: 5,
  },
  headerText: {
    flex: 1,
    fontWeight: 'bold',
    color: 'white',
  },
  rowContainer: {
    flexDirection: 'row',
    backgroundColor:"#ff5400",
    // borderRadius:10,
    
    padding: 5,
    justifyContent:"center", alignItems:"center"
  },
  cellText: {
    flex: 1,
    color:'white'
  },
});

export default Table;

import React from 'react';
import { useEffect, useState, useRef } from 'react';
import iconFont from 'react-native-vector-icons/Fonts/FontAwesome.ttf';
import { Picker } from '@react-native-picker/picker';
import Modal from "react-native-modal";
import { useForm, Controller } from 'react-hook-form';
import Icon from 'react-native-vector-icons/MaterialIcons';
import DropDownPicker from 'react-native-dropdown-picker';
import ImagePicker from 'react-native-image-crop-picker';
import {
  View, TextInput,
  Text,
  TouchableOpacity,
  StyleSheet, Animated, Button,
  Pressable, Dimensions, FlatList, ActivityIndicator,
  ScrollView, Keyboard,
  Image,
  ImageBackground,
  Alert,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

const Bag = ({ route,navigation }) => {

  const [CustomerName, setCustomerName] = useState();
  const [CustomerContact, setCustomerContact] = useState();


  const [search, setSearch] = useState('');
  const searchRef = useRef();
  const onSearch = search => {
    if (search !== '') {
      let tempData = selectedList1.filter(item => {
        return item.ProductName.toLowerCase().indexOf(search.toLowerCase()) > -1;
      });
      setSelectedList1(tempData);
    } else {
      setSelectedList1(selectedList1);
    }
  };

const [clr ,setclr] = useState( );
const [clr1 ,setclr1] = useState({ bgcolor: 'white',  borderclr:"gray", borderwidth:0.5, placeholderclr:"gray" })
const Decrease = (item) => {
  const updatedList = selectedList1.map(listItem => {
    if (listItem.id === item.id) {
      const newQuantity = listItem.quantity > 1 ? listItem.quantity - 1 : 1;
      return { ...listItem, quantity: newQuantity };
    }
    return listItem;
  });
  setSelectedList1(updatedList);
};

const Increase = (item) => {
  const updatedList = selectedList1.map(listItem => {
    if (listItem.id === item.id) {
      const newQuantity = listItem.quantity + 1;
      return { ...listItem, quantity: newQuantity > item.ProductQuantity ? item.ProductQuantity : newQuantity };
    }
    return listItem;
  });
  setSelectedList1(updatedList);
};

const View1 = () => {
  setclr1({ bgcolor: 'white',  borderclr:"gray", borderwidth:0.5, placeholderclr:"gray"
   })
};


const{selectedList} =  route.params;
const modifiedSelectedList = selectedList.map(item => ({ ...item, quantity: 1 }));
const [selectedList1, setSelectedList1] = useState(modifiedSelectedList);

const RemoveItem = (itemId) => {
  // Find the index of the item with the given itemId in the selectedList array.
  const itemIndex = selectedList1.findIndex(item => item.id === itemId);

  // If the item is found (index is not -1), remove it from the selectedList array.
  if (itemIndex !== -1) {
    // Create a new array with the item removed using spread operator.
    const updatedList = [...selectedList1.slice(0, itemIndex), ...selectedList1.slice(itemIndex + 1)];
    setSelectedList1(updatedList); // Update the state with the new list.
  }
};
const calculateTotalPrice = () => {
  let totalPrice = 0;
  selectedList1.forEach(item => {
    totalPrice += (item.WholesalePrice*item.quantity )
  
  });
  return totalPrice;
};

  const refreshScreen = () => {
    navigation.navigate('Shop')
  
  };

  const Checkout = ()=> {
    if(CustomerName != null || CustomerContact != null ){
      navigation.navigate('Bill', { selectedList1 , CustomerName,CustomerContact, PaymentMethodValue});
    }
else{
  alert('Fill Customer Information')
}
 
  }


  const [PaymentMethodOpen, setPaymentMethodOpen] = useState('Cash');
  const [PaymentMethodValue, setPaymentMethodValue] = useState('Cash');
  const [PaymentMethod, setPaymentMethod] = useState([

    {label: 'Cash', value: 'Cash'},
    {label: 'Easypaisa', value: 'Easypaisa'},
    {label: 'Jazzcash', value: 'Jazzcash'},
    {label: 'Allied Bank', value: 'Allied Bank'},
  ]);
   const {control} = useForm();

  return (
    <View  style={{ backgroundColor: '#ececec', height: '100%', position: 'absolute', width: '100%' }}>
   
  <View style={{ flexDirection:"row",marginBottom: 14}}>
      <View style={{
        height: 40, marginTop:5,marginLeft:3,marginRight:3,
         backgroundColor: clr1.bgcolor, width: "98%", alignItems: "center",
           flexDirection: 'row',  
          borderColor: clr1.borderclr,
        borderWidth: clr1.borderwidth,
       borderRadius:12
      }}>

<TouchableOpacity style={{}} onPress={View1}>
          <Icon name="search" color="lightgray" size={25} light />

        </TouchableOpacity>
        <TextInput style={{
          height: 40,
          width:'100%',

          alignSelf: 'center',
          // borderColor: 'gray',
          color: 'black',
          // borderWidth: 1,


          paddingHorizontal: 10,
        }}
        value={search}
        ref={searchRef}
        onChangeText={txt => {
          onSearch(txt);
          setSearch(txt);
        }}
       
          placeholder='Search'
          placeholderTextColor= {clr1.placeholderclr} />
       
      </View>
     
        </View>
        <View style={{flexDirection:'row', justifyContent:"space-between",marginBottom:52,marginLeft:12, marginRight:12 }}>
        <View style={{flexDirection:'column' }}>
        <Text style={{color:'#ff5400', fontSize:16, fontWeight:'800'}}>Customer Details</Text>
<View style={{flexDirection:"column", }}>
<TextInput style={{   height: 40,width:102,
     
    // borderColor: 'gray',
    color:'black',
    // borderWidth: 1,
  
    borderColor:'gray',
    borderBottomWidth:0.5,
    marginRight:12,

   
    paddingHorizontal: 10,}}  
    
   value={CustomerName}
   onChangeText={setCustomerName}
    placeholder='Name'
    placeholderTextColor= 'gray'/>

<TextInput style={{   height: 40,width:102,
      
    // borderColor: 'gray',
    color:'black',
    // borderWidth: 1,
  
    borderColor:'gray',
    borderBottomWidth:0.5,
   
    }}  
    
    value={CustomerContact}
    onChangeText={setCustomerContact}
    placeholder='Contact No'
  keyboardType='Numeric'
    placeholderTextColor= 'gray'/>


        </View>
      

    </View>

<View style={{flexDirection:"column"}}>
<Text style={{color:'#ff5400', fontSize:16, fontWeight:'800'}}>Payment Method</Text>
<Controller
                name="PaymentMethod"
                defaultValue=""
                control={control}
                render={({field: {onChange, value}}) => (
                  <View style={styles.dropdownGender}>
                    <DropDownPicker
                      style={styles.dropdown}
                      open={PaymentMethodOpen}
                      value={PaymentMethodValue} //genderValue
                      items={PaymentMethod}
                      setOpen={setPaymentMethodOpen}
                      setValue={setPaymentMethodValue}
                      setItems={setPaymentMethod}
                      // placeholder="Select"
                      // placeholderStyle={styles.placeholderStyles}
                      // dropDownDirection="DOWN"
                      onChangeValue={onChange}
                      // zIndex={6}
                      // zIndexInverse={16}
                    />
                  </View>
                )}
              />
</View>










    </View>
<View style={{flexDirection:"row",marginBottom: 17, marginLeft:12 ,justifyContent:'space-between' ,alignItems:"center", paddingRight:12}}>
        <View style={{}}><Text style={{color:'#36454F', fontSize:30, fontWeight:"bold"}}>My Bag </Text></View>
      <TouchableOpacity onPress={refreshScreen}>
        <Icon name="autorenew" color="gray" size={23} light />
        </TouchableOpacity>





        </View>
      <ScrollView style={{ }}
      
      showsVerticalScrollIndicator={false}>
      <View  elevation={4} style={{ backgroundColor:'#ececec', 
      shadowColor: "lightgray",
      shadowOpacity: 1.8,
      marginBottom:3,
      shadowRadius: 10,
      shadowOffset: {
        height: 10,
        width: 2
      }, width:'94%', alignSelf:"center" , borderRadius:12,}}>
        <FlatList
          // style={{width: '100%'}}
          data={selectedList1} // Use the state variable as the data source.
          keyExtractor={(item, index) => index.toString()}
          // Horizontal = {true}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => {
            if (item != undefined ) {
              return (
               
                <View style={{ flexDirection:"row",  marginBottom:20, borderRadius:20, height:100, alignSelf:"center"}}>
<Image
                  style={{
                    height: '100%', width: '29%' , borderBottomLeftRadius:12, borderTopLeftRadius:12
                  }}
                  source={{uri: item.ProductImages[0]}}
                />
                  <View style={{ width:'70%', backgroundColor:"white" ,borderTopRightRadius:12, borderBottomRightRadius:12,paddingRight:5, paddingLeft:5 }}>
                  <View style={{flexDirection:"row", justifyContent:"space-between"}}>  
                   <Text
                    style={{
                      color: 'black',
                    
                      alignSelf:"center",
                    marginTop:4,
                
                      fontSize: 16,
                    }}>
                    {item.ProductName}
                  </Text>
<TouchableOpacity
 style={{ marginTop:6,height:20, width:20, backgroundColor:"lightgray", borderRadius:12, alignItems:"center" ,justifyContent:"center"}} 
onPress={() => RemoveItem(item.id)}>
<Icon name="close" color="red" size={13} light />
                  </TouchableOpacity>
                  
                  
                  </View>
              
             
                    
                 
                 
                  <View style={{flexDirection:"row"}}>
                  <Text
                    style={{
                      color: 'gray',
                      // fontWeight: 'bold',
                      // marginLeft: 10,
                      alignSelf:"center",
                    marginTop:4, marginRight:2,
                      // marginBottom: 10,
                      // fontWeight:'bold',
                      fontSize: 12,

                    }}>
                    Quantity
                  </Text>
                  <Text
                    style={{
                      color: 'gray',
                      // fontWeight: 'bold',
                      // marginLeft: 10,
                      alignSelf:"center",
                    marginTop:4,
                      // marginBottom: 10,
                      // fontWeight:'bold',
                      fontSize: 12,

                    }}>
                    ({item.ProductQuantity})
                  </Text>
                  </View>

                  



                <View  style={{flexDirection:"row"}}>

<View style={{flexDirection:"row" ,justifyContent:'space-evenly',marginTop:10,flex:0.5, marginBottom:10}}> 
<TouchableOpacity onPress={() => Decrease(item)}   disabled={item.quantity === 1}>
<View   elevation={8} style={{height:26,marginRight:6, width:26 ,backgroundColor:'white',borderRadius:22, 
shadowColor: "gray",
    shadowOpacity: 4.8,
    shadowRadius: 10,
    shadowOffset: {
      height: 16,
      width: 16
    },alignItems:"center", justifyContent:"center"}}>  
<Icon name="remove" color="red" size={15} light />
 </View>
 </TouchableOpacity>

 <View   elevation={8} style={{height:26,marginRight:6, width:30 ,backgroundColor:'white',borderRadius:22, 
shadowColor: "gray",
    shadowOpacity: 4.8,
    shadowRadius: 10,
    shadowOffset: {
      height: 16,
      width: 16
    },alignItems:"center", justifyContent:"center"}}>  


<TextInput style={{   height: 40,width:'85%',
        alignSelf:'center',
    
    color:'#ff5400',
  // This input increase or decrease

    
   
    }}  
   
    value={item.quantity ? item.quantity.toString() : ''}
    onChangeText={(text) => {
      const parsedValue = parseInt(text, 10);
      if (!isNaN(parsedValue)) {
        const newQuantity = parsedValue > 1 ? (parsedValue > item.ProductQuantity ? item.ProductQuantity : parsedValue) : 1;
        const updatedList = selectedList1.map(listItem => {
          if (listItem.id === item.id) {
            return { ...listItem, quantity: newQuantity };
          }
          return listItem;
        });
        setSelectedList1(updatedList);
      }
    }}
 
    keyboardType="Numeric"

 
 />
 </View>





<TouchableOpacity  onPress={() => Increase(item)} disabled={item.quantity == item.ProductQuantity}>
<View   elevation={8} style={{height:26,marginRight:12, width:26 ,backgroundColor:'white',borderRadius:22, shadowColor: "gray",
    shadowOpacity: 4.8,
    shadowRadius: 10,
    shadowOffset: {
      height: 16,
      width: 16
    },alignItems:"center", justifyContent:"center"}}>  
<Icon name="add" color="red" size={15} light />
 </View>
 </TouchableOpacity>

      </View>


      <View style={{flexDirection:"row",justifyContent:'space-between', marginTop:20,flex:0.5, paddingRight:10 }}>
                    <View style={{}}> 
                        
                        <Text>AA</Text>
                    </View>
                   
                    <View style={{flexDirection:"row"}}>
                    <Text
                    style={{
                      color: '#ff5400',
                      // fontWeight: 'bold',
                      // marginLeft: 10,
                      // alignSelf:"center",
                    
                      // fontWeight:'bold',
                      fontSize: 16,

                    }}>
                   (
                  </Text>
                    <Text
                    style={{
                      color: '#ff5400',
                      // fontWeight: 'bold',
                      // marginLeft: 10,
                      // alignSelf:"center",
                    
                      // fontWeight:'bold',
                      fontSize: 16,

                    }}>
                    {item.WholesalePrice }
                  </Text>
                  <Text
                    style={{
                      color: '#ff5400',
                      // fontWeight: 'bold',
                      // marginLeft: 10,
                      marginRight:8,
                      // alignSelf:"center",
                    
                      // fontWeight:'bold',
                      fontSize: 16,

                    }}>
                   )
                  </Text>

                  <Text
                    style={{
                      color: '#ff5400',
                    
                   marginRight:3,
                      fontWeight:'bold',
                      fontSize: 16,
                     
                      

                    }}>
                    Rs
                  </Text>
              
                  


                  <Text
                    style={{
                      color: '#ff5400',
                      // fontWeight: 'bold',
                      // marginLeft: 10,
                      // alignSelf:"center",
                    
                      fontWeight:'bold',
                      fontSize: 16,

                    }}>
                    {item.WholesalePrice*item.quantity }
                  </Text>

                  
                  </View>
                  </View>


               
               {/* //main    */}
               </View>
              
             
                  </View>
                 


                </View>
              );
            }
          }}
        />
      </View>
      </ScrollView>

<View style={{flexDirection:"row", marginTop:6 ,justifyContent:"space-between", paddingLeft:6, paddingRight:6}}>

  <Text style={{color:'gray', fontSize:13,}}>Total Amount:</Text>
  <View style={{flexDirection:"row"}}>
  <Text style={{color:'#ff5400', fontSize:18, fontWeight:'bold'}}>Rs</Text>
  <Text style={{color:'#ff5400', fontSize:18, fontWeight:'bold'}}> {calculateTotalPrice()} </Text>
  </View>
</View>
<TouchableOpacity 
style={{width:'90%', height:50, borderRadius:20,alignSelf:"center", alignItems:"center", justifyContent:'center', backgroundColor:"#ff5400", marginBottom:20, marginTop:15}}
 onPress={Checkout}>
  <Text style={{fontSize:16, color:'white', fontWeight:'400'}}>CHECK OUT</Text>
</TouchableOpacity>




      <View style={{ height: 60, width: '100%', backgroundColor: '#0f034b', alignSelf: 'center', justifyContent: 'center', borderTopStartRadius: 30, borderTopEndRadius: 30 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>

     
          <TouchableOpacity style={styles.bottom} onPress={refreshScreen}>
            <Icon name="inventory" color="gray" size={30} light />
            <Text style={{ color: 'gray' }}>Shop</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.bottom} onPress={Bag}>
            <Icon name="shopping-bag" color="#ff5400" size={30} light />
            <Text style={{ color: '#ff5400' }}>Bag</Text>
          </TouchableOpacity>
      
        </View >



      </View>

    </View>

  );
};

export default Bag;
const styles = StyleSheet.create({
  container: {
    borderRadius: 10
    // backgroundColor: '#ff5400',
  },


  main: {
    // alignSelf: 'center',
    color: '#ff5400', fontWeight: 'bold'


  },
  checkboxContainer: {
    flexDirection: 'row',
    marginTop: 12,
    marginLeft: 10,
    
    alignItems: 'center',
  },
  bottom: {
    alignItems: 'center'
  },
  new: {
    flex: 1,
    paddingTop: 40,
    alignItems: "center"
  },
  
  touch: {
    height:25, width:25, borderRadius:20,borderColor:"gray", borderWidth:0.5 , alignSelf:'flex-end',alignItems:'center',
    justifyContent:"center"
  },
  mediaThumbnail: {
    width: 100,
    height: 100,
    margin: 5,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  checkbox: {
    height:25, width:25, borderRadius:20,borderColor:"gray", borderWidth:0.5 , justifyContent:'center', alignItems:'center',
  },

  clicked: {
    backgroundColor: '#ff5400',
    width: 58, height: 32,
    borderRadius: 20, alignItems: 'center', justifyContent: 'center', margin: 10
  },
  // checked: {
  //   backgroundColor: '#0079DE'},
 
  button: {
    // backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 40,
  },
  container: {
    flex: 1,
    padding: 10,
  },
  mediaContainer: {
    position: 'relative',
    overflow: 'hidden',
    borderRadius: 0,
  },
  mediaThumbnail: {
    width: 100,
    borderRadius: 14,
    height: 100,
    margin: 5,
  },
  removeButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: 'red',
    // padding: 5,
    height: 15, width: 15,
    alignItems: 'center',
    justifyContent: "center",
    borderRadius: 5,
  },
  removeButtonText: {
    color: 'white',
    fontSize: 11,
    fontWeight: 'bold'
  },
  imageThumbnail: {
    width: 100,
    height: 100,
    margin: 5,
  },

  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    alignItems: 'center',
    // marginBottom: 20,
  },
  dropdownGender: {
    // backgroundColor: 'rgb(220,220, 220)',
    backgroundColor: "#ececec",
    width: 150,
    height:100,
    



  },
  dropdown: {
    backgroundColor: "#ececec",
    borderColor: 'gray',
    borderBottomWidth: 0.4,
    borderTopWidth:0,
    borderLeftWidth:0,
    borderRightWidth:0,
    borderRadius: 7, 

  },
  button: {
    // backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 40,
  },

  modalContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: 10,
  },

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    // paddingHorizontal: 20,
    // paddingVertical: 10,
    backgroundColor: '#2196F3',
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  modalBackground: {
    flex: 1,
    width: '100%',
    // height:180,
    borderRadius: 20,
    justifyContent: 'flex-start',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },

  modalContainer: {
    width: '100%',
    height: '24%',
    backgroundColor: '#fff',
    borderRadius: 20
  },
  modalText: {
    fontSize: 16,
    // marginBottom: 10,
  },
  closeButton: {
    // paddingHorizontal: 20,
    // paddingVertical: 10,
    backgroundColor: '#FF0000',
    borderRadius: 5,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  checked: {
    backgroundColor: '#ff5400'
  },
  colorclick:{
    backgroundColor: '#0f034b',
    borderRadius: 20,
    
  }

});

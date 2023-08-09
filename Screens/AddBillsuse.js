// import React from 'react';
// import { useEffect, useState } from 'react';

// import Video from 'react-native-video';
// import {
//   View,
//   Text,FlatList,
//   TouchableOpacity,KeyboardAvoidingView ,
//   StyleSheet,
//   Pressable,
//   ScrollView,Image,
//   ImageBackground,  Keyboard,
//   TextInput

// } from 'react-native';
// // import {  TextInput} from 'react-native-paper';
// // import { TextInput } from 'react-native-material-ui';
// const AddBillsuse = ({ navigation }) => {
 
//     const [isChecked, setChecked] = useState(false);
  
//     const handleToggleCheckbox = () => {
//       setChecked(!isChecked);
//     };
  


//     const [isKeyboardActive, setIsKeyboardActive] = useState(false);

//     useEffect(() => {
//       const keyboardDidShowListener = Keyboard.addListener(
//         'keyboardDidShow',
//         () => setIsKeyboardActive(true),
//       );
//       const keyboardDidHideListener = Keyboard.addListener(
//         'keyboardDidHide',
//         () => setIsKeyboardActive(false),
//       );
  
//       return () => {
//         keyboardDidShowListener.remove();
//         keyboardDidHideListener.remove();
//       };
//     }, []);





//     const [Quantity, setQuantity] = useState();
//     const [Price, setPrice] = useState();
//     const [Name, setName] = useState();
//     const [ProductCode, setProductCode] = useState();
//     const [productlist, setproductlist] = useState([]);
//     const [edit,setEdit]=useState(null);

//     const Add = () => {
     
//         if (Quantity == null || Price== null ||  ProductCode == null || Name== null){
            
// alert("Fill the details")
//         }
//     else {
//         console.log('hll')
//         const AddProduct = {
//             key: Math.random().toString(),
//             Quantity: Quantity,
//             Price:Price,
//             Name:Name,
//             ProductCode:ProductCode,
        
//         }
//         setproductlist((oldList) => [...oldList, AddProduct])
//         setQuantity('')
//         setName('')
//         setPrice('')
//         setProductCode('')
     
//     }
// }
// const sortedData = productlist.sort((a, b) => a - b);


//   return (
//     <View style={{ backgroundColor:'white', height:'100%', position:'absolute', width:'100%'}}>
//         {/*Header*/}
//     <View style={{  justifyContent:"space-between", flexDirection:'row' , alignItems:'center', marginTop:16,marginRight:10,marginBottom:'6%' ,}}>
     
//       <Image source={require("../Images/mainlogo.png")} style={{height:20, width:130}}/>
//       <View style={{backgroundColor: '#0f034b', width:40, height:40, borderRadius:30 , alignContent:'center', 
//       marginLeft:50,justifyContent:"center", alignItems:'center'}}>

// <Image source={require("../Images/drawer.png")} style={{height:'40%', width:'30%'}}/>
// </View>
     
     
     
     
     
     
     
     
//       </View>

// <ScrollView>
// <View style={{borderColor:'gray', borderWidth:0.5,width:"90%", alignSelf:'center', borderRadius:9,marginBottom:'6%',paddingBottom:15}}>
//     <View style={{marginLeft:12 , flexDirection:"row",justifyContent:'space-between', marginRight:12 ,}}>
//     <Text style={{color:'darkgray' ,fontSize:15, marginTop:'3%',}}>Time</Text>
// <Text style={{color:'darkgray' ,fontSize:15, marginTop:'3%',}}>Date</Text>
// <Text style={{color:'darkgray' ,fontSize:15, marginTop:'3%',}}>Day</Text>
// </View>


// <View style={{marginLeft:12 , flexDirection:"row", justifyContent:'space-around'}}>

// <View style={{flexDirection:'row' ,marginTop:'3%', }}>
// <Text style={{color:'#0f034b' ,fontSize:15,}}>Bill No :</Text>
// <Text style={{color:'green' ,fontSize:15,  }}>123</Text>

// </View>
//  <View style={{flexDirection:'row' ,marginTop:'3%', }}>
// <Text style={{color:'#0f034b' ,fontSize:15, }}>Bill Type :</Text>
// <Text style={{color:'green' ,fontSize:15, }}>123</Text>
// </View>





// </View>

// <View style={{marginLeft:12 , flexDirection:"row", justifyContent:'space-between'}}>
// <Text style={{color:'#0f034b' ,fontSize:15, marginTop:'3%', fontWeight:'bold'}}>Customer Name :</Text>
// <TextInput 
//       style={{   height: 40,
//         color:'#ff5400',
//     // borderColor: 'gray',
//     // borderWidth: 1,
//     borderColor:'#ff5400',
//     // color:'white',
//     width:'55%',
//     marginRight:7,
//     // marginLeft:29,
//     // alignSelf:'center',
//     borderBottomWidth:1,
   
//    }} 
//     placeholder='Enter Name'
    
//     placeholderTextColor= 'gray'
//  />
// </View>




// <View style={{marginLeft:12 , flexDirection:"row",justifyContent:'space-between'}}>
// <Text style={{color:'#0f034b' ,fontSize:15, marginTop:'3%', fontWeight:'bold'}}>Customer Address :</Text>
// <TextInput 
//       style={{   height: 40,
//         color:'#ff5400',
//     // borderColor: 'gray',
//     // borderWidth: 1,
//     borderColor:'#ff5400',
//     // color:'white',
//     width:'55%',
//     marginRight:7,
//     // alignSelf:'center',
//     borderBottomWidth:1,
   
//    }} 
//     placeholder='Enter Address'
    
//     placeholderTextColor= 'gray'
//  />
// </View>

// <View style={{marginLeft:12 , flexDirection:"row", justifyContent:'space-between'}}>
// <Text style={{color:'#0f034b' ,fontSize:15, marginTop:'3%', fontWeight:'bold'}}>Customer Type :</Text>
// <TextInput 
//       style={{   height: 40,
//         color:'#ff5400',
//     // borderColor: 'gray',
//     // borderWidth: 1,
//     borderColor:'#ff5400',
//     // color:'white',
//     width:'55%',
//    marginRight:7,
//     // alignSelf:'center',
//     borderBottomWidth:1,
   
//    }} 
//     placeholder='Enter Address'
    
//     placeholderTextColor= 'gray'
//  />
// </View>


// </View>


// <View style={{borderColor:'gray', borderWidth:0.5, width:"95%", alignSelf:'center', borderRadius:9,paddingBottom:15}}>

// <View style={{marginLeft:12 , flexDirection:"row",justifyContent:'space-between', marginRight:12 ,}}>
//     <Text style={{color:'darkgray' ,fontSize:15, marginTop:'3%',width:'19%'}}>Qty</Text>
// <Text style={{color:'darkgray' ,fontSize:15, marginTop:'3%',width:'19%'}}>Name</Text>
// <Text style={{color:'darkgray' ,fontSize:15, marginTop:'3%',width:'19%', }}>Product Code</Text>
// <Text style={{color:'darkgray' ,fontSize:15, marginTop:'3%',width:'19%'}}>Price</Text>

// </View>




// <View style={{marginLeft:12 , flexDirection:"row",justifyContent:'space-between', marginRight:12 ,}}>

// <TextInput 
//       style={{   
//         color:'green',width:'19%',
//     // borderColor: 'gray',
//     // borderWidth: 1,
//     borderColor:'#ff5400',
//     // color:'white',
  
//     // alignSelf:'center',
//     borderBottomWidth:1,
   
//    }} 
//    value={Quantity}
//    onChangeText={setQuantity}
   
//    keyboardType="Numeric"
//  />

// <TextInput 
//       style={{   
//         color:'green',
//     // borderColor: 'gray',
//     // borderWidth: 1,
//     borderColor:'#ff5400',
//     // color:'white',
//     width:'19%',
  
//     // alignSelf:'center',
//     borderBottomWidth:1,
   
//    }} 
//    value={Name}
//    onChangeText={setName}
//    />

// <TextInput 
//       style={{   
//         color:'green',
//     // borderColor: 'gray',
//     width:'19%',
//     // borderWidth: 1,
//     borderColor:'#ff5400',
//     // color:'white',
  
//     // alignSelf:'center',
//     borderBottomWidth:1,
   
//    }} value={ProductCode}
//    onChangeText={setProductCode}
//  />

// <TextInput 
//       style={{   
//         color:'green',
//         width:'19%',
//     // borderColor: 'gray',
//     // borderWidth: 1,
//     borderColor:'#ff5400',
//     // color:'white',
  
//     // alignSelf:'center',
//     borderBottomWidth:1,
   
//    }} 
//    value={Price}
//    onChangeText={setPrice}
//    keyboardType="Numeric"
//  />






// </View>


// <TouchableOpacity
//           style={{
//             backgroundColor: '#ff5400',
//             width: 70,
//             borderRadius: 9,
//             height: 30,
        
//             marginTop:20,
//             alignItems: 'center',
//             justifyContent: 'center',
//             alignSelf:'center'
            
//           }}
//           onPress={ Add }
//         >
         
//             <Text style={{ fontSize: 15, color: 'white', fontWeight: 'bold' }}>Add </Text>
        
//           </TouchableOpacity>


// </View>

// <View style={{marginLeft:0 , flexDirection:"row", marginRight:12 ,marginTop:"6%", justifyContent:'flex-start'}}>

    

//     <Text style={{color:'darkgray' ,fontSize:12, margin:'1%',width:'15%',alignSelf: 'center'}}>Qty</Text>
// <Text style={{color:'darkgray' ,fontSize:12, margin:'1%',width:'15%',alignSelf: 'center'}}>Name</Text>
// <Text style={{color:'darkgray' ,fontSize:12, margin:'1%',width:'15%',alignSelf: 'center' }}>P-Code</Text>
// <Text style={{color:'darkgray' ,fontSize:12, margin:'1%',width:'15%',alignSelf: 'center'}}>Price</Text>
// <Text style={{color:'darkgray' ,fontSize:12, margin:'1%',width:'15%',alignSelf: 'center'}}>Total</Text>
// <Text style={{color:'darkgray' ,fontSize:12, margin:'1%',width:'15%',alignSelf: 'center'}}>Pffice</Text>
// <Text style={{color:'darkgray' ,fontSize:12, margin:'1%',width:'15%',alignSelf: 'center'}}>Total</Text>
// </View>
// <FlatList
//                     data={sortedData}
//                     showsVerticalScrollIndicator={false}
//                     renderItem={({ item, index }) => {
//                         if (item != undefined) {
//                             return (
//                                 <View style={{}}>
                                  


// <View style={{marginLeft:12 , flexDirection:"row",marginRight:12 ,justifyContent:'flex-start'}}>

//     <Text style={{color:'green' ,fontSize:12, width:'15%',alignSelf: 'center'}}>{item.Quantity}</Text>
// <Text style={{color:'green' ,fontSize:12, width:'15%',alignSelf: 'center'}}>{item.Name}</Text>
// <Text style={{color:'green' ,fontSize:12, width:'15%',alignSelf: 'center' }}>{item.ProductCode}</Text>
// <Text style={{color:'green' ,fontSize:12, width:'15%',alignSelf: 'center'}}>{item.Price}</Text>
// <Text style={{color:'green' ,fontSize:12, width:'15%',alignSelf: 'center'}}>{(item.Quantity)*(item.Price)}</Text>

// </View>
//                                 </View>
//                             );
//                         }
//                     }}
//                 />





// </ScrollView>




      
     
   
//     </View>

//   );
// };

// export default AddBillsuse;
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     // backgroundColor: '#ff5400',
//   },
//   checkboxContainer: {
//     flexDirection: 'row',
//     marginTop:12,
//     marginLeft:10,
//     alignItems: 'center',
//   },
//   checkbox: {
//     width: 20,
//     justifyContent:'center',
//     alignItems:'center',
//     alignSelf:'center',
//     height: 20,
//     borderWidth: 2,
//     borderColor: 'grey',
//     borderRadius: 4,
//     // marginRight: 10,
//   },
//   content: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   buttonContainer: {
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   checked: {
//     backgroundColor: 'white'},
//   button: {
//     // backgroundColor: 'white',
//     padding: 10,
//     borderRadius: 5,
//   },
//   buttonText: {
//     fontSize: 40,
//   },
// });

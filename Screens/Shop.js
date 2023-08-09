import React from 'react';
import { useEffect, useState, useRef } from 'react';
import iconFont from 'react-native-vector-icons/Fonts/FontAwesome.ttf';

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
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import { Picker } from '@react-native-picker/picker';
const Shop = ({ navigation }) => {
  const [Data, setData] = useState([]);
  const [search, setSearch] = useState('');
  const searchRef = useRef();
  const onSearch = search => {
    if (search !== '') {
      let tempData = Data1.filter(item => {
        return item.ProductName.toLowerCase().indexOf(search.toLowerCase()) > -1;
      });
      setData1(tempData);
    } else {
      setData1(originalData);
    }
  };




  const [Data1, setData1] = useState([]);
  const [originalData, setOriginalData] = useState([]);

  const [clr, setclr] = useState ({bgcolorall:'#0f034b' ,bgcolorshawl:'#0f034b',bgcolorduppata:'#0f034b',bgcolorstoller:'#0f034b',bgcolorburqa:'#0f034b'  });

  var Products = firestore().collection('Products');
  useEffect(() => {
    const fetchData =  async () => {
      try {

      
        const snapshot = await Products.get();
        const data = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      //   const ProductImages = firstDataElement ? firstDataElement.ProductImages : [];
      
      //   // Access the first URL in the "ProductImages" list
      //   const firstProductImageURL = ProductImages[0]
      // console.log(firstProductImageURL)
      // Data1.push(firstProductImageURL)
    
        setData1(data);
        setOriginalData(data);
      //   const firstDataElement = data[0];
       
        // Store the original data
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    const firstDataElement = Data1[0];
    const ProductImages = firstDataElement ? firstDataElement.ProductImages : [];
  
    // Access the first URL in the "ProductImages" list
  //   const firstProductImageURL = ProductImages[0]
  // console.log(firstProductImageURL)
  // Data1.push(firstProductImageURL)

  console.log(Data1)
    fetchData();
  }, []);


  const [isLoading, setIsLoading] = useState(false);


  // const [selectedItems, setSelectedItems] = useState([]);


  const Bag = () => {
    navigation.navigate('Bag', { selectedList });
  };

  const [allbtnstate,setallbtnstate] = useState(false);
const [shawlbtnstate,setshawlbtnstate] = useState(false);
const [duppatabtnstate,setduppatabtnstate] = useState(false);
const [stollerbtnstate,setstollerbtnstate] = useState(false);
const [burqabtnstate,setburqabtnstate] = useState(false);

// const [selectedProductCodes, setSelectedProductCodes] = useState([]);

//   const [checkboxStates, setCheckboxStates] = useState(Data1.map(() => true));
//   const handleToggleCheckbox = (index) => {
//     const updatedStates = [...checkboxStates];
//     updatedStates[index] = !updatedStates[index];
//     setCheckboxStates(updatedStates);
  
//     // Update the selectedItems array based on the checkbox status
//     if (updatedStates[index]) {
//       setSelectedItems([...selectedItems, originalData[index]]);
//     } else {
//       setSelectedItems(selectedItems.filter((item, idx) => idx !== index));
//     }
//   };
const [selectedList, setSelectedList] = useState([]);
 
const toggleItemSelection = (item) => {
  setSelectedList((prevList) =>
    prevList.includes(item) ? prevList.filter((product) => product !== item) : [...prevList, item]
  );
};

// Function to check if an item is selected
const isItemSelected = (item) => selectedList.includes(item);
























  const [isCheckedAll, setCheckedAll] = useState(true);
  const handleclickedAll = () => {
    setCheckedAll(!isCheckedAll);
    setclr({ bgcolorall: '#ff5400', bgcolorburqa: '#0f034b', bgcolorshawl:"#0f034b", bgcolorstoller:"#0f034b", bgcolorduppata:"#0f034b" })

    setallbtnstate(true)
    setshawlbtnstate(false)
    setduppatabtnstate(false)
    setstollerbtnstate(false)
    setburqabtnstate(false)
    // Filter the Data1 list based on the selectedtype field equal to "Shawls"
    const filteredData1 = originalData.filter((item) =>(item.selectedType === 'Shawl' || item.selectedType === 'Duppata' || item.selectedType === 'Stoller' || item.selectedType === 'Burka') );
    setData1(filteredData1);
  };








  const [isCheckedshawl, setCheckedshawl] = useState(true);
  const handleclickedshawl = () => {
    setclr({ bgcolorall: '#0f034b', bgcolorburqa: '#0f034b', bgcolorshawl:"#ff5400", bgcolorstoller:"#0f034b", bgcolorduppata:"#0f034b" })


    setCheckedshawl(!isCheckedshawl);
    setshawlbtnstate(true)
    setduppatabtnstate(false)
    setstollerbtnstate(false)
    setburqabtnstate(false)
    setallbtnstate(false)


    // Filter the Data1 list based on the selectedtype field equal to "Shawls"
    const filteredData1 = originalData.filter((item) => item.selectedType === 'Shawl');
    setData1(filteredData1);
  };

  const [isCheckedduppata, setCheckedduppata] = useState(true);

  const handleclickedduppata = () => {
    setclr({ bgcolorall: '#0f034b', bgcolorburqa: '#0f034b', bgcolorshawl:"#0f034b", bgcolorstoller:"#0f034b", bgcolorduppata:"#ff5400" })


    setCheckedduppata(!isCheckedduppata);
    setduppatabtnstate(true)

    setshawlbtnstate(false)
  
    setstollerbtnstate(false)
    setburqabtnstate(false)
    setallbtnstate(false)

    const filteredData1 = originalData.filter((item) => item.selectedType === 'Duppata');
    setData1(filteredData1);
   

  };


  
  const [isCheckedstoller, setCheckedstoller] = useState(true);

  const handleclickedstoller = () => {
    setclr({ bgcolorall: '#0f034b', bgcolorburqa: '#0f034b', bgcolorshawl:"#0f034b", bgcolorstoller:"#ff5400", bgcolorduppata:"#0f034b" })

    setCheckedstoller(!isCheckedstoller);
    setstollerbtnstate(true)

    setshawlbtnstate(false)
    setduppatabtnstate(false)
  
    setburqabtnstate(false)
    setallbtnstate(false)
    const filteredData1 = originalData.filter((item) => item.selectedType === 'Stoller');
    setData1(filteredData1);
  };

  const [isCheckedburqa, setCheckedburqa] = useState(true);
 
  
  const handleclickedburqa = () => {
    setclr({ bgcolorall: '#0f034b', bgcolorburqa: '#ff5400', bgcolorshawl:"#0f034b", bgcolorstoller:"#0f034b", bgcolorduppata:"#0f034b" })

    setCheckedburqa(!isCheckedburqa);

    setburqabtnstate(true)
    setshawlbtnstate(false)
    setduppatabtnstate(false)
    setstollerbtnstate(false)

    setallbtnstate(false)
    const filteredData1 = originalData.filter((item) => item.selectedType === 'Burka');
    setData1(filteredData1);
  };








  // location image code
  const handlelocationimage = () => {

    const remainingSlots = 5 - LocationImages.length;

    if (remainingSlots <= 0) {
      alert('You can select up to 5 media items.');
      return;
    }
    ImagePicker.openPicker({
      multiple: true,
      mediaType: 'photo',
      maxFiles: remainingSlots,
      includeBase64: false, // Set to true if you want to get base64 encoded images
    })
      .then(images => {
        setLocationImages(prevImages => [...prevImages, ...images]);
      })
      .catch(error => console.log('Error:', error));

  };

  const handleRemoveLocation = (index) => {
    const newSelectedLocation = [...LocationImages];
    newSelectedLocation.splice(index, 1);
    setLocationImages(newSelectedLocation);
  };
  const renderItem2 = ({ item, index }) => (
    <View style={styles.mediaContainer}>
      {item.mime && item.mime.startsWith('image/') ? (
        <Image source={{ uri: item.path }} style={styles.mediaThumbnail} />
      ) : (
        <Text>Video</Text>
      )}
      <TouchableOpacity onPress={() => handleRemoveLocation(index)} style={styles.removeButton}>
        <Text style={styles.removeButtonText}>X</Text>
      </TouchableOpacity>
    </View>
  );
  state = {
    visibleModal: null,
  };
  const windowHeight = Dimensions.get('window').height;

  const [modalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <View style={{ backgroundColor: 'white', height: '100%', position: 'absolute', width: '100%' }}>
    

      {/*Header*/}
      <View style={{ flexDirection: 'row', paddingTop: 20, marginBottom: 20, justifyContent: 'space-between', paddingBottom: 20, backgroundColor: "#0f034b" }}>
        <TouchableOpacity style={{ marginLeft: 12, }} onPress={() => navigation.navigate('Home')}>
          <Icon name="arrow-back-ios" color="#ff5400" size={25} light />
        </TouchableOpacity>
        <View style={{}}>
          <Text style={{ color: "#ff5400", fontWeight: "bold", fontSize: 20, }}>Shop</Text>
        </View>
        <View>
          <Text style={{ color: "#0f034b" }}>AAA</Text>
        </View>


      </View>


    
      {/* <ScrollView horizontal style={{}}> */}
      <View style={{ flexDirection: 'row', justifyContent: "space-between" }}>

      <TouchableOpacity style={{    backgroundColor: clr.bgcolorall,
    width: 58, height: 32,
    borderRadius: 20, alignItems: 'center', justifyContent: 'center', margin: 10}} onPress={()=>handleclickedAll()} disabled= {allbtnstate}>

{/* <View style={[styles.clicked, isCheckedAll ? styles.colorclick : null]}  > */}
  <Text style={{ color: "white", fontSize: 12 }}>All </Text>
  {/* </View> */}
</TouchableOpacity>


{/* const [shawlbtnstate,setshawlbtnstate] = useState(false);
const [duppatabtnstate,setduppatabtnstate] = useState(false);
const [stollerbtnstate,setstollerbtnstate] = useState(false);
const [burqabtnstate,setburqabtnstate] = useState(false); */}
        <TouchableOpacity style={{    backgroundColor: clr.bgcolorshawl,
    width: 58, height: 32,
    borderRadius: 20, alignItems: 'center', justifyContent: 'center', margin: 10}} onPress={()=>handleclickedshawl()} disabled= {shawlbtnstate}>

        {/* <View style={[styles.clicked, isCheckedshawl ? styles.colorclick : null]}  > */}
          <Text style={{ color: "white", fontSize: 12}}>Shawls </Text>
          {/* </View> */}
        </TouchableOpacity>

        <TouchableOpacity style={{    backgroundColor: clr.bgcolorduppata,
    width: 58, height: 32,
    borderRadius: 20, alignItems: 'center', justifyContent: 'center', margin: 10}} onPress={()=>handleclickedduppata()}  disabled= {duppatabtnstate}>
        {/* <View style={[styles.clicked, isCheckedduppata ? styles.colorclick : null]}  > */}
          <Text style={{ color: "white", fontSize: 12 }}>Duppata </Text>
          {/* </View> */}
        </TouchableOpacity>

        <TouchableOpacity style={{    backgroundColor: clr.bgcolorstoller,
    width: 58, height: 32,
    borderRadius: 20, alignItems: 'center', justifyContent: 'center', margin: 10}} onPress={()=>handleclickedstoller()}  disabled= {stollerbtnstate}>
        {/* <View style={[styles.clicked, isCheckedstoller ? styles.colorclick : null]}  > */}
          <Text style={{ color: "white", fontSize: 12 }}>Stollers </Text>
          {/* </View> */}
        </TouchableOpacity>

        <TouchableOpacity style={{    backgroundColor: clr.bgcolorburqa,
    width: 58, height: 32,
    borderRadius: 20, alignItems: 'center', justifyContent: 'center', margin: 10}} onPress={()=>handleclickedburqa()} disabled= {burqabtnstate}>
        {/* <View style={[styles.clicked, isCheckedburqa ? styles.colorclick : null]}  > */}
          <Text style={{ color: "white", fontSize: 12 }}>Burqa </Text>
          {/* </View> */}
        </TouchableOpacity>
      </View>
      {/* </ScrollView> */}
      <View style={{
        height: 40, marginBottom: 14, backgroundColor: "white", width: "97%", alignItems: "center", alignSelf: 'center', flexDirection: 'row', justifyContent: "space-between", borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 20,
      }}>
        <TextInput style={{
          height: 40,
width:"100%",
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
          placeholderTextColor='gray' />
        <TouchableOpacity style={{ marginRight: 12 }}>
          <Icon name="search" color="gray" size={30} light />

        </TouchableOpacity>
      </View>

      <ScrollView>
      <View style={{ backgroundColor: "#ececec" ,borderTopStartRadius: 20, borderTopEndRadius: 20, paddingBottom:20 }}>
        <FlatList
          // style={{width: '100%'}}
          data={Data1}
          numColumns={2}
          // Horizontal = {true}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item, index }) => {
            if (item != undefined ) {
              return (
                //  <FlatList 
                <View style={{ flex: 0.5,marginTop:12, alignItems:'center', justifyContent:"center"}}>

                  <View style={{ height: 300, width:'94%', backgroundColor:"white",borderRadius:10 , paddingTop:5 }}>
                  <Image
                  style={{
                    height: '70%', width: '99%',alignSelf:'center' , 
                  }}
                  source={{uri: item.ProductImages[0]}}
                />
              
                    {/* <Image source={require("../Images/b1.jpg")} 
                    style={{ height: '70%', width: '100%',alignSelf:'center' }} /> */}
                      {/* <TouchableOpacity style={{ height:20, width:20, borderRadius:20,borderColor:"gray", borderWidth:0.5 , alignSelf:'flex-end',alignItems:'baseline', }} onPress={() => handleToggleCheckbox(index)}>
            <View style={[styles.checkbox, checkboxStates[index] ? styles.checked : null]}  >

      <Image source={require("../Images/tick2.png")} style={{height:'70%', width:'70%'}}/>
  
      </View>
            </TouchableOpacity> */}
                     <Text
                    style={{
                      color: 'black',
                      // fontWeight: 'bold',
                      // marginLeft: 10,
                      alignSelf:"center",
                    marginTop:4,
                      // marginBottom: 10,
                      // fontWeight:'bold',
                      fontSize: 16,
                      // marginBottom:12

                    }}>
                    {item.ProductName}
                  </Text>
                  <View style={{flexDirection:'row', justifyContent:'space-between', marginRight:5,   marginBottom:12}}>
                  <View style={{flexDirection:"row"}}>
                  <Text
                    style={{
                      color: 'gray',
                      // fontWeight: 'bold',
                      marginLeft: 5,
                      alignSelf:"center",
                    marginTop:4,
                    marginRight:2,
                      // marginBottom: 10,
                      // fontWeight:'bold',
                      fontSize: 12,

                    }}>
                    200 
                  </Text>
                  <Text
                    style={{
                      color: 'gray',
                      // fontWeight: 'bold',
                      marginRight:7,
                      // marginLeft: 10,
                      alignSelf:"center",
                    marginTop:4,
                      // marginBottom: 10,
                      // fontWeight:'bold',
                      fontSize: 12,

                    }}>
                    sold
                  </Text>
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
                  </View>




                  <View style={{flexDirection:"row" , justifyContent:"space-between",marginRight:5}}>
                  <View style={{flexDirection:"row", marginLeft:6,}}>
                  <Text
                    style={{
                      color: '#ff5400',
                    
                      alignSelf:"flex-start",
                      marginTop:4,
                      // marginBottom: 10,
                      fontWeight:'bold',
                      fontSize: 16,
                      marginRight:3
                      

                    }}>
                    Rs
                  </Text>

                  
                  <Text
                    style={{
                      color: '#ff5400',
                      // fontWeight: 'bold',
                      // marginLeft: 10,
                      // alignSelf:"center",
                      marginTop:4,
                      // marginBottom: 10,
                      fontWeight:'bold',
                      fontSize: 16,

                    }}>
                    {item.WholesalePrice}
                  </Text>

                  </View>
                  {/* backgroundColor:"white", height:25, width:25, borderRadius:20,borderColor:"gray", borderWidth:0.5 , alignSelf:'flex-end',alignItems:'baseline', */}

                 
                   <TouchableOpacity  style={[styles.touch, { backgroundColor: isItemSelected(item) ? '#ff5400' : 'white' }]}  onPress={() => toggleItemSelection(item)}>
            {/* <View style={[styles.checkbox, checkboxStates[index] ? styles.checked : null]}  > */}
            
      <Image source={require("../Images/tick2.png")} style={{height:'70%', width:'70%'}}/>
{/*   
      </View> */}
            </TouchableOpacity>
</View>

                  </View>
                 


                </View>
              );
            }
          }}
        />
      </View>
      </ScrollView>






      <View style={{ height: 60, width: '100%', backgroundColor: '#0f034b', alignSelf: 'center', justifyContent: 'center', borderTopStartRadius: 30, borderTopEndRadius: 30 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>

     
          <TouchableOpacity style={styles.bottom}>
            <Icon name="inventory" color="#ff5400" size={30} light />
            <Text style={{ color: '#ff5400' }}>Shop</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.bottom} onPress={Bag}>
            <Icon name="shopping-bag" color="grey" size={30} light />
            <Text style={{ color: 'grey' }}>Bag</Text>
          </TouchableOpacity>
          {/* <TouchableOpacity style={styles.bottom}>

            <Icon name="admin-panel-settings" color="grey" size={30} light />

            <Text style={{ color: 'grey' }}>Profile</Text>
          </TouchableOpacity> */}
        </View >


        {/* <FontAwesomeIcon icon="fa-regular fa-font-awesome" size={30} color="#900"/> */}
        {/* <Icon name="fa-regular fa-basket-shopping" size={30} color="#900" /> */}

      </View>

    </View>

  );
};

export default Shop;
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
    backgroundColor: "white",
    width: 150,



  },
  dropdown: {
    // borderColor: 'red',
    borderBottomWidth: 1,
    borderRadius: 7

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

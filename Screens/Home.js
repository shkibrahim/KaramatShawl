// blue color code = #0f034b
//  orange color code = #ff5400
// my logo consist of these two colors  (#0f034b and #ff5400) , help me with the best suitable background color
import React from 'react';
import { useEffect, useState, useRef } from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet, Animated, Button,
  Pressable, Dimensions,
  ScrollView,
  Image,
  ImageBackground,
} from 'react-native';

import Carousel, { ParallaxImage } from 'react-native-snap-carousel';
import Modal from "react-native-modal";


const Home = ({ navigation }) => {



  const data = [
    // { id: 5, imageUrl: require('../Images/mainlogo.png') },
    { id: 1, imageUrl: require('../Images/shawl.webp') , head: 'SHAWLS', text: ' Swiss Lawn , Lawn, Kashmiri, Sawati and Multani Shawls'},
    { id: 2, imageUrl: require('../Images/scarf.png'),head: 'STOLLERS',  },
    { id: 3, imageUrl: require('../Images/duppatam.jpg'),head: 'DUPPATA', },

    { id: 4, imageUrl: require('../Images/burkaq.jpeg') ,head: 'BURQA', },
  ];





  const renderCarouselItem = ({ item }) => {
    return (
      // <View style={styles.carouselItem}>
       <View
              style={{
                backgroundColor: '#C5FAD5',
    borderRadius: 10,
    width: '100%',
    height: 280,
    justifyContent: 'flex-end',
                flexDirection:"row",
                
                overflow: 'hidden',
                borderRadius: 10,
              }}>


                <View style={{alignItems:"center", marginRight:15,}}>
                <Image
                source={require('../Images/mainlogo.png')}
                style={{
                  height: 30,
                  marginTop:10,
                  
                  width: 100,
                marginBottom:20
                
                }}
              />
                <Text
                style={{
                  color: 'black',
                marginLeft:15,
                  fontWeight: 'bold',
                  fontSize: 14,
                }}>
                KIND OF {item.head}
              </Text>
              <Text style={{ color: '#2a2a2a', width:120, fontSize: 14 }}>
               {item.text}
              </Text>
             
                </View>
              <Image
                source={
                  item.imageUrl
                }
                style={{ height: '100%', width: '55%', borderBottomLeftRadius: 300,alignSelf: 'stretch' }}
              />
              
            </View>
     
    );
  };







  const Logout = () => {
    AsyncStorage.removeItem(StorageKeys.CurrentUser);
    navigation.replace('Login');
  }

  const [isChecked, setChecked] = useState(false);

  const handleToggleCheckbox = () => {
    setChecked(!isChecked);
  };

  state = {
    visibleModal: null,
  };
  const windowHeight = Dimensions.get('window').height;

  const [modalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const scrollViewRef = useRef(null);

  useEffect(() => {
    const delay = 5000; // Delay between stopping at each component (in milliseconds)
    const scrollDuration = 9000; // Duration for a complete scroll (in milliseconds)
    const componentWidth = 10000; // Width of each component

    let timeoutId;

    const startScrollAnimation = () => {
      const scrollX = scrollViewRef.current?.contentOffset?.x || 0;
      const componentIndex = Math.floor(scrollX / componentWidth);
      const targetOffset = (componentIndex + 10) * componentWidth;

      scrollViewRef.current?.scrollTo({ x: targetOffset, animated: true });

      timeoutId = setTimeout(() => {
        startScrollAnimation();
      }, scrollDuration + delay);
    };


    startScrollAnimation(); // Start the initial animation

    // Clean up the timeout on unmount
    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  const handleScrollEnd = (event) => {
    const { contentOffset, contentSize, layoutMeasurement } = event.nativeEvent;
    const contentOffsetX = contentOffset.x;
    const contentWidth = contentSize.width;
    const containerWidth = layoutMeasurement.width;

    if (contentOffsetX + containerWidth >= contentWidth) {
      // Reached the end of ScrollView, scroll back to the beginning
      scrollViewRef.current.scrollTo({ x: 0, animated: true });
    }
  };
  return (
    <View style={{ backgroundColor: 'white', height: '100%' }}>
      {/* <View style={{}}></View> */}
      <Modal
        visible={modalVisible}
        // animationInTiming= '400'
        // animationType="slide"

        animationIn={'slideInLeft'}
        animationOut={'slideOutRight'}
        animationInTiming={2000}
        animationOutTiming={2000}
        // animationIn= "slideInUp"
        // animationOut="slideOutDown"
        transparent={true}
        onRequestClose={toggleModal}
        style={{ width: '100%', marginTop: 0, marginLeft: 0 }} >
        <TouchableOpacity
          style={styles.modalBackground}
          // activeOpacity={1}
          onPressOut={toggleModal}
        >
          <View style={styles.modalContainer}>
            <View style={{ flexDirection: 'row', justifyContent: "space-between" }}>

              <View></View>
              <Image
                source={require('../Images/mainlogo.png')}
                style={{ height: 20, width: '30%', marginTop: '4%', marginLeft: '10%' }}
              />
              <View style={{ height: 35, width: 35, borderRadius: 20, borderColor: "gray", borderWidth: 0.5, marginTop: '2%', marginRight: '2%', justifyContent: 'center', alignItems: 'center' }}>
                <Image
                  source={require('../Images/close.png')}
                  style={{ height: '100%', width: '100%' }}
                />
              </View>

            </View>


            <View style={{ justifyContent: 'space-evenly', marginTop: '8%', flexDirection: 'row' }}>
              <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                <TouchableOpacity style={{ height: 35, width: 35, borderRadius: 20, borderColor: "gray", borderWidth: 0.5, justifyContent: 'center', alignItems: 'center', marginBottom: '9%' }}>
                  <Image
                    source={require('../Images/home.png')}
                    style={{ height: '44%', width: '44%' }}
                  />

                </TouchableOpacity>
                <Text style={{ color: 'black', fontSize: 12 }}>Home</Text>
              </View>

              <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                <TouchableOpacity style={{ height: 35, width: 35, borderRadius: 20, borderColor: "gray", borderWidth: 0.5, justifyContent: 'center', alignItems: 'center', marginBottom: '6%' }} onPress={handleToggleCheckbox}>
                  <View style={[styles.checkbox, isChecked ? styles.checked : null]}  >

                    <Image source={require("../Images/tick2.png")} style={{ height: '70%', width: '70%' }} />
                    {/* <Text>h</Text> */}
                  </View>
                </TouchableOpacity>
                <Text style={{ color: 'black', fontSize: 12 }}>DarkTheme</Text>
              </View>
              <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                <TouchableOpacity style={{ height: 35, width: 35, borderRadius: 20, borderColor: "gray", borderWidth: 0.5, justifyContent: 'center', alignItems: 'center', marginBottom: '9%' }}>
                  <Image
                    source={require('../Images/profile.png')}
                    style={{ height: '44%', width: '44%' }}
                  />
                </TouchableOpacity>
                <Text style={{ color: 'black', fontSize: 12 }}>Profile</Text>
              </View>

              <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                <TouchableOpacity style={{ height: 35, width: 35, borderRadius: 20, borderColor: "gray", borderWidth: 0.5, justifyContent: 'center', alignItems: 'center', marginBottom: '9%' }}
                  onPress={Logout}>
                  <Image
                    source={require('../Images/logout.png')}
                    style={{ height: '44%', width: '44%' }}
                  />
                </TouchableOpacity>
                <Text style={{ color: 'black', fontSize: 12 }}>Logout</Text>
              </View>

            </View>
            {/* <Text style={styles.modalText}>Hello!</Text>
            <TouchableOpacity style={styles.closeButton} onPress={toggleModal}>
              <Text style={styles.closeButtonText}>Hide modal</Text>
            </TouchableOpacity> */}
          </View>
        </TouchableOpacity>
      </Modal>
      <View
        style={{
          // flex: 1,
          justifyContent: 'space-between',
          flexDirection: 'row',
          alignItems: 'center',
          // position:'absolute',
          margin: 10
          // marginTop: 10,
          // marginBottom:10

        }}>
        <TouchableOpacity
          style={{
            backgroundColor: '#0f034b',
            width: 40,
            height: 40,
            borderRadius: 30,
            alignContent: 'center',
            marginRight: 50,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={toggleModal}
        >
          <Image
            source={require('../Images/drawer.png')}
            style={{ height: '40%', width: '30%' }}
          />







        </TouchableOpacity>




        <Image
          source={require('../Images/mainlogo.png')}
          style={{ height: 20, width: 130 }}
        />
        <View
          style={{
            backgroundColor: '#ff5400',
            width: 40,
            height: 40,
            borderRadius: 30,
            alignContent: 'center',
            marginLeft: 50,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            source={require('../Images/bell.png')}
            style={{ height: '50%', width: '40%' }}
          />
        </View>
      </View>
      <ScrollView style={{}}>

      <View style={{
   alignItems:'center'}}>
      <Carousel
        data={data}
        renderItem={renderCarouselItem}
        sliderWidth={400}
        itemWidth={360}
        loop= {true}
      />
    </View>










        {/* page */}
        {/* <ScrollView

          horizontal

          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={() => handleScrollEnd}

          style={{ width: '100%' }}
        >

          <View
            style={{
              // flex: 7,
              backgroundColor: '#C5FAD5',
              borderRadius: 10,
              width: 370,
              alignSelf: 'center',
              height: 280,
              flexDirection: 'row',
              marginLeft: 10,
              justifyContent: 'space-between',
              marginRight: 0,
            }}>
            <View style={{ alignContent: 'flex-start' }}>
              <Image
                source={require('../Images/mainlogo.png')}
                style={{
                  height: '10%',
                  width: 100,
                  marginLeft: 20,
                  marginTop: '10%',
                  marginBottom: '10%',
                }}
              />

              <Text
                style={{
                  color: 'black',
                  marginLeft: 25,
                  fontWeight: 'bold',
                  fontSize: 17,
                }}>
                KIND OF SHAWLS
              </Text>
              <Text style={{ color: '#2a2a2a', marginLeft: 20, fontSize: 14 }}>
                Swiss Lawn , Lawn,{' '}
              </Text>
              <Text style={{ color: '#2a2a2a', marginLeft: 20, fontSize: 14 }}>
                Kashmiri, Sawati{' '}
              </Text>
              <Text
                style={{
                  color: '#2a2a2a',
                  marginLeft: 20,
                  fontSize: 14,
                  marginBottom: 10,
                }}>
                and Multani Shawls{' '}
              </Text>
              <Text
                style={{
                  color: '#2a2a2a',
                  marginLeft: 20,
                  fontSize: 14,
                  fontWeight: 'bold',
                  marginBottom: 10,
                }}>
                Both Men and Women{' '}
              </Text>
              <View style={{ flexDirection: 'row' }}>

                <Image
                  source={require('../Images/arrow.png')}
                  style={{ height: '100%', width: 'auto', marginTop: '2%' }}
                />
              </View>
            </View>


            <View
              style={{
                height: '100%',
                width: '50%',
                borderBottomLeftRadius: 390,
                overflow: 'hidden',
                borderRadius: 10,
              }}>
              <Image
                source={{
                  uri: 'https://www.shopmanto.com/cdn/shop/products/DSC03002_800x.jpg?v=1680944976',
                }}
                style={{ height: '100%', width: '100%', alignSelf: 'stretch' }}
              />
            
            </View>
          </View>

          <View
            style={{
              // flex: 7,
              backgroundColor: '#FFBE7B',
              borderRadius: 13,
              width: 370,
              alignSelf: 'center',
              height: 280,
              flexDirection: 'row',
              marginLeft: 25,
              justifyContent: 'space-between',
              marginRight: 0,
            }}>
            <View style={{ alignContent: 'flex-start' }}>
              <Image
                source={require('../Images/mainlogo.png')}
                style={{
                  height: '10%',
                  width: 100,
                  marginLeft: 20,
                  marginTop: '10%',
                  marginBottom: '10%',
                  marginRight: 20
                }}
              />

              <Text
                style={{
                  color: 'black',
                  marginLeft: 25,
                  fontWeight: 'bold',
                  fontSize: 17,
                }}>
                KIND OF STOLLER
              </Text>
              <Text style={{ color: '#2a2a2a', marginLeft: 20, fontSize: 14 }}>
                Lawn , China Lawn,{' '}
              </Text>
              <Text style={{ color: '#2a2a2a', marginLeft: 20, fontSize: 14 }}>
                Silk , Wool,{' '}
              </Text>
              <Text style={{ color: '#2a2a2a', marginLeft: 20, fontSize: 14 }}>
                Kashmiri, Mutani{' '}
              </Text>
              <Text
                style={{
                  color: '#2a2a2a',
                  marginLeft: 20,
                  fontSize: 14,

                }}>
                Imported Chinese{' '}
              </Text>
              <Text
                style={{
                  color: '#2a2a2a',
                  marginLeft: 20,
                  fontSize: 14,

                }}>
                and Turkey Stollers.{' '}
              </Text>

              <Text
                style={{
                  color: '#2a2a2a',
                  marginLeft: 20,
                  fontSize: 14,
                  fontWeight: 'bold',
                  marginBottom: 10,
                }}>
                Imported{' '}
              </Text>
              <View style={{ flexDirection: 'row' }}>
                <Text style={{ color: '#2a2a2a', marginLeft: 20, fontSize: 14 }}>
                  View more{' '}
                </Text>
                <Image
                  source={require('../Images/arrow.png')}
                  style={{ height: '40%', width: 50, marginTop: 8 }}
                />
              </View>
            </View>


            <View
              style={{
                height: '100%',
                width: '50%',
                borderBottomLeftRadius: 390,
                overflow: 'hidden',
                borderRadius: 10,
              }}>
              <Image
                source={require('../Images/scarf.png')}
                style={{ height: '100%', width: '100%', alignSelf: 'stretch' }}
              />
          
            </View>
          </View>



          <View
            style={{
              // flex: 7,
              backgroundColor: '#F1AC88',
              borderRadius: 10,
              width: 370,
              alignSelf: 'center',
              height: 280,
              flexDirection: 'row',
              marginLeft: 20,
              justifyContent: 'space-between',
              // marginRight: 15,
            }}>
            <View style={{ alignContent: 'flex-start' }}>
              <Image
                source={require('../Images/mainlogo.png')}
                style={{
                  height: '10%',
                  width: 100,
                  marginLeft: 20,
                  marginTop: '10%',
                  marginBottom: '10%',
                  marginRight: 20
                }}
              />

              <Text
                style={{
                  color: 'black',
                  marginLeft: 25,
                  fontWeight: 'bold',
                  fontSize: 17,
                }}>
                KIND OF DUPPATA
              </Text>
              <Text style={{ color: '#2a2a2a', marginLeft: 20, fontSize: 14 }}>
                Swiss Lawn , Lawn,{' '}
              </Text>
              <Text style={{ color: '#2a2a2a', marginLeft: 20, fontSize: 14 }}>
                Kashmiri, Sawati{' '}
              </Text>
              <Text
                style={{
                  color: '#2a2a2a',
                  marginLeft: 20,
                  fontSize: 14,
                  marginBottom: 10,
                }}>
                and Multani Shawls{' '}
              </Text>
              <Text
                style={{
                  color: '#2a2a2a',
                  marginLeft: 20,
                  fontSize: 14,
                  fontWeight: 'bold',
                  marginBottom: 10,
                }}>
                Both Men and Women{' '}
              </Text>
              <View style={{ flexDirection: 'row' }}>
                <Text style={{ color: '#2a2a2a', marginLeft: 20, fontSize: 14 }}>
                  View more{' '}
                </Text>
                <Image
                  source={require('../Images/arrow.png')}
                  style={{ height: '40%', width: 50, marginTop: 8 }}
                />
              </View>
            </View>


            <View
              style={{
                height: '100%',
                width: '50%',
                borderBottomLeftRadius: 390,
                overflow: 'hidden',
                borderRadius: 10,
              }}>
              <Image
                source={{
                  uri: 'https://www.pakstyle.pk/img/products/l/p14960-multicolor-organza-dupatta.jpg',
                }}
                style={{ height: '100%', width: '100%', alignSelf: 'stretch' }}
              />
          
            </View>
          </View>




          <View
            style={{
              // flex: 7,
              backgroundColor: '#A7BEAE',
              borderRadius: 10,
              width: 370,
              alignSelf: 'center',
              height: 280,
              flexDirection: 'row',
              marginLeft: 15,
              justifyContent: 'space-between',
              marginRight: 5,
            }}>
            <View style={{ alignContent: 'flex-start' }}>
              <Image
                source={require('../Images/mainlogo.png')}
                style={{
                  height: '10%',
                  width: 100,
                  marginLeft: 20,
                  marginTop: '10%',
                  marginBottom: '10%',
                  marginRight: 20
                }}
              />

              <Text
                style={{
                  color: 'black',
                  marginLeft: 25,
                  fontWeight: 'bold',
                  fontSize: 17,
                }}>
                KIND OF ABAYA
              </Text>
              <Text style={{ color: '#2a2a2a', marginLeft: 20, fontSize: 14 }}>
                Swiss Lawn , Lawn,{' '}
              </Text>
              <Text style={{ color: '#2a2a2a', marginLeft: 20, fontSize: 14 }}>
                Kashmiri, Sawati{' '}
              </Text>
              <Text
                style={{
                  color: '#2a2a2a',
                  marginLeft: 20,
                  fontSize: 14,
                  marginBottom: 10,
                }}>
                and Multani Shawls{' '}
              </Text>
              <Text
                style={{
                  color: '#2a2a2a',
                  marginLeft: 20,
                  fontSize: 14,
                  fontWeight: 'bold',
                  marginBottom: 10,
                }}>
                Both Men and Women{' '}
              </Text>
              <View style={{ flexDirection: 'row' }}>
                <Text style={{ color: '#2a2a2a', marginLeft: 20, fontSize: 14 }}>
                  View more{' '}
                </Text>
                <Image
                  source={require('../Images/arrow.png')}
                  style={{ height: '40%', width: 50, marginTop: 8 }}
                />
              </View>
            </View>


            <View
              style={{
                height: '100%',
                width: '50%',
                borderBottomLeftRadius: 390,
                overflow: 'hidden',
                borderRadius: 10,
              }}>
              <Image
                source={{
                  uri: 'https://img.freepik.com/premium-photo/arabic-muslim-woman-stylish-abaya_370405-492.jpg?w=360',
                }}
                style={{ height: '100%', width: '100%', alignSelf: 'stretch' }}
              />
              
            </View>
          </View>

        </ScrollView> */}

        {/* Add Bills */}
        <View style={{ marginLeft: 12, marginTop: '2%', marginRight: 12, marginBottom: '7%' }}>
          <View
            style={{
              marginBottom: '3%',
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: 'black',
                fontSize: 15,

                fontWeight: 'bold',
                marginRight: '50%',
              }}>
              Add Bills{' '}
            </Text>

            <Pressable
              style={{
                borderRadius: 10,
                backgroundColor: '#0f034b',
                height: 40,
                width: 90,
                marginTop: '1%',

                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',

              }}
              onPress={() => navigation.navigate('Shop')}>
              <Text
                style={{ color: 'white', fontWeight: 'bold', marginLeft: '10%' }}>
                {' '}
                Add{' '}
              </Text>


              <Image
                source={require('../Images/plus.png')}
                style={{ height: '70%', width: '50%' }}
              />
            </Pressable>
          </View>

          <View style={{ flexDirection: 'row', marginLeft: 0 }}>
            <View
              style={{
                // backgroundColor: '#ded9f4',
                height: 110,
                width: 180,
                borderColor: '#ff5400',
                borderWidth: 0.5,

                borderRadius: 10,
                marginRight: 10,
                paddingLeft: 5,
              }}>
              <Image
                source={require('../Images/retail.png')}
                style={{ height: '40%', width: '30%' }}
              />
              <View style={{ flexDirection: 'row' }}>
                <Text
                  style={{
                    color: 'black',
                    fontSize: 12,
                    marginRight: '20%',
                    paddingBottom: 10,
                  }}>
                  {' '}
                  Retail Sales
                </Text>
                <Text style={{ color: 'gray', fontSize: 10 }}> 40% Profit</Text>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <Text
                  style={{
                    color: 'black',
                    fontSize: 26,
                    fontWeight: 'bold',
                    paddingRight: 10,
                  }}>
                  {' '}
                  4500
                </Text>
                <Text style={{ color: 'black', fontSize: 26, fontWeight: 'bold' }}>
                  --{' '}
                </Text>
              </View>
              {/* <Text style={{color:'black',alignSelf:'center', fontWeight:'bold', fontSize:25, marginTop:'25%' }}>4500</Text>
    <Text style={{color:'black',alignSelf:'center', }}>Today's Revenue</Text>
      <Text style={{color:'black',alignSelf:'center',  marginTop:'20%' , fontWeight:'bold'}}> RETAIL SALES</Text> */}
            </View>
            <View
              style={{
                // backgroundColor: '#ff5400',
                height: 110,

                width: 180,
                borderColor: '#ff5400',
                borderWidth: 0.5,

                borderRadius: 10,

                paddingLeft: 5,
              }}>
              <Image
                source={require('../Images/wholesale.png')}
                style={{ height: '40%', width: '30%' }}
              />
              <View style={{ flexDirection: 'row' }}>
                <Text
                  style={{
                    color: 'black',
                    fontSize: 12,
                    marginRight: '10%',
                    paddingBottom: 10,
                  }}>
                  {' '}
                  Wholesale Sales
                </Text>
                <Text style={{ color: 'black', fontSize: 10 }}> 40% Profit</Text>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <Text
                  style={{
                    color: 'black',
                    fontSize: 26,
                    fontWeight: 'bold',
                    paddingRight: 10,
                  }}>
                  {' '}
                  4500
                </Text>
                <Text style={{ color: 'black', fontSize: 26, fontWeight: 'bold' }}>
                  --{' '}
                </Text>
              </View>
            </View>

          </View>
        </View>




        <View style={{ marginLeft: 12, marginRight: 12, marginBottom: '0%' }}>
          <View style={{ flexDirection: 'row', justifyContent: "space-between" }}>
            <Text
              style={{
                color: 'black',
                fontSize: 15,
                marginBottom: '3%',
                fontWeight: 'bold',
                marginRight: '50%',
              }}>
              View{' '}
            </Text>
            <TouchableOpacity>
              <Text style={{ color: 'gray', fontSize: 12 }}>  View all</Text>

            </TouchableOpacity>
          </View>
          <ScrollView horizontal style={{ marginBottom: '10%' }}>
            <Pressable
              style={{
                // backgroundColor: '#dc9cfd',
                height: 130,
                width: 130,
                borderColor: '#ff5400',
                borderWidth: 0.5,
                borderRadius: 10,
                marginRight: 10,
                alignItems: "center",
                flexDirection: 'column',
                justifyContent: 'center',
                paddingLeft: 5,
              }}>
              <Image
                source={require('../Images/inventory.png')}
                style={{ height: '40%', width: '30%', marginBottom: '5%' }}
              />


              <Text
                style={{
                  // alignSelf:'center',
                  color: 'black',
                  fontSize: 13,
                  // fontWeight:'bold',
                  // marginRight: '10%',
                  // paddingBottom: 10,
                }}>

                Inventory Stock
              </Text>

              {/* <Text
                style={{
            
                  color: 'black',

                  fontSize: 22,
                  // fontWeight:'bold',
                  marginRight: '10%',
                  // paddingBottom: 10,
                }}>
               
         
           
          Stock
              </Text> */}

            </Pressable>



            <Pressable
              style={{
                // backgroundColor: '#9de47c',
                height: 130,
                width: 130,
                borderRadius: 10,
                justifyContent: 'center',
                borderColor: '#ff5400',
                borderWidth: 0.5,
                marginRight: 10,
                paddingLeft: 5,
                alignItems: "center",
                flexDirection: 'column'
              }}>
              <Image
                source={require('../Images/sales.png')}
                style={{ height: '40%', width: '30%', marginBottom: '5%' }}
              />


              <Text
                style={{
                  // alignSelf:'center',
                  color: 'black',
                  fontSize: 13,
                  // fontWeight:'bold',
                  // marginRight: '10%',
                  // paddingBottom: 10,
                }}>

                Sales
              </Text>


            </Pressable>


            <Pressable
              style={{
                // backgroundColor: '#f56a4d',
                height: 130,
                width: 130,
                borderRadius: 10,
                marginRight: 10,
                alignItems: 'center',
                justifyContent: 'center',
                paddingLeft: 5,
                flexDirection: 'column',
                borderColor: '#ff5400',
                borderWidth: 0.5,
              }}>


              <Image
                source={require('../Images/expenses.png')}
                style={{ height: '40%', width: '30%', marginBottom: '5%' }}
              />


              <Text
                style={{
                  alignSelf: 'center',
                  color: 'black',
                  fontSize: 13,
                  // fontWeight:'bold',
                  // marginRight: '10%',
                  // paddingBottom: 10,
                }}>

                Expenses
              </Text>

            </Pressable>


            <Pressable
              style={{
                // backgroundColor: '#f56a4d',
                height: 130,
                width: 130,
                borderRadius: 10,
                marginRight: 10,
                alignItems: 'center',
                justifyContent: 'center',
                paddingLeft: 5,
                flexDirection: 'column',
                borderColor: '#ff5400',
                borderWidth: 0.5,
              }}>


              <Image
                source={require('../Images/khata.png')}
                style={{ height: '40%', width: '30%', marginBottom: '5%' }}
              />


              <Text
                style={{
                  alignSelf: 'center',
                  color: 'black',
                  fontSize: 13,
                  // fontWeight:'bold',
                  // marginRight: '10%',
                  // paddingBottom: 10,
                }}>

                Khata
              </Text>

            </Pressable>

            <Pressable
              style={{
                // backgroundColor: '#f56a4d',
                height: 130,
                width: 130,
                borderRadius: 10,
                marginRight: 10,
                alignItems: 'center',
                justifyContent: 'center',
                paddingLeft: 5,
                flexDirection: 'column',
                borderColor: '#ff5400',
                borderWidth: 0.5,
              }}>


              <Image
                source={require('../Images/record.png')}
                style={{ height: '40%', width: '30%', marginBottom: '5%' }}
              />


              <Text
                style={{
                  alignSelf: 'center',
                  color: 'black',
                  fontSize: 13,
                  // fontWeight:'bold',
                  // marginRight: '10%',
                  // paddingBottom: 10,
                }}>

                Committee Record
              </Text>

            </Pressable>

            <Pressable
              style={{
                // backgroundColor: '#f56a4d',
                height: 130,
                width: 130,
                borderRadius: 10,
                // marginRight: 10,
                alignItems: 'center',
                justifyContent: 'center',
                paddingLeft: 5,
                flexDirection: 'column',
                borderColor: '#ff5400',
                borderWidth: 0.5,
              }}>


              <Image
                source={require('../Images/daybook.png')}
                style={{ height: '40%', width: '30%', marginBottom: '5%' }}
              />


              <Text
                style={{
                  alignSelf: 'center',
                  color: 'black',
                  fontSize: 13,
                  // fontWeight:'bold',
                  // marginRight: '10%',
                  // paddingBottom: 10,
                }}>

                DayBook Data
              </Text>

            </Pressable>
          </ScrollView>

        </View>
        {/* Extras */}

        <View style={{ marginLeft: 12, }}>



          <View style={{ flexDirection: 'row', marginLeft: '0%', alignItems: 'center', marginBottom: '2%', justifyContent: "space-between" }}>

            <Text style={{ color: "black", fontSize: 15, fontWeight: 'bold', marginBottom: "0%" }}> Khata</Text>



          </View>

        </View>
        <View style={{ borderColor: "gray", borderTopWidth: 0.5, marginBottom: '2%' }}>

        </View>

        <View style={{ flexDirection: 'column', marginBottom: '6%' }}>


          <TouchableOpacity style={{ flexDirection: 'row', marginBottom: '2%', justifyContent: 'flex-start' }}>
            <View style={{ height: 50, width: 50, borderRadius: 50, borderColor: '#ff5400', borderWidth: 0.5, marginLeft: '2%', marginRight: '2%', alignItems: 'center', justifyContent: 'center' }}>

              <Image
                source={require('../Images/addpayment.png')}
                style={{ height: '60%', width: '60%' }}
              />

            </View>
            <View style={{ alignSelf: "center", }}>
              <Text style={{ color: 'black', fontSize: 15, marginRight: '40%', marginLeft: '8%' }}>Customer </Text>

            </View>
            <Image
              source={require('../Images/mainarrow1.png')}
              style={{ height: '39%', width: '14%', marginLeft: '2%', marginTop: '4%' }}
            />


          </TouchableOpacity>

          <View style={{ borderColor: "gray", borderTopWidth: 0.5, marginBottom: '2%' }}>

          </View>
          <TouchableOpacity style={{ flexDirection: 'row', marginBottom: '2%', justifyContent: "flex-start" }}>
            <View style={{ height: 50, width: 50, borderRadius: 50, borderColor: '#ff5400', borderWidth: 0.5, marginLeft: '2%', marginRight: '2%', alignItems: 'center', justifyContent: 'center' }}>

              <Image
                source={require('../Images/givepayment.png')}
                style={{ height: '100%', width: '60%' }}
              />

            </View>
            <View style={{ alignSelf: "center", }}>
              <Text style={{ color: 'black', fontSize: 15, marginRight: '42%', marginLeft: '8%' }}> Supplier</Text>

            </View>
            <Image
              source={require('../Images/mainarrow.png')}
              style={{ height: '39%', width: '14%', marginLeft: '2%', marginTop: '4%' }}
            />


          </TouchableOpacity>
          <View style={{ borderColor: "gray", borderTopWidth: 0.5, marginBottom: '2%' }}>

          </View>





        </View>






        <View style={{ marginLeft: 12, }}>



          <View style={{ flexDirection: 'row', marginLeft: '0%', alignItems: 'center', marginBottom: '2%', justifyContent: "space-between" }}>

            <Text style={{ color: "black", fontSize: 15, fontWeight: 'bold', marginBottom: "0%" }}> DayBook</Text>



          </View>

        </View>
        <View style={{ borderColor: "gray", borderTopWidth: 0.5, marginBottom: '2%' }}>

        </View>

        <View style={{ flexDirection: 'column', marginBottom: '6%' }}>


          <TouchableOpacity style={{ flexDirection: 'row', marginBottom: '2%', justifyContent: 'flex-start' }}>
            <View style={{ height: 50, width: 50, borderRadius: 50, borderColor: '#ff5400', borderWidth: 0.5, marginLeft: '2%', marginRight: '2%', alignItems: 'center', justifyContent: 'center' }}>

              <Image
                source={require('../Images/addpayment.png')}
                style={{ height: '60%', width: '60%' }}
              />

            </View>
            <View style={{ alignSelf: "center", }}>
              <Text style={{ color: 'black', fontSize: 15, marginRight: '49%', marginLeft: '8%' }}>Add </Text>

            </View>
            <Image
              source={require('../Images/mainarrow1.png')}
              style={{ height: '39%', width: '14%', marginLeft: '2%', marginTop: '4%' }}
            />


          </TouchableOpacity>

          <View style={{ borderColor: "gray", borderTopWidth: 0.5, marginBottom: '2%' }}>

          </View>
          <TouchableOpacity style={{ flexDirection: 'row', marginBottom: '2%', justifyContent: "flex-start" }}>
            <View style={{ height: 50, width: 50, borderRadius: 50, borderColor: '#ff5400', borderWidth: 0.5, marginLeft: '2%', marginRight: '2%', alignItems: 'center', justifyContent: 'center' }}>

              <Image
                source={require('../Images/givepayment.png')}
                style={{ height: '100%', width: '60%' }}
              />

            </View>
            <View style={{ alignSelf: "center", }}>
              <Text style={{ color: 'black', fontSize: 15, marginRight: '46%', marginLeft: '7%' }}> Spend</Text>

            </View>
            <Image
              source={require('../Images/mainarrow.png')}
              style={{ height: '39%', width: '14%', marginLeft: '2%', marginTop: '4%' }}
            />


          </TouchableOpacity>
          <View style={{ borderColor: "gray", borderTopWidth: 0.5, marginBottom: '2%' }}>

          </View>





        </View>
        <View style={{ marginLeft: 12, marginRight: 12, marginTop: '0%' }}>

          <Text style={{ color: "black", fontSize: 15, fontWeight: 'bold', marginBottom: "0%" }}> Committee Management</Text>

          <View style={{ flexDirection: 'row', marginLeft: '2%', alignItems: 'center', marginBottom: '2%' }}>
            <Text style={{ color: "gray", fontSize: 10, fontWeight: 'bold' }}> Closed at</Text>
            <Text style={{ color: "gray", fontSize: 10, fontWeight: 'bold', marginRight: '50%' }}> 12 Dec</Text>

            <Text style={{ color: "gray", fontSize: 12, fontWeight: 'bold', marginRight: '1%' }}> 20000</Text>
            <View style={{ height: 29, width: '15%', borderRadius: 12, backgroundColor: 'lightgray', alignItems: 'center', justifyContent: "center", }}>
              <Text style={{ color: "black", fontSize: 12, fontWeight: 'bold', }}>12000</Text>



            </View>


          </View>

        </View>
        <View style={{ flexDirection: 'column', }}>


          <TouchableOpacity style={{ flexDirection: 'row', marginBottom: '2%' }}>
            <View style={{ height: 50, width: 50, borderRadius: 50, backgroundColor: "#269cca", marginLeft: '2%', marginRight: '2%', alignItems: 'center', justifyContent: 'center' }}>

              <Image
                source={require('../Images/cash.png')}
                style={{ height: '60%', width: '60%' }}
              />

            </View>
            <View style={{ flexDirection: 'column', alignSelf: "center" }}>
              <Text style={{ color: 'black', fontSize: 15 }}> Committee Collection </Text>
              <Text style={{ color: 'gray', fontSize: 10, marginLeft: '6%' }}> Rs 50000 </Text>
            </View>
            <Image
              source={require('../Images/arrow1.png')}
              style={{ height: '60%', width: '20%', marginLeft: '22%', marginTop: '3%' }}
            />


          </TouchableOpacity>

          <View style={{ borderColor: "gray", borderTopWidth: 0.5, marginBottom: '2%' }}>

          </View>
          <TouchableOpacity style={{ flexDirection: 'row', marginBottom: '2%' }}>
            <View style={{ height: 50, width: 50, borderRadius: 50, backgroundColor: "#B3E1A9", marginLeft: '2%', marginRight: '2%', alignItems: 'center', justifyContent: 'center' }}>
              <Image
                source={require('../Images/records.png')}
                style={{ height: '60%', width: '60%' }}
              />
            </View>
            <View style={{ flexDirection: 'column', alignSelf: "center" }}>
              <Text style={{ color: 'black', fontSize: 15 }}> Committee Record</Text>
              <Text style={{ color: 'gray', fontSize: 10, marginLeft: '6%' }}> Rs 50000 </Text>
            </View>
            <Image
              source={require('../Images/arrow2.png')}
              style={{ height: '60%', width: '20%', marginLeft: '28%', marginTop: '3%' }}
            />

          </TouchableOpacity>
          <View style={{ borderColor: "gray", borderTopWidth: 0.5, marginBottom: '2%' }}>

          </View>
          <TouchableOpacity style={{ flexDirection: 'row', marginBottom: '2%' }}>
            <View style={{ height: 50, width: 50, borderRadius: 50, backgroundColor: "#E46F49", marginLeft: '2%', marginRight: '2%', alignItems: 'center', justifyContent: 'center' }}>

              <Image
                source={require('../Images/cash.png')}
                style={{ height: '60%', width: '60%' }}
              />

            </View>
            <View style={{ flexDirection: 'column', alignSelf: "center" }}>
              <Text style={{ color: 'black', fontSize: 15 }}> Committee Collection </Text>
              <Text style={{ color: 'gray', fontSize: 10, marginLeft: '6%' }}> Rs 50000 </Text>
            </View>
            <Image
              source={require('../Images/arrow3.png')}
              style={{ height: '60%', width: '20%', marginLeft: '22%', marginTop: '3%' }}
            />
          </TouchableOpacity>
          <View style={{ borderColor: "gray", borderTopWidth: 0.5, marginBottom: '2%' }}>

          </View>
        </View>

      </ScrollView>
    </View>
  );
};

export default Home;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#ff5400',
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
  checkbox: {
    height: 35, width: 35, borderRadius: 20, borderColor: "gray", borderWidth: 0.5, justifyContent: 'center', alignItems: 'center', marginBottom: '6%'
  },
  checked: {
    backgroundColor: '#0079DE'
  },
  carouselItem: {
    backgroundColor: '#C5FAD5',
    borderRadius: 10,
    width: '100%',
    height: 280,
    justifyContent: 'space-between',
  },
  carouselImage: {
    height: '100%',
    width: '100%',
    borderBottomLeftRadius: 390,
  },






});

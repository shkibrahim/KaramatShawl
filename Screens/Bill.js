import React from 'react';
import { useEffect, useState, useRef } from 'react';
import iconFont from 'react-native-vector-icons/Fonts/FontAwesome.ttf';
// import RNViewShot from 'react-native-view-shot';
import { Linking } from 'react-native';
// import PDF from 'react-native-pdf';
import ThermalPrinter from 'react-native-thermal-printer';
import Modal from "react-native-modal";
import { useForm, Controller } from 'react-hook-form';
import firestore from '@react-native-firebase/firestore';
import Icon from 'react-native-vector-icons/MaterialIcons';
import DropDownPicker from 'react-native-dropdown-picker';
import Share from 'react-native-share';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import ImagePicker from 'react-native-image-crop-picker';
import { PdfCode } from "./PdfCode";
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
import RNPrint from 'react-native-print';
import Table from './Table';
const Bill = ({ route, navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [clr, setclr] = useState ({bgcolor:'green' , });

  const [disabling, setdisabling] = useState(false);





//   var Submit = async () => {



    
//     if (
     
//       Cashier == null ||
//       Cash == null 
     
//     ) {
//       alert('Fill the form');
//     } else {
//       setIsLoading(true);
     
//   setclr({ bgcolor: 'red' });
// setdisabling(true)

    

//       firestore()
//         .collection('BillBook')
//         .add({
//           CustomerName: CustomerName,
//           CustomerContact:CustomerContact,
//           Date: selectedDate,
//           Time: selectedTime,
//           BillNo:BillNo,
//           Cashier: Cashier,
//          selectedList1:selectedList1,
//           GrandTotal: calculateTotalPrice(),
//           CashbyCustomer: Cash,
//           CashReturn: Change(),
//           Status: Status(),
        
         
//         })
//         .then(async () => {
//           setIsLoading(false);
//           setclr({ bgcolor: 'green' });
//           setdisabling(false)
//           if (Status() === 'Paid') {
//             alert('Bill Successful');
//             const path1 = await createPDF();
//             setPdfFilePath(path1);
  
//             // Now, share the PDF
          
//           } else {
//             alert('Enter Cash', 'Please enter cash as the status is not "Paid".');
//           }
//         })
//         .catch(() => {
         
//           alert('error');
//         });
//     }
//   };

  
  // var Submit = async () => {
  //   if (Cashier == null || Cash == null) {
  //     alert('Fill the form');
  //     return;
  //   }
  
  //   setIsLoading(true);
  //   setclr({ bgcolor: 'red' });
  //   setdisabling(true);
  
  //   // Firestore batch to perform multiple operations
  //   const batch = firestore().batch();
  
  //   // Calculate the total quantity to subtract from ProductQuantity
  //   const totalQuantityToSubtract = selectedList1.reduce(
  //     (total, item) => total + item.quantity,
  //     0
  //   );
  
  //   // Update ProductQuantity for each item in selectedList1
  //   selectedList1.forEach(item => {
  //     const productRef = firestore().collection('Products').doc(item.ProductCode);
  //     console.log('Updating product:', item.ProductCode);
  //     try {
  //       batch.update(productRef, {
  //         ProductQuantity: firestore.FieldValue.increment(-item.quantity),
  //       });
  //     } catch (error) {
  //       console.error(`Error updating ProductQuantity for product ${item.ProductCode}:`, error);
  //     }
  //   });
  
  //   // Add data to the BillBook collection
  //   const billBookRef = firestore().collection('BillBook').doc();
  //   batch.set(billBookRef, {
  //     CustomerName: CustomerName,
  //     CustomerContact:CustomerContact,
  //     Date: selectedDate,
  //     Time: selectedTime,
  //     BillNo:BillNo,
  //     Cashier: Cashier,
  //    selectedList1:selectedList1,
  //     GrandTotal: calculateTotalPrice(),
  //     CashbyCustomer: Cash,
  //     CashReturn: Change(),
  //     Status: Status(),
  //     // ... other fields
  //   });
  
  //   // Commit the batch
  //   try {
  //     await batch.commit();
  
  //     setIsLoading(false);
  //     setclr({ bgcolor: 'green' });
  //     setdisabling(false);
  
  //     if (Status() === 'Paid') {
  //       alert('Bill Successful');
  //       const path1 = await createPDF();
  //       setPdfFilePath(path1);
  
  //       // Now, share the PDF
  //       handleSharePDF();
  //     } else {
  //       alert('Enter Cash', 'Please enter cash as the status is not "Paid".');
  //     }
  //   } catch (error) {
  //    console.log(error.message)
  //     alert('Error submitting data:', error.message);
  //   }
  // };
  
  var Submit = async () => {
    if (Cashier == null || Cash == null) {
      alert('Fill the form');
      return;
    }
  
    setIsLoading(true);
    setclr({ bgcolor: 'red' });
    setdisabling(true);
  
    // Calculate the total quantity to subtract from ProductQuantity
    // const totalQuantityToSubtract = selectedList1.reduce(
    //   (total, item) => total + item.quantity,
    //   0
    // );
  
    // Firestore batch to perform multiple operations
    const batch = firestore().batch();
  
    selectedList1.forEach(item => {
      const productRef = firestore().collection('Products').doc(item.id);
      batch.update(productRef, {
        ProductQuantity: firestore.FieldValue.increment(-item.quantity),
      });
    });
  
    // Add data to the BillBook collection
    const billBookRef = firestore().collection('BillBook').doc();
    batch.set(billBookRef, {
      CustomerName: CustomerName,
      CustomerContact: CustomerContact,
      Date: selectedDate,
      Time: selectedTime,
      BillNo: BillNo,
      Cashier: Cashier,
      selectedList1: selectedList1,
      GrandTotal: calculateTotalPrice(),
      CashbyCustomer: Cash,
      CashReturn: Change(),
      Status: Status(),
    });
  
    // Commit the batch
    try {
      await batch.commit();
  
  
      if (Status() === 'Paid') {
        setIsLoading(false);
        setclr({ bgcolor: 'green' });
        setdisabling(false);
    
        alert('Bill Successful');
        const path1 = await createPDF();
        setPdfFilePath(path1);
  navigation.navigate('Home')
        // Now, share the PDF
      
      } else {
        alert('Enter Cash', 'Please enter cash as the status is not "Paid".');
      }
    } catch (error) {
      // setIsLoading(false);
      alert('Error submitting data:', error.message);
    }
  };
  
  





  const handleSharePDF = async () => {
  
   
  
    if (pdfFilePath) {
    
      const shareOptions = {
        // message,
        url: `file://${pdfFilePath}`,
        failOnCancel: false,
        social: Share.Social.WHATSAPPBUSINESS,
      };

      const shareResult = await Share.shareSingle(shareOptions);
      console.log('Share Result:', shareResult);
    } else {
    alert('No PDF Available', 'Please generate the PDF first.');
    }

}











const[BillNo, setBillNo] = useState('1');


  const [pdfFilePath, setPdfFilePath] = useState();
  const { selectedList1 } = route.params;

  const { CustomerContact } = route.params;
  const { CustomerName } = route.params;

  const List = selectedList1;
  const Cnumber = CustomerContact;
  const Cname = CustomerName;
  const generatePDFContent = () => {
    let count = 0
    const List = selectedList1;
    let wnum = Cnumber;
    // Ensure selectedList1 is defined before using map
    const itemsHTML = selectedList1
      ? selectedList1.map(item => {
        count++; // Increment count
        return `
          <tr>
            <td>${count}</td>
            <td>${item.quantity}</td>
            <td>${item.ProductName}</td>
            <td>${item.WholesalePrice}</td>
            <td>${item.WholesalePrice * item.quantity}</td>
          </tr>
        `;
      }).join('')
      : '';


    const Cnumber = CustomerContact;
    const Cname = CustomerName;
    const totalPrice = calculateTotalPrice(List || []); // Handle undefined
    const status = Status(totalPrice);
    const change = Change(totalPrice);
    const htmlContent = `
    <html>
    <head>
      <style>
        body {
          margin: 0;
          padding: 0;
          font-family: sans-serif;
        }
        h1 {
          text-align: center;
          position: relative;
        }
        .invoice-image {
          position: absolute;
          top: 0;
          margin-bottom:12;
          left: 50%;
          transform: translateX(-50%);
        }
        .customer-details {
          text-align: center;
          color: #ff5400; /* Text color */
          margin-top: 10px;
        }
        .customer-info {
          display: flex;
          flex-direction:row;
          justify-content: space-evenly;
          align-items: center;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 20px;
        }
        th, td {
          border: 1px solid black;
          padding: 8px;
          text-align: left;
          color: white; /* Text color */
        }
        th {
          background-color: #0f034b; /* Header background color */
        }
        td {
          background-color: #ff5400; /* Cell background color */
        }
        p {
          margin-bottom: 5px;
        }
        .totals {
          margin-top: 20px;
          text-align: right;
        }
        p.Green{
          color: green;
        }
        p.Orange{
          color: #ff5400;
        }
        .Row{
          display: flex;
          flex-direction:row;
        }
      </style>
    </head>
    <body>
      <h1>
        <img class="invoice-image" src="../Images/mainlogo.png" alt="Invoice" />
      </h1>
      <div class="customer-details">
      <h1>
        Customer Details
        </h1>
      </div>
      <div class="customer-info">
      <div>
        <p class="Orange"> Name:</p>
        <p class="Green">${CustomerName}</p>
        </div>
        <div>
        <p class="Orange"> Contact:</p>
        <p class="Green">${CustomerContact}</p>
      </div>
      </div>
      <div class="Row">
      <p  class="Orange">Cashier: </p> 
      <p> ${Cashier}</p>
     </div>
      <div class="Row">
      <p  class="Orange">Cashier: </p> 
      <p> ${Cashier}</p>
     </div>
      <table>
        <thead>
          <tr>
            <th>No</th>
            <th>Quantity</th>
            <th>Product Name</th>
            <th>Price</th>
            <th>Total Price</th>
          </tr>
        </thead>
        <tbody>
          ${itemsHTML}
        </tbody>
      </table>

      <div class="totals">
        <p>Total Price: ${totalPrice}</p>
        <p>Status: ${status}</p>
        <p>Change: ${change}</p>
      </div>
    </body>
  </html>

    `;

    return htmlContent;
  };
  // , BillNo
  // _${BillNo}
  const generateInvoiceFileName = (CustomerName) => {
    const fileName = `invoice_${CustomerName}`;
    return fileName;
  };

  const createPDF = async () => {
    const htmlContent = generatePDFContent();

    try {
      const options = {
        html: htmlContent,
        fileName: generateInvoiceFileName(CustomerName),
        directory: 'Documents',
      };

      const pdf = await RNHTMLtoPDF.convert(options);
      console.log('Generated HTML Content:', htmlContent);
      console.log('PDF generated at path:', pdf.filePath);
      return pdf.filePath;
    } catch (error) {
      console.error('Error generating PDF:', error);
     alert('Error', 'Failed to generate PDF.');
    }
  };

  const handleGeneratePDF = async () => {
    // Assuming you have a variable named `status` that contains the status value
    if (Status() === 'Paid') {
      alert('PDF saved to Device')
      const path1 = await createPDF();
      setPdfFilePath(path1);
      
      
     
    } else {
      alert('Enter Cash', 'Please enter cash as the status is not "Paid".');
    }
  };



  const Whatsapp = () => {
    try {
      RNPrint.print({ filePath: `file://${pdfFilePath}` });
    } catch (error) {
      console.error('Error printing PDF:', error);
    }


    let formattedNumber = CustomerContact;
    let url = `whatsapp://send?text=Thank you for shopping with us.Happy Shopping. *Esperanza by KS* &phone=${formattedNumber}&Document=file://${pdfFilePath}`;

    Linking.openURL(url)
      .then((data) => {
        console.log('WhatsApp Opened');
      })
      .catch(() => {
        alert('Make sure WhatsApp is installed on your device');
      });


  }












  const currentTime = new Date();
  const formattedTime = currentTime.getHours() + ":"
    + currentTime.getMinutes()
  const [selectedTime, setSelectedTime] = useState(formattedTime);
  const currentDate = new Date(); // create a new Date object with current date and time
  const year = currentDate.getFullYear(); // get the current year (YYYY)
  const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // get the current month (MM) and add leading zero if necessary
  const day = currentDate.getDate().toString().padStart(2, '0'); // get the current day (DD) and add leading zero if necessary
  const formattedDate = `${year}-${month}-${day}`; // combine the year, month, and day in the desired format
  const [selectedDate, setSelectedDate] = useState(formattedDate);











  const output = () => {
    console.log('List data ', List)
    console.log('Contact num ', Cnumber)
    console.log('Contact name ', Cname)
  }



  const calculateTotalPrice = () => {
    let totalPrice = 0;
    selectedList1.forEach(item => {
      totalPrice += (item.WholesalePrice * item.quantity)

    });
    return totalPrice;
  };
  const Change = () => {
    let change = 0;

    change += (Cash - calculateTotalPrice())


    return change;
  };


  const Status = () => {
    let Status = 'Unpaid';

    if (Change() > -1) {
      Status = 'Paid';
    }


    return Status;
  };


  const headers = ['No.', 'Quantity', 'Product Name', 'Price', 'Total Price'];
  const [Cashier, setCashier] = useState('Maqsood')
  const [Cash, setCash] = useState()

  const [PaymentType, setPaymentType] = useState('CASH')
  const { totalPrice } = route.params;
  const { PaymentMethodValue } = route.params;

  return (
    <View style={{ backgroundColor: '#ececec', height: '100%', width: '100%' }}>
      <View style={{ alignSelf: "center", marginBottom: 10, marginTop: 10 }}>
        <Image source={require("../Images/mainlogo.png")} style={{ height: 30, width: 150 }} />
      </View>



      <View style={{ flexDirection: 'column', }}>
        <Text style={{ color: '#ff5400', fontSize: 16, fontWeight: '800', alignSelf: "center" }}>Customer Details</Text>
        <View style={{ flexDirection: "row", justifyContent: 'space-evenly', marginBottom: 12 }}>
          <View style={{ flexDirection: "column", }}>
            <Text style={{ color: '#ff5400' }}>Name: </Text>

            <Text style={{ color: 'green' }}>{CustomerName}</Text>
          </View>
          <View style={{ flexDirection: "column", }}>
            <Text style={{ color: '#ff5400' }}>Contact: </Text>
            <Text style={{ color: 'green' }}>{CustomerContact}</Text>

          </View>
        </View>


      </View>
      <View style={{ flexDirection: "row", justifyContent: 'space-around', padding: 5 }}>
        <View style={{ flexDirection: "row" }}>
          <Text style={{ color: '#ff5400', fontSize: 14, }}>Date:  </Text>
          <Text style={{ color: '#ff5400', fontSize: 14, }}>{selectedDate} </Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={{ color: '#ff5400', fontSize: 14, }}>Time:  </Text>
          <Text style={{ color: '#ff5400', fontSize: 14, }}>{selectedTime}</Text>
        </View>

      </View>
      <View style={{ flexDirection: "row", paddingLeft: 5, alignItems: 'center' }}>
        <Text style={{ color: '#ff5400', fontSize: 14, }}>Cashier</Text>
        <View>
          <TextInput style={{
            height: 40, width: 72,
            alignSelf: 'center',

            color: 'black',
            marginLeft: 4,


            borderColor: 'gray',
            borderBottomWidth: 0.5,

          }}

            value={Cashier}
            onChangeText={setCashier}
          />
        </View>
      </View>
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: 'center' }}>
        <Text style={{ color: '#0f034b', fontSize: 16, fontWeight: '800' }}>Bill No: </Text>
        <Text style={{ color: '#ff5400', fontSize: 14, }}>{BillNo}</Text>
      </View>
      {/* <View style={{flexDirection:'column'}}>
        <Text style={{color:'#0f034b', fontSize:16, fontWeight:'800'}}>Ibrahim Sheikh</Text>
        <Text style={{color:'#ff5400', fontSize:14,marginBottom:5 }}>0331 504567</Text>
        <Text style={{color:'#0f034b', fontSize:16, fontWeight:'800'}}>Maqsood Ali</Text>
        <Text style={{color:'#ff5400', fontSize:14,marginBottom:5 }}>0333 5253608</Text>

    </View> */}


      <View>
        <Table data={selectedList1} headers={headers} />
      </View>


      <View style={{ flexDirection: "row", }}>
        <View style={{ borderWidth: 1, borderColor: "gray", width: '30%', paddingBottom: 20 }}>
          <Text style={{ color: '#0f034b', fontSize: 20, fontWeight: '800' }}>Thank you</Text>
          <Text style={{ color: '#0f034b', fontSize: 20, fontWeight: '800' }}>For</Text>
          <Text style={{ color: '#0f034b', fontSize: 20, fontWeight: '800' }}>Visiting Us!!!</Text>
        </View>
        <View style={{ width: '70%', flexDirection: "column", paddingTop: 5, paddingBottom: 5, borderColor: 'gray', borderWidth: 1 }}>
          <View style={{ flexDirection: 'row', justifyContent: "space-between", paddingRight: 5, paddingLeft: 5, }}>
            <Text style={{ color: "#ff5400", fontWeight: "bold" }}>Grand Total : </Text>
            <View style={{ flexDirection: 'row', paddingRight: 14 }}>
              <Text style={{ color: "green" }}>Rs </Text>
              <Text style={{ color: "green" }}>  {calculateTotalPrice()}</Text>

            </View>
          </View>


          <View style={{ flexDirection: 'row', justifyContent: "space-between", paddingRight: 5, paddingLeft: 5 }}>
            <Text style={{ color: "#ff5400", paddingTop: 10, fontWeight: "bold" }}>Payment : {PaymentMethodValue} </Text>
            <View style={{ flexDirection: "row", paddingLeft: 5, alignItems: 'center' }}>
              <Text style={{ color: 'green', fontSize: 14, }}>Rs</Text>
              <View>
                <TextInput style={{
                  height: 40, width: 49,
                  alignSelf: 'center',

                  color: 'green',
                  marginLeft: 4,


                  borderColor: 'gray',


                }}
                  keyboardType='Numeric'
                  value={Cash}
                  onChangeText={setCash}
                />
              </View>
            </View>
          </View>

          <View style={{ flexDirection: 'row', justifyContent: "space-between", paddingRight: 5, paddingLeft: 5 }}>
            <Text style={{ color: "#ff5400", fontWeight: 'bold' }}>Change :</Text>
            <View style={{ flexDirection: 'row', paddingRight: 14, marginTop: 2 }}>
              <Text style={{ color: "red" }}>Rs </Text>
              <Text style={{ color: "red", }}>{Change()}</Text>

            </View>
          </View>
        </View>
      </View>
      <View style={{ flexDirection: 'row' }}>

        <Text style={{ color: "#ff5400" }}> Status: </Text>
        <Text style={{ color: "green" }}>{Status()}</Text>
        {/* b  */}

      </View>

      <ScrollView></ScrollView>

    

      <TouchableOpacity
          style={{
            backgroundColor: clr.bgcolor,
            width: '25%',
            borderRadius: 9,
            height: 35,
            marginBottom:32,
            
            alignItems: 'center',
            justifyContent: 'center',
            alignSelf:'center'
            
          }}
          disabled={disabling}
          onPress={Submit}
        >
          {isLoading ? (
                <ActivityIndicator color="white" />
              ) : (
         
            <Text style={{ fontSize: 18, color: 'white', fontWeight: 'bold' }}>Submit</Text>
            )}
          </TouchableOpacity>
      <View style={{ backgroundColor: "black", height: 1, width: '100%', marginBottom: 12 }}></View>



      <View style={{ flexDirection: 'row', justifyContent: "space-evenly", marginBottom: 20 }}>

<TouchableOpacity style={{ flexDirection: "column", justifyContent: "center", alignItems: 'center' }} disabled={true}>

  <Icon name="share" color="#ececec" size={20} light />
  <Text style={{ color: '#ececec', fontSize: 12, }}>Share</Text>
</TouchableOpacity>

<TouchableOpacity style={{ flexDirection: "column", justifyContent: "center", alignItems: 'center' }} disabled={true}>

  <Icon name="share" color="#ececec" size={20} light />
  <Text style={{ color: '#ececec', fontSize: 12, }}>Share</Text>
</TouchableOpacity>
<TouchableOpacity style={{ flexDirection: "column", justifyContent: "center", alignItems: 'center' }} onPress={Whatsapp}>
  <Icon name="print" color="black" size={20} light />
  <Text style={{ color: 'gray', fontSize: 12, }}>Print</Text>

</TouchableOpacity>
<TouchableOpacity style={{ flexDirection: "column", justifyContent: "center", alignItems: 'center' }} onPress={handleSharePDF}>

  <Icon name="share" color="black" size={20} light />
  <Text style={{ color: 'gray', fontSize: 12, }}>Share</Text>
</TouchableOpacity>
<TouchableOpacity style={{ flexDirection: "column", justifyContent: "center", alignItems: 'center' }} onPress={handleGeneratePDF}>
  <Icon name="picture-as-pdf" color="black" size={20} light />
  <Text style={{ color: 'gray', fontSize: 12, }}>Save as PDF</Text>

</TouchableOpacity>


</View>
      {/* <View style={{ flexDirection: 'row', paddingLeft: 7 }}>
        <Text style={{ color: "black", fontSize: 12, fontWeight: 'bold' }}>Contact: </Text>

        <Text style={{ color: "black", fontSize: 12 }}>03315045467 , 03335253608</Text>


      </View>
      <View style={{ flexDirection: 'row', padding: 7 }}>
        <Text style={{ color: "black", fontSize: 12, fontWeight: 'bold' }}>Location: </Text>

        <Text style={{ color: "black", fontSize: 12 }}>Shop No.32 Makkah Cloth Market Raja Bazar Rawalpindi</Text>


      </View>
      <View style={{ alignSelf: "center", paddingBottom: 4, flexDirection: "row" }}>
        <Text style={{ color: "black", fontSize: 12, fontWeight: 'bold' }}>**FRIDAY IS OFF**</Text>

        <Text style={{ color: "black", fontSize: 12, fontWeight: 'bold' }}>NO RETURN**</Text>
        <Text style={{ color: "black", fontSize: 12, fontWeight: 'bold' }}>CHANGE WITHIN 7 DAYS**</Text>
      </View> */}



      {/* <PDF
        ref={pdfRef}
        source={{ uri: 'file://' + pdfFilePath, cache: true }}
        onLoadComplete={(numberOfPages, filePath) => {
          console.log(`number of pages: ${numberOfPages}`);
        }}
        onPageChanged={(page, numberOfPages) => {
          console.log(`current page: ${page}`);
        }}
        onError={(error) => {
          console.log(error);
        }}
      /> */}
    </View>

  );
};

export default Bill;
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
    height: 25, width: 25, borderRadius: 20, borderColor: "gray", borderWidth: 0.5, alignSelf: 'flex-end', alignItems: 'center',
    justifyContent: "center"
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
    height: 25, width: 25, borderRadius: 20, borderColor: "gray", borderWidth: 0.5, justifyContent: 'center', alignItems: 'center',
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
  colorclick: {
    backgroundColor: '#0f034b',
    borderRadius: 20,

  }

});

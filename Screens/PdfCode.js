// import dateFormat, { masks } from "dateformat";

// function GetTime(date) {
//   var hours = parseInt(dateFormat(date, "hh"));
//   var minutes = parseInt(dateFormat(date, "MM"));
//   var ampm = hours >= 12 ? "AM" : "PM";
//   hours = hours % 12;
//   hours = hours ? hours : 12; // the hour '0' should be '12'
//   minutes = minutes < 10 ? "0" + minutes : minutes;
//   var strTime = hours + ":" + minutes + " " + ampm;
//   return strTime;
// }

const PdfCode = (
    Cashier,selectedList1,  PaymentType, Status, Change,  Cash
) => `{<!DOCTYPE html>
    <html lang="en">
    
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Receipt</title>
        <style>
            body {
                background-color: rgba(243, 241, 241, 0.876);
            }
    
            .logo {
                font-weight: bold;
                text-align: center;
                color: rgb(119, 18, 119);
            }
    
            .logo span {
                color: orange;
            }
    
            .heading2 {
                color: orange;
                text-align: center;
                margin: 40px 5px;
            }
    
            .container2 {
                display: flex;
                flex-direction: row;
                justify-content: space-around;
            }
    
            .container2 input {
                padding: 5px;
                border: none;
                box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
            }
    
            .container3 {
                display: flex;
                flex-direction: row;
                justify-content: space-around;
            }
    
            .container3 p {
                color: orange;
                margin: 10px 5px;
                font-weight: bold;
                text-align: center;
            }
    
            .container4 {
                display: flex;
                flex-direction: row;
                justify-content: space-around;
                margin-top: 10px;
            }
    
            .container4 p {
                font-size: 15px;
                font-weight: bold;
                color: orange;
                margin-top: 5px;
            }
    
            .container4 input {
                padding: 2px;
                border: none;
                box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
            }
    
            .container4a h4 {
                margin: 25px 5px;
                text-align: center;
                color: rgb(119, 18, 119);
            }
    
            .container4a span {
                color: orange;
            }
    
            thead tr {
                background-color: rgb(119, 18, 119);
                color: white;
            }
    
            tbody tr {
                background-color: orange;
                color: white;
            }
    
            .container5 {
                margin: 10px 5px;
                display: flex;
                flex-direction: row;
            }
    
            .container5 h3 {
                color: rgb(119, 18, 119);
                font-weight: bold;
            }
    
            .container5a {
                display: flex;
                flex-direction: row;
                justify-content: space-between;
            }
    
            .container5a h5 {
                color: orange;
            }
    
            .container5a h6 {
                color: green;
            }
    
            .container6 {
                display: flex;
                flex-direction: row;
                justify-content: flex-end;
            }
    
            .container6 p {
                margin: 5px 25px;
            }
    
            .lastContainer p {
                font-size: 20px;
                font-weight: bold;
            }
    
            .lastContainer span {
                font-weight: normal;
            }
    
            @media screen and (max-width: 550px) {
                .container2,
                .container6 {
                    display: flex;
                    flex-direction: column;
                }
            }
        </style>
    </head>
    
    <body>
    
        <div class="container" style="margin-top: 20px;">
            <h1 class="logo">espe<span class="logo">r</span>anza</h1>
            <h3 class="heading2">Customer Details</h3>
        </div>
    
        <div class="container">
            <div class="row">
                <div class="col-sm-12 container2">
                    <input type="text" placeholder="Name" style="padding: 5px; border: none; box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;">
                    <input type="text" placeholder="Contact No" style="padding: 5px; border: none; box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;">
                </div>
            </div>
        </div>
    
        <div class="container">
            <div class="row">
                <div class="col-sm-12 container3">
                    <p style="color: orange; margin: 10px 5px; font-weight: bold; text-align: center;">Date:&nbsp; 2023-08-03</p>
                    <p style="color: orange; margin: 10px 5px; font-weight: bold; text-align: center;">Time:&nbsp; 21:51</p>
                </div>
            </div>
        </div>
    
        <div class="container">
            <div class="row">
                <div class="col-sm-3 container4">
                    <p style="font-size: 15px; font-weight: bold; color: orange; margin-top: 5px;">Cashier:</p>
                    <input type="text" placeholder="Cashier Name" style="padding: 2px; border: none; box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;">
                </div>
            </div>
        </div>
    
        <div class="container container4a">
            <h4 style="margin: 25px 5px; text-align: center; color: rgb(119, 18, 119);">Bill No: <span style="color: orange;">01</span> </h4>
        </div>
    
        <div class="container">
            <div class="row">
                <div class="col-sm-12">
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">No.</th>
                                <th scope="col">Quantity</th>
                                <th scope="col">Product Name</th>
                                <th scope="col">Price</th>
                                <th scope="col">Total Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            <!-- Your table rows here -->
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    
        <div class="container">
            <div class="row container5">
                <div class="col-sm-3" style="border: 2px solid black;">
                    <h3 style="color: rgb(119, 18, 119); font-weight: bold;">Thank You for Visiting Us!</h3>
                </div>
                <div class="col-sm-9 container5a" style="border: 2px solid black;">
                    <div>
                        <h5 style="color: orange;">Grand Total:</h5>
                        <br>
                        <h5 style="color: orange;">Payment:CASH</h5>
                        <br>
                        <h5 style="color: orange;">Change:</h5>
                    </div>
                    <div>
                        <h6 style="color: green;">2065</h6>
                        <br>
                        <h6 style="color: green;">2100</h6>
                        <br>
                        <h6 style="color: red;">35</h6>
                    </div>
                </div>
            </div>
        </div>
    
        <div class="container">
            <h6 style="color: orange;">Status: <b style="color: green;">PAID</b></h6>
        </div>
    
        <div class="container">
            <div class="row">
                <div class="col-sm-12 container6 ">
                    <p style="text-align: right; margin: 5px 25px;"> Print </p>
                    <p style="text-align: right; margin: 5px 25px;"> Share </p>
                    <p style="text-align: right; margin: 5px 25px;"> Save as PDF </p>
                </div>
            </div>
        </div>
    
        <hr style="width:100%;border-width:0;color:rgb(7, 7, 7);background-color:rgb(7, 7, 7)">
    
        <div class="container my-5">
            <div class="row">
                <div class="col-sm-12 lastContainer">
                    <p><b>Contact:</b><span> 03315045467, 03335253608</span></p>
                    <p><b>Location:</b><span> Shop No 32, Makkah Cloth Market. Raja Bazar Rwp</span></p>
                    <p style="text-align: center;">**Friday is OFF**No ReturnChange within 7 Days**</p>
                </div>
            </div>
        </div>
    
    </body>
    
    </html>
    `;

export { PdfCode };
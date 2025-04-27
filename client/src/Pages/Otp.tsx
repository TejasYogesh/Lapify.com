import React from 'react';
import { useState } from 'react';
import axios from 'axios'
import PaymentSuccess from './PaymentSuccess';
export default function Otp() {
    const [phone, setPhone] = useState("");
    const [userOtp, setUserOtp] = useState("");
    const [verified, setVerified] = useState(false);


    const sendOtp = async () => {
        try {
            await axios.post('http://localhost:5000/send-otp', { phone })
            alert("OTP sent!")
        }
        catch (err) {
            // console.log(error.message);
            alert('failed to send OTP, please try again')
        }
    };

    const verifyOtp = async () => {
        try {
            const response = await axios.post('http://localhost:5000/verify-otp', {
                phone,
                otp: userOtp
            });
            if (response.data.verified) {
                setVerified(true)
                alert("OTP verified")
            }
            else {
                alert("Invalid OTP")
            }
        }
        catch (err) {
            console.log(err.message)
        }


    }

    const checkoutHandler = async () => {
        try {
            // Get Razorpay key
            const { data: { key } } = await axios.get("http://localhost:5000/api/getkey");

            // Create Razorpay order
            const { data: { order } } = await axios.post("http://localhost:5000/checkout", {
                amount: 5, // Use the product's amount
                currency: "INR",
            });

            // Razorpay options
            const options = {
                key: key, // Razorpay Key ID
                amount: order.amount, // Amount in currency subunits
                currency: order.currency,
                name: "Lapify.com",
                description: "Test Transaction",
                image: "Picture1.png",
                order_id: order.id, // Order ID from Razorpay
                callback_url: "http://localhost:5000/paymentVerification",
                prefill: {
                    name: "Tejas",
                    email: "yogeshtejaslalitha@gmail.com",
                    contact: "1234567890",
                },
                notes: {
                    address: "Lapify Headquarters",
                },
                theme: {
                    color: "#3399cc",
                },
            };

            const razorpay = new window.Razorpay(options);
            razorpay.open();
        } catch (error) {
            console.error("Error during checkout:", error);
        }
    };


    return (
        <div>

            {
                !verified ? (
                    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
                        <p className='text-3xl m-4'>OTP verification | Lapify.com | Testing</p>
                        <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">

                            <input
                                type="text"
                                placeholder="+91XXXXXXXXXX"
                                value={phone}
                                onChange={e => setPhone(e.target.value)}
                                className="w-full px-4 py-2 mb-4 text-gray-700 border border-gray-300 rounded-lg focus:ring focus:ring-blue-500 focus:outline-none"
                            />
                            <button
                                onClick={sendOtp}
                                className="w-full px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none"
                            >
                                Request OTP
                            </button>
                            <br />
                            <br />
                            <input
                                type="text"
                                placeholder="Enter OTP 6 digit number"
                                value={userOtp}
                                onChange={e => setUserOtp(e.target.value)}
                                className="w-full px-4 py-2 mb-4 text-gray-700 border border-gray-300 rounded-lg focus:ring focus:ring-blue-500 focus:outline-none"
                            />
                            <button
                                onClick={verifyOtp}
                                className="w-full px-4 py-2 text-white bg-green-500 rounded-lg hover:bg-green-600 focus:outline-none"
                            >
                                Verify OTP
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className='text-white p-10'>
                        <h2>Online Payment through Razorpay</h2>
                        <br />

                        <button
                            className="bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
                            onClick={checkoutHandler}
                        >
                            Proceed to Payment
                        </button>

                    </div>
                )
            }
        </div>
    )
}

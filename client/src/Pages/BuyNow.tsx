import React from 'react';
import { useParams } from 'react-router-dom';
import products from '../data/product';
import axios from 'axios';

const BuyNow: React.FC = () => {
    const { id } = useParams<{ id: string }>(); // Get the product ID from the URL
    const product = products.find((p) => p.id === parseInt(id || '', 10)); // Find the product by ID

    if (!product) {
        return <div className="text-white text-center mt-10">Product not found!</div>;
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
        <div className="bg-black text-white min-h-screen p-10">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold mb-4">{product.title}</h1>
                <img src={product.image} alt="" />
                <ul className="mb-4">
                    {product.description.map((desc, index) => (
                        <li key={index} className="text-lg">
                            - {desc}
                        </li>
                    ))}
                </ul>
                <p className="text-lg mb-4">Price: ₹{product.amount}</p>
                <button
                    className="bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
                    onClick={checkoutHandler}
                >
                    Proceed to Payment
                </button>
            </div>
        </div>
    );
};

export default BuyNow;
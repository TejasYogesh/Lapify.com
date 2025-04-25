import React, { useState } from 'react';
import products from '../data/product';
import '../App.css';
import { motion } from 'framer-motion';

const Chatbot = () => {
    const [messages, setMessages] = useState<{ sender: string; text: string; product?: any }[]>([]);
    const [userInput, setUserInput] = useState('');

    const getGreeting = () => {
        const currentHour = new Date().getHours();
        if (currentHour < 12) {
            return 'Good Morning!';
        } else if (currentHour < 18) {
            return 'Good Afternoon!';
        } else {
            return 'Good Evening!';
        }
    };

    const handleSendMessage = () => {
        const userMessage = { sender: 'User', text: userInput };
        setMessages((prev) => [...prev, userMessage]);

        // Generate chatbot response
        const product = products.find((item) =>
            userInput.toLowerCase().includes(item.title.toLowerCase())
        );

        const botMessage = product
            ? {
                sender: 'Bot',
                text: `Here are the details for ${product.title}:`,
                product: product,
            }
            : {
                sender: 'Bot',
                text: "Sorry, I don't recognize that product.",
            };

        setMessages((prev) => [...prev, botMessage]);
        setUserInput('');
    };

    return (
        <div style={styles.container}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div className='flex flex-row'>
                    <img src="Picture1.png" alt="" style={{ height: '40px', width: '40px', margin: '10px', borderRadius: '5px' }} />
                    <h1 className='text-3xl my-auto font-bold'>Lapify.com | Testing Phase.</h1>
                </div>
                <button
                    onClick={() => (window.location.href = '/')}
                    style={{
                        margin: '10px',
                        padding: '10px 20px',
                        backgroundColor: '#007bff',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        fontFamily: 'Space Mono',
                        fontSize: '16px',
                    }}
                >
                    Home
                </button>
            </div>
            <div style={styles.chatWindow as React.CSSProperties}>
                {messages.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: -40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                        style={{
                            textAlign: 'center',
                            color: 'gray',
                            marginTop: '120px',
                            fontSize: '50px',
                            fontStyle: 'inherit',
                        }}
                    >
                        {getGreeting()} <br />
                        <motion.div
                            initial={{ opacity: 0, y: -40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, delay: 0.2 }}
                            style={{
                                textAlign: 'center',
                                color: 'gray',
                                fontSize: '50px',
                                fontStyle: 'inherit',
                            }}
                        >
                            Welcome! Ask me about our products.
                        </motion.div>
                    </motion.div>
                )}
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        style={{
                            ...styles.message,
                            alignSelf: msg.sender === 'User' ? 'flex-end' : 'flex-start',
                            backgroundColor: msg.sender === 'User' ? 'maroon' : 'goldenrod',
                        }}
                    >
                        <strong>{msg.sender}:</strong> {msg.text}
                        {msg.product && (
                            <div style={styles.productDetails}>
                                <img
                                    src={msg.product.image}
                                    alt={msg.product.title}
                                    style={styles.productImage}
                                />
                                <div>
                                    <h4>{msg.product.title}</h4>
                                    <ul>
                                        {msg.product.description.map((desc: string, i: number) => (
                                            <li key={i}>{desc}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
            <div style={styles.inputContainer}>
                <input
                    type="text"
                    placeholder="Ask about a product..."
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    style={styles.input}
                />
                <button onClick={handleSendMessage} style={styles.button}>
                    Send
                </button>
            </div>
        </div>
    );
};

const styles = {
    container: {
        width: '100%',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        border: 'none',
        fontFamily: 'Space Mono',
        backgroundColor: '#1e1e1e',
        color: 'white',
        borderRadius: '30px',
    },
    header: {
        backgroundColor: 'gray',
        color: 'black',
        textAlign: 'center',
        padding: '10px',
        margin: 0,
        fontFamily: 'Space Mono',
        fontSize: '30px',
        fontWeight: 'bold',
        borderBottom: '1px solid #555',
    },
    chatWindow: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        padding: '10px',
        overflowY: 'scroll',
        backgroundColor: 'black',
        fontFamily: 'Space Mono',
        fontSize: '20px',
        fontWeight: 'bold',
        borderBottom: '1px solid #555',
    },
    message: {
        padding: '10px',
        borderRadius: '10px',
        maxWidth: '70%',
        wordWrap: 'break-word',
        animation: 'fadeIn 0.5s ease-in-out',
    },
    productDetails: {
        marginTop: '10px',
        display: 'flex',
        gap: '10px',
        backgroundColor: '#333',
        padding: '10px',
        borderRadius: '10px',
    },
    productImage: {
        width: '50px',
        height: '50px',
        objectFit: 'cover',
        borderRadius: '5px',
    },
    inputContainer: {
        display: 'flex',
        borderTop: '1px solid #444',
        borderRadius: '10px',
        padding: '10px',
        backgroundColor: '#2c2c2c',
    },
    input: {
        flex: 1,
        padding: '10px',
        border: '1px solid #555',
        borderRadius: '35px',
        marginRight: '10px',
        backgroundColor: 'black',
        color: 'white',
    },
    button: {
        padding: '10px 20px',
        backgroundColor: '#007bff',
        color: 'black',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },
};

export default Chatbot;
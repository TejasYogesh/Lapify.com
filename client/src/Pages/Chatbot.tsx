import React, { useState } from 'react';
import products from '../data/product';
// import { useEffect } from 'react';
// import { useState } from 'react';
import '../App.css'
const Chatbot = () => {
    const [messages, setMessages] = useState<{ sender: string; text: string }[]>([]);
    const [userInput, setUserInput] = useState('');

    const handleSendMessage = () => {
        const userMessage = { sender: 'User', text: userInput };
        setMessages((prev) => [...prev, userMessage]);

        // Generate chatbot response
        const product = products.find((item) =>
            userInput.toLowerCase().includes(item.name.toLowerCase())
        );

        const botMessage = {
            sender: 'Bot',
            text: product
                ? product.description + ' | Price: ' + product.price
                : "Sorry, I don't recognize that product.",
        };

        setMessages((prev) => [...prev, botMessage]);
        setUserInput('');
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.header}>Ask AI | About our products</h2>
            <div style={styles.chatWindow as React.CSSProperties}>
                {messages.length === 0 && (
                    <div style={{ textAlign: 'center', color: 'gray', marginTop: '20px', fontSize: '50px', fontStyle: 'inherit' }}>
                        Welcome! Ask me about our products.
                    </div>
                )}
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        style={{
                            ...styles.message,
                            alignSelf: msg.sender === 'User' ? 'flex-end' : 'flex-start',
                            backgroundColor: msg.sender === 'User' ? 'skyblue' : 'goldenrod',
                        }}
                    >
                        <strong>{msg.sender}:</strong> {msg.text}
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
        // width: '80%',
        width: '100%',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        border: 'none',
        fontFamily: 'Space Mono',
        backgroundColor: '#1e1e1e',
        color: 'white',
        borderRadius:'30px',
    },
    header: {
        backgroundColor: '#444',
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
        fontSize: '30px',
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
    inputContainer: {
        display: 'flex',
        borderTop: '1px solid #444',
        padding: '10px',
        backgroundColor: '#2c2c2c',
    },
    input: {
        flex: 1,
        padding: '10px',
        border: '1px solid #555',
        borderRadius: '5px',
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

// Add keyframes for fade-in animation
const styleSheet = document.styleSheets[0];
styleSheet.insertRule(`
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`, styleSheet.cssRules.length);

export default Chatbot;
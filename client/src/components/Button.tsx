import React from 'react';
import '../App.css'
interface ButtonProps {
    text: string;
    onClick: () => void;
}
//
// Button component
// This component renders a button with a specific style and handles click events.
// It accepts two props: text (the button label) and onClick (the function to call when the button is clicked).
function Button({ text , onClick }) {
    return (
        <div>
            <div className='button  text-sm m-2 p-2 bg-gray-700 text-white rounded-2xl button' onClick={onClick}>
                {text}
            </div>
        </div>
    )
}

export default Button
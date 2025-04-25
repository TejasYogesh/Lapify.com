import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import { googleLogout } from '@react-oauth/google';
export default function Navbar() {
    const navItems = [
        { name: "Home", path: "/" },
        { name: "Laptops", path: "/listof" },
        { name: "Ask AI", path: "/chatbot" },
        { name: "Contact Us", path: "/contact" },
        { name: "Your Orders", path: "/orders" },
        { name: "Stay in Touch", path: "/contact" },
        { name: "Logout", path: "/" },
    ];

    return (
        <div>
            <div className='navbar line flex items-center gap-8 absolute top-0 left-1/2 -translate-x-1/2 mt-4 border-gray-500'>
                {/* Add the logo or icon */}
                <img
                    src="Picture1.png" // Replace with the actual path to your icon
                    alt="Logo"
                    className="h-10 w-10 rounded-md" // Adjust height and width as needed
                />
                {/* Navigation Links */}
                {navItems.map((item) => (
                    item.name === "Logout" ? (
                        <Link
                            key={item.name}
                            to="/login"
                            onClick={() => googleLogout()}
                            className='text-gray-500 font-[400] text-sm hover:text-white'
                        >
                            {item.name}
                        </Link>
                    ) : (
                        <Link
                            key={item.name}
                            to={item.path}
                            className='text-gray-500 font-[500] text-sm hover:text-white'
                        >
                            {item.name}
                        </Link>
                    )
                ))}
            </div>
        </div>
    );
}
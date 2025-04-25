import React from "react";

const Footer: React.FC = () => {
    const logos = [
        "Picture1.png",
        "mongo.jpg",
        "react.png",
        "tailwind.jpg",
        "type.png",
        "framer.png",
        "node.png",
        "vite.svg",
        "shadcn.png",
        "exp.jpg",
        "razorpay.jpg",
        "googleauth.webp"
    ]; // Replace with your actual logo image paths

    return (
        <footer className="bg-black text-white py-2">
            <div className="container mx-auto">
                <p className="text-center m-5 text-gray-400">
                  Technologies that our website is built on
                </p>
                <div className="flex flex-wrap justify-center items-center gap-10">
                    {logos.map((logo, index) => (
                        <div key={index} className="w-10 h-10 hover:scale-135 transition-all duration-300 ease-in-out">
                            <img
                                src={logo}
                                alt={`Logo ${index + 1}`}
                                className="object-contain w-full h-full rounded-md"
                            />
                        </div>
                    ))}
                </div>
                <p className="text-center mt-5 text-gray-400 pb-5">
                    © 2025 Lapify.com |  All rights reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
import React, { useState, useEffect } from 'react';
import { googleLogout } from '@react-oauth/google';
import { Button } from '@/components/ui/button';
import { Skeleton } from "@/components/ui/skeleton";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import products from '../data/product';
import Footer from "@/components/ui/Footer";
import { motion } from "framer-motion";

const Home: React.FC = () => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simulate a 3-second loading state
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 3000);

        return () => clearTimeout(timer); // Cleanup the timer
    }, []);

    return (
        <div>
            <div className='m-10'>
                <h1>Welcome to the Home Page</h1>
                <p>This is the starting point of your application.</p>
                <br />
                <Button onClick={() => {
                    googleLogout();
                    console.log('User logged out');
                    window.location.href = '/login'; // Redirect to login page
                }}>
                    Logout
                </Button>
            </div>

            <div className='bg-black text-white h-[100vh]'>
                <div className='py-4'>
                    <p className='text-6xl font-bold items-left ml-5 mt-10'>
                        Pricing
                    </p>
                    <p className='text-3xl font-bold items-left ml-5 my-5'>
                        Ranging from 30000INR to 100000INR
                    </p>
                </div>

                {isLoading ? (
                    // Show Skeleton during loading
                    <div className="lg:grid grid-cols-4 m-5">
                        {Array(4).fill(0).map((_, index) => (
                            <div key={index} className="flex flex-col space-y-3">
                                <Skeleton className="h-[250px] w-[320px] rounded-sm" />
                                <div className="space-y-2">
                                    <Skeleton className="h-4 w-[320px]" />
                                    <Skeleton className="h-4 w-[320px]" />
                                    <Skeleton className="h-4 w-[250px]" />
                                    <Skeleton className="h-4 w-[200px]" />
                                    <Skeleton className="h-10 w-[80px]" />
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    // Show actual content after loading
                    <div className="lg:grid grid-cols-4 m-5 gap-2">
                        {products.map((product, index) => (
                            <motion.div
                                key={product.id}
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                    delay: index * 0.2,
                                    duration: 0.5,
                                    ease: "easeInOut",
                                }}
                            >
                                <Card
                                    className="w-[85%] h-full hover:transform hover:scale-105 transition-all duration-200 ease-in-out"
                                >
                                    <div>
                                        <img src={product.image} alt={product.title} className='object-cover w-full h-48 p-8 hover:p-4 hover:scale-110 transition-all duration-400 ease-in-out' />
                                    </div>
                                    <CardHeader>
                                        <CardTitle>{product.title}</CardTitle>
                                        {product.description.map((desc, index) => (
                                            <CardDescription key={index}>{desc}</CardDescription>
                                        ))}
                                    </CardHeader>
                                    <CardContent>
                                        <Button>Buy Now</Button>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>

            <Footer />
        </div>
    );
};

export default Home;
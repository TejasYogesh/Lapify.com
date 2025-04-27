import React from 'react'
import { Link } from 'react-router-dom'
import Button from '@/components/Button'
export default function Summary() {
    const text1: string = "Proceed towards payment"
    return (
        <div className='text-white p-10'>
            <p className='flex text-4xl font-semibold'>
                <img src="Picture1.png" alt="" className='h-10 w-10 mr-4 rounded-md' />
                <p> Lapify.com</p>
            </p>
            <p>
                <p> Are you sure for the payment and it's verification for future steps agreeing </p>
                <Link to="/terms">
                    <span className='text-green-500'>
                        terms and conditions*
                    </span>
                </Link>
            </p>
            <div className='bg-gray-400 h-[40vh] my-4 rounded-2xl'>

            </div>

            <Link to="/otp">
                <div className='my-10 bg-amber-400 text-black p-4 rounded-2xl'>
                    Proceed to Payment
                </div>
            </Link>


        </div>
    )
}

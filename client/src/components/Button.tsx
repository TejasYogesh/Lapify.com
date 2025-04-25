import React from 'react'

function Button({ text }) {
    return (
        <div>
            <div className='text-sm m-2 p-2 bg-gray-700 text-white rounded-2xl'>
                {text}
            </div>
        </div>
    )
}

export default Button
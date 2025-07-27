import React from 'react'

const Footer = () => {
    return (
        <div className='flex flex-col justify-center items-center bg-slate-700 text-white w-full bottom-0'>
            <div className="logo font-bold text-2xl ">
                <span className=' text-green-500'>&lt;</span>
                <span>Pass</span>
                <span className=' text-green-500'>Op/&gt;</span>
            </div>
            <div className='flex justify-center items-center'>
                Created with <img className='w-6 mx-2' src="heart.png" alt="" /> by Sayan
            </div>
        </div>
    )
}

export default Footer

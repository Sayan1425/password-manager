import React from 'react'

const Navbar = () => {
  return (
    <nav className='text-white bg-slate-700'>
        <div className="mycontainer flex justify-between items-center px-4 py-5 h-14">
        <div className="logo font-bold text-2xl">
           <span className=' text-green-500'>&lt;</span>
            <span>Pass</span>
            <span className=' text-green-500'>Op/&gt;</span>
            </div>
      <ul>
        <li className='flex gap-4'>
           <a className='hover:font-bold' href="/">Home</a>
           <a className='hover:font-bold' href="#">About</a>
           <a className='hover:font-bold' href="#">Contact</a>
        </li>
      </ul>
      <button className='flex justify-between items-center text-white bg-slate-800 my-5 rounded-md ring-white ring-1'>
        <img className='invert w-10 p-2' src="/github.svg" alt="github"/>
        <span className='font-bold px-2'>GitHub</span>
      </button>
      </div>
    </nav>
  )
}

export default Navbar

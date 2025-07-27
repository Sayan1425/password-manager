import React from 'react'

const Navbar = () => {
  return (
    <nav className='text-white bg-slate-700'>
      <div className="mycontainer flex justify-between items-center px-4 py-5 h-14">
        <div className="logo font-bold text-2xl">
          <span className='text-green-500'>&lt;</span>
          <span>Pass</span>
          <span className='text-green-500'>Op/&gt;</span>
        </div>

        <ul>
          <li className='flex gap-4'>
            <a className='hover:font-bold hover:text-green-400 transition' href="/">Home</a>
            <a className='hover:font-bold hover:text-green-400 transition' href="#">About</a>
            <a className='hover:font-bold hover:text-green-400 transition' href="#">Contact</a>
          </li>
        </ul>

        <a
          href="https://github.com/Sayan1425"
          target="_blank"
          rel="noopener noreferrer"
          className="flex justify-between items-center text-white bg-slate-800 my-0 rounded-md ring-white ring-1 px-4 py-2"
        >
          <img className="invert w-6 h-6 mr-2" src="/github.svg" alt="github" />
          <span className="font-bold">GitHub</span>
        </a>
      </div>
    </nav>
  )
}

export default Navbar
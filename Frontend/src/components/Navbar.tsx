import React from 'react'
import { Link } from 'react-router-dom'

import { Rss } from 'lucide-react'

const Navbar = () => {
  return (
    <div className='fixed inset-0 w-full p-4 px-6 h-fit  text-white'>
      <div className='flex gap-2 items-center' >
        <Rss />
        <Link className='text-3xl text-white font-sans font-thin' to='/'>Networkify</Link>
      </div>
    </div>
  )
}

export default Navbar
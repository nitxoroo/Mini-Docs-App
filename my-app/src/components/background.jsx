import React from 'react'

const background = () => {
  return (
    <>
    <div className='fixed z-[2] w-full h-screen bg-zinc-800'>
        <div className="navbar absolute top-4 w-full py-[8px] flex items-center justify-center font-bold text-zinc-700  "> Documents</div>
      <h1 className=' absolute top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%]  text-[15vw] leading-none tracking-tight font-semibold text-zinc-900'>Docs.</h1>
    </div>
     
    </>
  )
}

export default background

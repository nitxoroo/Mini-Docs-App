import React, { useRef } from 'react'
import Card from './card'
const forground = () => {
  const data=[{
    desc:"This is the data inside the card you are seeing",
    filesize:"0.8mb",
    close:false,
    tag:{isOpen:true,tagTitle:"Download Now" , tagColor:"blue"},
  },
{
    desc:"This is the data inside the card you are seeing",
    filesize:"0.8mb",
    close:false,
    tag:{isOpen:true,tagTitle:"Download Now" , tagColor:"green"},
  },
{
    desc:"This is the data inside the card you are seeing",
    filesize:"0.8mb",
    close:false,
    tag:{isOpen:true,tagTitle:"Download Now" , tagColor:"green"},
  },
]

  const ref=useRef(null)
  return (
    <div ref={ref} className='fixed top-0 left-0 z-[3] w-full h-full flex gap-5 flex-wrap'>
        
    {
      data.map((item,index)=>(
        <Card data={item} ref={ref}/>
      ))
    }
    

    </div>
  )
}

export default forground

import React from 'react'
import { FaRegFileAlt } from 'react-icons/fa'
import { LuDownload } from 'react-icons/lu'
import { IoIosClose } from 'react-icons/io'
import { motion } from 'framer-motion'

const Card = ({ data, ref }) => {
  return (
    <motion.div
      drag
      dragConstraints={ref}
      whileDrag={{ scale: 1.2 }}
      className="flex-shrink-0 relative w-60 h-75 rounded-[40px] bg-zinc-900/90 text-center text-white p-5 overflow-hidden"
    >
      <FaRegFileAlt size={40} />
      <p className="mt-2 text-sm font-semibold text-left truncate">{data.desc}</p>
      <div className="footer absolute w-full bottom-0 left-0">
        <div className="flex items-center justify-between py-3 px-6">
          <h5>{data.filesize}</h5>
          <a
            href={`http://localhost:5000/download/${data.filename}`}
            className="w-7 h-7 rounded-full bg-zinc-700 flex items-center justify-center hover:bg-zinc-600"
            title="Download file"
          >
            <LuDownload size={14} />
          </a>
        </div>
        {data.tag.isOpen && (
          <div
            className={`w-full ${data.tag.tagColor === 'blue' ? 'bg-blue-600' : 'bg-green-600'
              } text-sm text-center py-2`}
          >
            {data.tag.tagTitle}
          </div>
        )}
      </div>
    </motion.div>
  )
}

export default Card

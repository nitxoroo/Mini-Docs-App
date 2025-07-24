import React, { useRef, useState } from 'react'
import Card from './card'
import FileUploader from './uploadfile'

const Forground = () => {
  const ref = useRef(null)
  const [uploadedFiles, setUploadedFiles] = useState([])

  // Called when a file is successfully uploaded
  const handleUploadSuccess = (fileData) => {
    // fileData should have: name, size, url, etc
    setUploadedFiles(prev => [...prev, fileData])
  }

  return (
    <div
      ref={ref}
      className="fixed top-0 left-0 z-[3] w-full h-full flex gap-5 flex-wrap"
    >
      <FileUploader onUploadSuccess={handleUploadSuccess} />

      {uploadedFiles.map((file, index) => (
       
        <Card
          key={index}
          data={{
            desc: file.name,
            filesize: (file.size / (1024 * 1024)).toFixed(2) + ' MB',
            filename: file.filename,
            close: false,
            tag: { isOpen: true, tagTitle: 'Download Now', tagColor: 'blue' },
            url: file.url,
          }}
          ref={ref}
        />
         
      ))}
    </div>
  )
}

export default Forground

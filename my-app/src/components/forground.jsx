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
  function formatFileSize(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
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
            filesize: formatFileSize(file.size),
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

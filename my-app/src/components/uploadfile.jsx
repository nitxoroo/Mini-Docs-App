import React, { useRef, useState } from 'react';

const FileUploader = ({ onUploadSuccess }) => {
    const fileInputRef = useRef(null);
    const [uploading, setUploading] = useState(false);

    const handleDivClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.value = null;
            fileInputRef.current.click();
        }
    };

    const handleFileChange = async (e) => {
        const selectedFile = e.target.files[0];
        if (!selectedFile) return;

        setUploading(true);

        const formData = new FormData();
        formData.append('file', selectedFile);

        try {
            const res = await fetch('https://mini-docs-app-ob8j.vercel.app/upload', {
                method: 'POST',
                body: formData,
            });

            const data = await res.json();

            alert(data.message);

            if (onUploadSuccess) {
                onUploadSuccess({
                    name: data.file.originalname,    // Original name, e.g. Questions.txt
                    filename: data.file.filename,    // Add this! Saved filename, e.g. 1753343752256-Questions.txt
                    size: data.file.size,
                    url: data.url,
                });

                console.log('Saved as:', data.file.filename);
            }
        } catch (err) {
            console.error('Upload error:', err);
            alert('Upload failed.');
        } finally {
            setUploading(false);
        }
    };

    return (
        <>
            <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                onChange={handleFileChange}
            />
            <div
                onClick={handleDivClick}
                className={`relative w-[200px] h-[100px] m-5 top-15 right-[-650px] py-[8px] font-bold text-zinc-700 text-2xl bg-zinc-900 flex flex-col justify-center items-center gap-0.5 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer hover:bg-zinc-800 ${uploading ? 'opacity-60 cursor-wait' : ''
                    }`}
            >
                <svg
                    className="w-[50px] h-[50px]"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M16 12l-4-4m0 0l-4 4m4-4v12"
                    />
                </svg>
                {uploading ? 'Uploading...' : 'Upload File'}
            </div>
        </>
    );
};

export default FileUploader;

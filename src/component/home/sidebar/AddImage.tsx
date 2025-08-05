import { Button } from '@/components/ui/button';
import React, { useRef } from 'react';
import ima1 from "../../../../public/f2.png"
import Image from 'next/image';

interface AddImageProps {
    onImageAdd: (file: File) => void;
}

const AddImage: React.FC<AddImageProps> = ({ onImageAdd }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            onImageAdd(file);
        }
    };

    const handleButtonClick = () => {
        fileInputRef.current?.click();
    };

    return (
        <div className="w-full">
            <label
                htmlFor="image-upload"
                className="block border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer mb-3 bg-gray-50 h-[180px]"
                onClick={handleButtonClick}
            >
                <span className="flex items-center justify-center h-full w-full text-lg text-gray-400">
                    Click or drag image here to upload
                </span>
            </label>
            <input
            id="image-upload"
            type="file"
            accept="image/*"
            ref={fileInputRef}
            style={{ display: 'none' }}
            onChange={handleFileChange}
            />
            <div className='flex gap-2 mt-4 items-center mb-6'>
                <Image
                    src={ima1}
                    alt="Preview"
                    className="cursor-pointer w-24 h-24 object-cover rounded mb-2"
                />
                <Image
                    src={ima1}
                    alt="Preview"
                    className=" cursor-pointer w-24 h-24 object-cover rounded mb-2"
                />
                <Image
                    src={ima1}
                    alt="Preview"
                    className="cursor-pointer w-24 h-24 object-cover rounded mb-2"
                />
                <Image
                    src={ima1}
                    alt="Preview"
                    className=" cursor-pointer w-24 h-24 object-cover rounded mb-2"
                />
            </div>
            
           <Button
  onClick={handleButtonClick}
  className="w-full h-[48px] rounded-[4px] bg-white text-black border border-gray-400 hover:bg-black hover:text-white cursor-pointer"
>
  <span className="text-[16px]">Add Text</span>
</Button>
        
        </div>
    );
};

export default AddImage;
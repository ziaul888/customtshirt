import { Button } from '@/components/ui/button';
import React, { useRef } from 'react';

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
        <div>
            <label
                htmlFor="image-upload"
                className="block border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer mb-3 bg-gray-50"
                onClick={handleButtonClick}
            >
                <span className="text-lg text-gray-400">
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
            <Button type="button" onClick={handleButtonClick} style={{ marginTop: '8px' }}>
            Add Image
            </Button>
        </div>
    );
};

export default AddImage;
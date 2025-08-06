import { Button } from '@/components/ui/button';
import React, { useRef, useState } from 'react';
import ima1 from "../../../../public/f2.png"
import Image from 'next/image';
import { useDesignStore } from '@/stores';

const AddImage: React.FC = () => {
    const { addImage } = useDesignStore();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setSelectedFile(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleButtonClick = () => {
        fileInputRef.current?.click();
    };

    const handleAddImage = () => {
        if (selectedFile) {
            addImage(selectedFile);
            setSelectedFile(null);
            setPreviewUrl(null);
        }
    };

    return (
        <div className="w-full">
            <label
                htmlFor="image-upload"
                className="block border-2 border-dashed border-border rounded-lg p-8 text-center cursor-pointer mb-3 bg-muted h-[180px]"
                onClick={handleButtonClick}
            >
                <span className="flex items-center justify-center h-full w-full text-lg text-muted-foreground">
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
            {previewUrl && (
                <div className="flex flex-col items-center mb-4">
                    <img
                        src={previewUrl}
                        alt="Selected preview"
                        className="w-32 h-32 object-cover rounded mb-2"
                    />
                    <span className="text-sm text-muted-foreground">{selectedFile?.name}</span>
                </div>
            )}
            <Button
                onClick={handleAddImage}
                variant="outline"
                className="w-full h-[48px] rounded-[4px] cursor-pointer"
                disabled={!selectedFile}
            >
                <span className="text-[16px]">Add Image</span>
            </Button>
        </div>
    );
};

export default AddImage;
import React from 'react';
import { Button } from "@/components/ui/button"
import { RemoveFormatting } from 'lucide-react';
// 1. Define the props interface
interface SidebarProps {
    selectedDesign: string;
    handleDesignSelect: (design: string) => void;
}

// 2. Use the interface in the component
const Sidebar: React.FC<SidebarProps> = ({ selectedDesign, handleDesignSelect }) => {
    return (
        <div className="w-32 bg-white shadow-md p-4 p-4 border border-gray-200 rounded flex flex-col">
            
            <div className="space-y-3 overflow-y-auto flex flex-1 flex-col gap-2">
                <Button
                    className="text-xs cursor-pointer flex items-center gap-1 flex-col p-5 rounded"
                    variant="default"
                    onClick={() => handleDesignSelect('text')}
                >
                 <   RemoveFormatting/>
                    Add Text
                </Button>
                <Button
                    className="text-xs cursor-pointer"
                    variant="default"
                    onClick={() => handleDesignSelect('element')}
                >
                    Add Element
                </Button>
                <Button
                    className="text-xs cursor-pointer"
                    variant="default"
                    onClick={() => handleDesignSelect('image')}
                >
                    Add Image
                </Button>
            </div>
        </div>
    );
};

export default Sidebar;

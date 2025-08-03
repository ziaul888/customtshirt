import React from 'react';
import { Button } from "@/components/ui/button"
import { RemoveFormatting } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
// 1. Define the props interface
interface SidebarProps {
    selectedDesign: string | null;
    handleDesignSelect: (design: string) => void;
}

// 2. Use the interface in the component
const Sidebar: React.FC<SidebarProps> = ({ selectedDesign, handleDesignSelect }) => {
    return (
        <div className="w-full p-4 bg-white-100 rounded-md shadow-md">
            <h1 className="text-lg font-semibold mb-4">Design Tools</h1>
            <div className="flex">
                <Tabs className='w-full' value={selectedDesign} onValueChange={handleDesignSelect}>
                    <TabsList className="gap-4">
                        <TabsTrigger value="text" className="text-[16px] cursor-pointer">Text</TabsTrigger>
                        <TabsTrigger value="image" className="text-[16px] cursor-pointer">Image</TabsTrigger>
                        <TabsTrigger value="emoji" className="text-[16px] cursor-pointer">Emoji</TabsTrigger>
                        <TabsTrigger value="shapes" className="text-[16px] cursor-pointer">Emoji</TabsTrigger>
                    </TabsList>
                </Tabs>
            </div>
        </div>
    );
};

export default Sidebar;

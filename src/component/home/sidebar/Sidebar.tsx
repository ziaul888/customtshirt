import React from 'react';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AddText from "@/component/home/sidebar/AddText";
import AddImage from "@/component/home/sidebar/AddImage";
import AddEmoji from "@/component/home/sidebar/AddEmoji";
// 1. Define the props interface
interface SidebarProps {
    selectedDesign: string ;
    handleDesignSelect: (design: string) => void;
}

// 2. Use the interface in the component
const Sidebar: React.FC<SidebarProps> = ({ selectedDesign, handleDesignSelect }) => {
    const toolsComponents: Record<string, React.ReactNode> = {
        text:<AddText/>,
        image:<AddImage/>,
        emoji:<AddEmoji/>,
        shapes: <div className="text-gray-500">Shapes Tool Component</div>,
    };
    return (
        <div className="w-full p-4 bg-white-100 rounded-md shadow-md">
            <h1 className="text-lg font-semibold mb-4">Design Tools</h1>
            <div className="flex">
                <Tabs className='w-full' value={selectedDesign} onValueChange={handleDesignSelect}>
                    <TabsList className="gap-4">
                        <TabsTrigger value="text" className="text-[16px] cursor-pointer">Text</TabsTrigger>
                        <TabsTrigger value="image" className="text-[16px] cursor-pointer">Image</TabsTrigger>
                        <TabsTrigger value="emoji" className="text-[16px] cursor-pointer">Emoji</TabsTrigger>
                        <TabsTrigger value="shapes" className="text-[16px] cursor-pointer">Shapes</TabsTrigger>
                    </TabsList>
                </Tabs>
            </div>
            <div className="mt-4">
                {toolsComponents[selectedDesign] || <div className="text-gray-500">Select a tool to get started</div>}
            </div>
        </div>
    );
};

export default Sidebar;

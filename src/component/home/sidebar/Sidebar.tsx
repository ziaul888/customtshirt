import React from 'react';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AddText from "@/component/home/sidebar/AddText";
import AddImage from "@/component/home/sidebar/AddImage";
import AddEmoji from "@/component/home/sidebar/AddEmoji";
import { useUIStore } from '@/stores';

const Sidebar: React.FC = () => {
    const { selectedDesign, handleDesignSelect } = useUIStore();
    const toolsComponents: Record<string, React.ReactNode> = {
        text:<AddText/>,
        image:<AddImage/>,
        emoji:<AddEmoji/>,
        shapes: <div className="text-muted-foreground">Shapes Tool Component</div>,
    };
    return (
        <div className="w-full h-full p-4 bg-card rounded-md shadow-md border border-border">
            <h1 className="text-lg font-semibold mb-4 text-card-foreground">Design Tools</h1>
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
                {toolsComponents[selectedDesign] || <div className="text-muted-foreground">Select a tool to get started</div>}
            </div>
        </div>
    );
};

export default Sidebar;

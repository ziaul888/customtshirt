'use client'
import Sidebar from "@/component/home/sidebar/Sidebar";
import React from "react";
import AddDesign from "@/component/home/sidebar/AddDesign";

const SelectDesign:React.FC= () => {
    const [selectedDesign, setSelectedDesign] = React.useState<string | null>(null);
     const handleDesignSelect = (design: string) => {
        setSelectedDesign(design);
     }

    return (
        <aside className="bg-white h-full p-4 flex flex-row gap-2">
           <Sidebar selectedDesign={selectedDesign} handleDesignSelect={handleDesignSelect} />
            <AddDesign selectedDesign={selectedDesign}/>
        </aside>
    );
};

export default SelectDesign;
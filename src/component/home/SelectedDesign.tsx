'use client'
import Sidebar from "@/component/home/sidebar/Sidebar";
import React from "react";

const SelectDesign:React.FC= () => {
    const [selectedDesign, setSelectedDesign] = React.useState<string | null>(null);
     const handleDesignSelect = (design: string) => {
        setSelectedDesign(design);
     }

    return (
        <aside className="bg-white h-full p-4 flex flex-row gap-2">
           <Sidebar selectedDesign={selectedDesign} handleDesignSelect={handleDesignSelect} />
            <div
                className="p-4 border border-gray-200 w-full rounded ">
                {selectedDesign}
            </div>
        </aside>
    );
};

export default SelectDesign;
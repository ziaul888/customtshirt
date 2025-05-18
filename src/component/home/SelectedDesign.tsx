'use client'
import Sidebar from "@/component/home/sidebar/Sidebar";
import React from "react";
import AddDesign from "@/component/home/sidebar/AddDesign";

interface SelectDesignProps {
    frontCanvasRef: React.RefObject<HTMLCanvasElement>;
    backCanvasRef: React.RefObject<HTMLCanvasElement>;
    handleColorChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    tshirtColor: string;
    tshirtDivRef: React.RefObject<HTMLDivElement | null>;
    setTshirtColor: React.Dispatch<React.SetStateAction<string>>;
}

const SelectDesign: React.FC<SelectDesignProps> = ({ frontCanvasRef,backCanvasRef }: SelectDesignProps) => {
    const [selectedDesign, setSelectedDesign] = React.useState<string | null>(null);
     const handleDesignSelect = (design: string) => {
        setSelectedDesign(design);
     }

    return (
        <aside className="bg-white h-full p-4 flex flex-row gap-2">
           <Sidebar selectedDesign={selectedDesign} handleDesignSelect={handleDesignSelect} />
            <AddDesign selectedDesign={selectedDesign} frontCanvasRef={frontCanvasRef} backCanvasRef={backCanvasRef}/>
        </aside>
    );
};

export default SelectDesign;
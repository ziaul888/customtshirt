'use client'
import Sidebar from "@/component/home/sidebar/Sidebar";
import React from "react";
import AddDesign from "@/component/home/sidebar/AddDesign";
import * as fabric from 'fabric';

interface SelectDesignProps {
    frontCanvasRef: React.RefObject<HTMLCanvasElement>;
    backCanvasRef: React.RefObject<HTMLCanvasElement>;
    fabricFrontCanvasRef?: React.RefObject<fabric.Canvas>;
    fabricBackCanvasRef?: React.RefObject<fabric.Canvas>;
    currentView: 'front' | 'back';
    handleAddEmoji: (emoji: string) => void;
    handleAddImage: (file: File) => void;
}

const SelectDesign: React.FC<SelectDesignProps> = ({ handleAddImage,handleAddEmoji,frontCanvasRef,backCanvasRef,fabricBackCanvasRef,fabricFrontCanvasRef,currentView }: SelectDesignProps) => {
    const [selectedDesign, setSelectedDesign] = React.useState<string | null>(null);
     const handleDesignSelect = (design: string) => {
        setSelectedDesign(design);
     }

    return (
        <aside className="bg-white h-full p-4 flex flex-row gap-2">
            <Sidebar selectedDesign={selectedDesign || ""} handleDesignSelect={handleDesignSelect} />
            <AddDesign selectedDesign={selectedDesign || ""}
                       frontCanvasRef={frontCanvasRef}
                       backCanvasRef={backCanvasRef}
                       fabricFrontCanvasRef={fabricFrontCanvasRef}
                       fabricBackCanvasRef={fabricBackCanvasRef}
                       currentView={currentView || ""}
                       handleAddEmoji={handleAddEmoji}
                       handleAddImage={handleAddImage}
            />
        </aside>
    );
};

export default SelectDesign;
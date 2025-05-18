import React from 'react';
import SelectDesign from "@/component/home/SelectedDesign";
import PickColor from "@/component/home/PickColor";
import TshirtDesigner from "@/component/editor";


const Index = () => {
    return (
        <div className="flex flex-col md:flex-row h-screen bg-gray-100">
            <div className="w-full md:w-[40%] border-r border-gray-200">
                <SelectDesign/>
            </div>
            <div className="w-full md:w-[30%]">
                <TshirtDesigner/>
            </div>
            <div className="w-full md:w-[30%] border-l border-gray-200">
                <PickColor/>
            </div>
        </div>

    );
};

export default Index;
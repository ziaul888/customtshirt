import React from 'react';
import SelectDesign from "@/component/home/SelectedDesign";
import PickColor from "@/component/home/PickColor";
import TshirtDesigner from "@/component/editor";


const Index = () => {
    return (
        <div className="flex h-screen bg-gray-100">
            <SelectDesign/>
            <TshirtDesigner/>
            <PickColor/>
        </div>

    );
};

export default Index;
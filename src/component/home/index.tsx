import React from 'react';
import SelectDesign from "@/component/home/SelectedDesign";
import Editor from "@/component/editor";
import PickColor from "@/component/home/PickColor";


const Index = () => {
    return (
        <div className="flex h-screen bg-gray-100">
            <SelectDesign/>
            <Editor/>
            <PickColor/>
        </div>

    );
};

export default Index;
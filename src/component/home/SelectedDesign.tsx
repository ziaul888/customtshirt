import React from 'react';
import { RemoveFormatting } from 'lucide-react';

const SelectDesign:React.FC= () => {
    return (
        <aside className="w-[400px] bg-white border-r border-gray-200 p-4 flex flex-col">
            <h2 className="text-xl font-semibold mb-4">Elements</h2>
            <div className="space-y-3 overflow-y-auto flex flex-1 gap-2">
                <div className="w-[70px] bg-gray-100 flex justify-center py-3 ">
                    <RemoveFormatting/>
                </div>
                <div className="flex-1 flex  flex-col ">
                    {/* Map your tools here */}
                    <button className="w-full py-2 px-3 rounded bg-blue-500 text-white hover:bg-blue-600">Add Rect
                    </button>
                    <button className="w-full py-2 px-3 rounded bg-red-500 text-white hover:bg-red-600">Add Circle
                    </button>
                </div>


            </div>
        </aside>
    );
};

export default SelectDesign;
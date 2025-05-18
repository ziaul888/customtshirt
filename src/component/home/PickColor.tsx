import React from 'react';

interface PickColorProps {
    handleColorChange: (color: string) => void;
}

const PickColor: React.FC<PickColorProps> = ({ handleColorChange }) => {
    return (
        <aside className="bg-white h-full p-4 flex-1 flex flex-col border border-gray-200 rounded">
            <h2 className="text-xl font-semibold mb-4">Properties</h2>
            {/* Placeholder for object editing UI */}
            <div className="flex-1 space-y-4 overflow-y-auto">
                <label className="block ">
                    <span className="text-gray-700">Color</span>
                    <input
                        type="color"
                        className="mt-1 block w-[40px] h-10 p-1 border rounded"
                        onChange={e => handleColorChange(e.target.value)}
                    />
                </label>
               
                {/* More dynamic settings */}
            </div>
        </aside>
    );
};

export default PickColor;
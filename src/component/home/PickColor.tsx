import React from 'react';

interface PickColorProps {
    handleColorChange: (color: string) => void;
    sleeveColors?: {
        left: string;
        right: string;
        body: string;
    };
    handleSleeveColorChange?: (part: 'left' | 'right' | 'body', color: string) => void;
}

const PickColor: React.FC<PickColorProps> = ({
                                                 handleColorChange,
                                                 sleeveColors,
                                                 handleSleeveColorChange
                                             }) => {
    const colorOptions = [
        { name: 'White', value: '#ffffff' },
        { name: 'Black', value: '#000000' },
        { name: 'Red', value: '#ff0000' },
        { name: 'Blue', value: '#0000ff' },
        { name: 'Green', value: '#00ff00' },
        { name: 'Yellow', value: '#ffff00' },
        { name: 'Purple', value: '#800080' },
        { name: 'Orange', value: '#ffa500' },
        { name: 'Pink', value: '#ffc0cb' },
        { name: 'Gray', value: '#808080' },
        { name: 'Navy', value: '#000080' },
        { name: 'Maroon', value: '#800000' },
    ];

    return (
        <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">T-Shirt Colors</h3>

            {/* Overall Color Change (Backward Compatibility) */}
            <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Overall Color</label>
                <select
                    onChange={(e) => handleColorChange(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                >
                    {colorOptions.map((color) => (
                        <option key={color.value} value={color.value}>
                            {color.name}
                        </option>
                    ))}
                </select>
            </div>

            {/* Individual Sleeve Color Controls */}
            {sleeveColors && handleSleeveColorChange && (
                <div className="space-y-4">
                    <h4 className="text-md font-medium">Individual Parts</h4>

                    {/* Body Color */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Body Color</label>
                        <div className="flex items-center space-x-2">
                            <input
                                type="color"
                                value={sleeveColors.body}
                                onChange={(e) => handleSleeveColorChange('body', e.target.value)}
                                className="w-8 h-8 border border-gray-300 rounded cursor-pointer"
                            />
                            <select
                                value={sleeveColors.body}
                                onChange={(e) => handleSleeveColorChange('body', e.target.value)}
                                className="flex-1 p-1 border border-gray-300 rounded-md text-sm"
                            >
                                {colorOptions.map((color) => (
                                    <option key={color.value} value={color.value}>
                                        {color.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Left Sleeve Color */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Left Sleeve Color</label>
                        <div className="flex items-center space-x-2">
                            <input
                                type="color"
                                value={sleeveColors.left}
                                onChange={(e) => handleSleeveColorChange('left', e.target.value)}
                                className="w-8 h-8 border border-gray-300 rounded cursor-pointer"
                            />
                            <select
                                value={sleeveColors.left}
                                onChange={(e) => handleSleeveColorChange('left', e.target.value)}
                                className="flex-1 p-1 border border-gray-300 rounded-md text-sm"
                            >
                                {colorOptions.map((color) => (
                                    <option key={color.value} value={color.value}>
                                        {color.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Right Sleeve Color */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Right Sleeve Color</label>
                        <div className="flex items-center space-x-2">
                            <input
                                type="color"
                                value={sleeveColors.right}
                                onChange={(e) => handleSleeveColorChange('right', e.target.value)}
                                className="w-8 h-8 border border-gray-300 rounded cursor-pointer"
                            />
                            <select
                                value={sleeveColors.right}
                                onChange={(e) => handleSleeveColorChange('right', e.target.value)}
                                className="flex-1 p-1 border border-gray-300 rounded-md text-sm"
                            >
                                {colorOptions.map((color) => (
                                    <option key={color.value} value={color.value}>
                                        {color.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="pt-4 border-t">
                        <h5 className="text-sm font-medium mb-2">Quick Actions</h5>
                        <div className="grid grid-cols-2 gap-2">
                            <button
                                onClick={() => {
                                    handleSleeveColorChange('left', sleeveColors.body);
                                    handleSleeveColorChange('right', sleeveColors.body);
                                }}
                                className="px-3 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600"
                            >
                                Match Body
                            </button>
                            <button
                                onClick={() => {
                                    const leftColor = sleeveColors.left;
                                    handleSleeveColorChange('left', sleeveColors.right);
                                    handleSleeveColorChange('right', leftColor);
                                }}
                                className="px-3 py-1 text-xs bg-green-500 text-white rounded hover:bg-green-600"
                            >
                                Swap Sleeves
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Color Palette Grid */}
            <div className="mt-6">
                <h4 className="text-md font-medium mb-2">Quick Colors</h4>
                <div className="grid grid-cols-6 gap-2">
                    {colorOptions.map((color) => (
                        <button
                            key={color.value}
                            onClick={() => handleColorChange(color.value)}
                            className="w-8 h-8 border border-gray-300 rounded-md hover:scale-110 transition-transform"
                            style={{ backgroundColor: color.value }}
                            title={color.name}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PickColor;
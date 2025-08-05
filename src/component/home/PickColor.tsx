import React from 'react';

interface PickColorProps {
    handleColorChange: (color: string) => void;
    sleeveColors?: {
        left: string;
        right: string;
        body: string;
    };
    handleSleeveColorChange?: (part: 'left' | 'right' | 'body', color: string) => void;
    selectedSize?: string;
    handleSizeChange?: (size: string) => void;
}

const PickColor: React.FC<PickColorProps> = ({
                                                 handleColorChange,
                                                 sleeveColors,
                                                 handleSleeveColorChange,
                                                 selectedSize,
                                                 handleSizeChange
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

    const sizeOptions = [
        { name: 'XS', value: 'XS' },
        { name: 'S', value: 'S' },
        { name: 'M', value: 'M' },
        { name: 'L', value: 'L' },
        { name: 'XL', value: 'XL' },
        { name: 'XXL', value: 'XXL' },
    ];
    // Material data for t-shirt options
    const materialOptions = [
        { name: 'Cotton', value: 'cotton' },
        { name: 'Polyester', value: 'polyester' },
        { name: 'Linen', value: 'linen' },
        { name: 'Wool', value: 'wool' },
        { name: 'Silk', value: 'silk' },
        { name: 'Rayon', value: 'rayon' },
        { name: 'Bamboo', value: 'bamboo' },
        { name: 'Blend', value: 'blend' },
    ];

    return (
        <div className="w-full h-full bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">T-Shirt Customization</h3>

           

            {/* Overall Color Change (Backward Compatibility) */}
            <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Overall Color</label>
                <div className="grid grid-cols-6 gap-1">
                    {colorOptions.map((color) => (
                        <button
                            key={color.value}
                            onClick={() => handleColorChange(color.value)}
                            className="w-8 h-8 border cursor-pointer border-gray-300 rounded-full hover:scale-110 transition-transform focus:outline-none focus:ring-2 focus:ring-blue-500"
                            style={{ backgroundColor: color.value }}
                            title={color.name}
                        />
                    ))}
                </div>
            </div>

            {/* Individual Sleeve Color Controls */}
            {sleeveColors && handleSleeveColorChange && (
                <div className="space-y-4">
                    <h4 className="text-md font-medium">Individual Parts</h4>

                    {/* Body Color */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Body Color</label>
                        <div className="flex items-center space-x-2">
                            <div className="flex-1 grid grid-cols-6 gap-1">
                                {colorOptions.map((color) => (
                                    <button
                                        key={color.value}
                                        onClick={() => handleSleeveColorChange('body', color.value)}
                                        className="w-8 h-8 border cursor-pointer border-gray-300 rounded-full hover:scale-110 transition-transform focus:outline-none focus:ring-1 focus:ring-blue-500"
                                        style={{ backgroundColor: color.value }}
                                        title={color.name}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Left Sleeve Color</label>
                        <div className="flex items-center space-x-2">
                            
                            <div className="flex-1 grid grid-cols-6 gap-1">
                                {colorOptions.map((color) => (
                                    <button
                                        key={color.value}
                                        onClick={() => handleSleeveColorChange('left', color.value)}
                                        className="w-8 h-8 border cursor-pointer border-gray-300 rounded-full hover:scale-110 transition-transform focus:outline-none focus:ring-1 focus:ring-blue-500"
                                        style={{ backgroundColor: color.value }}
                                        title={color.name}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Sleeve Color */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Right Sleeve Color</label>
                        <div className="flex items-center space-x-2">
                            <div className="flex-1 grid grid-cols-6 gap-1">
                                {colorOptions.map((color) => (
                                    <button
                                        key={color.value}
                                        onClick={(e) => handleSleeveColorChange('right', color.value)}
                                        className="w-8 h-8 border cursor-pointer border-gray-300 rounded-full hover:scale-110 transition-transform focus:outline-none focus:ring-1 focus:ring-blue-500"
                                        style={{ backgroundColor: color.value }}
                                        title={color.name}
                                    />
                                ))}
                            </div>
                          
                        </div>
                    </div>

                     {/* Size Selection */}
            {/* {selectedSize !== undefined && handleSizeChange && ( */}
                <div className="mb-6">
                    <label className="block text-sm font-medium mb-2">Size</label>
                    <div className="grid grid-cols-6 gap-2">
                        {sizeOptions.map((size) => (
                            <button
                                key={size.value}
                                onClick={() => handleSizeChange(size.value)}
                                className={`px-3 py-2 border-1 rounded-[4px] cursor-pointer font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                    selectedSize === size.value
                                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                                        : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
                                }`}
                            >
                                {size.name}
                            </button>
                        ))}
                    </div>
                </div>
                {/* Material Selection */}
                <div className="mb-6">
                    <label className="block text-sm font-medium mb-2">Material</label>
                    <select
                        className="w-full px-3 py-2 border-1 rounded-[4px] cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
                        //value={selectedMaterial}
                        //onChange={(e) => handleMaterialChange(e.target.value)}
                    >
                        {materialOptions.map((material) => (
                            <option key={material.value} value={material.value}>
                                {material.name}
                            </option>
                        ))}
                    </select>
                </div>
            {/* )} */}
                    {/* Quick Actions */}
                    {/* <div className="pt-4 border-t">
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
                    </div> */}
                </div>
            )} 
            

            {/* Color Palette Grid */}
            {/* <div className="mt-6">
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
            </div> */}
        </div>
    );
};

export default PickColor;
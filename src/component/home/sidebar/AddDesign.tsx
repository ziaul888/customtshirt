import React from 'react';

interface SelectedDesignBoxProps {
    selectedDesign: string;
}

const AddDesign: React.FC<SelectedDesignBoxProps> = ({ selectedDesign }) => {
    return (
        <div className="p-4 border border-gray-200 w-full rounded">
            {selectedDesign}
        </div>
    );
};

export default AddDesign;

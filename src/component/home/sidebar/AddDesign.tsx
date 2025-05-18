import React from 'react';
import AddText from './AddText';

interface SelectedDesignBoxProps {
    selectedDesign: string;
}

const DesignB = () => <div>Design B Component</div>;

const AddDesign: React.FC<SelectedDesignBoxProps> = ({ selectedDesign }) => {
    let content;
    // Provide default value and onChange handler for AddText
    const [textValue, setTextValue] = React.useState('');
    switch (selectedDesign) {
        case 'text':
            content = <AddText value={textValue} onChange={setTextValue} />;
            break;
        case 'element':
            content = <DesignB />;
            break;
        default:
            content = <div>No design selected</div>;
    }

    return (
        <div className="p-4 border border-gray-200 w-full rounded">
            {content}
        </div>
    );
};

export default AddDesign;

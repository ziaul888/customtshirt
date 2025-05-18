import React from 'react';
import AddText from './AddText';

interface SelectedDesignBoxProps {
    selectedDesign: string;
    frontCanvasRef: React.RefObject<HTMLCanvasElement>;
    backCanvasRef: React.RefObject<HTMLCanvasElement>;
    handleColorChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const DesignB = () => <div>Design B Component</div>;

const AddDesign: React.FC<SelectedDesignBoxProps> = ({ selectedDesign ,frontCanvasRef,backCanvasRef}) => {
    let content;
    // Provide default value and onChange handler for AddText
    const [textValue, setTextValue] = React.useState('');

    // Add textValue to the canvas when it changes and 'text' is selected
  
    console.log("textValue", textValue)

    switch (selectedDesign) {
        case 'text':
            content = <AddText value={textValue} onChange={setTextValue}   />;
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

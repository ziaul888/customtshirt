import React from 'react';
import AddText from './AddText';
import * as fabric from 'fabric';
import AddEmoji from './AddEmoji';
import AddImage from './AddImage';
interface SelectedDesignBoxProps {
    selectedDesign: string;
    frontCanvasRef: React.RefObject<HTMLCanvasElement>;
    backCanvasRef: React.RefObject<HTMLCanvasElement>;
    fabricFrontCanvasRef?: React.RefObject<fabric.Canvas>;
    fabricBackCanvasRef?: React.RefObject<fabric.Canvas>;
    currentView: 'front' | 'back';
    handleAddEmoji: (emoji: string) => void;
    handleAddImage: (file: File) => void;


}

const DesignB = () => <div>Design B Component</div>;

const AddDesign: React.FC<SelectedDesignBoxProps> = ({currentView, 
    selectedDesign,
    frontCanvasRef,
    backCanvasRef,
    fabricBackCanvasRef,
    fabricFrontCanvasRef,
                                                         handleAddEmoji,handleAddImage
}) => {
    let content;
    // Provide default value and onChange handler for AddText
    const [textValue, setTextValue] = React.useState('');

    // Add textValue to the canvas when it changes and 'text' is selected
  
    console.log("textValue", textValue)

    switch (selectedDesign) {
        case 'text':
            content = <AddText value={textValue} onChange={setTextValue}
                frontCanvasRef={frontCanvasRef}
                backCanvasRef={backCanvasRef}
                fabricFrontCanvasRef={fabricFrontCanvasRef}
                fabricBackCanvasRef={fabricBackCanvasRef}
                currentView={currentView}


            />;
            break;
        case 'element':
            content = <AddEmoji onAdd={handleAddEmoji}/>;
            break;
          case 'image':
            content = <AddImage onImageAdd={handleAddImage}/>;
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

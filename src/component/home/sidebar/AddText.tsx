import { Button } from "@/components/ui/button";
import React, { useRef } from "react";
import * as fabric from 'fabric';

interface AddTextProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    frontCanvasRef?: React.RefObject<HTMLCanvasElement>;
    backCanvasRef?: React.RefObject<HTMLCanvasElement>;
    fabricFrontCanvasRef?: React.RefObject<fabric.Canvas>;
    fabricBackCanvasRef?: React.RefObject<fabric.Canvas>;
    currentView: 'front' | 'back';
}

const AddText: React.FC<AddTextProps> = ({
    value,
    onChange,
    placeholder = "Enter your text here...",
    fabricFrontCanvasRef,
    currentView,
    fabricBackCanvasRef
}) => {
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const fontSizeRef = useRef<HTMLInputElement>(null);
    const fontColorRef = useRef<HTMLInputElement>(null);
    const fontFamilyRef = useRef<HTMLSelectElement>(null);
    const textAlignRef = useRef<HTMLSelectElement>(null);
    const textShadowRef = useRef<HTMLSelectElement>(null);

    const handleAddText = () => {
        // Get the active canvas based on current view
        let canvas: fabric.Canvas | null = null;

        if (currentView === "front") {
            canvas = fabricFrontCanvasRef?.current ?? null;
        } else if (currentView === "back") {
            canvas = fabricBackCanvasRef?.current ?? null;
        }

        if (!canvas) {
            console.error("Canvas not available");
            return;
        }

        // Get canvas dimensions to position text in center
        const canvasWidth = canvas.getWidth();
        const canvasHeight = canvas.getHeight();

        // Check if text is empty
        if (!value.trim()) {
            alert("Please enter some text");
            return;
        }

        // Create options for the Textbox
        const fontSize = fontSizeRef.current ? parseInt(fontSizeRef.current.value) : 16;
        const fontColor = fontColorRef.current?.value || '#000000';
        const fontFamily = fontFamilyRef.current?.value || 'Arial';
        const textAlign = textAlignRef.current?.value as fabric.TextboxTextAlign || 'left';
        
        // Get shadow value
        const shadowValue = textShadowRef.current?.value || 'none';
        
        // Create text object with interactive properties
        const textbox = new fabric.Textbox(value, {
            left: canvasWidth / 2,
            top: canvasHeight / 2,
            fontSize: fontSize,
            fill: fontColor,
            fontFamily: fontFamily,
            textAlign: textAlign,
            width: Math.min(300, canvasWidth * 0.8), // Reasonable width that fits on canvas
            originX: 'center',
            originY: 'center',
            centeredRotation: true,
            lockScalingFlip: true,
            selectable: true,
            editable: true,
            hasControls: true,
            hasBorders: true
        });
        
        // Add shadow if selected
        if (shadowValue !== 'none') {
            const shadowParts = shadowValue.split(' ');
            if (shadowParts.length >= 4) {
                const offsetX = parseInt(shadowParts[0]);
                const offsetY = parseInt(shadowParts[1]);
                const blur = parseInt(shadowParts[2]);
                const color = shadowParts[3];
                
                textbox.setShadow({
                    color: color,
                    blur: blur,
                    offsetX: offsetX,
                    offsetY: offsetY
                });
            }
        }

        // Add the textbox to canvas and set it as active object
        canvas.add(textbox);
        canvas.setActiveObject(textbox);
        
        // Center the viewport on the text
        canvas.centerObject(textbox);
        
        // Render the canvas to show changes
        canvas.renderAll();
        
        // Clear the text input after adding
        onChange("");
    };

    return (
        <div className="flex flex-col gap-2">
            <label className="text-gray-700">Text</label>
            <textarea
                ref={textareaRef}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className="w-full h-24 p-2 border border-gray-300 rounded"
                style={{ resize: "none" }}
            />

            <div className="flex items-center gap-2">
                <label className="text-gray-700">Font Size</label>
                <input
                    ref={fontSizeRef}
                    type="number"
                    min="8"
                    max="72"
                    defaultValue="16"
                    className="w-16 p-1 border border-gray-300 rounded"
                />
                <label className="text-gray-700">Font Color</label>
                <input
                    ref={fontColorRef}
                    type="color"
                    defaultValue="#000000"
                    className="w-16 h-10 p-1 border border-gray-300 rounded"
                />
            </div>

            <div className="flex items-center gap-2">
                <label className="text-gray-700">Font Family</label>
                <select
                    ref={fontFamilyRef}
                    className="w-full p-1 border border-gray-300 rounded"
                >
                    <option value="Arial">Arial</option>
                    <option value="Courier New">Courier New</option>
                    <option value="Georgia">Georgia</option>
                    <option value="Times New Roman">Times New Roman</option>
                    <option value="Verdana">Verdana</option>
                    <option value="Impact">Impact</option>
                </select>
            </div>

            <div className="flex items-center gap-2">
                <label className="text-gray-700">Text Alignment</label>
                <select
                    ref={textAlignRef}
                    className="w-full p-1 border border-gray-300 rounded"
                >
                    <option value="left">Left</option>
                    <option value="center">Center</option>
                    <option value="right">Right</option>
                    <option value="justify">Justify</option>
                </select>
            </div>

            <div className="flex items-center gap-2">
                <label className="text-gray-700">Text Shadow</label>
                <select
                    ref={textShadowRef}
                    className="w-full p-1 border border-gray-300 rounded"
                >
                    <option value="none">None</option>
                    <option value="2px 2px 2px #000000">Light Shadow</option>
                    <option value="4px 4px 4px #000000">Medium Shadow</option>
                    <option value="6px 6px 6px #000000">Heavy Shadow</option>
                </select>
            </div>

            <Button className="mt-2" onClick={handleAddText}>
                Add Text
            </Button>
        </div>
    );
};

export default AddText;
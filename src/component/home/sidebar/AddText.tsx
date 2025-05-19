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
        let canvas: fabric.Canvas | undefined;

        if (currentView === "front") {
            canvas = fabricFrontCanvasRef?.current ?? undefined;
        } else if (currentView === "back") {
            canvas = fabricBackCanvasRef?.current ?? undefined;
        }

        if (!canvas) return;

        const text = new fabric.Textbox(value, {
            left: 50,
            top: 50,
            fontSize: fontSizeRef.current ? parseInt(fontSizeRef.current.value) : 16,
            fill: fontColorRef.current?.value || '#000000',
            fontFamily: fontFamilyRef.current?.value || 'Arial',
            textAlign: textAlignRef.current?.value as 'left' | 'center' | 'right' | 'justify',
            //shadow: textShadowRef.current?.value !== 'none' ? textShadowRef.current?.value : undefined,
        });

        canvas.add(text);
        canvas.setActiveObject(text);
        canvas.renderAll();
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
                    <option value="2px 2px 2px #000000">2px 2px 2px #000000</option>
                    <option value="4px 4px 4px #000000">4px 4px 4px #000000</option>
                    <option value="6px 6px 6px #000000">6px 6px 6px #000000</option>
                </select>
            </div>

            <Button className="mt-2" onClick={handleAddText}>
                Add Text
            </Button>
        </div>
    );
};

export default AddText;

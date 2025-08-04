import { Button } from "@/components/ui/button";
import React, { useState } from "react";
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
    // State for controls
    const [fontSize, setFontSize] = useState<number>(16);
    const [fontColor, setFontColor] = useState<string>("#000000");
    const [fontFamily, setFontFamily] = useState<string>("Arial");
    const [textAlign, setTextAlign] = useState<"left" | "center" | "right" | "justify">("left");
    const [isBold, setIsBold] = useState<boolean>(false);
    // const [textShadow, setTextShadow] = useState<string>("none");

    const handleAddText = () => {
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

        const canvasWidth = canvas.getWidth();
        const canvasHeight = canvas.getHeight();

        if (!value.trim()) {
            alert("Please enter some text");
            return;
        }

        const textbox = new fabric.Textbox(value, {
            left: canvasWidth / 2,
            top: canvasHeight / 2,
            fontSize: fontSize,
            fill: fontColor,
            fontFamily: fontFamily,
            textAlign: textAlign,
            fontWeight: isBold ? 'bold' : 'normal',
            width: Math.min(300, canvasWidth * 0.8),
            originX: 'center',
            originY: 'center',
            centeredRotation: true,
            lockScalingFlip: true,
            selectable: true,
            editable: true,
            hasControls: true,
            hasBorders: true
        });

        canvas.add(textbox);
        canvas.setActiveObject(textbox);
        canvas.centerObject(textbox);
        canvas.renderAll();
        onChange("");
    };

    // Update selected text properties when controls change
    React.useEffect(() => {
        let canvas: fabric.Canvas | null = null;
        if (currentView === "front") {
            canvas = fabricFrontCanvasRef?.current ?? null;
        } else if (currentView === "back") {
            canvas = fabricBackCanvasRef?.current ?? null;
        }
        if (!canvas) return;
        const activeObj = canvas.getActiveObject();
        if (activeObj && activeObj.type === "textbox") {
            activeObj.set({
                fontSize,
                fill: fontColor,
                fontFamily,
                textAlign,
                fontWeight: isBold ? 'bold' : 'normal'
            });


            canvas.renderAll();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fontSize, fontColor, fontFamily, textAlign, isBold, currentView, fabricFrontCanvasRef, fabricBackCanvasRef]);

    return (
        <div className="flex flex-col gap-4">
            <textarea
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className="w-full h-24 p-2 border border-gray-300 rounded"
                style={{ resize: "none" }}
            />
            <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                    <label className="text-gray-700 font-semibold text-[16px]">Font:</label>
                    <select
                        value={fontFamily}
                        onChange={e => setFontFamily(e.target.value)}
                        className="w-full max-w-[80px] p-1 border border-gray-300 rounded"
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
                    <label className="text-gray-700 font-semibold text-[16px]">Size:</label>
                    <input
                        type="number"
                        min="8"
                        max="72"
                        value={fontSize}
                        onChange={e => setFontSize(Number(e.target.value))}
                        className="w-16 p-1 border border-gray-300 rounded"
                    />
                </div>
            </div>

            {/*<div className="flex items-center gap-2">*/}
            {/*    <label className="text-gray-700">Font Size</label>*/}
            {/*    <input*/}
            {/*        type="number"*/}
            {/*        min="8"*/}
            {/*        max="72"*/}
            {/*        value={fontSize}*/}
            {/*        onChange={e => setFontSize(Number(e.target.value))}*/}
            {/*        className="w-16 p-1 border border-gray-300 rounded"*/}
            {/*    />*/}
            {/*    <label className="text-gray-700">Font Color</label>*/}
            {/*    <input*/}
            {/*        type="color"*/}
            {/*        value={fontColor}*/}
            {/*        onChange={e => setFontColor(e.target.value)}*/}
            {/*        className="w-16 h-10 p-1 border border-gray-300 rounded"*/}
            {/*    />*/}
            {/*</div>*/}

            {/*<div className="flex items-center gap-2">*/}
            {/*    <label className="text-gray-700">Font Family</label>*/}
            {/*    <select*/}
            {/*        value={fontFamily}*/}
            {/*        onChange={e => setFontFamily(e.target.value)}*/}
            {/*        className="w-full p-1 border border-gray-300 rounded"*/}
            {/*    >*/}
            {/*        <option value="Arial">Arial</option>*/}
            {/*        <option value="Courier New">Courier New</option>*/}
            {/*        <option value="Georgia">Georgia</option>*/}
            {/*        <option value="Times New Roman">Times New Roman</option>*/}
            {/*        <option value="Verdana">Verdana</option>*/}
            {/*        <option value="Impact">Impact</option>*/}
            {/*    </select>*/}
            {/*</div>*/}

            {/*<div className="flex items-center gap-2">*/}
            {/*    <label className="text-gray-700">Text Alignment</label>*/}
            {/*    <select*/}
            {/*        value={textAlign}*/}
            {/*        onChange={e => setTextAlign(e.target.value as "left" | "center" | "right" | "justify")}*/}
            {/*        className="w-full p-1 border border-gray-300 rounded"*/}
            {/*    >*/}
            {/*        <option value="left">Left</option>*/}
            {/*        <option value="center">Center</option>*/}
            {/*        <option value="right">Right</option>*/}
            {/*        <option value="justify">Justify</option>*/}
            {/*    </select>*/}
            {/*</div>*/}

            {/*<div className="flex items-center gap-2 mt-2">*/}
            {/*    <label className="text-gray-700">Bold</label>*/}
            {/*    <input*/}
            {/*        type="checkbox"*/}
            {/*        checked={isBold}*/}
            {/*        onChange={e => setIsBold(e.target.checked)}*/}
            {/*        className="w-4 h-4 border border-gray-300 rounded"*/}
            {/*    />*/}
            {/*</div>*/}
          
            <Button className="mt-2" onClick={handleAddText}>
                Add Text
            </Button>
        </div>
    );
};

export default AddText;
// components/FabricEditor.tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import * as fabric from 'fabric';

type EditorElement = {
    id: string;
    name: string;
    type: 'rect' | 'circle' | 'triangle' | 'text';
    icon: string;
    defaultOptions: fabric.Object;
};

export default function FabricEditor() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const fabricCanvasRef = useRef<fabric.Canvas | null>(null);
    const [selectedElement, setSelectedElement] = useState<string | null>(null);

    // Available elements in sidebar
    const editorElements: EditorElement[] = [
        {
            id: 'rect',
            name: 'Rectangle',
            type: 'rect',
            icon: '□',
            defaultOptions: {
                width: 100,
                height: 80,
                fill: '#3b82f6', // blue-500
                left: 100,
                top: 100,
            } as fabric.IRectOptions,
        },
        {
            id: 'circle',
            name: 'Circle',
            type: 'circle',
            icon: '○',
            defaultOptions: {
                radius: 50,
                fill: '#ef4444', // red-500
                left: 100,
                top: 100,
            } as fabric.ICircleOptions,
        },
        {
            id: 'triangle',
            name: 'Triangle',
            type: 'triangle',
            icon: '△',
            defaultOptions: {
                width: 100,
                height: 100,
                fill: '#10b981', // emerald-500
                left: 100,
                top: 100,
            } as fabric.ITriangleOptions,
        },
        {
            id: 'text',
            name: 'Text',
            type: 'text',
            icon: 'T',
            defaultOptions: {
                text: 'Double click to edit',
                fontSize: 20,
                fill: '#000000',
                left: 100,
                top: 100,
                width: 200,
            } as fabric.ITextOptions,
        },
    ];

    // Initialize canvas
    useEffect(() => {
        if (!canvasRef.current) return;

        fabricCanvasRef.current = new fabric.Canvas(canvasRef.current, {
            width: 800,
            height: 600,
            backgroundColor: '#f8fafc', // slate-50
            selectionColor: 'rgba(59, 130, 246, 0.3)', // blue-500 with opacity
            selectionBorderColor: '#3b82f6', // blue-500
            selectionLineWidth: 2,
        });

        // Enable object movement
        fabricCanvasRef.current.on('object:moving', () => {
            fabricCanvasRef.current?.renderAll();
        });

        // Enable text editing on double click
        fabricCanvasRef.current.on('mouse:dblclick', (e: { target: { type: string; }; }) => {
            if (e.target?.type === 'textbox') {
                const textObject = e.target as fabric.Textbox;
                textObject.enterEditing();
                textObject.selectAll();
            }
        });

        return () => {
            fabricCanvasRef.current?.dispose();
        };
    }, []);

    // Add selected element to canvas
    const addElementToCanvas = () => {
        if (!fabricCanvasRef.current || !selectedElement) return;

        const element = editorElements.find((el) => el.id === selectedElement);
        if (!element) return;

        try {
            let fabricObject: fabric.Object;

            switch (element.type) {
                case 'rect':
                    fabricObject = new fabric.Rect(element.defaultOptions as fabric.IRectOptions);
                    break;
                case 'circle':
                    fabricObject = new fabric.Circle(element.defaultOptions as fabric.ICircleOptions);
                    break;
                case 'triangle':
                    fabricObject = new fabric.Triangle(element.defaultOptions as fabric.ITriangleOptions);
                    break;
                case 'text':
                    fabricObject = new fabric.Textbox(
                        element.defaultOptions.text?.toString() || 'Text',
                        element.defaultOptions as fabric.ITextOptions
                    );
                    break;
                default:
                    throw new Error(`Unknown element type: ${element.type}`);
            }

            fabricCanvasRef.current.add(fabricObject);
            fabricCanvasRef.current.setActiveObject(fabricObject);
            fabricCanvasRef.current.renderAll();
        } catch (error) {
            console.error('Error adding element:', error);
        }
    };

    // Clear canvas
    const clearCanvas = () => {
        if (!fabricCanvasRef.current) return;
        fabricCanvasRef.current.clear();
        fabricCanvasRef.current.backgroundColor = '#f8fafc';
        fabricCanvasRef.current.renderAll();
    };

    return (
        <div className="flex h-screen bg-white">
            {/* Sidebar */}
            <div className="w-64 bg-gray-50 border-r border-gray-200 p-4 flex flex-col">
                <h2 className="text-xl font-bold mb-6 text-gray-800">Elements</h2>

                <div className="space-y-3 flex-1">
                    {editorElements.map((element) => (
                        <div
                            key={element.id}
                            className={`p-4 border rounded-lg cursor-pointer transition-colors flex items-center space-x-3 ${
                                selectedElement === element.id
                                    ? 'bg-blue-50 border-blue-200'
                                    : 'bg-white border-gray-200 hover:bg-gray-50'
                            }`}
                            onClick={() => setSelectedElement(element.id)}
                        >
                            <span className="text-2xl">{element.icon}</span>
                            <span className="font-medium text-gray-700">{element.name}</span>
                        </div>
                    ))}
                </div>

                <div className="mt-auto space-y-3 pt-4 border-t border-gray-200">
                    <button
                        onClick={addElementToCanvas}
                        disabled={!selectedElement}
                        className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
                            selectedElement
                                ? 'bg-blue-600 text-white hover:bg-blue-700'
                                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        }`}
                    >
                        Add to Canvas
                    </button>

                    <button
                        onClick={clearCanvas}
                        className="w-full py-2 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors"
                    >
                        Clear Canvas
                    </button>
                </div>
            </div>

            {/* Canvas Area */}
            <div className="flex-1 flex flex-col">
                <div className="border-b border-gray-200 p-4 bg-white">
                    <h1 className="text-xl font-bold text-gray-800">Design Editor</h1>
                </div>

                <div className="flex-1 p-8 bg-gray-50 overflow-auto">
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mx-auto" style={{ width: '800px', height: '600px' }}>
                        <canvas ref={canvasRef} />
                    </div>
                </div>
            </div>
        </div>
    );
}
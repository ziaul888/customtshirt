'use client';
import { useEffect, useRef } from 'react';
// @ts-ignore
import * as fabric from 'fabric';
// @ts-ignore
import * as domtoimage from 'dom-to-image';
import styles from '../../Tshirt.module.css';

export default function TshirtDesigner() {
    const tshirtDivRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const fabricCanvasRef = useRef<fabric.Canvas | null>(null);

    useEffect(() => {
        if (!canvasRef.current) return;

        // Initialize Fabric.js canvas
        fabricCanvasRef.current = new fabric.Canvas(canvasRef.current, {
            selection: true,
        });

        // Add keyboard event listener
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Delete' && fabricCanvasRef.current) {
                const activeObject = fabricCanvasRef.current.getActiveObject();
                if (activeObject) {
                    fabricCanvasRef.current.remove(activeObject);
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        // Cleanup function
        return () => {
            if (fabricCanvasRef.current) {
                fabricCanvasRef.current.dispose();
            }
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    const updateTshirtImage = (imageURL: string) => {
        if (!fabricCanvasRef.current) return;

        fabric.Image.fromURL(imageURL, (img: { scaleToHeight: (arg0: number) => void; scaleToWidth: (arg0: number) => void; }) => {
            img.scaleToHeight(300);
            img.scaleToWidth(300);
            fabricCanvasRef.current?.centerObject(img);
            fabricCanvasRef.current?.add(img);
            fabricCanvasRef.current?.renderAll();
        });
    };

    const handleColorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        if (tshirtDivRef.current) {
            tshirtDivRef.current.style.backgroundColor = e.target.value;
        }
    };

    const handleDesignChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        if (e.target.value) {
            updateTshirtImage(e.target.value);
        }
    };

    const handleCustomPicture = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files?.[0] || !fabricCanvasRef.current) return;

        const reader = new FileReader();

        reader.onload = (event) => {
            if (!event.target?.result) return;

            const imgObj = new Image();
            imgObj.src = event.target.result as string;

            imgObj.onload = () => {
                const img = new fabric.Image(imgObj);
                img.scaleToHeight(300);
                img.scaleToWidth(300);
                fabricCanvasRef.current?.centerObject(img);
                fabricCanvasRef.current?.add(img);
                fabricCanvasRef.current?.renderAll();
            };
        };

        reader.readAsDataURL(e.target.files[0]);
    };

    const exportImage = () => {
        if (!tshirtDivRef.current) return;

        domtoimage.toPng(tshirtDivRef.current)
            .then((dataUrl: string) => {
                // Create download link
                const link = document.createElement('a');
                link.download = 'tshirt-design.png';
                link.href = dataUrl;
                link.click();
            })
            .catch((error: never) => {
                console.error('Error exporting image:', error);
            });
    };

    return (
        <div className="container mx-auto p-4">
            <div className="flex flex-col md:flex-row gap-8">
                <div className="flex-1">
                    {/* T-shirt design area */}
                    <div
                        id="tshirt-div"
                        ref={tshirtDivRef}
                        className="relative w-[452px] h-[548px] bg-white mx-auto"
                    >
                        <img
                            id="tshirt-backgroundpicture"
                            src="https://ourcodeworld.com/public-media/gallery/gallery-5d5afd3f1c7d6.png"
                            className="absolute w-full h-full"
                            alt="T-shirt base"
                        />

                        <div className={styles.drawingArea}>
                            <div className={styles.canvasContainer}>
                                <canvas
                                    ref={canvasRef}
                                    id="tshirt-canvas"
                                    width="200"
                                    height="400"
                                    className={styles.canvas}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex-1 max-w-md">
                    <div className="space-y-4">
                        <p className="text-sm text-gray-600">
                            To remove a loaded picture on the T-Shirt select it and press the <kbd className="px-2 py-1 bg-gray-200 rounded">DEL</kbd> key.
                        </p>

                        <div>
                            <label htmlFor="tshirt-design" className="block mb-2">T-Shirt Design:</label>
                            <select
                                id="tshirt-design"
                                onChange={handleDesignChange}
                                className="w-full p-2 border rounded"
                            >
                                <option value="">Select one of our designs ...</option>
                                <option value="https://ourcodeworld.com/public-media/gallery/gallery-5d5b0e95d294c.png">Batman</option>
                            </select>
                        </div>

                        <div>
                            <label htmlFor="tshirt-color" className="block mb-2">T-Shirt Color:</label>
                            <select
                                id="tshirt-color"
                                onChange={handleColorChange}
                                className="w-full p-2 border rounded"
                                defaultValue="#fff"
                            >
                                <option value="#ffffff">White</option>
                                <option value="#000000">Black</option>
                                <option value="#ff0000">Red</option>
                                <option value="#008000">Green</option>
                                <option value="#ffff00">Yellow</option>
                            </select>
                        </div>

                        <div>
                            <label htmlFor="tshirt-custompicture" className="block mb-2">Upload your own design:</label>
                            <input
                                type="file"
                                id="tshirt-custompicture"
                                onChange={handleCustomPicture}
                                className="w-full p-2 border rounded"
                                accept="image/*"
                            />
                        </div>

                        <button
                            onClick={exportImage}
                            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
                        >
                            Export Design
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
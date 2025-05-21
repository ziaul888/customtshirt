'use client'

import React, { useEffect, useRef, useState } from 'react';
import SelectDesign from "@/component/home/SelectedDesign";
import PickColor from "@/component/home/PickColor";
import TshirtDesigner from "@/component/editor";
import * as fabric from 'fabric';

const Index = () => {
    const tshirtDivRef = useRef<HTMLDivElement>(null);
    const frontCanvasRef = useRef<HTMLCanvasElement>(null);
    const backCanvasRef = useRef<HTMLCanvasElement>(null);
    const fabricFrontCanvasRef = useRef<fabric.Canvas | null>(null);
    const fabricBackCanvasRef = useRef<fabric.Canvas | null>(null);
    const [currentView, setCurrentView] = useState<'front' | 'back'>('front');
    const [tshirtColor, setTshirtColor] = useState<string>('#ffffff');
    const [isSwitchingView, setIsSwitchingView] = useState(false);
    
    // Store canvas states as objects
    const canvasStatesRef = useRef<{
        front: any | null;
        back: any | null;
    }>({
        front: null,
        back: null
    });

    // Initialize both Fabric canvases with proper dimensions and configuration
    useEffect(() => {
        if (!frontCanvasRef.current || !backCanvasRef.current) return;

        // Set proper dimensions for both canvases - using a wider canvas
        const canvasWidth = 200;
        const canvasHeight = 500;

        // Cleanup any existing canvas instances to prevent duplicates
        if (fabricFrontCanvasRef.current) {
            fabricFrontCanvasRef.current.dispose();
        }
        if (fabricBackCanvasRef.current) {
            fabricBackCanvasRef.current.dispose();
        }

        // Initialize front canvas
        fabricFrontCanvasRef.current = new fabric.Canvas(frontCanvasRef.current, {
            width: canvasWidth,
            height: canvasHeight,
            selection: true,
            preserveObjectStacking: true,
            renderOnAddRemove: true,
            centeredScaling: true,
            controlsAboveOverlay: true,
            stopContextMenu: true
        });

        // Initialize back canvas with the same dimensions and properties
        fabricBackCanvasRef.current = new fabric.Canvas(backCanvasRef.current, {
            width: canvasWidth,
            height: canvasHeight,
            selection: true,
            preserveObjectStacking: true,
            renderOnAddRemove: true,
            centeredScaling: true,
            controlsAboveOverlay: true,
            stopContextMenu: true
        });

        // Set initial empty states
        canvasStatesRef.current = {
            front: fabricFrontCanvasRef.current.toJSON(),
            back: fabricBackCanvasRef.current.toJSON()
        };

        // Ensure canvas is visible and properly sized
        if (fabricFrontCanvasRef.current && fabricBackCanvasRef.current) {
            fabricFrontCanvasRef.current.setDimensions({ width: canvasWidth, height: canvasHeight });
            fabricBackCanvasRef.current.setDimensions({ width: canvasWidth, height: canvasHeight });
        }

        // Set proper canvas center point for both canvases
        fabricFrontCanvasRef.current.setViewportTransform([1, 0, 0, 1, 0, 0]);
        fabricBackCanvasRef.current.setViewportTransform([1, 0, 0, 1, 0, 0]);

        // Make sure the inactive canvas is hidden
        if (currentView === 'front') {
            const backCanvasContainer = backCanvasRef.current.parentElement;
            if (backCanvasContainer) backCanvasContainer.style.display = 'none';
        } else {
            const frontCanvasContainer = frontCanvasRef.current.parentElement;
            if (frontCanvasContainer) frontCanvasContainer.style.display = 'none';
        }

        // Setup canvas events to detect when objects are modified
        const setupCanvasEvents = (canvas: fabric.Canvas) => {
            canvas.on('object:modified', () => {
                const view = canvas === fabricFrontCanvasRef.current ? 'front' : 'back';
                canvasStatesRef.current[view] = canvas.toJSON();
            });
        };

        setupCanvasEvents(fabricFrontCanvasRef.current);
        setupCanvasEvents(fabricBackCanvasRef.current);

        // Handle window resize to maintain canvas proportions
        const handleResize = () => {
            if (fabricFrontCanvasRef.current && fabricBackCanvasRef.current) {
                fabricFrontCanvasRef.current.setDimensions({ width: canvasWidth, height: canvasHeight });
                fabricBackCanvasRef.current.setDimensions({ width: canvasWidth, height: canvasHeight });
                fabricFrontCanvasRef.current.renderAll();
                fabricBackCanvasRef.current.renderAll();
            }
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            fabricFrontCanvasRef.current?.dispose();
            fabricBackCanvasRef.current?.dispose();
        };
    }, []);

    // Handle view switching with improved visibility controls
    const switchView = async (view: 'front' | 'back') => {
        if (view === currentView ) return;
        
        setIsSwitchingView(true);
        
        // Save current canvas state before switching
        const currentCanvas = currentView === 'front' 
            ? fabricFrontCanvasRef.current 
            : fabricBackCanvasRef.current;
        
        if (currentCanvas) {
            canvasStatesRef.current[currentView] = currentCanvas.toJSON();
        }

        // Get canvas container elements
        const frontCanvasContainer = frontCanvasRef.current?.parentElement;
        const backCanvasContainer = backCanvasRef.current?.parentElement;

        // Switch to the new view
        setCurrentView(view);

        // Toggle visibility of the canvases
        if (frontCanvasContainer && backCanvasContainer) {
            if (view === 'front') {
                frontCanvasContainer.style.display = 'block';
                backCanvasContainer.style.display = 'none';
            } else {
                frontCanvasContainer.style.display = 'none';
                backCanvasContainer.style.display = 'block';
            }
        }

        // Load the new canvas state after a small delay
        setTimeout(() => {
            const newCanvas = view === 'front' 
                ? fabricFrontCanvasRef.current 
                : fabricBackCanvasRef.current;
            
            if (newCanvas) {
                if (canvasStatesRef.current[view]) {
                    newCanvas.loadFromJSON(canvasStatesRef.current[view], () => {
                        // Force re-render of all objects
                        newCanvas.getObjects().forEach(obj => {
                            obj.set({
                                dirty: true,
                                selectable: true, // Ensure all objects are selectable
                                hasControls: true // Ensure all objects have controls
                            });
                        });
                        newCanvas.renderAll();
                        newCanvas.requestRenderAll();
                        setIsSwitchingView(false);
                    });
                } else {
                    newCanvas.clear();
                    newCanvas.renderAll();
                    setIsSwitchingView(false);
                }
            } else {
                setIsSwitchingView(false);
            }
        }, 50);
    };

    // Force re-render when view changes
    useEffect(() => {
        const timer = setTimeout(() => {
            const activeCanvas = currentView === 'front' 
                ? fabricFrontCanvasRef.current 
                : fabricBackCanvasRef.current;
            
            if (activeCanvas) {
                // Ensure all objects are selectable
                activeCanvas.getObjects().forEach(obj => {
                    obj.set({
                        dirty: true,
                        selectable: true,
                        hasControls: true
                    });
                });
                activeCanvas.renderAll();
                activeCanvas.requestRenderAll();
            }
        }, 100);

        return () => clearTimeout(timer);
    }, [currentView]);

    // Handle T-shirt color change
    const handleColorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const color = e.target.value;
        setTshirtColor(color);
        if (tshirtDivRef.current) {
            tshirtDivRef.current.style.backgroundColor = color;
        }
    };

    // Set initial background color on mount
    useEffect(() => {
        if (tshirtDivRef.current) {
            tshirtDivRef.current.style.backgroundColor = tshirtColor;
        }
    }, [tshirtColor]);



    const tshirtImages = {
        front: '/crew_front (Copy).png',
        back: '/crew_back.png',
    };
// Add emoji to the canvas
    const handleAddEmoji = (emoji: string) => {
        const fabricCanvas = currentView === 'front'
            ? fabricFrontCanvasRef.current
            : fabricBackCanvasRef.current;
        if (fabricCanvas) {
            const text = new fabric.Text(emoji, {
                left: fabricCanvas.getWidth() / 2,
                top: fabricCanvas.getHeight() / 2,
                fontSize: 48,
                originX: 'center',
                originY: 'center',
                selectable: true,
                hasControls: true,
            });
            fabricCanvas.add(text);
            fabricCanvas.setActiveObject(text);
            fabricCanvas.renderAll();
        }
    };
    // Add image to the canvas// Add image to the canvas
    const handleAddImage = (file: File) => {
        // Basic validation
        if (!file || !file.type.startsWith('image/')) {
            alert("Please select a valid image file");
            return;
        }

        // Get the active canvas
        const fabricCanvas = currentView === 'front'
            ? fabricFrontCanvasRef.current
            : fabricBackCanvasRef.current;

        if (!fabricCanvas) {
            console.error("Canvas is not initialized");
            return;
        }

        // Create a temporary URL for the file
        const objectUrl = URL.createObjectURL(file);

        // Create an HTML image element first
        const imgElement = new Image();
        imgElement.onload = () => {
            // Once the image is loaded, create a fabric.Image
            const fabricImage = new fabric.Image(imgElement, {
                left: fabricCanvas.getCenter().left,
                top: fabricCanvas.getCenter().top,
                originX: 'center',
                originY: 'center',
                scaleX: Math.min(0.5, 200 / imgElement.width),
                scaleY: Math.min(0.5, 200 / imgElement.height)
            });

            // Add the image to the canvas
            fabricCanvas.add(fabricImage);
            fabricCanvas.setActiveObject(fabricImage);
            fabricCanvas.renderAll();

            // Release the object URL
            URL.revokeObjectURL(objectUrl);
        };

        // Handle image loading errors
        imgElement.onerror = () => {
            console.error("Failed to load image");
            URL.revokeObjectURL(objectUrl);
            alert("Failed to load the selected image");
        };

        // Set the source to start loading
        imgElement.src = objectUrl;
    };

    return (
        <div className="flex flex-col md:flex-row h-screen bg-gray-100 gap-4 p-4">
            <div className="w-full md:w-[30%]">
                <SelectDesign 
                    fabricFrontCanvasRef={fabricFrontCanvasRef}
                    backCanvasRef={backCanvasRef as React.RefObject<HTMLCanvasElement>}
                    frontCanvasRef={frontCanvasRef as React.RefObject<HTMLCanvasElement>}
                    fabricBackCanvasRef={fabricBackCanvasRef as React.RefObject<HTMLCanvasElement>}
                    currentView={currentView}
                    handleAddEmoji={handleAddEmoji}
                    handleAddImage={handleAddImage}
                   // addTextToCanvas={addTextToCanvas} // Pass the text addition function
                />
            </div>
            <div className="w-full md:w-[40%]">
                <TshirtDesigner 
                    tshirtImages={tshirtImages}
                    currentView={currentView}
                    switchView={switchView}
                    frontCanvasRef={frontCanvasRef as React.RefObject<HTMLCanvasElement>}
                    backCanvasRef={backCanvasRef as React.RefObject<HTMLCanvasElement>}
                    handleColorChange={handleColorChange}
                    tshirtColor={tshirtColor}
                    tshirtDivRef={tshirtDivRef}
                    fabricFrontCanvasRef={fabricFrontCanvasRef}
                    fabricBackCanvasRef={fabricBackCanvasRef}
                    setCurrentView={setCurrentView}
                    setTshirtColor={setTshirtColor}
                    isSwitchingView={isSwitchingView}
                  //  addTextToCanvas={addTextToCanvas} // Pass the text addition function
                />
            </div>
            <div className="w-full md:w-[30%]">
                <PickColor 
                    handleColorChange={(color: string) => {
                        setTshirtColor(color);
                        if (tshirtDivRef.current) {
                            tshirtDivRef.current.style.backgroundColor = color;
                        }
                    }} 
                />
            </div>
        </div>
    );
};

export default Index;
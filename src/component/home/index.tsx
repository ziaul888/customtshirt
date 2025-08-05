'use client'

import React, { useEffect, useRef, useState } from 'react';
import SelectDesign from "@/component/home/SelectedDesign";
import PickColor from "@/component/home/PickColor";
import TshirtDesigner from "@/component/editor";
import * as fabric from 'fabric';
import TshirtSvg from "@/component/home/TshirtSvg";
import Sidebar from './sidebar/Sidebar';
import { log } from 'console';

const Index = () => {
    const tshirtDivRef = useRef<HTMLDivElement>(null);
    const frontCanvasRef = useRef<HTMLCanvasElement>(null);
    const backCanvasRef = useRef<HTMLCanvasElement>(null);
    const fabricFrontCanvasRef = useRef<fabric.Canvas | null>(null);
    const fabricBackCanvasRef = useRef<fabric.Canvas | null>(null);
    const [currentView, setCurrentView] = useState<'front' | 'back'>('front');
    const [tshirtColor, setTshirtColor] = useState<string>('#fffff');
    const [isSwitchingView, setIsSwitchingView] = useState(false);
    const [selectedDesign, setSelectedDesign] = React.useState<string>("text");
         const handleDesignSelect = (design: string) => {
            setSelectedDesign(design);
         }

    // New state for individual sleeve colors
    const [sleeveColors, setSleeveColors] = useState({
        left: '#000000',
        right: '#000000',
        body: '#000000'
    });

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
        const canvasHeight = 300;

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

    // Handle T-shirt color change (for backward compatibility)
    const handleColorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const color = e.target.value;
        setTshirtColor(color);
        // Update all sleeve colors to maintain consistency
        setSleeveColors({
            left: color,
            right: color,
            body: color
        });
        updateTshirtColors(color, color, color);
    };

    // New function to handle individual sleeve color changes
    const handleSleeveColorChange = (part: 'left' | 'right' | 'body', color: string) => {
        setSleeveColors(prev => ({
            ...prev,
            [part]: color
        }));

        const newColors = {
            ...sleeveColors,
            [part]: color
        };

        updateTshirtColors(newColors.left, newColors.right, newColors.body);
    };

    // Function to update the t-shirt visual with individual colors
    const updateTshirtColors = (leftColor: string, rightColor: string, bodyColor: string) => {
        if (tshirtDivRef.current) {
            // Create a gradient or use CSS variables to handle different parts
            // For now, we'll use the body color as the main background
            // You can enhance this with CSS masks or SVG overlays for more precise control
            tshirtDivRef.current.style.backgroundColor = bodyColor;

            // Add CSS custom properties for sleeve colors
            tshirtDivRef.current.style.setProperty('--left-sleeve-color', leftColor);
            tshirtDivRef.current.style.setProperty('--right-sleeve-color', rightColor);
            tshirtDivRef.current.style.setProperty('--body-color', bodyColor);
        }
    };

    // Set initial background color on mount
    useEffect(() => {
        updateTshirtColors(sleeveColors.left, sleeveColors.right, sleeveColors.body);
    }, [sleeveColors]);

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

    // Add image to the canvas
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

    const exportDesign = async (format: 'png' | 'jpg' | 'svg' = 'png', quality: number = 1) => {
        if (!tshirtDivRef.current) {
            alert('Design area not found');
            return;
        }

        try {
            // Get the current active canvas
            const activeCanvas = currentView === 'front'
                ? fabricFrontCanvasRef.current
                : fabricBackCanvasRef.current;

            if (!activeCanvas) {
                alert('Canvas not initialized');
                return;
            }

            // Create a temporary canvas to combine t-shirt background and design
            const tempCanvas = document.createElement('canvas');
            const tempCtx = tempCanvas.getContext('2d');

            if (!tempCtx) {
                alert('Could not create export canvas');
                return;
            }

            // Set canvas dimensions to match the t-shirt div
            tempCanvas.width = 451; // Fixed width from your design
            tempCanvas.height = 537; // Fixed height from your design

            // Fill background with body color (main t-shirt color)
            tempCtx.fillStyle = sleeveColors.body;
            tempCtx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);

            // Load and draw the t-shirt image
            const tshirtImg = new Image();
            tshirtImg.crossOrigin = 'anonymous';

            return new Promise<void>((resolve, reject) => {
                tshirtImg.onload = () => {
                    // Draw the t-shirt background image
                    tempCtx.drawImage(tshirtImg, 0, 0, tempCanvas.width, tempCanvas.height);

                    // Get the canvas design as image and overlay it
                    const canvasDataUrl = activeCanvas.toDataURL({
                        format: format === 'jpg' ? 'jpeg' : 'png',
                        quality: quality,
                        multiplier: 2 // Higher resolution
                    });

                    const designImg = new Image();
                    designImg.onload = () => {
                        // Calculate position to center the design on the t-shirt
                        const designX = (tempCanvas.width - 200) / 2; // Center the 200px wide canvas
                        const designY = 68; // Adjust this value to position design properly on t-shirt

                        // Draw the design onto the t-shirt
                        tempCtx.drawImage(designImg, designX, designY, 200, 400);

                        // Create download link
                        const link = document.createElement('a');
                        link.download = `tshirt-design-${currentView}-${Date.now()}.${format}`;
                        link.href = tempCanvas.toDataURL(`image/${format === 'jpg' ? 'jpeg' : 'png'}`, quality);
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);

                        resolve();
                    };

                    designImg.onerror = () => {
                        reject(new Error('Failed to load design image'));
                    };

                    designImg.src = canvasDataUrl;
                };

                tshirtImg.onerror = () => {
                    reject(new Error('Failed to load t-shirt image'));
                };

                tshirtImg.src = tshirtImages[currentView];
            });

        } catch (error) {
            console.error('Export error:', error);
            alert('Failed to export design. Please try again.');
        }
    };

    return (
        <div className="flex h-full flex-col md:flex-row h-screen gap-8 p-2">
            <div className="flex-1">
                 <Sidebar selectedDesign={selectedDesign}
                  handleDesignSelect={handleDesignSelect} 
                  />
            </div> 
              <div className="flex-2">
               <TshirtDesigner
                    exportDesign={exportDesign}
                    tshirtImages={tshirtImages}
                    currentView={currentView}
                    switchView={switchView}
                    fabricFrontCanvasRef={fabricFrontCanvasRef}
                    fabricBackCanvasRef={fabricBackCanvasRef}
                    canvasStatesRef={canvasStatesRef}
                    handleColorChange={handleColorChange}
                    sleeveColors={sleeveColors}
                    handleSleeveColorChange={handleSleeveColorChange}
                    tshirtColor={tshirtColor}

               />
            </div>
              <div className="flex-1">
               <PickColor 
                    handleColorChange={handleColorChange}
                    sleeveColors={sleeveColors}
                    handleSleeveColorChange={handleSleeveColorChange}
               />
            </div>
        </div>
    );
};

export default Index;
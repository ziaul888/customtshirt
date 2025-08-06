'use client'

import React, { useEffect, useRef, useState } from 'react';
import SelectDesign from "@/component/home/SelectedDesign";
import PickColor from "@/component/home/PickColor";
import TshirtDesigner from "@/component/editor";
import * as fabric from 'fabric';
import TshirtSvg from "@/component/home/TshirtSvg";
import Sidebar from './sidebar/Sidebar';
import { useDesignStore } from '@/stores';

const Index = () => {
    const tshirtDivRef = useRef<HTMLDivElement>(null);
    const frontCanvasRef = useRef<HTMLCanvasElement>(null);
    const backCanvasRef = useRef<HTMLCanvasElement>(null);
    const fabricFrontCanvasRef = useRef<fabric.Canvas | null>(null);
    const fabricBackCanvasRef = useRef<fabric.Canvas | null>(null);

    // Use Zustand stores
    const {
        currentView,
        tshirtColor,
        sleeveColors,
        isSwitchingView,
        canvasStates,
        tshirtImages,
        setCurrentView,
        setTshirtColor,
        setSleeveColors,
        setIsSwitchingView,
        switchView,
        handleSleeveColorChange,
        setCanvasRefs,
        saveCanvasState,
        addEmoji,
        addImage,
        addText,
        clearCanvas,
        undoLastAction,
        resetDesign
    } = useDesignStore();

    // Store canvas states reference for compatibility
    const canvasStatesRef = useRef(canvasStates);

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

        // Set canvas refs in the store and initialize states
        setCanvasRefs(fabricFrontCanvasRef, fabricBackCanvasRef);
        saveCanvasState('front', fabricFrontCanvasRef.current.toJSON());
        saveCanvasState('back', fabricBackCanvasRef.current.toJSON());

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
                saveCanvasState(view, canvas.toJSON());
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

    // Custom switchView function that handles DOM manipulation
    const handleSwitchView = async (view: 'front' | 'back') => {
        // Get canvas container elements for DOM manipulation
        const frontCanvasContainer = frontCanvasRef.current?.parentElement;
        const backCanvasContainer = backCanvasRef.current?.parentElement;

        // Call the store's switchView function
        await switchView(view);

        // Handle DOM visibility (since Zustand shouldn't handle DOM directly)
        if (frontCanvasContainer && backCanvasContainer) {
            if (view === 'front') {
                frontCanvasContainer.style.display = 'block';
                backCanvasContainer.style.display = 'none';
            } else {
                frontCanvasContainer.style.display = 'none';
                backCanvasContainer.style.display = 'block';
            }
        }
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

    // Handle color change from PickColor component
    const handleColorChangeFromPicker = (color: string) => {
        setTshirtColor(color);
        // Update all sleeve colors to maintain consistency
        setSleeveColors({
            left: color,
            right: color,
            body: color
        });
        updateTshirtColors(color, color, color);
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
                 <Sidebar />
            </div> 
              <div className="flex-2">
               <TshirtDesigner
                    exportDesign={exportDesign}
                    tshirtImages={tshirtImages}
                    currentView={currentView}
                    switchView={handleSwitchView}
                    fabricFrontCanvasRef={fabricFrontCanvasRef}
                    fabricBackCanvasRef={fabricBackCanvasRef}
                    frontCanvasRef={frontCanvasRef}
                    backCanvasRef={backCanvasRef}
                    tshirtDivRef={tshirtDivRef}
                    setCurrentView={setCurrentView}
                    setTshirtColor={setTshirtColor}
                    isSwitchingView={isSwitchingView}
                    handleColorChange={handleColorChange}
                    sleeveColors={sleeveColors}
                    handleSleeveColorChange={handleSleeveColorChange}
                    tshirtColor={tshirtColor}
               />
            </div>
              <div className="flex-1">
               <PickColor 
                    handleColorChange={handleColorChangeFromPicker}
                    sleeveColors={sleeveColors}
                    handleSleeveColorChange={handleSleeveColorChange}
               />
            </div>
        </div>
    );
};

export default Index;
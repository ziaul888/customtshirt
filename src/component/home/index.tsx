'use client'

import React, { useEffect, useRef, useState } from 'react';
import SelectDesign from "@/component/home/SelectedDesign";
import PickColor from "@/component/home/PickColor";
import TshirtDesigner from "@/component/editor";
import * as fabric from 'fabric';


const Index = () => {
    const tshirtDivRef = useRef<HTMLDivElement>(null);

  // Refs for both canvases
  const frontCanvasRef = useRef<HTMLCanvasElement>(null);
  const backCanvasRef = useRef<HTMLCanvasElement>(null);

  // Fabric canvas instances for front and back
  const fabricFrontCanvasRef = useRef<fabric.Canvas | null>(null);
  const fabricBackCanvasRef = useRef<fabric.Canvas | null>(null);

  // State to track which view is active
  const [currentView, setCurrentView] = useState<'front' | 'back'>('front');

  // Store canvas JSON states for front and back
  const canvasStatesRef = useRef<{ front: string | null; back: string | null }>({
    front: null,
    back: null,
  });

  // T-shirt color state
  const [tshirtColor, setTshirtColor] = useState<string>('#ffffff');

  // Initialize both Fabric canvases once
  useEffect(() => {
    if (!frontCanvasRef.current || !backCanvasRef.current) return;

    // Initialize front canvas
    fabricFrontCanvasRef.current = new fabric.Canvas(frontCanvasRef.current, {
      selection: true,
      preserveObjectStacking: true,
    });

    // Initialize back canvas
    fabricBackCanvasRef.current = new fabric.Canvas(backCanvasRef.current, {
      selection: true,
      preserveObjectStacking: true,
    });

    // Cleanup on unmount
    return () => {
      fabricFrontCanvasRef.current?.dispose();
      fabricBackCanvasRef.current?.dispose();
    };
  }, []);

  // Handle view switching
  const switchView = (view: 'front' | 'back') => {
    if (view === currentView) return;
    console.log('view', view);
    // Save current canvas state before switching
    if (fabricFrontCanvasRef.current && fabricBackCanvasRef.current) {
      if (currentView === 'front') {
        canvasStatesRef.current.front = fabricFrontCanvasRef.current.toJSON();
      } else {
        canvasStatesRef.current.back = fabricBackCanvasRef.current.toJSON();
      }

      // Load the target canvas state
      if (view === 'front') {
        if (canvasStatesRef.current.front) {
          fabricFrontCanvasRef.current.loadFromJSON(
            canvasStatesRef.current.front,
            () => {
              fabricFrontCanvasRef.current?.renderAll();
            }
          );
        } else {
          fabricFrontCanvasRef.current.clear();
        }
      } else {
        if (canvasStatesRef.current.back) {
          fabricBackCanvasRef.current.loadFromJSON(
            canvasStatesRef.current.back,
            () => {
              fabricBackCanvasRef.current?.renderAll();
            }
          );
        } else {
          fabricBackCanvasRef.current.clear();
        }
      }

      setCurrentView(view);
    }
  };

  // Handle T-shirt color change
  const handleColorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const color = e.target.value;
    setTshirtColor(color);
    if (tshirtDivRef.current) {
      tshirtDivRef.current.style.backgroundColor = color;
    }
  };

  // Handle delete key to remove selected objects on the active canvas
//   useEffect(() => {
//     const handleKeyDown = (e: KeyboardEvent) => {
//       if (e.key === 'Delete' || e.key === 'Backspace') {
//         const activeCanvas =
//           currentView === 'front'
//             ? fabricFrontCanvasRef.current
//             : fabricBackCanvasRef.current;
//         if (activeCanvas) {
//           const activeObject = activeCanvas.getActiveObject();
//           if (activeObject) {
//             activeCanvas.remove(activeObject);
//             activeCanvas.discardActiveObject();
//             activeCanvas.requestRenderAll();
//           }
//         }
//       }
//     };
//     window.addEventListener('keydown', handleKeyDown);
//     return () => window.removeEventListener('keydown', handleKeyDown);
//   }, [currentView]);

  // Set initial background color on mount
  useEffect(() => {
    if (tshirtDivRef.current) {
      tshirtDivRef.current.style.backgroundColor = tshirtColor;
    }
  }, [tshirtColor]);

  // URLs for front and back T-shirt images
  const tshirtImages = {
    front:
      '/crew_front (Copy).png',
     back:
      '/crew_back.png', // Example back image placeholder, replace with your own
  };
  console.log('currentView', currentView);
    return (
        <div className="flex flex-col md:flex-row h-screen bg-gray-100 gap-4 p-4">
            <div className="w-full md:w-[30%]">
                <SelectDesign/>
            </div>
            <div className="w-full md:w-[40%]">
                <TshirtDesigner tshirtImages={tshirtImages}
                    currentView={currentView}
                    switchView={switchView}
                    frontCanvasRef={frontCanvasRef}
                    backCanvasRef={backCanvasRef}
                    handleColorChange={handleColorChange}
                    tshirtColor={tshirtColor}
                    tshirtDivRef={tshirtDivRef}
                    fabricFrontCanvasRef={fabricFrontCanvasRef}
                    fabricBackCanvasRef={fabricBackCanvasRef}
                    canvasStatesRef={canvasStatesRef}
                    setCurrentView={setCurrentView}
                    setTshirtColor={setTshirtColor}

                />
            </div>
            <div className="w-full md:w-[30%] ">
                <PickColor handleColorChange={(color: string) => {
                    setTshirtColor(color);
                    if (tshirtDivRef.current) {
                        tshirtDivRef.current.style.backgroundColor = color;
                    }
                }} />
            </div>
        </div>

    );
};

export default Index;
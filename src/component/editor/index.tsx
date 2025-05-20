'use client';
import { useEffect, useRef, useState } from 'react';
// @ts-ignore
import * as fabric from 'fabric';
import styles from '../../Tshirt.module.css';
import backPart from "../../../public/crew_back.png"
import EditorTop from './EditorTop';

interface TshirtDesignerProps {
  tshirtImages: { front: string; back: string };
  currentView: 'front' | 'back';
  switchView: (view: 'front' | 'back') => void;
  frontCanvasRef: React.RefObject<HTMLCanvasElement>;
  backCanvasRef: React.RefObject<HTMLCanvasElement>;
  handleColorChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  tshirtColor: string;
  tshirtDivRef: React.RefObject<HTMLDivElement | null>;
  setTshirtColor: React.Dispatch<React.SetStateAction<string>>;
  fabricFrontCanvasRef: React.RefObject<fabric.Canvas | null>;
  fabricBackCanvasRef: React.RefObject<fabric.Canvas | null>;
  setCurrentView: React.Dispatch<React.SetStateAction<'front' | 'back'>>;
  isSwitchingView: boolean;
}

export default function TshirtDesigner({
  tshirtImages, 
  currentView, 
  switchView,
  handleColorChange,
  tshirtDivRef,
  backCanvasRef,
  frontCanvasRef,
  tshirtColor,
  fabricFrontCanvasRef,
  fabricBackCanvasRef,
  setCurrentView,
  isSwitchingView
}: TshirtDesignerProps) {
  
  // Ensure the back canvas is properly initialized and objects are selectable
  useEffect(() => {
    if (currentView === 'back' && fabricBackCanvasRef.current) {
      // Make sure all objects on the back canvas are selectable
      fabricBackCanvasRef.current.getObjects().forEach(obj => {
        obj.set({
          selectable: true,
          hasControls: true,
          evented: true,
          lockMovementX: false,
          lockMovementY: false,
          lockScalingX: false,
          lockScalingY: false,
          lockRotation: false,
        });
      });
      
      fabricBackCanvasRef.current.renderAll();
      fabricBackCanvasRef.current.requestRenderAll();
    }
  }, [currentView, fabricBackCanvasRef]);

  // Force update canvas on view switch
  useEffect(() => {
    if (!isSwitchingView) {
      const activeCanvas = currentView === 'front' 
        ? fabricFrontCanvasRef.current 
        : fabricBackCanvasRef.current;
      
      if (activeCanvas) {
        setTimeout(() => {
          // Ensure all objects are selectable again after view switch
          activeCanvas.getObjects().forEach(obj => {
            obj.set({
              selectable: true,
              hasControls: true,
              evented: true,
              lockMovementX: false,
              lockMovementY: false,
              lockScalingX: false,
              lockScalingY: false,
              lockRotation: false,
              dirty: true
            });
          });
          
          activeCanvas.setViewportTransform([1, 0, 0, 1, 0, 0]);
          activeCanvas.renderAll();
          activeCanvas.requestRenderAll();
        }, 100);
      }
    }
  }, [currentView, isSwitchingView, fabricFrontCanvasRef, fabricBackCanvasRef]);

  return (
    <div className="container mx-auto p-4 bg-white rounded h-full border border-gray-200 rounded">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-1">
          {/* View switch buttons */}
          <EditorTop
            currentView={currentView}
            switchView={switchView}
          />

          {/* T-shirt design area */}
          <div
            id="tshirt-div"
            ref={tshirtDivRef}
            className="relative w-[451px] h-[537px] bg-white mx-auto"
            style={{ backgroundColor: tshirtColor }}
          >
            <img
              id="tshirt-backgroundpicture"
              src={tshirtImages[currentView]}
              className="absolute w-full h-full object-contain"
              alt={`T-shirt ${currentView} view`}
              draggable={false}
            />

            <div className={styles.drawingArea}>
              <div className={styles.canvasContainer}>
                {/* Front canvas */}
                <div style={{ display: currentView === 'front' ? 'block' : 'none' }}>
                  <canvas
                    ref={frontCanvasRef}
                    id="tshirt-canvas-front"
                    width={200}
                    height={400}
                    className={styles.canvas}
                  />
                </div>

                {/* Back canvas */}
                <div style={{ display: currentView === 'back' ? 'block' : 'none' }}>
                  <canvas
                    ref={backCanvasRef}
                    id="tshirt-canvas-back"
                    width={200}
                    height={400}
                    className={styles.canvas}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
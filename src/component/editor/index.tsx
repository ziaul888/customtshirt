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

  
  
}


export default function TshirtDesigner({tshirtImages, currentView, switchView,handleColorChange,tshirtDivRef,backCanvasRef,
    frontCanvasRef,tshirtColor}: TshirtDesignerProps) {
  

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
                <canvas
                  ref={frontCanvasRef}
                  id="tshirt-canvas-front"
                  width={200}
                  height={400}
                  className={`${styles.canvas} ${
                    currentView === 'front' ? 'block' : 'hidden'
                  }`}
                />

                {/* Back canvas */}
                <canvas
                  ref={backCanvasRef }
                  id="tshirt-canvas-back"
                  width={200}
                  height={400}
                  className={`${styles.canvas} ${
                    currentView === 'back' ? 'block' : 'hidden'
                  }`}
                />
              </div>
            </div>
          </div>
        </div>

        {/* <div className="flex-1 max-w-md">
          <div className="space-y-4">
            <p className="text-sm text-gray-600">
              To remove a loaded picture on the T-Shirt select it and press the{' '}
              <kbd className="px-2 py-1 bg-gray-200 rounded">DEL</kbd> key.
            </p>
            <div>
              <label htmlFor="tshirt-color" className="block mb-2">
                T-Shirt Color:
              </label>
              <select
                id="tshirt-color"
                onChange={handleColorChange}
                className="w-full p-2 border rounded"
                value={tshirtColor}
              >
                <option value="#ffffff">White</option>
                <option value="#000000">Black</option>
                <option value="#ff0000">Red</option>
                <option value="#008000">Green</option>
                <option value="#ffff00">Yellow</option>
              </select>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
}

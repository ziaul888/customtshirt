import React from 'react';
import * as fabric from 'fabric';
import { Button } from '@/components/ui/button';
import { useDesignStore } from '@/stores';

interface TshirtDesignerProps {
  exportDesign: (format?: 'png' | 'jpg' | 'svg', quality?: number) => Promise<void>;
  tshirtImages: {
    front: string;
    back: string;
  };
  currentView: 'front' | 'back';
  switchView: (view: 'front' | 'back') => void;
  frontCanvasRef?: React.RefObject<HTMLCanvasElement>;
  backCanvasRef?: React.RefObject<HTMLCanvasElement>;
  handleColorChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  tshirtColor: string;
  tshirtDivRef?: React.RefObject<HTMLDivElement>;
  fabricFrontCanvasRef?: React.RefObject<fabric.Canvas | null>;
  fabricBackCanvasRef?: React.RefObject<fabric.Canvas | null>;
  setCurrentView: (view: 'front' | 'back') => void;
  setTshirtColor: (color: string) => void;
  isSwitchingView: boolean;
  // New props for sleeve colors
  sleeveColors?: {
    left: string;
    right: string;
    body: string;
  };
  handleSleeveColorChange?: (part: 'left' | 'right' | 'body', color: string) => void;
}

const TshirtDesigner: React.FC<TshirtDesignerProps> = ({
                                                         exportDesign,
                                                         tshirtImages,
                                                         currentView,
                                                         switchView,
                                                         frontCanvasRef,
                                                         backCanvasRef,
                                                         handleColorChange,
                                                         tshirtColor,
                                                         tshirtDivRef,
                                                         fabricFrontCanvasRef,
                                                         fabricBackCanvasRef,
                                                         setCurrentView,
                                                         setTshirtColor,
                                                         isSwitchingView,
                                                         sleeveColors,
                                                         handleSleeveColorChange
                                                       }) => {
  const { resetDesign, undoLastAction } = useDesignStore();
  
  const handleExport = async (format: 'png' | 'jpg' | 'svg' = 'png') => {
    try {
      await exportDesign(format, 1);
    } catch (error) {
      console.error('Export failed:', error);
    }
  };

  return (
      <div className="bg-card p-6 rounded-lg shadow-lg h-full border border-border">
        <div className="flex justify-center gap-4 mb-4">
          <Button
            onClick={resetDesign}
            variant="outline"
            className="px-6 py-2 cursor-pointer rounded-[4px] transition-colors"
          >
            Reset
          </Button>
          <Button
            type="button"
            onClick={undoLastAction}
            variant="outline"
            className="px-6 py-2 cursor-pointer rounded-[4px] transition-colors"
          >
            Undo
          </Button>
        </div>
        {/* <h2 className="text-2xl font-bold mb-6 text-center">T-Shirt Designer</h2> */}

        {/* View Controls */}
        {/* <div className="flex justify-center mb-6">
          <div className="tshirt-view-controls">
            <button
                onClick={() => switchView('front')}
                //disabled={isSwitchingView}
                className={`view-button ${currentView === 'front' ? 'active' : ''}`}
            >
              Front View
            </button>
            <button
                onClick={() => switchView('back')}
               // disabled={isSwitchingView}
                className={`view-button ${currentView === 'back' ? 'active' : ''}`}
            >
              Back View
            </button>
          </div>
        </div> */}

        {/* T-Shirt Display Area */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div
                ref={tshirtDivRef}
                className="tshirt-container"
                style={{
                  width: '550px',
                  height: '658px',
                  position: 'relative',
                  backgroundColor: sleeveColors?.body || tshirtColor,
                  backgroundImage: `url(${tshirtImages[currentView]})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat'
                }}
            >
              {/* Individual sleeve coloring layers */}
              {sleeveColors && (
                  <>
                    <div
                        className="sleeve-left"
                        style={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          width: '100%',
                          height: '100%',
                          backgroundColor: sleeveColors.left,
                          clipPath: 'polygon(0% 0%, 33% 0%, 25% 50%, 12% 100%, 0% 100%)',
                          zIndex: 1
                        }}
                    />
                    <div
                        className="sleeve-right"
                        style={{
                          position: 'absolute',
                          top: 0,
                          right: "-13px",
                          width: '100%',
                          height: '100%',
                          backgroundColor: sleeveColors.right,
                          clipPath: 'polygon(65% 0%, 100% 0%, 100% 100%, 86% 100%, 66% 24%)',
                          zIndex: 1
                        }}
                    />
                    <div
                        className="tshirt-body"
                        style={{
                          position: 'absolute',
                          top: 0,
                          left: "2px",
                          width: '100%',
                          height: '100%',
                          backgroundColor: sleeveColors.body,
                          clipPath: 'polygon(14% 0%, 86% 0%, 51% 100%, 43% 100%)',
                          zIndex: 1
                        }}
                    />
                  </>
              )}

              {/* T-shirt outline/design image */}
              <img
                  src={tshirtImages[currentView]}
                  alt={`T-shirt ${currentView} view`}
                  className="tshirt-image"
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    zIndex: 2,
                    pointerEvents: 'none'
                  }}
              />

              {/* Canvas Container */}
              <div
                  className="canvas-container"
                  style={{
                    position: 'absolute',
                    top: '15%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    zIndex: 3
                  }}
              >
                {/* Front Canvas */}
                <div style={{ display: currentView === 'front' ? 'block' : 'none' }}>
                  <canvas
                      ref={frontCanvasRef}
                      width={220}
                      height={400}
                      style={{
                        border: '1px solid rgba(0,0,0,0.1)',
                        backgroundColor: 'transparent'
                      }}
                  />
                </div>

                {/* Back Canvas */}
                <div style={{ display: currentView === 'back' ? 'block' : 'none' }}>
                  <canvas
                      ref={backCanvasRef}
                      width={230}
                      height={400}
                      style={{
                       // border: '1px solid rgba(0,0,0,0.1)',
                        backgroundColor: 'transparent'
                      }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center mb-6">
        <div className="flex gap-4">
          <Button
            className={`flex cursor-pointer text-black items-center px-4 py-2 rounded-[4px] border border-gray-300 bg-white hover:bg-black hover:text-white transition-colors ${
              currentView === 'front' ? 'border-blue-600 border-2' : ''
            }`}
            onClick={() => setCurrentView('front')}
            
            title="Front"
          >
            {/* Front Icon */}
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <rect x="6" y="4" width="12" height="16" rx="2" stroke="currentColor" />
              <path d="M6 8h12" stroke="currentColor" />
            </svg>
            Front
          </Button>
          <Button
            className={`flex cursor-pointer text-black items-center px-4 py-2 rounded-[4px] border border-gray-300 bg-white hover:bg-black hover:text-white transition-colors ${
              currentView === 'back' ? 'border-blue-600 border-2' : ''
            }`}
            onClick={() => setCurrentView('back')}
            title="Back"
          >
            {/* Back Icon */}
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <rect x="6" y="4" width="12" height="16" rx="2" stroke="currentColor" />
              <path d="M6 16h12" stroke="currentColor" />
            </svg>
            Back
          </Button>
          <Button
            className="flex cursor-pointer text-black items-center px-4 py-2 rounded-[4px] border border-gray-300 bg-white hover:bg-black hover:text-white transition-colors"
            onClick={() => {/* handle left view if needed */}}
            type="button"
            title="Left"
          >
            {/* Left Icon */}
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <rect x="6" y="4" width="12" height="16" rx="2" stroke="currentColor" />
              <path d="M6 12h4" stroke="currentColor" />
              <path d="M8 10l-2 2 2 2" stroke="currentColor" />
            </svg>
            Left
          </Button>
          <Button
            className="flex cursor-pointer text-black items-center px-4 py-2 rounded-[4px] border border-gray-300 bg-white hover:bg-black hover:text-white transition-colors"
            onClick={() => {/* handle right view if needed */}}
            type="button"
            title="Right"
          >
            {/* Right Icon */}
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <rect x="6" y="4" width="12" height="16" rx="2" stroke="currentColor" />
              <path d="M14 12h4" stroke="currentColor" />
              <path d="M16 10l2 2-2 2" stroke="currentColor" />
            </svg>
            Right
          </Button>
        </div>
        </div>

        {/* Status Display */}

      </div>
  );
};

export default TshirtDesigner;
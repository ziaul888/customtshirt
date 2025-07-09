import React from 'react';
import * as fabric from 'fabric';

interface TshirtDesignerProps {
  exportDesign: (format?: 'png' | 'jpg' | 'svg', quality?: number) => Promise<void>;
  tshirtImages: {
    front: string;
    back: string;
  };
  currentView: 'front' | 'back';
  switchView: (view: 'front' | 'back') => void;
  frontCanvasRef: React.RefObject<HTMLCanvasElement>;
  backCanvasRef: React.RefObject<HTMLCanvasElement>;
  handleColorChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  tshirtColor: string;
  tshirtDivRef: React.RefObject<HTMLDivElement>;
  fabricFrontCanvasRef: React.RefObject<fabric.Canvas>;
  fabricBackCanvasRef: React.RefObject<fabric.Canvas>;
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
  const handleExport = async (format: 'png' | 'jpg' | 'svg' = 'png') => {
    try {
      await exportDesign(format, 1);
    } catch (error) {
      console.error('Export failed:', error);
    }
  };

  return (
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">T-Shirt Designer</h2>

        {/* View Controls */}
        <div className="flex justify-center mb-6">
          <div className="tshirt-view-controls">
            <button
                onClick={() => switchView('front')}
                disabled={isSwitchingView}
                className={`view-button ${currentView === 'front' ? 'active' : ''}`}
            >
              Front View
            </button>
            <button
                onClick={() => switchView('back')}
                disabled={isSwitchingView}
                className={`view-button ${currentView === 'back' ? 'active' : ''}`}
            >
              Back View
            </button>
          </div>
        </div>

        {/* T-Shirt Display Area */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div
                ref={tshirtDivRef}
                className="tshirt-container"
                style={{
                  width: '300px',
                  height: '358px',
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
                          right: 0,
                          width: '100%',
                          height: '100%',
                          backgroundColor: sleeveColors.right,
                          clipPath: 'polygon(81% 0%, 100% 0%, 100% 100%, 76% 100%, 73% 35%)',
                          zIndex: 1
                        }}
                    />
                    <div
                        className="tshirt-body"
                        style={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
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
                    top: '45px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    zIndex: 3
                  }}
              >
                {/* Front Canvas */}
                <div style={{ display: currentView === 'front' ? 'block' : 'none' }}>
                  <canvas
                      ref={frontCanvasRef}
                      width={200}
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
                      width={200}
                      height={400}
                      style={{
                        border: '1px solid rgba(0,0,0,0.1)',
                        backgroundColor: 'transparent'
                      }}
                  />
                </div>
              </div>
            </div>

            {/* Loading Overlay */}
            {isSwitchingView && (
                <div className="loading-overlay">
                  <div className="loading-spinner"></div>
                </div>
            )}
          </div>
        </div>


        {/* Status Display */}

      </div>
  );
};

export default TshirtDesigner;
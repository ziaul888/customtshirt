import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import * as fabric from 'fabric';
import { DesignStore, SleeveColors, CanvasStates } from './types';

export const useDesignStore = create<DesignStore>()(
  devtools(
    (set, get) => ({
      // Initial state
      currentView: 'front',
      tshirtColor: '#ffffff',
      sleeveColors: {
        left: '#000000',
        right: '#000000',
        body: '#000000',
      },
      isSwitchingView: false,
      fabricFrontCanvasRef: null,
      fabricBackCanvasRef: null,
      canvasStates: {
        front: null,
        back: null,
      },
      tshirtImages: {
        front: '/crew_front (Copy).png',
        back: '/crew_back.png',
      },

      // View management actions
      setCurrentView: (view) => {
        set({ currentView: view }, false, 'setCurrentView');
      },

      setIsSwitchingView: (switching) => {
        set({ isSwitchingView: switching }, false, 'setIsSwitchingView');
      },

      switchView: async (view) => {
        const state = get();
        if (view === state.currentView) return;

        set({ isSwitchingView: true }, false, 'switchView/start');

        // Save current canvas state before switching
        const currentCanvas = state.currentView === 'front'
          ? state.fabricFrontCanvasRef?.current
          : state.fabricBackCanvasRef?.current;

        if (currentCanvas) {
          const newCanvasStates = { ...state.canvasStates };
          newCanvasStates[state.currentView] = currentCanvas.toJSON();
          set({ canvasStates: newCanvasStates }, false, 'switchView/saveState');
        }

        // Switch to the new view
        set({ currentView: view }, false, 'switchView/setView');

        // Load the new canvas state after a small delay
        setTimeout(() => {
          const newState = get();
          const newCanvas = view === 'front'
            ? newState.fabricFrontCanvasRef?.current
            : newState.fabricBackCanvasRef?.current;

          if (newCanvas) {
            if (newState.canvasStates[view]) {
              newCanvas.loadFromJSON(newState.canvasStates[view], () => {
                // Force re-render of all objects
                newCanvas.getObjects().forEach(obj => {
                  obj.set({
                    dirty: true,
                    selectable: true,
                    hasControls: true
                  });
                });
                newCanvas.renderAll();
                newCanvas.requestRenderAll();
                set({ isSwitchingView: false }, false, 'switchView/complete');
              });
            } else {
              newCanvas.clear();
              newCanvas.renderAll();
              set({ isSwitchingView: false }, false, 'switchView/complete');
            }
          } else {
            set({ isSwitchingView: false }, false, 'switchView/complete');
          }
        }, 50);
      },

      // Color management actions
      setTshirtColor: (color) => {
        set({ tshirtColor: color }, false, 'setTshirtColor');
      },

      setSleeveColors: (colors) => {
        set({ sleeveColors: colors }, false, 'setSleeveColors');
      },

      handleSleeveColorChange: (part, color) => {
        const state = get();
        const newColors = {
          ...state.sleeveColors,
          [part]: color
        };
        
        set({ sleeveColors: newColors }, false, 'handleSleeveColorChange');
        get().updateTshirtColors(newColors.left, newColors.right, newColors.body);
      },

      updateTshirtColors: (leftColor, rightColor, bodyColor) => {
        // This function is implemented at the component level since Zustand shouldn't directly manipulate DOM
        // Components that need this functionality should implement their own updateTshirtColors function
        console.log('Updating t-shirt colors:', { leftColor, rightColor, bodyColor });
      },

      // Canvas management actions
      setCanvasRefs: (frontRef, backRef) => {
        set({
          fabricFrontCanvasRef: frontRef,
          fabricBackCanvasRef: backRef
        }, false, 'setCanvasRefs');
      },

      saveCanvasState: (view, state) => {
        const currentStates = get().canvasStates;
        set({
          canvasStates: {
            ...currentStates,
            [view]: state
          }
        }, false, 'saveCanvasState');
      },

      // Design actions
      addEmoji: (emoji) => {
        const state = get();
        const fabricCanvas = state.currentView === 'front'
          ? state.fabricFrontCanvasRef?.current
          : state.fabricBackCanvasRef?.current;

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
          
          // Save the canvas state
          get().saveCanvasState(state.currentView, fabricCanvas.toJSON());
        }
      },

      addImage: (file) => {
        const state = get();
        
        // Basic validation
        if (!file || !file.type.startsWith('image/')) {
          alert("Please select a valid image file");
          return;
        }

        const fabricCanvas = state.currentView === 'front'
          ? state.fabricFrontCanvasRef?.current
          : state.fabricBackCanvasRef?.current;

        if (!fabricCanvas) {
          console.error("Canvas is not initialized");
          return;
        }

        const objectUrl = URL.createObjectURL(file);
        const imgElement = new Image();
        
        imgElement.onload = () => {
          const fabricImage = new fabric.Image(imgElement, {
            left: fabricCanvas.getCenter().left,
            top: fabricCanvas.getCenter().top,
            originX: 'center',
            originY: 'center',
            scaleX: Math.min(0.5, 200 / imgElement.width),
            scaleY: Math.min(0.5, 200 / imgElement.height)
          });

          fabricCanvas.add(fabricImage);
          fabricCanvas.setActiveObject(fabricImage);
          fabricCanvas.renderAll();
          
          // Save the canvas state
          get().saveCanvasState(state.currentView, fabricCanvas.toJSON());
          
          URL.revokeObjectURL(objectUrl);
        };

        imgElement.onerror = () => {
          console.error("Failed to load image");
          URL.revokeObjectURL(objectUrl);
          alert("Failed to load the selected image");
        };

        imgElement.src = objectUrl;
      },

      addText: (text, options = {}) => {
        const state = get();
        const fabricCanvas = state.currentView === 'front'
          ? state.fabricFrontCanvasRef?.current
          : state.fabricBackCanvasRef?.current;

        if (fabricCanvas) {
          const textObject = new fabric.Text(text, {
            left: fabricCanvas.getWidth() / 2,
            top: fabricCanvas.getHeight() / 2,
            fontSize: 24,
            originX: 'center',
            originY: 'center',
            selectable: true,
            hasControls: true,
            ...options
          });
          
          fabricCanvas.add(textObject);
          fabricCanvas.setActiveObject(textObject);
          fabricCanvas.renderAll();
          
          // Save the canvas state
          get().saveCanvasState(state.currentView, fabricCanvas.toJSON());
        }
      },

      clearCanvas: (view) => {
        const state = get();
        const targetView = view || state.currentView;
        const fabricCanvas = targetView === 'front'
          ? state.fabricFrontCanvasRef?.current
          : state.fabricBackCanvasRef?.current;

        if (fabricCanvas) {
          fabricCanvas.clear();
          fabricCanvas.renderAll();
          
          // Clear the canvas state
          get().saveCanvasState(targetView, null);
        }
      },

      undoLastAction: () => {
        const state = get();
        const fabricCanvas = state.currentView === 'front'
          ? state.fabricFrontCanvasRef?.current
          : state.fabricBackCanvasRef?.current;

        if (fabricCanvas) {
          const objects = fabricCanvas.getObjects();
          if (objects.length > 0) {
            fabricCanvas.remove(objects[objects.length - 1]);
            fabricCanvas.renderAll();
            
            // Save the updated canvas state
            get().saveCanvasState(state.currentView, fabricCanvas.toJSON());
          }
        }
      },

      resetDesign: () => {
        const state = get();
        
        // Clear both canvases
        if (state.fabricFrontCanvasRef?.current) {
          state.fabricFrontCanvasRef.current.clear();
        }
        if (state.fabricBackCanvasRef?.current) {
          state.fabricBackCanvasRef.current.clear();
        }
        
        // Reset all state
        set({
          tshirtColor: '#ffffff',
          sleeveColors: {
            left: '#ffffff',
            right: '#ffffff',
            body: '#ffffff'
          },
          canvasStates: {
            front: null,
            back: null
          },
          currentView: 'front'
        }, false, 'resetDesign');
      },
    }),
    {
      name: 'design-store',
    }
  )
);
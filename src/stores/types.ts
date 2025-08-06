import * as fabric from 'fabric';

// T-shirt customization types
export interface SleeveColors {
  left: string;
  right: string;
  body: string;
}

export interface CanvasStates {
  front: any | null;
  back: any | null;
}

export interface TshirtImages {
  front: string;
  back: string;
}

// Design store state interface
export interface DesignState {
  // T-shirt properties
  currentView: 'front' | 'back';
  tshirtColor: string;
  sleeveColors: SleeveColors;
  isSwitchingView: boolean;
  
  // Canvas references and states
  fabricFrontCanvasRef: React.MutableRefObject<fabric.Canvas | null> | null;
  fabricBackCanvasRef: React.MutableRefObject<fabric.Canvas | null> | null;
  canvasStates: CanvasStates;
  
  // T-shirt images
  tshirtImages: TshirtImages;
}

// Design store actions interface
export interface DesignActions {
  // View management
  setCurrentView: (view: 'front' | 'back') => void;
  switchView: (view: 'front' | 'back') => Promise<void>;
  setIsSwitchingView: (switching: boolean) => void;
  
  // Color management
  setTshirtColor: (color: string) => void;
  setSleeveColors: (colors: SleeveColors) => void;
  handleSleeveColorChange: (part: 'left' | 'right' | 'body', color: string) => void;
  updateTshirtColors: (leftColor: string, rightColor: string, bodyColor: string) => void;
  
  // Canvas management
  setCanvasRefs: (
    frontRef: React.MutableRefObject<fabric.Canvas | null>,
    backRef: React.MutableRefObject<fabric.Canvas | null>
  ) => void;
  saveCanvasState: (view: 'front' | 'back', state: any) => void;
  
  // Design actions
  addEmoji: (emoji: string) => void;
  addImage: (file: File) => void;
  addText: (text: string, options?: Partial<fabric.Text>) => void;
  clearCanvas: (view?: 'front' | 'back') => void;
  undoLastAction: () => void;
  resetDesign: () => void;
}

// UI store state interface
export interface UIState {
  selectedDesign: string;
  sidebarOpen: boolean;
}

// UI store actions interface
export interface UIActions {
  setSelectedDesign: (design: string) => void;
  setSidebarOpen: (open: boolean) => void;
  handleDesignSelect: (design: string) => void;
}

// Combined store types
export type DesignStore = DesignState & DesignActions;
export type UIStore = UIState & UIActions;
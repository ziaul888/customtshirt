# Zustand Store Setup - Custom T-Shirt App

This guide explains how to use the Zustand stores in your custom t-shirt application.

## Store Structure

The application uses two main stores:

### 1. Design Store (`useDesignStore`)
Manages all t-shirt customization state:
- T-shirt colors and view (front/back)
- Canvas states and fabric.js references
- Design actions (add text, emojis, images)

### 2. UI Store (`useUIStore`)
Manages UI-specific state:
- Selected design tool (text, image, emoji, shapes)
- Sidebar state

## Usage Examples

### Using the Design Store

```typescript
import { useDesignStore } from '@/stores';

const MyComponent = () => {
  const {
    // State
    currentView,
    tshirtColor,
    sleeveColors,
    
    // Actions
    switchView,
    setTshirtColor,
    handleSleeveColorChange,
    addText,
    addEmoji,
    addImage,
    resetDesign
  } = useDesignStore();

  const handleAddCustomText = () => {
    addText("Hello World", {
      fontSize: 24,
      fill: "#ff0000",
      fontFamily: "Arial"
    });
  };

  return (
    <div>
      <button onClick={() => switchView('front')}>Front View</button>
      <button onClick={() => switchView('back')}>Back View</button>
      <button onClick={handleAddCustomText}>Add Text</button>
      <button onClick={() => addEmoji('😀')}>Add Emoji</button>
    </div>
  );
};
```

### Using the UI Store

```typescript
import { useUIStore } from '@/stores';

const Sidebar = () => {
  const { selectedDesign, handleDesignSelect } = useUIStore();

  return (
    <div>
      <button 
        onClick={() => handleDesignSelect('text')}
        className={selectedDesign === 'text' ? 'active' : ''}
      >
        Text Tool
      </button>
      <button 
        onClick={() => handleDesignSelect('image')}
        className={selectedDesign === 'image' ? 'active' : ''}
      >
        Image Tool
      </button>
    </div>
  );
};
```

## Key Features

### 1. Automatic State Persistence
- Canvas states are automatically saved when switching views
- All design changes are tracked

### 2. Type Safety
- Full TypeScript support with strict typing
- IntelliSense for all store methods and state

### 3. DevTools Integration
- Redux DevTools support for debugging
- Time-travel debugging capabilities

### 4. Clean Separation of Concerns
- Design logic separated from UI logic
- Easy to test and maintain

## Store Actions

### Design Store Actions

- `switchView(view)` - Switch between front/back view
- `setTshirtColor(color)` - Set main t-shirt color
- `handleSleeveColorChange(part, color)` - Change individual sleeve colors
- `addText(text, options?)` - Add text to canvas
- `addEmoji(emoji)` - Add emoji to canvas
- `addImage(file)` - Add image to canvas
- `clearCanvas(view?)` - Clear current or specific canvas
- `undoLastAction()` - Remove last added object
- `resetDesign()` - Reset entire design

### UI Store Actions

- `setSelectedDesign(design)` - Change active design tool
- `handleDesignSelect(design)` - Handle design tool selection
- `setSidebarOpen(open)` - Toggle sidebar visibility

## Migration from useState

Before (with useState):
```typescript
const [currentView, setCurrentView] = useState('front');
const [tshirtColor, setTshirtColor] = useState('#ffffff');
// ... lots of state variables
```

After (with Zustand):
```typescript
const { 
  currentView, 
  tshirtColor, 
  switchView, 
  setTshirtColor 
} = useDesignStore();
```

## Benefits

1. **Centralized State**: All related state is in one place
2. **No Prop Drilling**: Access state from any component
3. **Better Performance**: Only re-renders components that use changed state
4. **Developer Experience**: Better debugging and development tools
5. **Type Safety**: Full TypeScript support prevents runtime errors
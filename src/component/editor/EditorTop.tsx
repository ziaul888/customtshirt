import React from 'react';
import { RefreshCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
interface EditorTop {
    currentView: 'front' | 'back';
    switchView: (view: 'front' | 'back') => void;
}

const EditorTop: React.FC<EditorTop> = ({currentView, switchView}) => {


    return (
        <div className="mb-4 flex justify-center space-x-4 bg-gray-100 p-4 rounded">
          <Button
            className="px-4 py-3 rounded bg-blue-500 cursor-pointer hover:bg-blue-300 transition"
            onClick={() => switchView(currentView === 'front' ? 'back' : 'front')}
            title="Toggle Front/Back"
          >
            <RefreshCcw />
          </Button>
          <Button
            className="px-4 py-3 rounded bg-green-500 cursor-pointer hover:bg-green-300 transition"
            onClick={() => {/* capture logic here */}}
            title="Capture"
          >
            Capture
          </Button>
          <Button
            className="px-4 py-3 rounded bg-red-500 cursor-pointer hover:bg-red-300 transition"
            onClick={() => {/* delete logic here */}}
            title="Delete"
          >
            Delete
          </Button>
        </div>
    );
};

export default EditorTop;
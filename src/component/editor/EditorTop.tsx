import React from 'react';
import { RefreshCcw } from 'lucide-react';
interface EditorTop {
    currentView: 'front' | 'back';
    switchView: (view: 'front' | 'back') => void;
}

const EditorTop: React.FC<EditorTop> = ({currentView, switchView}) => {


    return (
        <div className="mb-4 flex justify-center space-x-4 bg-gray-100 p-4 rounded">
          <button
            className="px-4 py-3 rounded bg-blue-500 cursor-pointer hover:bg-blue-300 transition"
            onClick={() => switchView(currentView === 'front' ? 'back' : 'front')}
            title="Toggle Front/Back"
          >
            <RefreshCcw />
          </button>
          </div>
    );
};

export default EditorTop;
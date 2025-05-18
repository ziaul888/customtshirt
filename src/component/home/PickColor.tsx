import React from 'react';

const PickColor:React.FC = () => {
    return (
        <aside className="bg-white h-full p-4 flex-1 flex  flex-col">
            {/*<h2 className="text-xl font-semibold mb-4">Properties</h2>*/}
            {/*/!* Placeholder for object editing UI *!/*/}
            {/*<div className="flex-1 space-y-4 overflow-y-auto">*/}
            {/*    <label className="block">*/}
            {/*        <span className="text-gray-700">Color</span>*/}
            {/*        <input type="color" className="mt-1 block w-full h-10 p-1 border rounded"/>*/}
            {/*    </label>*/}
            {/*    <label className="block">*/}
            {/*        <span className="text-gray-700">Font Size</span>*/}
            {/*        <input type="number" className="mt-1 block w-full border rounded p-1"/>*/}
            {/*    </label>*/}
            {/*    /!* More dynamic settings *!/*/}
            {/*</div>*/}
        </aside>
    );
};

export default PickColor;
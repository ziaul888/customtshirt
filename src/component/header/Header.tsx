import { Button } from '@/components/ui/button';
import React from 'react';
import { ImageDown } from 'lucide-react';
import { Share } from 'lucide-react';
import { ShoppingBag } from 'lucide-react';

const Header: React.FC = () => {
    return (
        <header  className="w-full flex justify-between bg-white shadow border-b border-gray-200 px-6 py-3">
          <h1 className="text-2xl font-bold text-gray-800">InkThread</h1>
          <div className="flex justify-between items-center text-gray-600 gap-4">
            <Button className="rounded-[4px] bg-white text-black hover:bg-black hover:text-white border border-black cursor-pointer">
                <ImageDown className="w-4 h-4 mr-1" />
                Save
            </Button>
              <Button className="rounded-[4px] bg-white text-black hover:bg-black hover:text-white border border-black cursor-pointer">
                <Share className="w-4 h-4 mr-1" />
                Share
            </Button>
              <Button className="rounded-[4px] bg-white text-black hover:bg-black hover:text-white border border-black cursor-pointer">
                <ShoppingBag className="w-4 h-4 mr-1" />
                Add to Cart
            </Button>

          </div>
       </header>
);
};

export default Header;

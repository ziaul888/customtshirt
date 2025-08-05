import { Button } from '@/components/ui/button';
import React from 'react';
import { ImageDown } from 'lucide-react';
import { Share } from 'lucide-react';
import { ShoppingBag } from 'lucide-react';

const Header: React.FC = () => {
    return (
        <header className="w-full bg-white shadow border-b border-gray-200 px-6 py-3 sticky top-0 z-50">
          <div className="container mx-auto flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-800">InkThread</h1>
            <div className="flex justify-between items-center text-gray-600 gap-4">
              <Button className="rounded-[4px] bg-white text-black hover:bg-black hover:text-white border border-gray-300 cursor-pointer">
                  <ImageDown className="w-4 h-4 mr-1" />
                  Save
              </Button>
              <Button className="rounded-[4px] bg-white text-black hover:bg-black hover:text-white border border-gray-300 cursor-pointer">
                  <Share className="w-4 h-4 mr-1" />
                  Share
              </Button>
              <Button className="rounded-[4px] bg-white text-black hover:bg-black hover:text-white border border-gray-300 cursor-pointer">
                  <ShoppingBag className="w-4 h-4 mr-1" />
                  Add to Cart
              </Button>
              <Button className="rounded-[4px] bg-white text-black hover:bg-black hover:text-white border border-gray-300 cursor-pointer">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-3A2.25 2.25 0 008.25 5.25V9m7.5 0v.75A2.25 2.25 0 0113.5 12h-3A2.25 2.25 0 018.25 9.75V9m7.5 0H8.25m7.5 0a2.25 2.25 0 012.25 2.25v7.5A2.25 2.25 0 0115.75 21h-7.5A2.25 2.25 0 016 19.75v-7.5A2.25 2.25 0 018.25 9h7.5z" />
                  </svg>
                  Login
              </Button>
            </div>
          </div>
        </header>
);
};

export default Header;

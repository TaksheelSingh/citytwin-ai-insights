
import React from 'react';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Search, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header = () => {
  return (
    <header className="bg-white border-b border-slate-200 px-4 h-16 flex items-center justify-between">
      <div className="flex items-center">
        <SidebarTrigger className="mr-4" />
        <h1 className="font-bold text-lg text-slate-900">AI-Powered Digital Twin</h1>
      </div>
      <div className="flex items-center gap-2">
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search..."
            className="pl-10 pr-4 py-2 rounded-md border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"
          />
        </div>
        <Button variant="ghost" size="icon" className="rounded-full">
          <Bell className="h-5 w-5" />
        </Button>
        <div className="h-8 w-8 rounded-full bg-teal-500 text-white flex items-center justify-center font-medium">SC</div>
      </div>
    </header>
  );
};

export default Header;

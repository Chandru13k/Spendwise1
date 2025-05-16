
import React from 'react';
import { Outlet } from 'react-router-dom';
import { SideNav } from './SideNav';
import { TopBar } from './TopBar';
import { useIsMobile } from '@/hooks/use-mobile';

export function AppLayout() {
  const isMobile = useIsMobile();
  
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {!isMobile && <SideNav />}
      <div className="flex flex-col flex-1">
        <TopBar />
        <main className="flex-1 p-4 md:p-6 max-w-7xl mx-auto w-full animate-fade-in">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

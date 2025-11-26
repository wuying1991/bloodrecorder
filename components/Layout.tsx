import React from 'react';
import { Home, List, User, Sparkles, Plus } from 'lucide-react';
import { TabView } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: TabView;
  onTabChange: (tab: TabView) => void;
  onAddClick: () => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, activeTab, onTabChange, onAddClick }) => {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col max-w-md mx-auto border-x border-slate-200 shadow-2xl relative">
      {/* Main Content Area */}
      <main className="flex-1 pb-24 overflow-y-auto">
        {children}
      </main>

      {/* Floating Action Button (Add) */}
      <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-20 max-w-md w-full flex justify-center pointer-events-none">
        <button 
          onClick={onAddClick}
          className="bg-teal-600 text-white p-4 rounded-full shadow-lg shadow-teal-200 hover:bg-teal-700 active:scale-90 transition-all pointer-events-auto"
          aria-label="Add Record"
        >
          <Plus size={28} strokeWidth={3} />
        </button>
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 w-full max-w-md bg-white border-t border-slate-100 px-6 py-2 flex justify-between items-center z-10 pb-safe">
        <NavButton 
          icon={<Home size={24} />} 
          label="Home" 
          isActive={activeTab === TabView.DASHBOARD} 
          onClick={() => onTabChange(TabView.DASHBOARD)} 
        />
        <NavButton 
          icon={<List size={24} />} 
          label="History" 
          isActive={activeTab === TabView.HISTORY} 
          onClick={() => onTabChange(TabView.HISTORY)} 
        />
         {/* Spacer for FAB */}
        <div className="w-12" />
        
        <NavButton 
          icon={<Sparkles size={24} />} 
          label="AI Coach" 
          isActive={activeTab === TabView.AI_INSIGHTS} 
          onClick={() => onTabChange(TabView.AI_INSIGHTS)} 
        />
        <NavButton 
          icon={<User size={24} />} 
          label="Profile" 
          isActive={activeTab === TabView.PROFILE} 
          onClick={() => onTabChange(TabView.PROFILE)} 
        />
      </nav>
    </div>
  );
};

const NavButton: React.FC<{ icon: React.ReactNode, label: string, isActive: boolean, onClick: () => void }> = ({ icon, label, isActive, onClick }) => (
  <button 
    onClick={onClick}
    className={`flex flex-col items-center justify-center p-2 transition-colors ${isActive ? 'text-teal-600' : 'text-slate-400 hover:text-slate-600'}`}
  >
    {React.cloneElement(icon as React.ReactElement, { strokeWidth: isActive ? 3 : 2 })}
    <span className="text-[10px] font-medium mt-1">{label}</span>
  </button>
);
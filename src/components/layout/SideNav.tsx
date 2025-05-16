
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Home, 
  PlusCircle, 
  ArrowDownCircle, 
  ArrowUpCircle,
  History, 
  Settings, 
  HelpCircle,
  LogOut
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

export function SideNav() {
  const location = useLocation();
  const currentPath = location.pathname;
  const { signOut } = useAuth();
  
  return (
    <aside className="w-64 border-r h-screen bg-sidebar flex flex-col overflow-y-auto sticky top-0">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-sidebar-foreground">SpendWise</h2>
        <p className="text-sidebar-foreground/70 text-sm">Expense Management</p>
      </div>
      
      <div className="px-3">
        <Button asChild variant="secondary" className="w-full mb-4">
          <Link to="/app/add-expense">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Transaction
          </Link>
        </Button>
      </div>
      
      <nav className="space-y-1 px-3 py-2 flex-1">
        <NavItem icon={Home} label="Dashboard" href="/app/dashboard" isActive={currentPath === '/app/dashboard'} />
        <NavItem icon={ArrowDownCircle} label="Expenses" href="/app/add-expense" isActive={currentPath === '/app/add-expense'} />
        <NavItem icon={ArrowUpCircle} label="Income" href="/app/add-income" isActive={currentPath === '/app/add-income'} />
        <NavItem icon={History} label="Transactions" href="/app/transactions" isActive={currentPath === '/app/transactions'} />
      </nav>
      
      <div className="mt-auto p-3">
        <NavItem icon={Settings} label="Settings" href="/app/profile" isActive={currentPath === '/app/profile'} />
        <NavItem icon={HelpCircle} label="Help & Support" href="/app/help" isActive={currentPath === '/app/help'} />
        <button 
          onClick={() => signOut()}
          className="flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors w-full hover:bg-sidebar-accent hover:text-sidebar-accent-foreground text-sidebar-foreground"
        >
          <LogOut className="h-4 w-4" />
          Sign out
        </button>
      </div>
    </aside>
  );
}

interface NavItemProps {
  icon: React.ElementType;
  label: string;
  href: string;
  isActive?: boolean;
}

function NavItem({ icon: Icon, label, href, isActive }: NavItemProps) {
  return (
    <Link 
      to={href}
      className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground
        ${isActive 
          ? 'bg-sidebar-accent text-sidebar-accent-foreground font-medium' 
          : 'text-sidebar-foreground'
        }`}
    >
      <Icon className="h-4 w-4" />
      {label}
    </Link>
  );
}

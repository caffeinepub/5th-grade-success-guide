import React from 'react';
import { Link, Outlet, useLocation } from '@tanstack/react-router';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import {
  Home,
  BookOpen,
  FileText,
  ClipboardList,
  Calendar,
  Timer,
  Gamepad2,
  LogOut,
  GraduationCap,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navigation = [
  { name: 'Dashboard', href: '/student', icon: Home },
  { name: 'Study Tips', href: '/student/tips', icon: BookOpen },
  { name: 'Notes', href: '/student/notes', icon: FileText },
  { name: 'Quizzes', href: '/student/quizzes', icon: ClipboardList },
  { name: 'Planner', href: '/student/planner', icon: Calendar },
  { name: 'Timer', href: '/student/timer', icon: Timer },
  { name: 'Game', href: '/student/game', icon: Gamepad2 },
];

export default function StudentLayout() {
  const { user, logout } = useAuth();
  const location = useLocation();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top navigation */}
      <header className="border-b border-border bg-card sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/student" className="flex items-center gap-2">
              <GraduationCap className="h-8 w-8 text-primary" />
              <span className="font-display text-xl text-foreground">5th Grade Success</span>
            </Link>

            <div className="flex items-center gap-4">
              <div className="hidden sm:block text-sm text-right">
                <p className="font-semibold text-foreground">{user?.name}</p>
                <p className="text-muted-foreground text-xs">{user?.email}</p>
              </div>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4 sm:mr-2" />
                <span className="hidden sm:inline">Logout</span>
              </Button>
            </div>
          </div>

          {/* Navigation tabs */}
          <nav className="flex gap-1 overflow-x-auto pb-2 -mb-px">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    'flex items-center gap-2 px-3 py-2 text-sm font-medium border-b-2 whitespace-nowrap transition-colors',
                    isActive
                      ? 'border-primary text-primary'
                      : 'border-transparent text-muted-foreground hover:text-foreground hover:border-border'
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-border bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-sm text-muted-foreground">
            Built with ❤️ using{' '}
            <a
              href="https://caffeine.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}

'use client';
import React from 'react';
import { Moon, Sun, Monitor } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useThemeStore, type Theme } from '@/stores';

interface ThemeToggleProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'outline' | 'ghost';
  showLabel?: boolean;
  showSystemOption?: boolean;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({
  className = '',
  size = 'md',
  variant = 'outline',
  showLabel = false,
  showSystemOption = true,
}) => {
  const { theme, resolvedTheme, setTheme, toggleTheme } = useThemeStore();

  const handleThemeChange = (newTheme: Theme) => {
    setTheme(newTheme);
  };

  const getIcon = () => {
    if (theme === 'system') {
      return <Monitor className="h-4 w-4" />;
    }
    return resolvedTheme === 'dark' ? (
      <Moon className="h-4 w-4" />
    ) : (
      <Sun className="h-4 w-4" />
    );
  };

  const getLabel = () => {
    if (!showLabel) return null;
    
    if (theme === 'system') return 'System';
    return resolvedTheme === 'dark' ? 'Dark' : 'Light';
  };

  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-10 w-10',
    lg: 'h-12 w-12'
  };

  // Simple toggle version (just light/dark)
  if (!showSystemOption) {
    return (
      <Button
        variant={variant}
        size="icon"
        onClick={toggleTheme}
        className={`${sizeClasses[size]} ${className}`}
        aria-label={`Switch to ${resolvedTheme === 'light' ? 'dark' : 'light'} mode`}
        title={`Switch to ${resolvedTheme === 'light' ? 'dark' : 'light'} mode`}
      >
        {getIcon()}
        {showLabel && <span className="ml-2">{getLabel()}</span>}
      </Button>
    );
  }

  // Advanced version with dropdown menu
  return (
    <div className="relative inline-block">
      <div className="flex gap-1 rounded-md border bg-background p-1">
        <Button
          variant={theme === 'light' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => handleThemeChange('light')}
          className="h-8 w-8 p-0"
          aria-label="Light mode"
          title="Light mode"
        >
          <Sun className="h-4 w-4" />
        </Button>
        
        <Button
          variant={theme === 'dark' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => handleThemeChange('dark')}
          className="h-8 w-8 p-0"
          aria-label="Dark mode"
          title="Dark mode"
        >
          <Moon className="h-4 w-4" />
        </Button>
        
        <Button
          variant={theme === 'system' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => handleThemeChange('system')}
          className="h-8 w-8 p-0"
          aria-label="System mode"
          title="System mode"
        >
          <Monitor className="h-4 w-4" />
        </Button>
      </div>
      
      {showLabel && (
        <span className="mt-1 block text-center text-xs text-muted-foreground">
          {getLabel()}
        </span>
      )}
    </div>
  );
};

export default ThemeToggle;
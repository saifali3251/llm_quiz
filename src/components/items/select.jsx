// components/items/select.jsx
import React, { useState, useEffect } from 'react';
import { cn } from '../../lib/utils';

const Select = ({ children, onValueChange, defaultValue, value: controlledValue }) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(controlledValue || defaultValue || '');

  // Update internal value when controlled value changes
  useEffect(() => {
    if (controlledValue !== undefined) {
      setValue(controlledValue);
    }
  }, [controlledValue]);

  const handleValueChange = (newValue) => {
    setValue(newValue);
    onValueChange?.(newValue);
    setOpen(false);
  };

  return (
    <div className="relative">
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          // Only pass the props that each child component expects
          const childProps = {
            value,
            open,
            setOpen,
          };
          
          // Only pass onValueChange to components that need it (not DOM elements)
          if (child.type?.displayName === 'SelectContent' || child.type?.displayName === 'SelectItem') {
            childProps.onValueChange = handleValueChange;
          }
          
          return React.cloneElement(child, childProps);
        }
        return child;
      })}
    </div>
  );
};

const SelectTrigger = ({ children, className, value, open, setOpen, ...props }) => {
  return (
    <button
      type="button"
      className={cn(
        "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      onClick={() => setOpen(!open)}
      {...props}
    >
      {children}
      <svg
        className={cn("h-4 w-4 opacity-50 transition-transform", open && "rotate-180")}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    </button>
  );
};

const SelectValue = ({ placeholder, value }) => {
  return (
    <span className={cn(value ? "text-foreground" : "text-muted-foreground")}>
      {value || placeholder || "Select..."}
    </span>
  );
};

const SelectContent = ({ children, className, open, onValueChange, ...props }) => {
  if (!open) return null;

  return (
    <div
      className={cn(
        "absolute top-full left-0 right-0 z-50 mt-1 max-h-60 overflow-auto rounded-md border bg-white shadow-lg",
        className
      )}
      {...props}
    >
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, {
            onValueChange,
          });
        }
        return child;
      })}
    </div>
  );
};

const SelectItem = ({ children, value, className, onValueChange, ...props }) => {
  const handleClick = () => {
    onValueChange?.(value);
  };

  return (
    <div
      className={cn(
        "relative flex w-full cursor-pointer select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        className
      )}
      onClick={handleClick}
      {...props}
    >
      {children}
    </div>
  );
};

// Add display names for better debugging
SelectTrigger.displayName = 'SelectTrigger';
SelectValue.displayName = 'SelectValue';
SelectContent.displayName = 'SelectContent';
SelectItem.displayName = 'SelectItem';

export { Select, SelectTrigger, SelectValue, SelectContent, SelectItem };
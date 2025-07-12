// components/items/radio-group.jsx
import React from 'react';
import { cn } from '../../lib/utils';

export default function RadioGroup({ options, correctAnswer, selectedValue, onChange, disabled = false }) {
  return (
    <div className="space-y-3">
      {options?.map((option, index) => (
        <label
          key={index}
          className={`flex items-center space-x-3 cursor-pointer text-lg transition-all ${
            disabled ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          <input
            type="radio"
            name="quiz"
            value={option}
            disabled={disabled}
            checked={selectedValue === option}
            onChange={() => onChange(option)}
            className="h-5 w-5 accent-purple-600"
          />
          {/* <span>{option}</span> */}
          <span className={`${disabled && option === correctAnswer ? 'text-green-600 font-bold' : ''}`}>
            {option}
          </span>

        </label>
      ))}
    </div>
  );
}




const RadioGroup_old = React.forwardRef(({ 
  className, 
  value, 
  onValueChange, 
  children, 
  ...props 
}, ref) => {
  return (
    <div
      ref={ref}
      className={cn("grid gap-2", className)}
      role="radiogroup"
      {...props}
    >
      {React.Children.map(children, (child) => {
        // if (React.isValidElement(child) && child.type === RadioGroupItem) 
        if (
          React.isValidElement(child)
          && 
          child.type?.displayName === "RadioGroupItem"
          // child.type?.displayName === "RadioGroupItem"
        )
        // if (React.isValidElement(child) && child.props?.value !== undefined)
        {
          return React.cloneElement(child, {
            checked: value === child.props.value,
            onCheckedChange: () => onValueChange?.(child.props.value),
          });
        }
        return child;
      })}
    </div>
  );
});
RadioGroup.displayName = "RadioGroup";


const RadioGroupItem = React.forwardRef(({ 
  className, 
  children, 
  value, 
  checked, 
  onCheckedChange, 
  ...props 
}, ref) => {
  return (
    <div className="flex items-center space-x-2">
      <button
        ref={ref}
        type="button"
        role="radio"
        aria-checked={checked}
        className={cn(
          "aspect-square h-4 w-4 rounded-full border border-primary text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          checked && "bg-primary border-primary",
          className
        )}
        onClick={onCheckedChange}
        {...props}
      >
        {checked && (
          <div className="flex items-center justify-center">
            <div className="h-2 w-2 rounded-full bg-white" />
          </div>
        )}
      </button>
    </div>
  );
});
RadioGroupItem.displayName = "RadioGroupItem";

export { RadioGroup, RadioGroupItem };

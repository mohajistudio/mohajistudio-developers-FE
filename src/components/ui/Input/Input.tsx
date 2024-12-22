import React, { forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, className, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && <label className="block text-sm mb-2">{label}</label>}
        <div className="relative flex items-center bg-[#F2F3F5] rounded-lg h-[39px]">
          <input
            ref={ref}
            className="w-full h-full bg-transparent px-4 font-pretendard placeholder:text-gray-3 focus:outline-none"
            {...props}
          />
        </div>
      </div>
    );
  },
);

Input.displayName = 'Input';

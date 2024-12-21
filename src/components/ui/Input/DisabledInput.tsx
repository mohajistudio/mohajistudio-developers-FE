import React from 'react';

interface DisabledInputProps {
  value: string;
  label?: string;
  className?: string;
}

export const DisabledInput = ({
  value,
  label,
  className,
}: DisabledInputProps) => {
  return (
    <div className="w-full">
      {label && <label className="block text-sm mb-2">{label}</label>}
      <div className="relative flex items-center bg-white rounded-lg h-[39px] border-white">
        <input
          type="text"
          value={value}
          disabled
          className="w-full h-full bg-transparent px-4 font-pretendard text-[#666666] cursor-not-allowed"
        />
      </div>
    </div>
  );
};

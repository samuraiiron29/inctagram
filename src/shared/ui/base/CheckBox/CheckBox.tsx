import React from "react";
import Image from 'next/image'

type Props = {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
}

const CustomCheckbox = ({
                                                         checked,
                                                         onChange,
                                                         label,
                                                         disabled = false,
                                                       }: Props) => {
  return (
    <label className="flex items-center cursor-pointer select-none gap-2">
      <div
        className={`
          w-5 h-5 rounded border-2 flex items-center justify-center transition
          ${checked ? "bg-amber-50 border-blue-600" : "border-gray-400"}
          ${disabled ? "opacity-50 cursor-not-allowed" : ""}
        `}
        onClick={(e) => {
          e.preventDefault();
          if (!disabled) onChange(!checked);
        }}
        role="checkbox"
        aria-checked={checked}
        tabIndex={0}
        onKeyDown={(e) => {
          if (!disabled && (e.key === "Enter" || e.key === " ")) {
            e.preventDefault();
            onChange(!checked);
          }
        }}
      >
        {checked && (
          <Image src={'/check.svg'} alt={'check'} width={100} height={100} />
        )}
      </div>
      {label && <span className="text-sm">{label}</span>}
    </label>
  );
};

export default CustomCheckbox;

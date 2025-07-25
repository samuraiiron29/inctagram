import clsx from "clsx";
import { useState } from "react";

type TextAreaSize = 'large' | 'small';

type TextAreaProps = {
  label: string;
  placeholder: string;
  error?: string;
  disabled: boolean;
  value: string;
  size: TextAreaSize
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}
export const TextArea = ({label, placeholder, error, value, size, onChange, disabled = false}: TextAreaProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const sizeClass = size === 'large' 
  ? 'w-[740px] h-[84px]' 
  : 'w-[248px] h-[84px]';

   const borderColor = clsx({
    "border-danger-500": !!error,
    "border-accent-500": isFocused && !error,
    "border-dark-100": isHovered && !isFocused && !error,
    "border-dark-300": !isFocused && !isHovered && !error,
    "border-dark-700": disabled,
  });

  const textColor = clsx({
    "text-light-900": disabled,
    "text-foreground": !disabled,
  });
  
  const placeholderColor = clsx({
  "placeholder:text-dark-100": disabled,
  "placeholder:text-light-100": !disabled,
});

  return (
    <div className="flex flex-col gap-1, text-sm">  
      <label className="text-xs text-light-900">{label}</label>
      <textarea
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        disabled={disabled}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={clsx(
          "resize-none rounded-[2px] border bg-transparent p-2 outline-none transition-colors",
          "placeholder:text-light-100",
          borderColor,
          textColor,
          placeholderColor,
          {
            "bg-dark-900 cursor-not-allowed": disabled,
          }
        )}
        />
      {error && <span className="text-xs text-danger-500">{error}</span>}
    </div>
  );
}

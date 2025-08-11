import React, { ReactNode } from "react";

type PropsType = {
  children: ReactNode;
  direction?: "vertical" | "horizontal" | "both";
  className?: string;
  alwaysShowScrollbar?: boolean;
};

export const Scroll = ({
  children,
  direction = "vertical",
  className = "",
  alwaysShowScrollbar = true,
}: PropsType) => {
  const overflowClasses =
    direction === "vertical"
      ? "overflow-y-scroll overflow-x-hidden"
      : direction === "horizontal"
      ? "overflow-x-scroll overflow-y-hidden"
      : "overflow-auto";

  const scrollbarGutter = alwaysShowScrollbar ? "scrollbar-gutter-stable" : "";

  return (
    <div
      className={`${overflowClasses} ${scrollbarGutter} ${className}`}
    >
      <style jsx>{`
      div::-webkit-scrollbar {
        width: 4px;
        height: 45px;
      }
      div::-webkit-scrollbar-track {
        background: transparent;
      }
      div::-webkit-scrollbar-thumb {
        background-color: #555;
        border-radius: 9999px;
        transition: background-color 0.3s ease;
      }
      div:hover::-webkit-scrollbar-thumb {
        background-color: #999;
      }
      div::-webkit-scrollbar-button {
        display: none;
        background-color: #fff;
        width: 0;
        height: 0;
        background: transparent;
      }
      `}</style>
      {children}
    </div>
  );
};

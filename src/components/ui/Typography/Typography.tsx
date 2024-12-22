import React from "react";
import { twMerge } from "tailwind-merge";

type TypographyVariant = "heading" | "title1" | "title2" | "body" | "caption";

interface TypographyProps {
  variant: TypographyVariant;
  children: React.ReactNode;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}

const variantStyles: Record<TypographyVariant, string> = {
  // font-pretendard 클래스 추가
  heading: "font-pretendard text-[30pt] font-bold",
  title1: "font-pretendard text-[20pt] font-bold",
  title2: "font-pretendard text-[16pt] font-bold",
  body: "font-pretendard text-[16pt] font-medium",
  caption: "font-pretendard text-[14pt] font-medium",
};

export const Typography = ({
  variant,
  children,
  className = "",
  as: Component = "div",
}: TypographyProps) => {
  return (
    <Component className={twMerge(variantStyles[variant], className)}>
      {children}
    </Component>
  );
};

import { ReactNode, ButtonHTMLAttributes } from "react";
import cn from "classnames";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  className?: string;
};

const Button = ({ children, className, ...props }: Props) => {
  return (
    <button
      className={cn(
        "font-bold bg-black px-6 py-[10px] rounded text-white",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;

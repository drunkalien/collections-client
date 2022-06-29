import { ReactNode, HTMLAttributes } from "react";
import cn from "classnames";

type Props = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  className?: string;
};

const Paper = ({ children, className = "", ...otherProps }: Props) => {
  return (
    <div
      className={cn("border-[1px] rounded border-gray p-6", className)}
      {...otherProps}
    >
      {children}
    </div>
  );
};

export default Paper;

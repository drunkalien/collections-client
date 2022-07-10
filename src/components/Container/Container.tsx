import { ReactNode } from "react";
import cn from "classnames";

type Props = {
  children: ReactNode;
  className?: string;
};

const Container = ({ children, className }: Props) => {
  return (
    <div className={cn("container m-auto px-16", className)}>{children}</div>
  );
};

export default Container;

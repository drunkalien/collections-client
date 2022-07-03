import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const Container = ({ children }: Props) => {
  return <div className="container m-auto px-16">{children}</div>;
};

export default Container;

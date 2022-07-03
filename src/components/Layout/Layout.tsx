import { Header } from "components";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <div>
      <Header />
      <main className="mb-10">{children}</main>
    </div>
  );
};

export default Layout;

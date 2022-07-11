import { Container } from "components";
import { useEffect, useState } from "react";
import Link from "next/link";

import LanguagePicker from "./LanguagePicker";
import SearchInput from "./SearchInput";
import ThemePicker from "./ThemePicker";
import User from "./user";

const Header = () => {
  const [mounted, setMounted] = useState(false);

  const [burger, setBurger] = useState(false);
  const toggleBurger = () => setBurger((prev) => !prev);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const menus = [
    {
      render: <LanguagePicker />,
    },
    {
      render: <ThemePicker />,
    },
    {
      render: <User />,
    },
  ];

  return (
    <header className="border-b-[1px] border-b-gray">
      <Container>
        <div className="flex h-[100px] justify-between items-center">
          <Link href="/">
            <a>
              <div className="font-bold text-2xl italic">Collector</div>
            </a>
          </Link>
          <div className="xl:flex hidden">
            <SearchInput />
          </div>
          <div className="relative">
            <div
              className="block lg:hidden cursor-pointer"
              onClick={toggleBurger}
            >
              <Burger />
            </div>
            {burger && (
              <div className="absolute -left-[75px] top-9 w-[150px] bg-white p-3 shadow-md flex justify-center flex-col items-center gap-2">
                {menus.map(({ render }, idx) => (
                  <div key={idx}>{render}</div>
                ))}
              </div>
            )}
          </div>
          <div className="lg:flex hidden justify-center items-center h-full">
            <div className="flex gap-3">
              <LanguagePicker />
              <ThemePicker />
              <User />
            </div>
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;

const Burger = () => (
  <div className="space-y-1">
    <div className="w-8 h-1 bg-black dark:bg-white"></div>
    <div className="w-8 h-1 bg-black dark:bg-white"></div>
    <div className="w-8 h-1 bg-black dark:bg-white"></div>
  </div>
);

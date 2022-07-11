import { Container, Select, Button } from "components";
import { useTranslation } from "next-i18next";
import { useEffect, useState } from "react";
import { FiMoon, FiSun, FiUser } from "react-icons/fi";
import { useTheme } from "next-themes";
import Link from "next/link";

import LanguagePicker from "./LanguagePicker";
import { useCurrentUser } from "hooks";
import SearchInput from "./SearchInput";
import { windowIsDefined } from "utils";

const Header = () => {
  const { t } = useTranslation();
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const userQuery = useCurrentUser();

  useEffect(() => {
    setMounted(true);
  }, []);

  const themeOptions = [
    {
      value: "light",
      label: t("Light"),
    },
    {
      value: "dark",
      label: t("Dark"),
    },
  ];

  if (!mounted) {
    return null;
  }

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
          <div className="lg:flex hidden justify-center items-center h-full">
            <div className="flex items-center gap-5">
              <LanguagePicker />
              <Select
                className="dark:text-black"
                id="theme"
                icon={
                  theme === "light" ? (
                    <FiSun size={22} />
                  ) : (
                    <FiMoon size={22} className="stroke-black" />
                  )
                }
                defaultValue={themeOptions[0]}
                options={themeOptions}
                onChange={(e) => setTheme(e.value)}
              />
              {windowIsDefined() && window.localStorage.getItem("token") ? (
                <div className="cursor-pointer">
                  <Link href={`/users/${userQuery.data?.user._id}` || ""}>
                    <FiUser size={24} />
                  </Link>
                </div>
              ) : (
                <div>
                  <Link href="/login">
                    <Button className="mx-1 bg-yellow">Login</Button>
                  </Link>
                  <Link href="/signup">
                    <Button className="mx-1">Sign up</Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;

import { Input, Container, Select } from "components";
import { useTranslation } from "next-i18next";
import { useEffect, useState } from "react";
import { FiMoon, FiSun, FiUser } from "react-icons/fi";
import { useTheme } from "next-themes";
import Link from "next/link";

import LanguagePicker from "./LanguagePicker";

const Header = () => {
  const { t } = useTranslation();
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

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
              <div>Logo</div>
            </a>
          </Link>
          <div>
            <Input placeholder="Search" />
          </div>
          <div className="flex justify-center items-center h-full">
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
              <div className="cursor-pointer">
                <FiUser size={24} />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;

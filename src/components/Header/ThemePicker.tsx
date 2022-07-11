import Select from "components/Select";
import { useTranslation } from "next-i18next";
import { useTheme } from "next-themes";
import { FiMoon, FiSun } from "react-icons/fi";

const ThemePicker = () => {
  const { theme, setTheme } = useTheme();
  const { t } = useTranslation();
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
  return (
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
  );
};

export default ThemePicker;

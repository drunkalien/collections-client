import { Select } from "components";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/dist/client/router";
import { FiGlobe } from "react-icons/fi";

const LanguagePicker = () => {
  const router = useRouter();
  const { t } = useTranslation();

  const changeLanguage = (lang: string) => {
    console.log(lang);
    const { pathname, asPath, query } = router;
    router.push({ pathname, query }, asPath, { locale: lang });
  };

  const langs = [
    {
      value: "en",
      label: t("English"),
    },
    {
      value: "uz",
      label: t("Uzbek"),
    },
  ];

  return (
    <Select
      id="lang"
      className="dark:text-black"
      icon={<FiGlobe className="dark:stroke-black" size={22} />}
      onChange={({ value }) => changeLanguage(value)}
      defaultValue={langs.find(({ value }) => router.locale === value)}
      name="lang"
      options={langs}
    />
  );
};

export default LanguagePicker;

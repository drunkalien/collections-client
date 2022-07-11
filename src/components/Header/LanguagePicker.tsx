import { Select } from "components";
import { useRouter } from "next/dist/client/router";
import { FiGlobe } from "react-icons/fi";

const LanguagePicker = () => {
  const router = useRouter();

  const changeLanguage = (lang: string) => {
    console.log(lang);
    const { pathname, asPath, query } = router;
    router.push({ pathname, query }, asPath, { locale: lang });
  };

  const langs = [
    {
      value: "en",
      label: "English",
    },
    {
      value: "uz",
      label: "O'zbek",
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

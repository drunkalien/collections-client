import Select from "components/Select";
import { useRouter } from "next/dist/client/router";
import { FiGlobe } from "react-icons/fi";

const langs = [
  {
    value: "uz",
    label: "Uzbek",
  },
  {
    value: "en",
    label: "English",
  },
];

const LanguagePicker = () => {
  const router = useRouter();

  const changeLanguage = (lang: string) => {
    console.log(lang);
    const { pathname, asPath, query } = router;
    router.push({ pathname, query }, asPath, { locale: lang });
  };

  return (
    <Select
      icon={<FiGlobe size={22} />}
      onChange={({ value }) => changeLanguage(value)}
      defaultValue={langs.find(({ value }) => router.locale === value)}
      name="lang"
      options={langs}
    />
  );
};

export default LanguagePicker;

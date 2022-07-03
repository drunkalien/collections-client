import Select from "react-select";

import { Input, Container } from "components";
import LanguagePicker from "./LanguagePicker";

const langOptions = [
  { value: "uz", label: "Uzbek" },
  { value: "en", label: "English" },
];

const themeOptions = [
  {
    value: "light",
    label: "Light",
  },
  {
    value: "dark",
    label: "Dark",
  },
];

const profileOptions = [
  {
    value: "profile",
    label: "Profile",
  },
];

const customSyles = {
  menu: (provided: any, state: any) => {
    const border = "border-black border-[1px]";

    return { ...provided, border };
  },
};

const Header = () => {
  return (
    <header className="border-b-[1px] border-b-gray">
      <Container>
        <div className="flex h-[100px] justify-between items-center">
          <div>Logo</div>
          <div>
            <Input placeholder="Search" />
          </div>
          <div className="flex justify-center items-center h-full">
            <Select
              options={langOptions}
              className="mx-2"
              styles={customSyles}
            />
            <LanguagePicker />
            <Select options={themeOptions} className="mx-2" />
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;

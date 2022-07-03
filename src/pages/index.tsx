import { GetStaticProps, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { Home as HomePage } from "components";

const Home: NextPage = () => {
  return <HomePage />;
};

export default Home;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const localeProps = await serverSideTranslations(locale || "", ["common"]);
  return {
    props: {
      ...localeProps,
    },
  };
};

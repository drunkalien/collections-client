import { GetStaticProps, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { Signup } from "components";

const signup: NextPage = () => {
  return <Signup />;
};

export default signup;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const localeProps = await serverSideTranslations(locale || "", ["common"]);
  return {
    props: {
      ...localeProps,
    },
  };
};

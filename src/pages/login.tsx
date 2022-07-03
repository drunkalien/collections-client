import { GetStaticProps, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Login } from "components";

const signup: NextPage = () => {
  return <Login />;
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

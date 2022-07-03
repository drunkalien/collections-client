import { GetStaticProps, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { CreateCollection } from "components";

const Create: NextPage = () => {
  return <CreateCollection />;
};

export default Create;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const localeProps = await serverSideTranslations(locale || "", ["common"]);
  return {
    props: {
      ...localeProps,
    },
  };
};

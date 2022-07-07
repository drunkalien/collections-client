import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";

import { CreateItem } from "components";

const Create: NextPage = () => {
  return <CreateItem />;
};

export default Create;

export const getStaticPaths: GetStaticPaths<{
  collection: string;
}> = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const localeProps = await serverSideTranslations(locale || "", ["common"]);
  return {
    props: {
      ...localeProps,
    },
  };
};

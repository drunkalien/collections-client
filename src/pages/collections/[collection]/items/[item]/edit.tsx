import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";

import { EditItem } from "components";

const Edit: NextPage = () => {
  return <EditItem />;
};

export default Edit;

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

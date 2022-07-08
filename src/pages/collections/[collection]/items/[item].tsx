import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";

import { Item as ItemPage } from "components";

const Item: NextPage = () => {
  return <ItemPage />;
};

export default Item;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const localeProps = await serverSideTranslations(locale || "", ["common"]);
  return {
    props: {
      ...localeProps,
    },
  };
};

export const getStaticPaths: GetStaticPaths<{
  collection: string;
  item: string;
}> = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

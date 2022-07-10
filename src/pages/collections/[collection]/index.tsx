import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import CollectionPage from "components/pages/Collection";

const Collection: NextPage = () => {
  return <CollectionPage />;
};

export default Collection;

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

import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";

import { User as UserPage } from "components";

const User: NextPage = () => {
  return <UserPage />;
};

export default User;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const localeProps = await serverSideTranslations(locale || "", ["common"]);
  return {
    props: {
      ...localeProps,
    },
  };
};

export const getStaticPaths: GetStaticPaths<{
  user: string;
}> = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

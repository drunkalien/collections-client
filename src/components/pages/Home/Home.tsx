import Container from "components/Container";
import { ReactNode } from "react";
import classNames from "classnames";
import { useRouter } from "next/router";
import LargeCollections from "./LargeCollections";
import RecentItems from "./RecentItems";
import { useTranslation } from "next-i18next";

type Tab = "collections" | "items";
type TabDetails = {
  content: ReactNode;
  id: Tab;
  label: string;
};

const Home = () => {
  const { t } = useTranslation();
  const router = useRouter();

  const tabs: Record<Tab, TabDetails> = {
    collections: {
      content: <LargeCollections />,
      id: "collections",
      label: t("Large collections"),
    },
    items: {
      content: <RecentItems />,
      id: "items",
      label: t("Recent items"),
    },
  };

  return (
    <Container>
      <ul
        id="tabs"
        className="inline-flex pt-2 px-1 w-full border-b border-gray mt-10"
      >
        {Object.entries(tabs).map(([id, { label }]) => (
          <li
            className={classNames(
              "text-gray-800 font-semibold py-2 rounded-t -mb-px px-4 cursor-pointer",
              {
                "bg-white dark:bg-black border-gray border-t border-r border-l":
                  router.query.tab
                    ? id === router.query.tab
                    : id === "collections",
              }
            )}
            key={id}
            onClick={() => router.push({ query: { tab: id } })}
          >
            <a>{label}</a>
          </li>
        ))}
      </ul>
      <div className="mt-10">
        {tabs[(router.query.tab as Tab) || "collections"].content}
      </div>
    </Container>
  );
};

export default Home;

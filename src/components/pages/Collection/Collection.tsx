import { Container } from "components";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { FiLink } from "react-icons/fi";
import ReactMarkdown from "react-markdown";
import Link from "next/link";
import dayjs from "dayjs";

import { useAPIQuery, useCurrentUser } from "hooks";
import {
  Collection as CollectionType,
  ItemType,
  CustomFieldsType,
} from "types";
import { Table, Chip, Button } from "components";
import { Column } from "react-table";

const CollectionPage = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const { collection } = router.query;
  const collectionQuery = useAPIQuery<CollectionType>({
    url: `collections/${collection}`,
  });
  const userQuery = useCurrentUser();

  return (
    <Container>
      <div className="grid place-items-center w-full">
        <div className="flex gap-5 items-center">
          <h1
            className="text-2xl text-center font-bold mb-7 mt-12"
            id="description"
          >
            {collectionQuery.data?.name}
          </h1>
          {userQuery.data?.user._id === collectionQuery.data?.author && (
            <Link
              href={`/collections/${collectionQuery.data?._id}/items/create`}
            >
              <Button>Add Item</Button>
            </Link>
          )}
        </div>
        <div>
          {collectionQuery.data?.image ? (
            <img
              src={collectionQuery.data?.image}
              width={300}
              height={300}
              className="object-cover rounded-full w-[300px] h-[300px] mb-6"
              alt="collection image"
            />
          ) : null}
        </div>
        <div className="flex gap-2">
          <FiLink />
          <a href="#description" className="text-blue-600">
            {t("Description")}
          </a>
          <FiLink />
          <a href="#items" className="text-blue-600">
            {t("Items")}
          </a>
        </div>
        <Description />
        <Items />
      </div>
    </Container>
  );
};

export default CollectionPage;

const Description = () => {
  const router = useRouter();
  const { collection } = router.query;
  const collectionQuery = useAPIQuery<CollectionType>({
    url: `collections/${collection}`,
  });

  return (
    <ReactMarkdown className="prose p-2 dark:prose-invert">
      {collectionQuery.data?.description as string}
    </ReactMarkdown>
  );
};

const Items = () => {
  const router = useRouter();
  const { collection } = router.query;
  const itemsQuery = useAPIQuery<{ items: ItemType[] }>({
    url: `collections/${collection}/items`,
  });

  const columns: Column[] = [
    {
      Header: "Name",
      accessor: "name",
    },
    {
      Header: "Details",
      accessor: ({ customFields }: any) =>
        customFields?.map((field: CustomFieldsType, idx: number) => (
          <div key={idx}>
            <Chip label={field.label} value={field.value} />
          </div>
        )),
      id: "customFields",
    },
    {
      Header: "Created at",
      accessor: ({ createdAt }: any) => dayjs(createdAt).format("DD.MM.YYYY"),
    },
  ];

  return (
    <div id="items">
      <h1
        className="text-2xl text-center font-bold mb-7 mt-12"
        id="description"
      >
        Items
      </h1>
      {!itemsQuery.isLoading && (
        <Table
          columns={columns as any}
          data={itemsQuery.data?.items as any[]}
        />
      )}
    </div>
  );
};

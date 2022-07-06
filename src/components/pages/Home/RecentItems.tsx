import Table from "components/Table";
import { useTranslation } from "next-i18next";
import { Column } from "react-table";

const RecentItems = () => {
  const { t } = useTranslation();
  const columns: Column[] = [
    {
      Header: "this is id",
      accessor: "id",
    },
    {
      Header: t("Collection name"),
      accessor: "collection",
      Cell: ({ value }: any) => value.name,
    },
  ];

  const data = [
    {
      collection: {
        name: "hello",
      },
      id: 1,
    },
    {
      collection: {
        name: "hello",
      },
      id: 2,
    },
  ];

  return (
    <div>
      <Table columns={columns as any} data={data} />
    </div>
  );
};

export default RecentItems;

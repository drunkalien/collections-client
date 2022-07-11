import Chip from "components/Chip";
import Table from "components/Table";
import { useAPIQuery } from "hooks";
import { useTranslation } from "next-i18next";
import { Column } from "react-table";
import { CustomFieldsType } from "types";

const RecentItems = () => {
  const { t } = useTranslation();
  const itemsQuery = useAPIQuery({ url: "items/get/latest" });
  console.log(itemsQuery.data?.items);
  const columns: Column[] = [
    {
      Header: "#",
      accessor: "id",
      Cell: ({ row }) => <div>{row.index + 1}</div>,
    },
    {
      Header: t("Collection title"),
      accessor: "itemCollection",
      Cell: ({ value }: any) => <CollectionName id={value} />,
    },
    {
      Header: t("Item name"),
      accessor: "name",
    },
    {
      Header: t("Details"),
      accessor: ({ customFields }: any) => (
        <div className="flex flex-wrap gap-2">
          {customFields?.map((field: CustomFieldsType, idx: number) => (
            <div key={idx}>
              <Chip label={field.label} value={field.value} />
            </div>
          ))}
        </div>
      ),
      id: "customFields",
    },
    {
      Header: t("Likes"),
      accessor: "numberOfLikes",
    },
  ];

  return (
    <div>
      <Table columns={columns as any} data={itemsQuery.data?.items || []} />
    </div>
  );
};

export default RecentItems;

const CollectionName = ({ id }: { id: string }) => {
  const query = useAPIQuery({
    url: `collections/${id}`,
    options: { enabled: !!id },
  });
  const name = query.data?.name;
  console.log(query.data);
  return <>{name}</>;
};

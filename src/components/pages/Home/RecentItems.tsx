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
      Header: "ID",
      accessor: "id",
    },
    {
      Header: t("Collection title"),
      accessor: "collection",
      Cell: ({ value }: any) => value?.name,
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

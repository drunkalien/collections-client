import { useTranslation } from "next-i18next";

import EditItemForm from "./_form";
import { Container } from "components";

const EditItem = () => {
  const { t } = useTranslation();
  return (
    <Container>
      <h2 className="text-[24px] font-bold mt-20">{t("Add Item")}</h2>
      <EditItemForm />
    </Container>
  );
};

export default EditItem;

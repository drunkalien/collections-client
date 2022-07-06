import { Container } from "components";
import { useTranslation } from "next-i18next";
import ItemForm from "./_form";

const CreateItem = () => {
  const { t } = useTranslation();
  return (
    <Container>
      <h2 className="text-[24px] font-bold mt-20">{t("Add Item")}</h2>
      <ItemForm />
    </Container>
  );
};

export default CreateItem;

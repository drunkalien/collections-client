import { useForm, useFieldArray } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import cn from "classnames";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";

import { CustomFieldsType, SchemaValues } from "types";
import { Input, Select, Button, Textarea } from "components";
import { useAPIMutation, useAPIQuery, useCurrentUser } from "hooks";

type FormValues = {
  name: string;
  tags: string[];
  customFields: CustomFieldsType[];
};

const schema = yup.object<SchemaValues<FormValues>>({
  // name: yup.string().required(),
  // tags: yup.array(),
  // customFields: yup.array(),
});

const ItemForm = () => {
  const { t } = useTranslation();
  const { register, control, handleSubmit } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });

  const userQuery = useCurrentUser();

  const router = useRouter();
  const { collection } = router.query;
  const itemMutation = useAPIMutation({
    url: "items",
    params: { collectionId: collection, userId: userQuery.data?.user._id },
  });
  const fieldsQuery = useAPIQuery<{
    customFields: CustomFieldsType[];
    _id: string;
    parent: string;
  }>({
    url: `custom-fields/${collection}`,
  });
  const customFields = fieldsQuery.data?.customFields;

  useFieldArray({
    control,
    name: "customFields",
  });

  const submit = async (data: FormValues) => {
    for (let i = 0; i < customFields?.length!; i++) {
      data.customFields[i] = { ...customFields![i], ...data.customFields[i] };
    }
    await itemMutation.mutateAsync(data);
  };

  return (
    <form
      className={cn("flex flex-col items-start")}
      onSubmit={handleSubmit(submit)}
    >
      <div className="mt-4">
        <Input label={t("Name")} {...register("name")} />
      </div>
      <div className="mt-4">
        <Input label={t("Tags")} {...register("tags")} />
      </div>
      {customFields?.length! > 0 &&
        customFields?.map((field, idx) => (
          <div className="mt-4" key={idx}>
            {field.type !== "textarea" ? (
              <Input
                type={field.type}
                label={field.label}
                {...register(`customFields.${idx}.value`)}
              />
            ) : (
              <Textarea
                label={field.label}
                {...register(`customFields.${idx}.value`)}
              />
            )}
          </div>
        ))}
      <Button className="mt-2" type="submit">
        Create Item
      </Button>
    </form>
  );
};

export default ItemForm;

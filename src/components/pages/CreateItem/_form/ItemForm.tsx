import { useForm, useFieldArray } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import cn from "classnames";

import { CustomFieldsType, SchemaValues } from "types";
import { Input, Select, Button } from "components";
import { useTranslation } from "next-i18next";

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

const dummyFields: CustomFieldsType[] = [
  {
    label: "Author",
    type: "text",
    value: "",
  },
  {
    label: "Synopsis",
    type: "textbox",
    value: "",
  },
  {
    label: "Published at",
    type: "date",
    value: "",
  },
];

const ItemForm = () => {
  const { t } = useTranslation();
  const { register, control, handleSubmit } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });
  const { fields } = useFieldArray({
    control,
    name: "customFields",
  });

  const submit = (data: FormValues) => {
    for (let i = 0; i < dummyFields.length; i++) {
      dummyFields[i] = { ...dummyFields[i], ...data.customFields[i] };
    }
    console.log(dummyFields);
  };

  return (
    <form
      className={cn("flex flex-col items-start")}
      onSubmit={handleSubmit(submit)}
    >
      <div className="mt-4">
        <Input label={t("Name")} />
      </div>
      <div className="mt-4">
        <Input label={t("Tags")} />
      </div>
      {dummyFields.map((field, idx) => (
        <div className="mt-4" key={idx}>
          <Input
            type={field.type}
            label={field.label}
            {...register(`customFields.${idx}.value`)}
          />
        </div>
      ))}
      <Button type="submit">Create Item</Button>
    </form>
  );
};

export default ItemForm;

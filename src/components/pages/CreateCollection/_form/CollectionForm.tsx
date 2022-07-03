import { useForm, useFieldArray } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import cn from "classnames";
import { useState } from "react";

import { Paper, Input, Textarea, Button, Select } from "components";
import { useTranslation } from "next-i18next";

type FieldType = "checkbox" | "text" | "date" | "textbox";

type CustomFieldsType = {
  label: string;
  type: FieldType;
  value: string;
};

type FormValues = {
  name: string;
  item_name: string;
  tags?: string[];
  customFields?: CustomFieldsType[];
  description: string;
};

const typeOptions = [
  {
    value: "checkbox",
    label: "Checkbox",
  },
  {
    value: "text",
    label: "Text",
  },
  {
    value: "date",
    label: "Date",
  },
  {
    value: "textbox",
    label: "Textbox",
  },
];

const schema = yup.object().shape({
  name: yup.string().required("Enter the collection name!"),
  tags: yup.array(),
  customFields: yup.array(),
});

const CollectionForm = () => {
  const { t } = useTranslation();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "customFields",
  });
  const [type, setType] = useState<FieldType>("text");

  function submit(data: FormValues) {
    console.log(data);
  }

  return (
    <form
      className={cn("grid grid-cols-12 gap-5")}
      onSubmit={handleSubmit(submit)}
    >
      <div className={cn("col-span-full")}>
        <h2 className={cn("text-[24px] font-bold")}>
          {t("Create collection")}
        </h2>
      </div>

      <div className={cn("col-span-3")}>
        <Input label="Collection name" />
      </div>

      <p className={cn("col-span-full")}>Cover (image)</p>
      <div className={cn("col-span-5")}>
        <Paper
          className={cn(
            "border-dashed px-20 py-40 flex justify-center align-center"
          )}
        >
          <input
            type="file"
            id="image"
            onChange={(e) => console.log(e)}
            className={cn("w-0 h-0")}
          />
          <label
            htmlFor="image"
            className={cn(
              "bg-black py-2 px-8 text-white font-bold rounded cursor-pointer"
            )}
          >
            {t("Click or drag here to upload")}
          </label>
        </Paper>
      </div>

      <div className={cn("col-span-3")}>
        <Paper className={cn("text-gray py-40 text-center")}>preview</Paper>
      </div>

      <div className={cn("col-span-5")}>
        <Textarea label={t("Description")} />
      </div>

      <div className="col-span-7"></div>

      <div className="col-span-3">
        <Input
          placeholder="Enter item name"
          label="Name"
          {...register(`name`)}
        />
      </div>
      <div className="col-span-3">
        <Select
          label="Type"
          id="fieldtype"
          placeholder="Select field type"
          options={typeOptions}
          onChange={(e) => setType(e?.value as FieldType)}
        />
      </div>

      {fields.map((field, index) => (
        <div className="col-span-12 grid grid-cols-12 gap-5" key={field.id}>
          <div className="col-span-3">
            <Input
              placeholder="Enter field name (e.g. book author)"
              label="Name"
              {...register(`customFields.${index}.value`)}
            />
          </div>
          <div className="col-span-3">
            <Select
              id="field type"
              label="Type"
              placeholder="Select field type"
              options={typeOptions}
              onChange={(e) => setType(e?.value as FieldType)}
            />
          </div>
          <div
            className="col-span-6 flex items-end"
            onClick={() => remove(index)}
          >
            <Button className="bg-red">Remove</Button>
          </div>
        </div>
      ))}

      <div className="col-span-12">
        <Button
          className="bg-yellow"
          onClick={() => append({ label: "", type, value: "" })}
        >
          Add field
        </Button>
      </div>
      <div className="col-span-12">
        <Button type="submit">Create</Button>
      </div>
    </form>
  );
};

export default CollectionForm;

import { useForm, useFieldArray } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import cn from "classnames";
import { useCallback, useState } from "react";
import Image from "next/image";
import ReactMarkdown from "react-markdown";

import { Paper, Input, Textarea, Button, Select, Dropzone } from "components";
import { useTranslation } from "next-i18next";
import { FieldType, CustomFieldsType } from "types";
import { useAPIMutation, useCurrentUser } from "hooks";
import { toFormData } from "utils";

type FormValues = {
  name: string;
  item_name: string;
  tags?: string[];
  customFields?: CustomFieldsType[];
  description: string;
  image: File | null;
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
    value: "textarea",
    label: "Textarea",
  },
];

const schema = yup.object().shape({
  name: yup.string().required("Enter the collection name!"),
  tags: yup.array(),
  customFields: yup.array(),
});

const CollectionForm = () => {
  const { t } = useTranslation();
  const [desc, setDesc] = useState("");
  const {
    register,
    control,
    getValues,
    watch,
    setValue,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });
  watch("image");
  const { fields, append, remove } = useFieldArray({
    control,
    name: "customFields",
  });
  const [type, setType] = useState<FieldType>("text");
  const collectionMutation = useAPIMutation({ url: "collections" });
  const userQuery = useCurrentUser();

  function submit(data: FormValues) {
    if (!userQuery.isLoading) {
      collectionMutation.mutate(
        toFormData({
          name: data.name,
          description: data.description,
          image: data.image || "",
          author: userQuery.data?.user?._id,
          tags: data.tags,
          customFields: JSON.stringify(data.customFields),
        })
      );
    }
  }

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      setValue("image", file);
    },
    [setValue]
  );

  const removeFile = () => {
    setValue("image", null);
  };

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
        <Input label="Collection name" {...register("name")} />
      </div>

      <p className={cn("col-span-full")}>{t("Cover (image)")}</p>
      <div className={cn("col-span-5")}>
        <Dropzone onDrop={onDrop} />
      </div>

      <div className={cn("col-span-3 relative")}>
        {getValues().image ? (
          <>
            <div
              className="absolute top-0 right-0 bg-red cursor-pointer z-10 text-white py-1 px-2 text-xs rounded-full"
              onClick={removeFile}
            >
              {t("Remove")}
            </div>
            <Image
              width={305}
              layout="fill"
              objectFit="contain"
              src={URL.createObjectURL(getValues().image!)}
              alt="preview"
            />
          </>
        ) : (
          <Paper
            className={cn("text-gray flex justify-center items-center h-full")}
          >
            {t("preview")}
          </Paper>
        )}
      </div>

      <div className={cn("col-span-5")}>
        <Textarea
          label={t("Description")}
          {...register("description")}
          onChange={(e) => setDesc(e.target.value)}
        />
      </div>
      <div className="col-span-7 pb-7 ">
        <label>Preview</label>
        <ReactMarkdown className="border-solid border-black border-[1px] rounded h-full prose p-2 dark:prose-invert">
          {desc}
        </ReactMarkdown>
      </div>

      {fields.map((field, index) => (
        <div className="col-span-12 grid grid-cols-12 gap-5" key={field.id}>
          <div className="col-span-3">
            <Input
              placeholder="Enter field name (e.g. book author)"
              label="Name"
              {...register(`customFields.${index}.label`)}
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
            <Button type="button" className="bg-red">
              {t("Remove")}
            </Button>
          </div>
        </div>
      ))}

      <div className="col-span-12">
        <Button
          className="bg-yellow"
          type="button"
          onClick={() => append({ label: "", type, value: "" })}
        >
          {t("Add field")}
        </Button>
      </div>
      <div className="col-span-12">
        <Button type="submit">{t("Create collection")}</Button>
      </div>
    </form>
  );
};

export default CollectionForm;

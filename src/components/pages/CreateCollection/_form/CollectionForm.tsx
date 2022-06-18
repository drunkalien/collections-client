import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "components/Input";

type CustomFieldsType = {
  label: string;
  type: "checkbox" | "text" | "date" | "textbox";
  value: string;
};

type FormValues = {
  name: string;
  tags?: string[];
  customFields?: object[];
  description: string;
};

const schema = yup.object().shape({
  name: yup.string().required("Enter the collection name!"),
  tags: yup.array(),
  customFields: yup.array(),
});

const CollectionForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });
  const [customFields, setCustomFields] = useState<CustomFieldsType[]>([]);

  function submit(data: FormValues) {
    console.log(data);
  }

  return (
    <form
      className="flex w-3/4 flex-col items-center"
      onSubmit={handleSubmit(submit)}
    >
      <Input type="text" label="Name" {...register("name")} />

      {customFields.map(({ label, type, value = "" }, i) => (
        <Input label={label} value={value} type={type} key={i} />
      ))}

      <Input type="text" label="Description" {...register("description")} />
      <button className="p-2 bg-blue-400 rounded text-white mb-5">+</button>
      <button className="p-2 bg-blue-400 rounded text-white">Submit</button>
    </form>
  );
};

export default CollectionForm;

import { useForm } from "react-hook-form";
import cn from "classnames";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import Input from "components/Input";

type FormValues = {
  username: string;
  email: string;
  password: string;
};

const schema = yup.object().shape({
  username: yup
    .string()
    .min(4, "Username must be at least 4 characters long!")
    .required("Please enter your username!"),
  email: yup.string().email().required("Please enter your email!"),
  password: yup.string().required("Enter your password motherfucker!!!"),
});

const SignupForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });

  function submit(data: FormValues) {
    console.log(data);
  }

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className={cn("flex flex-col w-full items-center justify-center")}
    >
      <Input
        label="Username"
        type="text"
        errorMessage={errors["username"]?.message}
        {...register("username")}
      />
      <Input
        label="Email"
        type="email"
        errorMessage={errors["email"]?.message}
        {...register("email")}
      />
      <Input
        label="Password"
        type="password"
        errorMessage={errors["password"]?.message}
        {...register("password")}
      />
      <button
        className="p-2 w-full mt-[10px] bg-[#1C1C1C] text-white rounded"
        type="submit"
      >
        Sign up
      </button>
    </form>
  );
};

export default SignupForm;

import { useForm } from "react-hook-form";
import cn from "classnames";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { Input, Button } from "components";
import { useAPIMutation } from "hooks";

type FormValues = {
  username: string;
  password: string;
};

const schema = yup.object().shape({
  username: yup
    .string()
    .min(4, "Username must be at least 4 characters long!")
    .required("Please enter your username!"),
  password: yup.string().required("Please enter your password!"),
});

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });
  const loginMutation = useAPIMutation({ url: "users/signin" });

  async function submit(data: FormValues) {
    const mutation = await loginMutation.mutateAsync(data);

    console.log(mutation);
    window.localStorage.setItem("token", mutation.data.token);
  }

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className={cn("flex flex-col w-full items-center justify-center")}
    >
      <Input
        label="Username"
        type="text"
        placeholder="Enter your username"
        errorMessage={errors["username"]?.message}
        {...register("username")}
      />
      <Input
        label="Password"
        type="password"
        placeholder="Enter your password"
        errorMessage={errors["password"]?.message}
        {...register("password")}
      />
      <Button className="bg-black mt-1" type="submit">
        Sign in
      </Button>
    </form>
  );
};

export default LoginForm;

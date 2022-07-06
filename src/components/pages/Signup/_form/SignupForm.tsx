import { useForm } from "react-hook-form";
import cn from "classnames";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { Input, Button } from "components";
import { useAPIMutation } from "hooks";

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
  password: yup.string().required("Please enter your password!"),
});

const SignupForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });
  const signupMutation = useAPIMutation({ url: "/users/signup" });

  async function submit(data: FormValues) {
    const mutation = await signupMutation.mutateAsync(data);
    window.localStorage.setItem("token", mutation.data.token);
    console.log(mutation);
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
        label="Email"
        type="email"
        placeholder="Enter your email"
        errorMessage={errors["email"]?.message}
        {...register("email")}
      />
      <Input
        label="Password"
        type="password"
        placeholder="Enter your password"
        errorMessage={errors["password"]?.message}
        {...register("password")}
      />
      <Button className="mt-1" type="submit">
        Sign up
      </Button>
    </form>
  );
};

export default SignupForm;

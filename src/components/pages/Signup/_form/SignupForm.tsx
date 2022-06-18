import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import Input from "components/Input";

type FormValues = {
  username: string;
  email: string;
  password: string;
};

const schema = yup.object().shape({
  username: yup.string().min(4).required("Please enter your username!"),
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
      className="flex w-3/4 flex-col items-center justify-center p-5"
    >
      <Input
        label="Username"
        type="text"
        error={errors["username"]?.message}
        {...register("username")}
      />
      <Input
        label="Email"
        type="email"
        error={errors["email"]?.message}
        {...register("email")}
      />
      <Input
        label="Password"
        type="password"
        error={errors["password"]?.message}
        {...register("password")}
      />
      <button className="p-2 bg-blue-400 rounded text-white" type="submit">
        Sign up
      </button>
    </form>
  );
};

export default SignupForm;

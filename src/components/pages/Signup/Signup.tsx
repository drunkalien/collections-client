import SignupForm from "./_form";

const Signup = () => {
  return (
    <div className="w-screen flex flex-col h-screen justify-center items-center">
      <h1 className="text-3xl font-medium">Sign up</h1>
      <SignupForm />
    </div>
  );
};

export default Signup;

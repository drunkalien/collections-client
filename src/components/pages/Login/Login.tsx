import LoginForm from "./_form";

import Paper from "components/Paper";

const Signup = () => {
  return (
    <div className="w-screen flex flex-col h-screen justify-center items-center">
      <Paper className="min-w-[25%]">
        <h1 className="text-xl font-bold mb-2">Sign in</h1>
        <LoginForm />
      </Paper>
    </div>
  );
};

export default Signup;

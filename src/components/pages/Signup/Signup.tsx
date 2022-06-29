import Paper from "components/Paper";
import SignupForm from "./_form";

const Signup = () => {
  return (
    <div className="w-screen flex flex-col h-screen justify-center items-center">
      <Paper className="min-w-[25%]">
        <h1 className="text-xl font-bold mb-2">Sign up</h1>
        <SignupForm />
      </Paper>
    </div>
  );
};

export default Signup;

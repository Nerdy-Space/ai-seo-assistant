import React from "react";
import { Button } from "../ui/button";
import { googleLogin } from "@/app/actions";

const Login = () => {
  return (
    <form action={googleLogin}>
      <Button
        type="submit"
        name="action"
        value={'google'}
        className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white transition-colors"
      >
        Login
      </Button>
    </form>
  );
};

export default Login;

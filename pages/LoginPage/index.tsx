import { Heading } from "@/components/Heading";
import React from "react";
import LoginForm from "./LoginForm";

const LoginPage = () => {
  return (
    <div className="w-full min-h-screen flex lg:flex-row flex-col container">
      {/* left */}
      <div className="lg:w-1/2 w-full p-24 bg-gradient-to-br from-purple-200 via-blue-200 to-blue-300">
        <LoginForm />
      </div>

      {/* right */}
      <div className="flex flex-col justify-center items-center lg:w-1/2 w-full p-4">
        {/* image */}
        <img src="/banner2.png" alt="" className="w-100" />

        {/* title */}
        <Heading size="lg" className="text-center mt-6 text-[#10069d]">
          LEARN FROM THE BEST <br /> Anytime, Anywhere.
        </Heading>
      </div>
    </div>
  );
};

export default LoginPage;

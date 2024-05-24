
import React from "react";
import LoginForm from "../components/LoginForm";





const LoginPage = ()=>{

return (
    <div className="w-full h-screen bg-[#da18119f] flex items-center justify-between flex-wrap-reverse p-10">
      <div className="flex-2 bg-[#E3E3E3] h-full w-fit rounded-2xl p-10 flex flex-col items-center justify-center">
        <h1 className="font-bold text-[#752222] text-3xl self-start">Login</h1>
        <p className="text-sm text-gray-500 self-start mt-2">
          Enter your email and password in order to sign in
        </p>
        <LoginForm />
      </div>
      <div className="flex-1 flex flex-col items-center justify-center h-full w-fit">
        <div className="self-start px-20 z-20 cursor-default">
          <img src="#" alt="" className="float-left animate-pulse" />
          <h1 className="text-white text-2xl">
            Welcome back to <strong>Admin Panel</strong>
          </h1>
          <p className="text-black-300 tracking-wider ml-16">
            Please sign in order to continue
          </p>
        </div>
        <div>
          
        </div>
      </div>
    </div>
  );
}

export default LoginPage ;
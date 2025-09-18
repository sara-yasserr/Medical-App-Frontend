"use client";

import Image from "next/image";
import { useState } from "react";
import { login } from "../services/authService";
import { LoginDTO, LoginResponse } from "../models/auth";

const inputsData = [
  {
    name: "email",
    type: "email",
    placeholder: "Enter your email",
  },
  {
    name: "password",
    type: "password",
    placeholder: "Enter your password",
  },
];

const Login = () => {
  const [formData, setFormData] = useState<LoginDTO>({ email: "", password: "" });
  const [message, setMessage] = useState<string>("");

  // handle change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // handle submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data: LoginResponse = await login(formData);
      setMessage("Login successful! Token saved.");
      localStorage.setItem("token", data.token); 
    } catch (err: any) {
      setMessage(err.message);
    }
  };

  return (
    <div className="h-svh flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="rounded-lg flex flex-col items-center justify-center gap-5 shadow-2xl p-7"
      >
        <div className="flex items-center justify-center">
          <div className="relative size-8">
            <Image fill alt="logo" src={"/medical-logo.jpg"} />
          </div>
          <h2 className="font-bold">Login</h2>
        </div>

        {inputsData.map(({ type, name, placeholder }, index) => (
          <input
            className="border border-[#DDD] p-1.5 min-w-[300px]"
            key={index}
            type={type}
            name={name}
            placeholder={placeholder}
            value={(formData as any)[name]}
            onChange={handleChange}
          />
        ))}

        <button
          type="submit"
          className="bg-[#0055d9] text-white w-fit text-sm p-2 px-3 rounded-lg"
        >
          Submit
        </button>

        {message && <p className="text-sm mt-2">{message}</p>}
      </form>
    </div>
  );
};

export default Login;

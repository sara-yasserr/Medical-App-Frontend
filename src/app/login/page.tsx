"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "../services/authService";
import { LoginDTO, LoginResponse } from "../models/auth";
import {jwtDecode} from "jwt-decode";

const inputsData = [
  { name: "email", type: "email", placeholder: "Enter your email" },
  { name: "password", type: "password", placeholder: "Enter your password" },
];

const Login = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<LoginDTO>({ email: "", password: "" });
  const [message, setMessage] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data: LoginResponse = await login(formData);

      // Save token
      localStorage.setItem("token", data.token);

      // Decode token to get role and user ID
      const decoded: any = jwtDecode(data.token);

      // Role claim from Microsoft Identity
      const rolesClaim = decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
      const role = Array.isArray(rolesClaim) ? rolesClaim[0] : rolesClaim;

      // Redirect based on role
      if (role?.toLowerCase() === "patient") {
        router.push("/patient/dashboard");
      } else if (role?.toLowerCase() === "doctor") {
        router.push("/doctor/dashboard");
      } else {
        setMessage("Role not recognized.");
      }

    } catch (err: any) {
      setMessage(err.message || "Login failed");
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
            key={index}
            className="border border-[#DDD] p-1.5 min-w-[300px]"
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

        {message && <p className="text-sm mt-2 text-red-500">{message}</p>}
      </form>
    </div>
  );
};

export default Login;

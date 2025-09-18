"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "../services/authService";
import { LoginDTO, LoginResponse } from "../models/auth";
import { jwtDecode } from "jwt-decode";

const inputsData = [
  { name: "email", type: "email", placeholder: "Enter your email" },
  { name: "password", type: "password", placeholder: "Enter your password" },
];

interface JwtPayload {
  role?: string | string[];
  roles?: string | string[];
  userRole?: string | string[];
  [key: string]: any;
}

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
      localStorage.setItem("token", data.token);

      const decoded: JwtPayload = jwtDecode(data.token);

      console.log("Decoded token:", decoded);

      // Extract roles from multiple possible fields, including ASP.NET full claim URI
      const possibleRoles =
        decoded.role ||
        decoded.roles ||
        decoded.userRole ||
        decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] ||
        [];

      let roles: string[] = [];
      if (Array.isArray(possibleRoles)) {
        roles = possibleRoles.map(r => r.toLowerCase());
      } else if (typeof possibleRoles === "string") {
        roles = [possibleRoles.toLowerCase()];
      }

      console.log("Extracted roles:", roles);

      if (roles.includes("patient")) {
        router.push("/patient/dashboard");
      } else if (roles.includes("doctor")) {
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
        <div className="flex items-center justify-center gap-2">
          <div className="relative w-8 h-8">
            <Image fill alt="logo" src={"/medical-logo.jpg"} />
          </div>
          <h2 className="font-bold text-xl">Login</h2>
        </div>

        {inputsData.map(({ type, name, placeholder }, index) => (
          <input
            key={index}
            name={name}
            type={type}
            placeholder={placeholder}
            value={(formData as any)[name]}
            onChange={handleChange}
            className="border border-[#DDD] p-2 min-w-[300px] rounded"
          />
        ))}

        <button
          type="submit"
          className="bg-[#0055d9] text-white w-fit text-sm p-2 px-4 rounded-lg"
        >
          Submit
        </button>

        {message && <p className="text-sm mt-2 text-red-500">{message}</p>}
      </form>
    </div>
  );
};

export default Login;

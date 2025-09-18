"use client";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { registerDoctor } from "@/app/services/doctorService";
import { RegisterDoctorDTO } from "../../models/doctor";
import { Specializations } from "@/app/models/doctor";
export default function RegisterDoctor() {
  const router = useRouter();
  const [form, setForm] = useState<RegisterDoctorDTO>({
    firstName: "",
    lastName: "",
    specialization: "",
    email: "",
    phoneNumber: "",
    password: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await registerDoctor(form);
      setMessage("Doctor registered successfully!");
      router.push("/login");
    } catch (err: any) {
      setMessage(err.message);
    }
  };

  const inputsData = [
    { name: "firstName", type: "text", placeholder: "First Name" },
    { name: "lastName", type: "text", placeholder: "Last Name" },
    // الحقل الخاص بالتخصص سيصبح select
    { name: "specialization", type: "select", placeholder: "Specialization" },
    { name: "email", type: "email", placeholder: "Email" },
    { name: "phoneNumber", type: "text", placeholder: "Phone Number" },
    { name: "password", type: "password", placeholder: "Password" },
  ];

  return (
    <div className="h-svh flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="rounded-lg flex flex-col items-center justify-center gap-5 shadow-2xl p-7"
      >
        {/* Logo + Title */}
        <div className="flex items-center justify-center">
          <div className="relative size-8">
            <Image fill alt="logo" src={"/medical-logo.jpg"} />
          </div>
          <h2 className="font-bold ml-2">Doctor Register</h2>
        </div>

        {/* Inputs */}
        {inputsData.map(({ name, type, placeholder }, index) =>
          type === "select" ? (
            <select
              key={index}
              name={name}
              value={(form as any)[name]}
              onChange={handleChange}
              className="border border-[#DDD] p-1.5 min-w-[300px]"
              required
            >
              <option value="">Select Specialization</option>
              {Specializations.map((spec, idx) => (
                <option key={idx} value={spec}>{spec}</option>
              ))}
            </select>
          ) : (
            <input
              key={index}
              name={name}
              type={type}
              placeholder={placeholder}
              value={(form as any)[name]}
              onChange={handleChange}
              className="border border-[#DDD] p-1.5 min-w-[300px]"
              required
            />
          )
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-[#0055d9] text-white w-fit text-sm p-2 px-3 rounded-lg"
        >
          Register
        </button>

        {/* Message */}
        {message && <p className="text-sm mt-2">{message}</p>}
      </form>
    </div>
  );
}
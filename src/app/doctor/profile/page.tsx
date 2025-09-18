"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getDoctorId } from "@/app/services/doctorService";
import { UpdateDoctorDTO, Specializations } from "@/app/models/doctor";
import { getDoctorDetails, updateDoctor } from "@/app/services/doctorService";

export default function UpdateDoctorProfile() {
  const router = useRouter();
  const [form, setForm] = useState<UpdateDoctorDTO>({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    specialization: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const doctorId = await getDoctorId();
        const data = await getDoctorDetails(doctorId);
        setForm({
          firstName: data.firstName || "",
          lastName: data.lastName || "",
          email: data.email || "",
          phoneNumber: data.phoneNumber || "",
          password: "",
          specialization: data.specialization || "",
        });
      } catch (err: any) {
        console.error(err);
        setMessage("Failed to load profile information");
      } finally {
        setLoading(false);
      }
    };

    fetchDoctor();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: name === "dateOfBirth" ? new Date(value) : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const doctorId = await getDoctorId();
      await updateDoctor(doctorId, form);
      setMessage("Profile updated successfully!");
      router.push("/doctor/dashboard");
    } catch (err: any) {
      setMessage(err.message || "Update failed");
    }
  };

  return (
    <div className="h-svh flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="rounded-lg shadow-2xl p-7 flex flex-col gap-4 min-w-[400px]"
      >
        <h2 className="font-bold text-lg mb-4 text-center">Update Profile</h2>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={form.firstName}
              onChange={handleChange}
              className="border p-2 rounded"
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={form.lastName}
              onChange={handleChange}
              className="border p-2 rounded"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="border p-2 rounded"
            />
            <input
              type="text"
              name="phoneNumber"
              placeholder="Phone Number"
              value={form.phoneNumber}
              onChange={handleChange}
              className="border p-2 rounded"
            />
            <input
              type="password"
              name="password"
              placeholder="New Password"
              value={form.password}
              onChange={handleChange}
              className="border p-2 rounded"
            />

            {/* Dropdown for specialization */}
            <select
              name="specialization"
              value={form.specialization}
              onChange={handleChange}
              className="border p-2 rounded"
              required
            >
              <option value="">Select Specialization</option>
              {Specializations.map(spec => (
                <option key={spec} value={spec}>{spec}</option>
              ))}
            </select>

            <button
              type="submit"
              className="bg-[#0055d9] text-white p-2 rounded-lg"
            >
              Update Profile
            </button>

            {message && <p className="text-center mt-2 text-red-500">{message}</p>}
          </>
        )}
      </form>
    </div>
  );
}

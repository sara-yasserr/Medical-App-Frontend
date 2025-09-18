"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AppointmentDTO } from "@/app/models/appointment";
import { createAppointment } from "@/app/services/appointmentService";
import { getIdFromToken } from "@/app/services/authService";
import { getAllDoctors } from "@/app/services/doctorService";

export default function ScheduleAppointment() {
  const router = useRouter();
  const patientId = getIdFromToken();

  const [form, setForm] = useState<AppointmentDTO>({
    appointmentDate: "",
    reason: "",
    status: "Scheduled",
    patientId: patientId || 0,
    doctorId: 0,
  });
  const [message, setMessage] = useState("");

  const [doctors, setDoctors] = useState<{ id: number; name: string; specialization: string }[]>([]);
  const [specializations, setSpecializations] = useState<string[]>([]);
  const [selectedSpecialization, setSelectedSpecialization] = useState("");

  // جلب الدكاترة والتخصصات عند تحميل الصفحة
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await getAllDoctors(); // service
        const mappedDoctors = res.map(d => ({
          id: d.id,
          name: d.firstName + " " + d.lastName,
          specialization: d.specialization
        }));
        setDoctors(mappedDoctors);
        setSpecializations([...new Set(mappedDoctors.map(d => d.specialization))]);
      } catch (err: any) {
        console.error(err);
      }
    };
    fetchDoctors();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createAppointment(form);
      setMessage("Appointment scheduled successfully!");
      router.push("/patient"); 
    } catch (err: any) {
      setMessage(err.message);
    }
  };

  return (
    <div className="h-svh flex items-center justify-center">
      <form onSubmit={handleSubmit} className="rounded-lg shadow-2xl p-7 flex flex-col gap-4 min-w-[400px]">
        <h2 className="font-bold text-lg mb-4 text-center">Schedule a New Appointment</h2>

        <label className="flex flex-col">
          Date & Time
          <input
            type="datetime-local"
            name="appointmentDate"
            value={form.appointmentDate}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />
        </label>

        <label className="flex flex-col">
          Reason
          <input
            type="text"
            name="reason"
            value={form.reason}
            onChange={handleChange}
            placeholder="Reason for appointment"
            className="border p-2 rounded"
            required
          />
        </label>

        <label className="flex flex-col">
          Specialization
          <select
            value={selectedSpecialization}
            onChange={(e) => setSelectedSpecialization(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="">All</option>
            {specializations.map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </label>

        <label className="flex flex-col">
          Doctor
          <select
            name="doctorId"
            value={form.doctorId}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          >
            <option value={0}>Select a doctor</option>
            {doctors
              .filter(d => !selectedSpecialization || d.specialization === selectedSpecialization)
              .map(d => (
                <option key={d.id} value={d.id}>{d.name}</option>
              ))}
          </select>
        </label>

        <button type="submit" className="bg-[#0055d9] text-white p-2 rounded-lg">
          Schedule Appointment
        </button>

        {message && <p className="text-center mt-2">{message}</p>}
      </form>
    </div>
  );
}

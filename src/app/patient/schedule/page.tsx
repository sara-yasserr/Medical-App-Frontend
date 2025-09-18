// ScheduleAppointment.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AppointmentDTO } from "@/app/models/appointment";
import { createAppointment } from "@/app/services/appointmentService";
import { getAllDoctors } from "@/app/services/doctorService";
import { Doctor } from "@/app/models/doctor";
import { getPatientId } from "@/app/services/patientService";
import { Specializations } from "@/app/models/doctor";

export default function ScheduleAppointment() {
  const router = useRouter();

  const [patientId, setPatientId] = useState<string | null>(null);
  const [form, setForm] = useState<AppointmentDTO>({
    appointmentDate: "",
    reason: "",
    status: "Scheduled",
    patientId: 0, 
    doctorId: 0,
  });

  const [message, setMessage] = useState("");

  const [doctors, setDoctors] = useState<{ id: number; name: string; specialization: string }[]>([]);
  const [selectedSpecialization, setSelectedSpecialization] = useState("");
const [minDateTime, setMinDateTime] = useState<string>("");
  useEffect(() => {
     const now = new Date();
  // Format to yyyy-MM-ddTHH:mm for datetime-local
  const formatted = now.toISOString().slice(0, 16);
  setMinDateTime(formatted);
    const fetchPatientAndDoctors = async () => {
      try {
        const pId = await getPatientId();
        setPatientId(pId.toString());
        setForm(prev => ({ ...prev, patientId: pId }));

        const res: Doctor[] = await getAllDoctors();
        const mappedDoctors = res.map(d => ({
          id: d.id,
          name: `${d.firstName ?? ""} ${d.lastName ?? ""}`.trim(),
          specialization: d.specialization
        }));
        setDoctors(mappedDoctors);
      } catch (err: any) {
        console.error(err);
        setMessage("Failed to load data or patient not logged in!");
      }
    };

    fetchPatientAndDoctors();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: name === "doctorId" ? Number(value) : value 
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      console.log("Submitting form:", form);
      await createAppointment(form);
      setMessage("Appointment scheduled successfully!");
      router.push("/patient/dashboard");
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
  min={minDateTime}  
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
            {Specializations.map(spec => (
              <option key={spec} value={spec}>{spec}</option>
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

        {message && <p className="text-center mt-2 text-red-500">{message}</p>}
      </form>
    </div>
  );
}

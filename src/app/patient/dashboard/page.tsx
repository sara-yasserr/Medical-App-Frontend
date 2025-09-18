"use client";
import { useEffect, useState } from "react";
import { getPatientAppointments } from "@/app/services/appointmentService";
import { ReadAppointmentDTO, statusLabels } from "@/app/models/appointment";
import { getPatientIdFromToken } from "@/app/services/authService";

export default function PatientDashboard() {
  const [appointments, setAppointments] = useState<ReadAppointmentDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
//   const [patientId, setPatientId] = useState<number | null>(null);
// const patientId = getPatientIdFromToken();
const patientId = 2;


useEffect(() => {
  if (!patientId) {
    setError("Patient ID not found in token");
    setLoading(false);
    return;
  }

  const fetchAppointments = async () => {
    try {
      const data = await getPatientAppointments(patientId);
      setAppointments(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  fetchAppointments();
}, [patientId]);

  return (
    <div className="h-svh flex items-center justify-center">
      <div className="rounded-lg shadow-2xl p-7 min-w-[600px]">
        <h2 className="font-bold text-lg mb-4 text-center">
          Upcoming Appointments
        </h2>

        {loading && <p>Loading appointments...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {!loading && !error && appointments.length === 0 && (
          <p className="text-gray-500 text-center">No appointments found.</p>
        )}

        {!loading && !error && appointments.length > 0 && (
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2">Date</th>
                <th className="border p-2">Reason</th>
                <th className="border p-2">Doctor</th>
                <th className="border p-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((a) => (
                <tr key={a.id}>
                  <td className="border p-2">
                    {new Date(a.appointmentDate).toLocaleString()}
                  </td>
                  <td className="border p-2">{a.reason}</td>
                  <td className="border p-2">{a.doctorName}</td>
                  <td className="border p-2">{statusLabels[a.status]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

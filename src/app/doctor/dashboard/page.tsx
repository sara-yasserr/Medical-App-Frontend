"use client";

import { useEffect, useState } from "react";
import { getDoctorAppointments,completeAppointment } from "@/app/services/appointmentService";
import { getDoctorId } from "@/app/services/doctorService";
import { Status, statusLabels } from "@/app/models/appointment";
import { useRouter } from "next/navigation";
import { ReadAppointmentDTO } from "@/app/models/appointment";

export default function DoctorDashboard() {
  const router = useRouter();
  const [appointments, setAppointments] = useState<ReadAppointmentDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showUpcomingOnly, setShowUpcomingOnly] = useState(false);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const doctorId = await getDoctorId();
        const data = await getDoctorAppointments(doctorId);
        setAppointments(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  const filteredAppointments = showUpcomingOnly
    ? appointments.filter(a => new Date(a.appointmentDate) > new Date())
    : appointments;

  async function handleCancel(appointmentId: number) {
    try {
      await fetch(`/api/appointments/cancel/${appointmentId}`, { method: "PATCH" });
      setAppointments(prev =>
        prev.map(a => (a.id === appointmentId ? { ...a, status: Status.Cancelled } : a))
      );
    } catch (err) {
      console.error("Failed to cancel appointment", err);
    }
  }

async function handleComplete(appointmentId: number) {
  try {
    await completeAppointment(appointmentId);
    setAppointments(prev =>
      prev.map(a => (a.id === appointmentId ? { ...a, status: Status.Completed } : a))
    );
  } catch (err) {
    console.error("Failed to complete appointment", err);
  }
}

  return (
    <div className="h-svh flex flex-col items-center justify-center gap-6">
      <div className="rounded-lg shadow-2xl p-7 min-w-[700px]">
        <h2 className="font-bold text-lg mb-4 text-center">Appointments</h2>

        {loading && <p>Loading appointments...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {!loading && !error && appointments.length === 0 && (
          <p className="text-gray-500 text-center">No appointments found.</p>
        )}

        {!loading && !error && appointments.length > 0 && (
          <>
            {/* Toggle Show Upcoming */}
            <div className="flex items-center mb-4">
              <input
                type="checkbox"
                id="upcoming"
                checked={showUpcomingOnly}
                onChange={() => setShowUpcomingOnly(!showUpcomingOnly)}
                className="mr-2"
              />
              <label htmlFor="upcoming" className="font-medium">
                Show Upcoming Only
              </label>
            </div>

            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border p-2">Date</th>
                  <th className="border p-2">Patient</th>
                  <th className="border p-2">Age</th>
                  <th className="border p-2">Reason</th>
                  <th className="border p-2">Status</th>
                  <th className="border p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredAppointments.map(a => (
                  <tr key={a.id}>
                    <td className="border p-2">{new Date(a.appointmentDate).toLocaleString()}</td>
                    <td className="border p-2">{a.patientName}</td>
                    <td className="border p-2">{a.age}</td>
                    <td className="border p-2">{a.reason}</td>
                    <td className="border p-2">{statusLabels[a.status]}</td>
                    <td className="border p-2">
                      {a.status === Status.Scheduled && (
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleCancel(a.id)}
                            className="bg-red-500 text-white px-2 py-1 rounded"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={() => handleComplete(a.id)}
                            className="bg-green-500 text-white px-2 py-1 rounded"
                          >
                            Complete
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </div>

      {/* Only Profile Action Remaining */}
      <div
        className="p-4 rounded-lg shadow-lg bg-white cursor-pointer hover:bg-blue-50 transition"
        onClick={() => router.push("/doctor/profile")}
      >
        <h3 className="font-semibold text-lg mb-1">Update Profile Information</h3>
        <p className="text-gray-500 text-sm">Edit your personal details</p>
      </div>
    </div>
  );
}

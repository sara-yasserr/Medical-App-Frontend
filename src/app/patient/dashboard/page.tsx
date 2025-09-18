"use client";
import { useEffect, useState } from "react";
import { getPatientAppointments } from "@/app/services/appointmentService";
import { ReadAppointmentDTO, statusLabels } from "@/app/models/appointment";
import { getPatientId } from "@/app/services/patientService";
import { useRouter } from "next/navigation";

export default function PatientDashboard() {
  const router = useRouter();
  const [appointments, setAppointments] = useState<ReadAppointmentDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [patientId, setPatientId] = useState<number | null>(null);
  const [showUpcomingOnly, setShowUpcomingOnly] = useState(false);

  useEffect(() => {
    const fetchPatientIdAndAppointments = async () => {
      try {
        const id = await getPatientId();
        if (!id) {
          setError("Patient not logged in or ID not found!");
          return;
        }
        setPatientId(id);

        const data = await getPatientAppointments(id);
        setAppointments(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPatientIdAndAppointments();
  }, []);

  const filteredAppointments = showUpcomingOnly
    ? appointments.filter(a => new Date(a.appointmentDate) > new Date())
    : appointments;

  return (
    <div className="h-svh flex flex-col items-center justify-center gap-6">
      <div className="rounded-lg shadow-2xl p-7 min-w-[600px]">
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
                {filteredAppointments.map((a) => (
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
          </>
        )}
      </div>

      {/* Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div
          className="p-4 rounded-lg shadow-lg bg-white cursor-pointer hover:bg-blue-50 transition"
          onClick={() => router.push("/patient/schedule")}
        >
          <h3 className="font-semibold text-lg mb-1">Schedule a New Appointment</h3>
          <p className="text-gray-500 text-sm">Book a new appointment with your doctor</p>
        </div>

        <div
          className="p-4 rounded-lg shadow-lg bg-white cursor-pointer hover:bg-blue-50 transition"
          onClick={() => router.push("/patient/profile")}
        >
          <h3 className="font-semibold text-lg mb-1">Update Profile Information</h3>
          <p className="text-gray-500 text-sm">Edit your personal details</p>
        </div>
      </div>
    </div>
  );
}

import {axiosInstance} from "@/lib/axiosInstance"; 
import { ReadAppointmentDTO, AppointmentDTO } from "../models/appointment";
const API_URL = process.env.NEXT_PUBLIC_API_URL as string;

export async function getPatientAppointments(patientId: number): Promise<ReadAppointmentDTO[]> {
  try {
    const res = await axiosInstance.get<ReadAppointmentDTO[]>(
      `${API_URL}/Appointment/patient/${patientId}/appointments`
    );
    return res.data;
  } catch (err: any) {
    if (err?.response?.data) {

      throw new Error(err.response.data.message || JSON.stringify(err.response.data));
    }
    throw new Error(err?.message || "Failed to fetch patient appointments");
  }
}

export async function getDoctorAppointments(doctorId: number): Promise<ReadAppointmentDTO[]> {
  try {
    const res = await axiosInstance.get<ReadAppointmentDTO[]>(
      `${API_URL}/Appointment/doctor/${doctorId}/appointments`
    );
    return res.data;
  } catch (err: any) {
    if (err?.response?.data) {

      throw new Error(err.response.data.message || JSON.stringify(err.response.data));
    }
    throw new Error(err?.message || "Failed to fetch doctor appointments");
  }
}

export async function createAppointment(appointment: AppointmentDTO) {
  try {
    const res = await axiosInstance.post(`${API_URL}/Appointment/schedule-appointment`, appointment);
    return res.data;
  } catch (err: any) {
    if (err?.response?.data) {
      throw new Error(err.response.data.message || JSON.stringify(err.response.data));
    }
    throw new Error(err?.message || "Failed to schedule appointment");
  }
}

export const cancelAppointment = async (appointmentId: number) => {
  const res = await fetch(`${API_URL}/appointment/cancel/${appointmentId}`, {
    method: "PATCH",
  });
  if (!res.ok) throw new Error("Failed to cancel appointment");
};

export async function completeAppointment(id: number) {
  await axiosInstance.patch(`${API_URL}/appointment/complete/${id}`);
}
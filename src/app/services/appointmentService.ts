import axiosInstance from "@/lib/axiosInstance"; 
import { ReadAppointmentDTO } from "../models/appointment";
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

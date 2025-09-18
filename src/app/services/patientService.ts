import axios from "axios";
import {RegisterResponse} from "../models/doctor";
import { RegisterPatientDTO } from "../models/patient";
const API_URL = process.env.NEXT_PUBLIC_API_URL as string;

export async function registerPatient(
  data: RegisterPatientDTO
): Promise<RegisterResponse> {
  try {
    const res = await axios.post<RegisterResponse>(
      `${API_URL}/Patient/register`,
      data
    );
    return res.data;
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data.message || "Patient register failed");
    }
    throw new Error("Something went wrong");
  }
}

export async function getPatientId(): Promise<number> {
  try {
    const res = await axios.get<number>(`${API_URL}/Patient/patient-id`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    });
    return res.data;
  } catch (err: any) {
    console.error("Failed to fetch PatientId:", err);
    throw new Error(err.response?.data?.message || "Failed to fetch PatientId");
  }
}

export async function getDoctorId(): Promise<number> {
  try {
    const res = await axios.get<number>(`${API_URL}/Doctor/doctor-id`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    });
    return res.data;
  } catch (err: any) {
    console.error("Failed to fetch DoctorId:", err);
    throw new Error(err.response?.data?.message || "Failed to fetch DoctorId");
  }
}
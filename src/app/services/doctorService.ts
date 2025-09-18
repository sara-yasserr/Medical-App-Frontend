import axios from "axios";
import { RegisterDoctorDTO,RegisterResponse,Doctor, UpdateDoctorDTO} from "../models/doctor";
import { axiosInstance } from "../../lib/axiosInstance";
const API_URL = process.env.NEXT_PUBLIC_API_URL as string;

export async function registerDoctor(
  data: RegisterDoctorDTO
): Promise<RegisterResponse> {
  try {
    const res = await axios.post<RegisterResponse>(
      `${API_URL}/Doctor/register`,
      data
    );
    return res.data;
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data.message || "Doctor register failed");
    }
    throw new Error("Something went wrong");
  }
}
export async function getDoctorDetails(id: number): Promise<Doctor> {
  try {
    const res = await axiosInstance.get<Doctor>(`${API_URL}/Doctor/details/${id}`);
    return res.data;
  } catch (err: any) {
    if (err?.response?.data) {
      throw new Error(err.response.data.message || JSON.stringify(err.response.data));
    }
    throw new Error(err?.message || "Failed to fetch doctor details");
  }
}

export async function updateDoctor(id: number, updateDTO: UpdateDoctorDTO): Promise<void> {
  try {
    await axiosInstance.patch(`${API_URL}/Doctor/update/${id}`, updateDTO);
  } catch (err: any) {
    if (err?.response?.data) {
      throw new Error(err.response.data.message || JSON.stringify(err.response.data));
    }
    throw new Error(err?.message || "Failed to update doctor");
  }
}
export async function getAllDoctors(): Promise<Doctor[]> {
  try {
    const res = await axiosInstance.get<Doctor[]>(`${API_URL}/Doctor/all`);
    return res.data;
  } catch (err: any) {
    if (err?.response?.data) {
      throw new Error(err.response.data.message || JSON.stringify(err.response.data));
    }
    throw new Error(err?.message || "Failed to fetch doctors");
  }
}

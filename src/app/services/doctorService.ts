import axios from "axios";
import {
  RegisterDoctorDTO,
  RegisterResponse
} from "../models/doctor";

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
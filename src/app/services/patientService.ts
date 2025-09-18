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
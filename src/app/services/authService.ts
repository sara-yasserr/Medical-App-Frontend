import axios from "axios";
import { LoginDTO, LoginResponse } from "../models/auth";
import { jwtDecode } from "jwt-decode";
const API_URL = process.env.NEXT_PUBLIC_API_URL as string;

export async function login(loginData: LoginDTO): Promise<LoginResponse> {
  try {
    const response = await axios.post<LoginResponse>(
      `${API_URL}/Auth/login`,
      loginData
    );
    console.log("Login response:", response.data);
    return response.data;
  } catch (error: any) {
    console.error("Login error:", error);
    if (error.response) {
      throw new Error(error.response.data.message || "Login failed");
    }
    throw new Error("Something went wrong");
  }
}


export function getIdFromToken(): string | null {
  if (typeof window === "undefined") return null;

  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const decoded: any = jwtDecode(token);

    // backend بيحط الـ ID في claim باسم NameIdentifier
    return decoded.NameIdentifier ? decoded.NameIdentifier.toString() : null;
  } catch (err) {
    console.error("Invalid token", err);
    return null;
  }
}
// export function getIdFromToken(): number | null {
//   if (typeof window === "undefined") return null;

//   const token = localStorage.getItem("token");
//   if (!token) return null;

//   try {
//     const decoded: any = jwtDecode(token);

//     // بعض الـ JWT decoders يحول NameIdentifier لـ nameid
//     return decoded.nameid ? Number(decoded.nameid) : null;
//   } catch (err) {
//     console.error("Invalid token", err);
//     return null;
//   }
// }
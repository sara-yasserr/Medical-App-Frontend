export interface RegisterDoctorDTO {
  firstName: string;
  lastName: string;
  specialization: string;
  email: string;
  phoneNumber: string;
  password: string;
}

export interface RegisterResponse {
  id: number;
}


export interface Doctor {
  id: number;
  firstName: string;
  lastName: string;
  specialization: string;
  email: string;
  phoneNumber: string;
}

export interface UpdateDoctorDTO {
  firstName?: string;
  lastName?: string;
  specialization?: string;
  email?: string;
  phoneNumber?: string;
  password?: string;
}

export const Specializations = [
  "Cardiology",
  "Dermatology",
  "Neurology",
  "Pediatrics",
  "Orthopedics",
  "Psychiatry",
  "General Medicine",
] as const;

export type Specialization = (typeof Specializations)[number];
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
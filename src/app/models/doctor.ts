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
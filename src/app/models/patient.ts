export interface RegisterPatientDTO {
  firstName: string;
  lastName: string;
  dateOfBirth: string; 
  email: string;
  phoneNumber: string;
  password: string;
}
export interface UpdatePatientDTO {
  firstName?: string;
  lastName?: string;
  dateOfBirth?: string;
  email?: string;
  phoneNumber?: string;
  password?: string;
}
export interface ReadPatientDTO {
  id: number;
  firstName: string;
  lastName: string;
  dateOfBirth: string; 
  email: string;
  phoneNumber: string;
}

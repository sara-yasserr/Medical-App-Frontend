export enum Status {
  Scheduled = 0,
  Completed = 1,
  Cancelled = 2,
}

export const statusLabels: Record<Status, string> = {
  [Status.Scheduled]: "Scheduled",
  [Status.Completed]: "Completed",
  [Status.Cancelled]: "Cancelled",
};

export interface AppointmentDTO {
  appointmentDate: string; 
  reason: string;
  status: string; 
  patientId: number;
  doctorId: number;
}

export interface ReadAppointmentDTO {
  id: number;
  appointmentDate: string; 
  reason: string;
  status: Status;
  doctorName: string;
  patientName: string;
  age: number;
  patientId: number;
  doctorId: number;
}

export interface Citas {
  id: string;
  fecha: Date;
  hora: string;
  pacienteId: string; 
  doctorId: string; 
  especialidad: string;
  motivo: string;
  estado: string;
  comentario: string;
}

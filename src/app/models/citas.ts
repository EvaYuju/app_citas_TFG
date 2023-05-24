export interface Citas {
  id: string;
  fecha: Date;
  pacienteId: string; //Quitar
  doctorId: string; //Quitar
  especialidad: string;
  motivo: string;
  estado: string;
  comentario: string;
}

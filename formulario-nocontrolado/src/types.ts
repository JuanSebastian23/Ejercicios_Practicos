export interface FormData {
  nombre: string;
  email: string;
  telefono: string;
  edad: string;
  mensaje: string;
}

export interface SubmittedData extends FormData {
  id: number;
  fecha: string;
}

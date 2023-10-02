import { Client } from "src/clients/client.entity"
import { AppointmentsStatus } from "src/clients/client.entity"
import { Procedures } from "src/patient-appointments/appointment.entity"
import { v4 } from "uuid"

export const clientInMemory:Client = {
    id:v4(),
    name:"Chris",
    id_cedula:"402-3181906-7",
    age:21,
    tel:"829-533-2795",
    appointment:AppointmentsStatus.NONE,
}


export const procedimientos: Procedures = {
    texts: ["texto1", "texto2", "texto3"]
  };
  
  
  
  
  
  
  
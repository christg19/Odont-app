import { Client } from "src/clients/client.entity"

export type Procedures = {
    name_procedures: string[];
  };

export class Appointment {
    id:string
    patient: Client["name"]
    date:string
    procedures: Procedures

}
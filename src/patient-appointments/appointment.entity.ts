import { Client } from "src/clients/client.entity"

export type Procedures = {
    name_procedures: string[];
  };

export class Appointment {
    patient: Client["name"]
    date:string
    procedures: Procedures

}
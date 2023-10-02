import { Client } from "src/clients/client.entity"

export interface Procedures {
  texts: string[];
}

export class Appointment {
    id:string
    patient: Client["name"]
    date:string
    procedures: Procedures

}
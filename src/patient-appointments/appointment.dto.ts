import { Procedures } from "./appointment.entity"

export class DtoAppointment {
    id: string
    patient: string
    date: string
    procedures: Procedures
}

export class DtoUpdatedAppointment {
    patient: string
    date: string
    procedures: Procedures
}
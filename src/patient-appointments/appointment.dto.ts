import { Procedures } from "./appointment.entity"

export class DtoAppointment {
    patient: string
    date: string
    procedures: Procedures
}

export class DtoUpdatedAppointment {
    patient: string
    date: string
    procedures: Procedures
}

export class DtoUserAppointment {
    name:string
    desired_date:string
    procedures: Procedures
}

export class DtoUserAppointmentWithId {
    id:string
    name:string
    desired_date:string
    procedures: Procedures
}
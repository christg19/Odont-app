export class DtoAppointment {
    userId:number
    notes:string
    dateHour:Date
    status:string
}

export class DtoUpdatedAppointment {
    userId:number
    notes?:string
    dateHour?:Date
    status?:string
}


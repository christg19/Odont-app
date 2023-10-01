export enum AppointmentsStatus {
    NONE = 'NONE',
    SOMETHING = "SOMETHING",
    
}

export class Client {
    id:string
    name:string
    id_cedula:string
    age:number
    tel:string
    appointment:AppointmentsStatus
}




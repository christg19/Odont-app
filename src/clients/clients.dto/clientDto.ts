import { isString } from 'class-validator'
import { AppointmentsStatus } from '../client.entity'


export class Client {
    id:string
    name:string
    id_cedula:string
    age:number
    tel:string
    appointment: AppointmentsStatus
}

export class DtoClient {
    name:string
    id_cedula:string
    age:number
    tel:string
}

export class DtoUpdatedClient {
    name:string
    id_cedula:string
    age:number
    tel:string
    appointment: AppointmentsStatus
}
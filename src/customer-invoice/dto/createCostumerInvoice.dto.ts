import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateCustomerInvoiceDto {
    @IsNumber()
    @IsNotEmpty()
    readonly appointmentId: number;
}
import { BelongsTo, Column, ForeignKey, HasMany, HasOne, Model, Table } from "sequelize-typescript";
import { Patient } from "src/patient/patient.entity";
import { Tooth } from "src/tooth/tooth.entity";

@Table
export class Odontogram extends Model<Odontogram> {

    @BelongsTo(() => Patient)
    patient:Patient;

    @ForeignKey(() => Patient)
    @Column
    patientId:number;

    @HasMany(() => Tooth)
    tooth: Tooth[];

}
import { Table, Model, Column, HasOne, ForeignKey, BelongsTo } from "sequelize-typescript";
import { Tooth } from "src/tooth/tooth.entity";

export enum ProcedureStatus {
  'open' = 0,
  'closed' = 1
}

@Table 
export class Procedure extends Model<Procedure> {

    @BelongsTo(() => Tooth)
    tooth:Tooth;

    @ForeignKey(() => Tooth)
    @Column
    toothId: number;

    @Column
    status:ProcedureStatus;
    
}
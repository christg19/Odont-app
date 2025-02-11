import { Column, ForeignKey, Model, Table } from "sequelize-typescript";
import { Procedure } from "./procedure.entity";
import { Tooth } from "src/tooth/tooth.entity";

@Table
export class ToothProcedure extends Model<ToothProcedure> {
  
  @ForeignKey(() => Tooth)
  @Column
  toothId: number;

  @ForeignKey(() => Procedure)
  @Column
  procedureId: number;
  
}

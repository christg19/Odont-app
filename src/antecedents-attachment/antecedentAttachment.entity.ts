import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Antecedent } from 'src/antecedents/antecedents.entity';

@Table
export class AntecedentAttachment extends Model<AntecedentAttachment> {
  @Column
  fileName: string;

  // Guardamos el contenido en base64 (puede ser un string largo)
  @Column({ type: DataType.TEXT })
  fileData: string;

  @Column
  filePath: string;

  @Column
  fileType: string;

  @Column
  size: number;

  @ForeignKey(() => Antecedent)
  @Column({
    allowNull: false,
  })
  antecedentId: number;

  @BelongsTo(() => Antecedent)
  antecedent: Antecedent;
}

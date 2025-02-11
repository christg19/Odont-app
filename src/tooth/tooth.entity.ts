import { Table, Column, Model, ForeignKey, BelongsTo, HasMany, BelongsToMany, DataType } from 'sequelize-typescript';
import { Odontogram } from 'src/odontogram/odontogram.entity';
import { ToothProcedure } from 'src/procedure/procedureTooth.entity';

export enum ToothStatus {
    'D1' = 0,
    'D2' = 1,
    'D3' = 2,
    'D4' = 3,
    'D5' = 4,
    'unassigned' = 5
}

@Table
export class Tooth extends Model<Tooth> {
    @Column
    toothPosition: number;

    @Column({ type: DataType.INTEGER, allowNull: false, defaultValue: ToothStatus.unassigned })
    status: number;      

    @Column
    toothName: number;

    @ForeignKey(() => Odontogram)
    @Column
    odontogramId: number;

    @BelongsTo(() => Odontogram, { onDelete: 'CASCADE' })
    odontogram: Odontogram;

    @Column({ type: DataType.ARRAY(DataType.INTEGER) })
    serviceIds?: number[];
}

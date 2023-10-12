import { Table, Model, Column } from "sequelize-typescript";

@Table 
export class Notification extends Model<Notification> {

    @Column
    title:string;

    @Column
    description:string;

    @Column
    read: boolean;
}
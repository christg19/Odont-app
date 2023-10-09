import { Table, Column, Model } from 'sequelize-typescript';

@Table
export class Employee extends Model<Employee> {
  @Column
  name: string;

  @Column
  lastName: string;

  @Column
  phoneNumber: string;

  @Column
  position: string;

  @Column
  salary: number;
}



import { Table, Column, Model, DataType } from 'sequelize-typescript';
import { Role } from 'src/enum/role.enum';

@Table
export class User extends Model<User> {
  @Column
  name: string;

  @Column
  email: string;

  @Column
  password: string;

  @Column(DataType.ARRAY(DataType.JSONB))
  roles: Role[];
}

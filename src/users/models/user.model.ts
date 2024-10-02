import { ApiProperty } from '@nestjs/swagger';
import {
  AllowNull,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';

interface IUserCreationAttr {
  fullName: string;
  email: string;
  phone: string;
  tg_link: string;
  hashed_password: string;
  photo: string;
}

@Table({ tableName: 'users' })
export class Users extends Model<Users, IUserCreationAttr> {
  @ApiProperty({
    example: 1,
    description: 'User unique ID',
  })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  fullName: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  phone: string;

  @Column({
    type: DataType.STRING,
  })
  tg_link: string;

  @Column({
    type: DataType.STRING,
  })
  hashed_password: string;

  @Column({
    type: DataType.STRING,
  })
  photo: string;

  @Column({
    type: DataType.STRING,
    defaultValue: false,
  })
  is_active: boolean;

  @Column({
    type: DataType.STRING,
    defaultValue: false,
  })
  is_owner: boolean;

  @Column({
    type: DataType.STRING,
  })
  hashed_refresh_token: string;

  @Column({
    type: DataType.STRING,
  })
  activation_link: string;
}

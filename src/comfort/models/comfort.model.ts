import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface IComfortCreationAttr {
  name: string;
}

@Table({ tableName: 'comfort' })
export class Comfort extends Model<Comfort, IComfortCreationAttr> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id: number;

  @Column({ type: DataType.STRING })
  name: string;
}

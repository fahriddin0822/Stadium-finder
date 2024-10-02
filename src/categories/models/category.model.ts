import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';

interface ICategoryCreationAttr {
  name: string;
  parentId: number;
}

@Table({ tableName: 'categories' })
export class Categories extends Model<Categories, ICategoryCreationAttr> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id: number;

  @Column({ type: DataType.STRING })
  name: string;

  @ForeignKey(() => Categories)
  @Column({ type: DataType.INTEGER })
  parentId: number;

  @BelongsTo(() => Categories, { foreignKey: 'parentId' })
  parentCategory: Categories; // Reference to parent category

  @HasMany(() => Categories)
  categories: Categories[];
}

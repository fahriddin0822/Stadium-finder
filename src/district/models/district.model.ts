import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Region } from '../../region/models/region.model';

interface IDistrictCreationAttr {
  name: string;
  regionId: number;
}

@Table({ tableName: 'district' })
export class District extends Model<District, IDistrictCreationAttr> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id: number;

  @Column({ type: DataType.STRING })
  name: string;

  @ForeignKey(() => Region)
  @Column({ type: DataType.INTEGER })
  regionId: number;
  @BelongsTo(() => Region, {
    onDelete: 'CASCADE', // When a region is deleted, its districts will be deleted
    onUpdate: 'CASCADE', // When a region's ID is updated, the foreign key in districts will also be updated
  })
  region: Region;
}

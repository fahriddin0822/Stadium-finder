import {
    AutoIncrement,
    Column,
    DataType,
    Model,
    PrimaryKey,
    Table,
    ForeignKey,
    BelongsTo
} from "sequelize-typescript";
import { Categories } from "../../categories/models/category.model";
import { Region } from "../../region/models/region.model";
import { District } from "../../district/models/district.model";
import { Owner } from "../../owner/model/owner.model";

interface IStadiumCreationAttr {
    category_id: number;
    owner_id: number;
    contact_with: number;
    name: string;
    volume: string;
    address: string;
    region_id: number;
    district_id: number;
    location: string;
    buildAt: Date;
    start_time: Date;
    end_time: Date;
}

@Table({ tableName: "stadiums" })
export class Stadiums extends Model<Stadiums, IStadiumCreationAttr> {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    id: number;

    @ForeignKey(() => Categories)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    category_id: number;

    @BelongsTo(() => Categories)
    category: Categories;

    @ForeignKey(() => Owner)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    owner_id: number;

    @BelongsTo(() => Owner)
    owner: Owner;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    contact_with: number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    name: string;

    @Column({
        type: DataType.STRING,
    })
    volume: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    address: string;

    @ForeignKey(() => Region)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    region_id: number;

    @BelongsTo(() => Region)
    region: Region;

    @ForeignKey(() => District)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    district_id: number;

    @BelongsTo(() => District)
    district: District;

    @Column({
        type: DataType.STRING,
    })
    location: string;

    @Column({
        type: DataType.DATE,
        allowNull: false,
    })
    buildAt: Date;

    @Column({
        type: DataType.TIME,
        allowNull: false,
    })
    start_time: Date;

    @Column({
        type: DataType.TIME,
        allowNull: false,
    })
    end_time: Date;
}

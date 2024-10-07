import { AutoIncrement, Column, DataType, Model, PrimaryKey, Table } from "sequelize-typescript";

interface IOwnerCreationAttr {
    name: string;
}

@Table({ tableName: "owner" })
export class Owner extends Model<Owner, IOwnerCreationAttr> {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    id: number;

    @Column(DataType.STRING)
    name: string;

}

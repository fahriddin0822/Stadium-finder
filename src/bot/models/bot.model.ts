import {
    AutoIncrement,
    Column,
    DataType,
    Model,
    PrimaryKey,
    Table,
} from "sequelize-typescript";

interface IBotCreationAttr {
    userId: number;
    username: string;
    firstName: string;
    lastName: string;
    lang: string;
}

@Table({ tableName: "bot" })
export class Bot extends Model<Bot, IBotCreationAttr> {
    @Column({
        type: DataType.BIGINT,
        primaryKey: true,
        autoIncrement: true,
    })
    userId: number;

    @Column({
        type: DataType.STRING,
    })
    username: string;

    @Column({
        type: DataType.STRING,
    })
    firstName: string;

    @Column({
        type: DataType.STRING,
    })
    lastName: string;

    @Column({
        type: DataType.STRING,
    })
    phoneNumber: string;

    @Column({
        type: DataType.BOOLEAN,
        defaultValue: false,
    })
    status: boolean;

    @Column({
        type: DataType.STRING,
    })
    lang: string;
}

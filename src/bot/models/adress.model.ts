import {
    BelongsTo,
    Column,
    DataType,
    ForeignKey,
    Model,
    Table,
} from "sequelize-typescript";
import { Bot } from "./bot.model";

interface IAddressCreationAttr {
    userId: number;
    address_name: string;
    address: string;
    location: string;
    last_state: string;
}

@Table({ tableName: "address" })
export class Address extends Model<Address, IAddressCreationAttr> {
    @Column({
        type: DataType.BIGINT,
        primaryKey: true,
        autoIncrement: true,
    })
    id: number;

    @ForeignKey(() => Bot)
    @Column({
        type: DataType.BIGINT,
    })
    userId: number;

    @Column({ type: DataType.STRING })
    address_name: string;

    @Column({ type: DataType.STRING })
    address: string;

    @Column({ type: DataType.STRING })
    location: string;

    @Column({
        type: DataType.STRING,
    })
    last_state:string
    
    @BelongsTo(() => Bot)
    bot: Bot;
}

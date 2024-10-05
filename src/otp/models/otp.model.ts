import { Column, DataType, Model, Table } from "sequelize-typescript";

interface IOTPCreationAttr {
    id: string;
    otp: string;
    expiration_time: Date;
    verified: boolean;
    phone_number: string;
}

@Table({ tableName: "otp" })
export class OTP extends Model<OTP, IOTPCreationAttr> {
    @Column({
        type: DataType.UUID,
        primaryKey: true,
    })
    id: string;

    @Column({
        type: DataType.STRING(10),
    })
    otp: string;

    @Column({
        type: DataType.DATE,
    })
    expiration_time: Date;

    @Column({
        type: DataType.BOOLEAN,
        defaultValue: false,
    })
    verified: boolean;

    @Column({
        type: DataType.STRING(20),
    })
    phone_number: string;
}

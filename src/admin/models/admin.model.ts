import {
    AutoIncrement,
    Column,
    DataType,
    Model,
    PrimaryKey,
    Table,
} from "sequelize-typescript";

interface IAdminCreationAttr {
    login: string;
    telegram_link: string;
    admin_photo: string;
    hashed_password: string;
    is_active: boolean;
    is_creater: boolean;
    hashed_refresh_token: string;
}

@Table({ tableName: "admin" })
export class Admin extends Model<Admin, IAdminCreationAttr> {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    id: number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    login: string;

    @Column({
        type: DataType.STRING,
    })
    telegram_link: string;

    @Column({
        type: DataType.STRING,
    })
    admin_photo: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    hashed_password: string;

    @Column({
        type: DataType.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    })
    is_active: boolean;

    @Column({
        type: DataType.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    })
    is_creater: boolean;

    @Column({
        type: DataType.STRING,
    })
    hashed_refresh_token: string;

    @Column({
        type: DataType.STRING,
    })
    activation_link: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    email: string;
}

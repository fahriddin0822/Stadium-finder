import { AllowNull, BelongsTo, Column, DataType, ForeignKey, Model } from "sequelize-typescript";
import { Users } from "../../users/models/user.model";

interface IUserWalletCreationAttr {
    user_id: number;
    wallet: number;
}

export class UserWallet extends Model<UserWallet, IUserWalletCreationAttr> {
    @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
    id: number;

    @ForeignKey(() => Users)
    @Column({ type: DataType.INTEGER, allowNull: false })
    user_id: number;
    @BelongsTo(() => Users)
    user: Users;

    @Column({ type: DataType.INTEGER, defaultValue: 0 })
    wallet: number;

}

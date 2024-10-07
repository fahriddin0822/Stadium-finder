import { Column, DataType } from "sequelize-typescript";

interface IUserCardCreationAttr{
  
}

export class UserCard {
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      })
      id: number;
}

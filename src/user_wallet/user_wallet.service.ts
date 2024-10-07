import { Injectable } from '@nestjs/common';
import { CreateUserWalletDto } from './dto/create-user_wallet.dto';
import { UpdateUserWalletDto } from './dto/update-user_wallet.dto';
import { InjectModel } from '@nestjs/sequelize';
import { UserWallet } from './models/user_wallet.model';

@Injectable()
export class UserWalletService {
  constructor(@InjectModel(UserWallet) private user_wallet_model: typeof UserWallet) { }
  create(createUserWalletDto: CreateUserWalletDto) {
    return this.user_wallet_model.create(createUserWalletDto);
  }

  findAll() {
    return this.user_wallet_model.findAll({ include: { all: true } });
  }

  findOne(id: number) {
    return this.user_wallet_model.findByPk(id);
  }

  update(id: number, updateUserWalletDto: UpdateUserWalletDto) {
    return this.user_wallet_model.update(updateUserWalletDto, { where: { id } });
  }

  remove(id: number) {
    return this.user_wallet_model.destroy({ where: { id } });
  }
}

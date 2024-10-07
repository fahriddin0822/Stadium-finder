import { Injectable } from '@nestjs/common';
import { CreateOwnerDto } from './dto/create-owner.dto';
import { UpdateOwnerDto } from './dto/update-owner.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Owner } from './model/owner.model';

@Injectable()
export class OwnerService {
  constructor(@InjectModel(Owner) private owner_model: typeof Owner) { }
  create(createOwnerDto: CreateOwnerDto) {
    return this.owner_model.create(createOwnerDto);
  }

  findAll() {
    return this.owner_model.findAll({ include: { all: true } });
  }

  findOne(id: number) {
    return this.owner_model.findByPk(id);
  }

  update(id: number, updateOwnerDto: UpdateOwnerDto) {
    return this.owner_model.update(updateOwnerDto, {where:{id}});
  }

  remove(id: number) {
    return this.owner_model.destroy({where:{id}});
  }
}

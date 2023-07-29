import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import DB from '../dataBase/DB';

@Injectable()
export class UsersService {
  constructor(private db: DB) {}
  create(dto: CreateUserDto) {
    const { password, ...rest } = this.db.users.create(dto);
    return rest;
  }

  findAll() {
    const allUsers = this.db.users.findMany();
    return allUsers.map(({ password, ...rest }) => rest);
  }

  findOne(id: string) {
    const user = this.db.users.findOne('id', id);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    const { password, ...rest } = user;
    return rest;
  }

  update(id: string, dto: UpdateUserDto) {
    const user = this.db.users.findOne('id', id);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    if (user.password !== dto.oldPassword) {
      throw new HttpException('Wrong password', HttpStatus.FORBIDDEN);
    }
    return this.db.users.update(id, { password: dto.newPassword });
  }

  remove(id: string) {
    const user = this.db.users.findOne('id', id);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    const delUser = this.db.users.delete(id);
    const { password, ...rest } = delUser;
    return rest;
  }
}

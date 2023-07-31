import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import DB from '../dataBase/DB';

@Injectable()
export class UsersService {
  constructor(private db: DB) {}
  create(dto: CreateUserDto) {
    return this.db.users.create(dto);
  }

  findAll() {
    return this.db.users.findMany();
  }

  findOne(id: string) {
    const user = this.db.users.findOne('id', id);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  update(id: string, dto: UpdateUserDto) {
    const user = this.db.users.findOne('id', id);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    if (user.password !== dto.oldPassword) {
      throw new HttpException('Wrong password', HttpStatus.FORBIDDEN);
    }
    return this.db.users.update(id, {
      password: dto.newPassword,
    });
  }

  remove(id: string) {
    const user = this.db.users.findOne('id', id);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return this.db.users.delete(id);
  }
}

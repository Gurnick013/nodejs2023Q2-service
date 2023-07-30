import { Injectable } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import { HttpException } from '@nestjs/common/exceptions';
import { CreateAlbumDto } from './dto/createAlbums.dto';
import { UpdateAlbumDto } from './dto/updateAlbums.dto';
import DB from '../dataBase/DB';

@Injectable()
export class AlbumsService {
  constructor(private db: DB) {}
  create(dto: CreateAlbumDto) {
    return this.db.albums.create(dto);
  }

  findAll() {
    return this.db.albums.findMany();
  }

  findOne(id: string) {
    const album = this.db.albums.findOne('id', id);
    if (!album) {
      throw new HttpException('Album not found', HttpStatus.NOT_FOUND);
    }
    return album;
  }

  update(id: string, dto: UpdateAlbumDto) {
    const album = this.db.albums.findOne('id', id);
    if (!album) {
      throw new HttpException('Album not found', HttpStatus.NOT_FOUND);
    }
    return this.db.albums.update(id, dto);
  }

  remove(id: string) {
    const album = this.db.albums.findOne('id', id);
    if (!album) {
      throw new HttpException('Album not found', HttpStatus.NOT_FOUND);
    }
    return this.db.albums.delete(id);
  }
}

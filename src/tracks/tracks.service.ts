import { Injectable } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import { HttpException } from '@nestjs/common/exceptions';
import { CreateTrackDto } from './dto/createTracks.dto';
import { UpdateTrackDto } from './dto/updateTracks.dto';
import DB from '../dataBase/DB';

@Injectable()
export class TracksService {
  constructor(private db: DB) {}
  create(dto: CreateTrackDto) {
    return this.db.tracks.create(dto);
  }

  findAll() {
    return this.db.tracks.findMany();
  }

  findOne(id: string) {
    const track = this.getOne(id);
    if (!track) {
      throw new HttpException('Track not found', HttpStatus.NOT_FOUND);
    }
    return track;
  }

  update(id: string, dto: UpdateTrackDto) {
    const track = this.getOne(id);
    if (!track) {
      throw new HttpException('Track not found', HttpStatus.NOT_FOUND);
    }
    return this.db.tracks.update(id, dto);
  }

  remove(id: string) {
    const track = this.getOne(id);
    if (!track) {
      throw new HttpException('Track not found', HttpStatus.NOT_FOUND);
    }
    return this.db.tracks.delete(id);
  }

  getOne(id: string) {
    return this.db.tracks.findOne('id', id);
  }

  getMany(ids: string[]) {
    return this.db.tracks.findManyInArrayAnyOf('id', ids);
  }
}

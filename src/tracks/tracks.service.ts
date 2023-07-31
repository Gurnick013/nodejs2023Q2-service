import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import { HttpException } from '@nestjs/common/exceptions';
import { CreateTrackDto } from './dto/createTracks.dto';
import { UpdateTrackDto } from './dto/updateTracks.dto';
import { FavoritesService } from '../favorites/favorites.service';
import DB from '../dataBase/DB';

@Injectable()
export class TracksService {
  constructor(
    @Inject(forwardRef(() => FavoritesService))
    private favoritesService: FavoritesService,
    private db: DB,
  ) {}
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
    this.favoritesService.removeFromAnother('tracks', id);
    return this.db.tracks.delete(id);
  }

  getOne(id: string) {
    return this.db.tracks.findOne('id', id);
  }

  getMany(ids: string[]) {
    return this.db.tracks.findManyInArrayAnyOf('id', ids);
  }

  findManyAndNullArtistId(id: string) {
    const tracks = this.db.tracks.findMany('artistId', id);
    if (tracks) {
      tracks.forEach((track) => {
        track.artistId = null;
        this.db.tracks.update(track.id, track);
      });
    }
  }

  findManyAndNullAlbumId(id: string) {
    const tracks = this.db.tracks.findMany('albumId', id);
    if (tracks) {
      tracks.forEach((track) => {
        track.albumId = null;
        this.db.tracks.update(track.id, track);
      });
    }
  }
}

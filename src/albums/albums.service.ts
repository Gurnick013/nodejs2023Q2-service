import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import { HttpException } from '@nestjs/common/exceptions';
import { CreateAlbumDto } from './dto/createAlbums.dto';
import { UpdateAlbumDto } from './dto/updateAlbums.dto';
import { FavoritesService } from '../favorites/favorites.service';
import { TracksService } from '../tracks/tracks.service';
import DB from '../dataBase/DB';

@Injectable()
export class AlbumsService {
  constructor(
    @Inject(forwardRef(() => FavoritesService))
    @Inject(forwardRef(() => TracksService))
    private favoritesService: FavoritesService,
    private tracksService: TracksService,
    private db: DB,
  ) {}
  create(dto: CreateAlbumDto) {
    return this.db.albums.create(dto);
  }

  findAll() {
    return this.db.albums.findMany();
  }

  findOne(id: string) {
    const album = this.getOne(id);
    if (!album) {
      throw new HttpException('Album not found', HttpStatus.NOT_FOUND);
    }
    return album;
  }

  update(id: string, dto: UpdateAlbumDto) {
    const album = this.getOne(id);
    if (!album) {
      throw new HttpException('Album not found', HttpStatus.NOT_FOUND);
    }
    return this.db.albums.update(id, dto);
  }

  remove(id: string) {
    const album = this.getOne(id);
    if (!album) {
      throw new HttpException('Album not found', HttpStatus.NOT_FOUND);
    }
    this.favoritesService.removeFromAnother('albums', id);
    this.tracksService.findManyAndNullAlbumId(id);
    return this.db.albums.delete(id);
  }

  getOne(id: string) {
    return this.db.albums.findOne('id', id);
  }

  getMany(ids: string[]) {
    return this.db.albums.findManyInArrayAnyOf('id', ids);
  }

  findManyAndNullArtistId(id: string) {
    const albums = this.db.albums.findMany('artistId', id);
    if (albums) {
      albums.forEach((album) => {
        album.artistId = null;
        this.db.albums.update(album.id, album);
      });
    }
    return albums;
  }
}

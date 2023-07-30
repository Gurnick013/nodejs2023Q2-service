import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import { HttpException } from '@nestjs/common/exceptions';
import { CreateArtistDto } from './dto/createArtists.dto';
import { UpdateArtistDto } from './dto/updateArtists.dto';
import DB from '../dataBase/DB';
import { FavoritesService } from '../favorites/favorites.service';
import { AlbumsService } from '../albums/albums.service';
import { TracksService } from '../tracks/tracks.service';

@Injectable()
export class ArtistsService {
  constructor(
    @Inject(forwardRef(() => FavoritesService))
    @Inject(forwardRef(() => AlbumsService))
    @Inject(forwardRef(() => TracksService))
    private favoritesService: FavoritesService,
    private albumsService: AlbumsService,
    private tracksService: TracksService,
    private db: DB,
  ) {}
  create(dto: CreateArtistDto) {
    return this.db.artists.create(dto);
  }

  findAll() {
    return this.db.artists.findMany();
  }

  findOne(id: string) {
    const artist = this.getOne(id);
    if (!artist) {
      throw new HttpException('Artist not found', HttpStatus.NOT_FOUND);
    }
    return artist;
  }

  update(id: string, updateArtistDto: UpdateArtistDto) {
    const artist = this.getOne(id);
    if (!artist) {
      throw new HttpException('Artist not found', HttpStatus.NOT_FOUND);
    }
    return this.db.artists.update(id, updateArtistDto);
  }

  remove(id: string) {
    const artist = this.getOne(id);
    if (!artist) {
      throw new HttpException('Artist not found', HttpStatus.NOT_FOUND);
    }
    this.favoritesService.removeFromAnother('artists', id);
    this.albumsService.findManyAndNullArtistId(id);
    this.tracksService.findManyAndNullArtistId(id);
    return this.db.artists.delete(id);
  }

  getOne(id: string) {
    return this.db.artists.findOne('id', id);
  }

  getMany(ids: string[]) {
    return this.db.artists.findManyInArrayAnyOf('id', ids);
  }
}

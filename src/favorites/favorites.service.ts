import { Injectable } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import { HttpException } from '@nestjs/common/exceptions';
import DB from '../dataBase/DB';
import { TracksService } from '../tracks/tracks.service';
import { AlbumsService } from '../albums/albums.service';
import { ArtistsService } from '../artists/artists.service';
import { FavoritesType } from './types/types';

@Injectable()
export class FavoritesService {
  constructor(
    private artistsService: ArtistsService,
    private albumsService: AlbumsService,
    private tracksService: TracksService,
    private db: DB,
  ) {}

  private getEntity(type: FavoritesType) {
    switch (type) {
      case 'artists':
        return this.artistsService;
      case 'albums':
        return this.albumsService;
      case 'tracks':
        return this.tracksService;
    }
  }

  findAll() {
    const allFavorites = this.db.favorites.findMany();
    const favoritesWithEntities = {};
    Object.entries(allFavorites).forEach(([key, value]) => {
      favoritesWithEntities[key] = this.getEntity(key as FavoritesType).getMany(
        value,
      );
    });
    return favoritesWithEntities;
  }

  create(type: FavoritesType, id: string) {
    const track = this.getEntity(type).getOne(id);
    if (!track) {
      throw new HttpException(
        'Track not found',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    const entity = this.db.favorites.findOneByType(type);
    if (entity.includes(id)) {
      throw new HttpException('Already in favs', HttpStatus.CONFLICT);
    }
    this.db.favorites.add(type, id);
    return {
      message: `Id: ${id} successfully added to ${type}`,
    };
  }

  remove(type: FavoritesType, id: string) {
    const entity = this.db.favorites.findOneByType(type);
    if (!entity.includes(id)) {
      throw new HttpException('Not in favs', HttpStatus.NOT_FOUND);
    }
    this.db.favorites.delete(type, id);
    return {
      message: `Id: ${id} successfully removed from ${type}`,
    };
  }
}

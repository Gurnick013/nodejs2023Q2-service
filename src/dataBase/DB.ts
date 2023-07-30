import { Injectable } from '@nestjs/common/decorators';
import UsersDB from './entities/usersDB';
import ArtistsDB from './entities/artistsDB';
import AlbumsDB from './entities/albumsDB';

@Injectable()
export default class DB {
  users = new UsersDB();
  artists = new ArtistsDB();
  albums = new AlbumsDB();
}

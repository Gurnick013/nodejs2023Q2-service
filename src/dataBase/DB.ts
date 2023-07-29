import { Injectable } from '@nestjs/common/decorators';
import UsersDB from './entities/usersDB';
import ArtistsDB from './entities/artistsDB';

@Injectable()
export default class DB {
  users = new UsersDB();
  artists = new ArtistsDB();
}

import { forwardRef, Module } from '@nestjs/common';
import { AlbumsController } from './albums.controller';
import { AlbumsService } from './albums.service';
import { FavoritesModule } from '../favorites/favorites.module';
import { TracksModule } from '../tracks/tracks.module';

@Module({
  imports: [forwardRef(() => FavoritesModule), forwardRef(() => TracksModule)],
  controllers: [AlbumsController],
  providers: [AlbumsService],
  exports: [AlbumsService],
})
export class AlbumsModule {}

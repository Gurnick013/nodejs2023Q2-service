import { forwardRef, Module } from '@nestjs/common';
import { ArtistsController } from './artists.controller';
import { ArtistsService } from './artists.service';
import { FavoritesModule } from '../favorites/favorites.module';
import { TracksModule } from '../tracks/tracks.module';
import { AlbumsModule } from '../albums/albums.module';

@Module({
  imports: [
    forwardRef(() => FavoritesModule),
    forwardRef(() => TracksModule),
    forwardRef(() => AlbumsModule),
  ],
  controllers: [ArtistsController],
  providers: [ArtistsService],
  exports: [ArtistsService],
})
export class ArtistsModule {}

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { DataBaseModule } from './dataBase/database.module';
import { ArtistsModule } from './artists/artists.module';

@Module({
  imports: [DataBaseModule, UsersModule, ArtistsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

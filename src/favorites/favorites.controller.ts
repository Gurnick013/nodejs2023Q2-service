import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  Req,
  ParseUUIDPipe,
} from '@nestjs/common';
import { Request } from 'express';
import { HttpCode } from '@nestjs/common/decorators';
import { StatusCodes } from 'http-status-codes';
import { FavoritesService } from './favorites.service';
import { FavoritesType } from './types/types';

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  findAll() {
    return this.favoritesService.findAll();
  }

  @Post(['track/:id', 'album/:id', 'artist/:id'])
  create(@Req() req: Request, @Param('id', ParseUUIDPipe) id: string) {
    const type = (req.route.path.split('/')[2] + 's') as FavoritesType;
    return this.favoritesService.create(type, id);
  }

  @HttpCode(StatusCodes.NO_CONTENT)
  @Delete(['track/:id', 'album/:id', 'artist/:id'])
  remove(@Req() req: Request, @Param('id', ParseUUIDPipe) id: string) {
    const type = (req.route.path.split('/')[2] + 's') as FavoritesType;
    return this.favoritesService.remove(type, id);
  }
}

import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { HttpCode } from '@nestjs/common/decorators';
import { ParseUUIDPipe } from '@nestjs/common/pipes';
import { StatusCodes } from 'http-status-codes';
import { ArtistsService } from './artists.service';
import { CreateArtistDto } from './dto/createArtists.dto';
import { UpdateArtistDto } from './dto/updateArtists.dto';

@Controller('artist')
export class ArtistsController {
  constructor(private readonly artistService: ArtistsService) {}

  @Post()
  create(@Body() createArtistDto: CreateArtistDto) {
    return this.artistService.create(createArtistDto);
  }

  @Get()
  findAll() {
    return this.artistService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.artistService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateArtistDto: UpdateArtistDto,
  ) {
    return this.artistService.update(id, updateArtistDto);
  }

  @HttpCode(StatusCodes.NO_CONTENT)
  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.artistService.remove(id);
  }
}

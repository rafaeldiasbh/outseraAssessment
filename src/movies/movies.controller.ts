import { Controller, Get, Post, Body, Put, Param, Delete, Query } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiQuery } from '@nestjs/swagger';
import { Movie } from './entities/movie.entity';


@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @ApiCreatedResponse({type: Movie})
  @Post()
  create(@Body() createMovieDto: CreateMovieDto): Promise<Movie> {
    return this.moviesService.create(createMovieDto);
  }

  @ApiOkResponse({type: Movie, isArray: true})
  @ApiQuery({required: false})
  @Get()
  findAll(@Query() query: any): Promise<Movie[]> {
    if (Object.keys(query).length) {
      return this.moviesService.find(query);
    }
    return this.moviesService.findAll();
  }

  @Get('/prizeInterval')
  getPrizeInterval(){
    return this.moviesService.getPrizeIntervals();
  }

  @ApiOkResponse({type: Movie})
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Movie> {
    return this.moviesService.findOne(+id);
  }

  @ApiOkResponse({type: Movie})
  @Put(':id')
  update(@Param('id') id: string, @Body() updateMovieDto: UpdateMovieDto): Promise<Movie> {
    return this.moviesService.update(+id, updateMovieDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.moviesService.remove(+id);
  }

  async initializeDatabase(): Promise<Movie[]>{
    return this.moviesService.initializeDatabaseWithDefaultData();
  }
}

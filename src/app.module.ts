import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MoviesModule } from './movies/movies.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie } from './movies/entities/movie.entity';
import config from '../db/dbconfig';

@Module({
  imports: [  TypeOrmModule.forRoot(config), 
              TypeOrmModule.forFeature([Movie]), 
              MoviesModule
            ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

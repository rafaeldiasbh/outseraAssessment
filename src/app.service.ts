import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movie } from './movies/entities/movie.entity';
import * as fs from 'fs';
import * as csv from 'csv-parser';

@Injectable()
export class AppService {
  constructor(@InjectRepository(Movie) private movieRepository: Repository<Movie>){}

  async initializeDatabaseWithDefaultData(): Promise<boolean>{
    const movies: Movie[] = [];
    return new Promise((resolve, reject) => {
      const path = './db/movielist.csv';
      if(fs.existsSync(path)){
        fs.createReadStream(path).pipe(csv({ separator: ';' }))
        .on('data', (row)=> {
          console.log(row);
          const movie = new Movie();
          movie.year = parseInt(row.year);
          movie.title = row.title;
          movie.studios = row.studios;
          movie.producers = row.producers;
          movie.winner = row.winner && row.winner.toLowerCase() === 'yes';
          movies.push(movie);
        })
        .on('end', async () =>{
          try{
            await this.movieRepository.save(movies);
            console.log('Defalt data from csv initialized');
            resolve(true);
          }catch(error){
            if(error.code !== 'SQLITE_CONSTRAINT'){
              console.log('Incorrect CSV file check if the delimiter is ;');
              throw error;
            }
            console.log('File alredy imported skiping');
            resolve(true);
          }
          
        })
        .on('error', (error) => {
          console.log('app.service Error initializing default Database values check if its a compatbile .csv file with ; delimiter ', error);
          reject(error);
        });
      }
    });
  }

  getHello(): string {
    return 'Hello World!';
  }
}

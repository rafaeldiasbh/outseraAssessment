import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOptionsWhere, Like } from 'typeorm';
import { Movie } from  './entities/movie.entity';

@Injectable()
export class MoviesService {
  constructor(@InjectRepository(Movie) private movieRepository: Repository<Movie>){}

  async create(createMovieDto: CreateMovieDto): Promise<Movie> {
    const movie = this.movieRepository.create(createMovieDto);
    try{
      return await this.movieRepository.save(movie);
    }catch(error){
      if(error.code === 'SQLITE_CONSTRAINT'){
        throw new BadRequestException({error: error.code, description: 'row already exists'});
      }
      throw error;
    }
    
  }

  async findAll(): Promise<Movie[]> {
    return await this.movieRepository.find();
  }

  async findOne(id: number): Promise<Movie> {
    const movie = await this.movieRepository.findOne({ where: { id } });
    if (!movie) {
      throw new NotFoundException(`Movie ID ${id} not found`);
    }
    return movie;
  }

  async find(query: any): Promise<Movie[]> {
    const where: FindOptionsWhere<Movie> = {};


    Object.keys(query).forEach((key) => {
      const value = query[key];
    // Check if the value is valid (not empty or undefined)
      if (value !== undefined && value !== '') {

          switch (key) {
            case 'year':
              where.year = Number(value);
              break;
            case 'winner':
              // Adjust for 'true' or 'yes' values
              where.winner = value === 'true' || value === 'yes';
              break;
            default:
              where[key] = Like(`%${value}%`);
              break;
          }
        }
    });

    return await this.movieRepository.find({ where });
  }

  async update(id: number, updateMovieDto: UpdateMovieDto): Promise<Movie> {
    const movie = await this.findOne(id);
    const updatedMovie = Object.assign(movie, updateMovieDto);
    return await this.movieRepository.save(updatedMovie);
  }

  async remove(id: number): Promise<void> {
    const movie = await this.findOne(id);
    await this.movieRepository.remove(movie);
  }

  async getPrizeIntervals(): Promise<any> {
    const movies = await this.movieRepository.find({ where: { winner: true } });

    const producersMap = new Map<string, { years: number[] }>(); // producer name, yearsCollection

    movies.forEach(movie => {
      let producers = movie.producers.split(/,|and/i)  // In case of multiple producers
                      .map(producer => producer.trim()) // remove trainling spaces from names
                      .filter(producer => producer !== ''); //filter buggy unnamed producer
      producers.forEach(producer => {
        if (!producersMap.has(producer)) {
          producersMap.set(producer, { years: [] }); // map each producer as a single entry
        }

        producersMap.get(producer)?.years.push(movie.year); //pushes every producer winning movie year.
      });
    });
    

    const intervals = { min: [], max: [] };

    producersMap.forEach((row, producer) => {
      row.years.sort((a, b) => a - b); // order years to be subtracted latter
      const producerIntervals = [];
      //uses 1 as initializer cuz theres no need to calculate the interval if producer doesnt have more than 1;
      for (let i = 1; i < row.years.length; i++) { //iterate on every year the producer won
        const interval = {
          producer,
          interval: row.years[i] - row.years[i - 1],
          previousWin: row.years[i - 1],
          followingWin: row.years[i],
        };
        producerIntervals.push(interval);
      }

      // If producer won more than 1 time, finds the min/max intervals
      if (producerIntervals.length > 0) {
        const minInterval = producerIntervals.reduce((min, current) =>
          current.interval < min.interval ? current : min
        );
        const maxInterval = producerIntervals.reduce((max, current) =>
          current.interval > max.interval ? current : max
        );

        intervals.min.push(minInterval);
        intervals.max.push(maxInterval);
      }
    });

    const minIntervalValue = Math.min(...intervals.min.map(item => item.interval));
    const minInterval = intervals.min.filter(item => item.interval === minIntervalValue);  

    const maxIntervalValue = Math.max(...intervals.max.map(item => item.interval));
    const maxInterval = intervals.max.filter(item => item.interval === maxIntervalValue);

    const newObject = {
        min: minInterval,
        max: maxInterval
      };
    return newObject;
  }
}

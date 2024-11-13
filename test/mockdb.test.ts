import { DataSource } from 'typeorm';
import { Movie } from '../src/movies/entities/movie.entity';

export const testDataSource = new DataSource({
  type: 'sqlite',
  database: ':memory:',
  dropSchema: true,
  entities: [Movie],
  synchronize: true,
  logging: false,
});
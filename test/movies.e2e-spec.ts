import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { MoviesModule } from '../src/movies/movies.module';
import { Movie } from '../src/movies/entities/movie.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { testDataSource }  from './db.test';
import { Repository } from 'typeorm';

describe('MoviesController (e2e)', () => {
  let app: INestApplication;
  let movieRepository: Repository<Movie>;

  beforeAll(async () => {
    await testDataSource.initialize();

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(testDataSource.options),
                TypeOrmModule.forFeature([Movie]), 
                MoviesModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    movieRepository = moduleFixture.get('MovieRepository');
    await app.init();
  });

  afterAll(async () => {
    await testDataSource.destroy();
    await app.close();
  });

  beforeEach(async () => {
    await movieRepository.clear();

    await movieRepository.save([
      { year: 2008, title: 'Movie 1', studios: 'Studio 1', producers: 'Producer 1', winner: true },
      { year: 2009, title: 'Movie 2', studios: 'Studio 2', producers: 'Producer 1', winner: true },
      { year: 2018, title: 'Movie 3', studios: 'Studio 3', producers: 'Producer 2', winner: true },
      { year: 2019, title: 'Movie 4', studios: 'Studio 4', producers: 'Producer 2', winner: true },
      { year: 1900, title: 'Movie 5', studios: 'Studio 5', producers: 'Producer 1', winner: true },
      { year: 1999, title: 'Movie 6', studios: 'Studio 6', producers: 'Producer 1', winner: true },
      { year: 2000, title: 'Movie 7', studios: 'Studio 7', producers: 'Producer 2', winner: true },
      { year: 2099, title: 'Movie 8', studios: 'Studio 8', producers: 'Producer 2', winner: true },
    ]);
  });

  it('/movies (GET)', () => {
    return request(app.getHttpServer())
      .get('/movies')
      .expect(200);
  });

  it('/movies/prizeInterval (GET)', async () => {
    const expectedResponse = {
      min: [
        { producer: 'Producer 1', interval: 1, previousWin: 2008, followingWin: 2009 },
        { producer: 'Producer 2', interval: 1, previousWin: 2018, followingWin: 2019 },
      ],
      max: [
        { producer: 'Producer 1', interval: 99, previousWin: 1900, followingWin: 1999 }
      ],
    };
    
    const response = await request(app.getHttpServer())
      .get('/movies/prizeInterval')
      .expect(200); 

      expect(response.body).toMatchObject(expectedResponse);
  });

});

import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { MoviesModule } from '../src/movies/movies.module';
import { Movie } from '../src/movies/entities/movie.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { testDataSource }  from './mockdb.test';
import { Repository } from 'typeorm';
import { MoviesController } from '../src/movies/movies.controller';

describe('MoviesController (e2e)', () => {
  let app: INestApplication;
  let movieRepository: Repository<Movie>;
  let moviesController: MoviesController;

  beforeAll(async () => {
    await testDataSource.initialize();

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(testDataSource.options),
                TypeOrmModule.forFeature([Movie]), 
                MoviesModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    movieRepository = moduleFixture.get('MovieRepository');
    moviesController = moduleFixture.get(MoviesController); 
    await app.init();
  });

  afterAll(async () => {
    await testDataSource.destroy();
    await app.close();
  });

  beforeEach(async () => {
    await movieRepository.clear();
    const dataSet = await moviesController.initializeDatabase();
    await movieRepository.save(dataSet);
  });

  it('/movies (GET)', () => {
    return request(app.getHttpServer())
      .get('/movies')
      .expect(200);
  });

  it('/movies/prizeInterval (GET)', async () => {
    const expectedResponse = {
      min: [
        {
          producer: 'Joel Silver',
          interval: 1,
          previousWin: 1990,      
          followingWin: 1991      
        }
      ],
      max: [
        {
          producer: 'Matthew Vaughn',
          interval: 13,
          previousWin: 2002,
          followingWin: 2015
        }
      ]
    };
    
    const response = await request(app.getHttpServer())
      .get('/movies/prizeInterval')
      .expect(200); 
      console.log(response.body);
      console.log(expectedResponse);
      expect(response.body).toMatchObject(expectedResponse);
  });

});

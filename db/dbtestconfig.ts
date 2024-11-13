import { DataSourceOptions } from "typeorm";

const config: DataSourceOptions  = {
    type: "sqlite",
    database: "./db/test.sqlite",
    entities: ['dist/src/**/*.entity.js'],
    synchronize: true  //set as true for the assessment purpouse should not be true on production
}   

export default config;
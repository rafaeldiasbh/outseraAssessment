import { SqliteConnectionOptions } from "typeorm/driver/sqlite/SqliteConnectionOptions";

const config: SqliteConnectionOptions = {
    type: "sqlite",
    database: "./db/db.sqlite",
    entities: ['dist/src/**/*.entity.js'],
    synchronize: true  //set as true for the assessment purpouse should not be true on production
}   

export default config;
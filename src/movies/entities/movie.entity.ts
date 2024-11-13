import { Entity, Column, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger'

@Entity()
@Unique(["title"])
export class Movie {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  year: number;

  @ApiProperty()
  @Column()
  title: string;

  @ApiProperty()
  @Column()
  studios: string;

  @ApiProperty()
  @Column()
  producers: string;

  @ApiProperty()
  @Column()
  winner: boolean;
}
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger'

export class CreateMovieDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  year: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  title: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  studios: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  producers: string;

  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty({required: false})
  winner?: boolean;
}
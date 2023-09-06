import {
  IsNotEmpty,
  IsString,
  IsEmail,
  IsNumber,
  IsInt,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsInt()
  age: number;
}

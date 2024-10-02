import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  fullName: string;
  @IsEmail()
  email: string;
  @IsPhoneNumber('UZ')
  phone: string;
  @IsOptional()
  @IsString()
  tg_link: string;
  @IsString()
  @MinLength(6)
  password: string;
  @IsString()
  @IsNotEmpty()
  confirmPassword: string;
  @IsOptional()
  @IsString()
  photo: string;
}

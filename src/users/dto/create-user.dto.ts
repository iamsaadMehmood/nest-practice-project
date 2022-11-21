import { IsBoolean, IsPhoneNumber, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  name: string;
  @IsPhoneNumber()
  phoneNumber: string;
  @IsString()
  username: string;
  @IsString()
  password: string;
  
}

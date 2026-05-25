import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { LoginDto } from 'src/auth/dtos/Login.dto';

export class CreateUserDto extends LoginDto {
  @IsString()
  @MinLength(3)
  @MaxLength(255)
  @IsNotEmpty()
  name: string;
}

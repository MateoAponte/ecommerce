import { ApiProperty } from '@nestjs/swagger';
import { User } from '../user.entity';

export class UserResponseDto {
  @ApiProperty({
    example: 'd3f0ffc6-b449-4435-ae39-af258cf4d1b5',
    description: 'User Id',
    type: 'string',
  })
  id: string;

  @ApiProperty({
    example: 'John Doe',
    description: 'User Name',
    type: 'string',
  })
  name: string;

  @ApiProperty({
    example: 'john@example.com',
    description: 'User Email',
    type: 'string',
  })
  email: string;

  static fromEntity(user: User): UserResponseDto {
    const dto = new UserResponseDto();
    dto.id = user.id;
    dto.name = user.name;
    dto.email = user.email;
    return dto;
  }
}

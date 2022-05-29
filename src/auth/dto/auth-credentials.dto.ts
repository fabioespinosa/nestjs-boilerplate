import {
  MaxLength,
  MinLength,
  IsString,
  IsNotEmpty,
  Matches,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AuthCredentialsDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(20)
  @ApiProperty({
    example: 'fabioespinosa',
    description: 'A username has min-length of 8 max of 20',
  })
  username: string;

  @MinLength(8)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'password must contain at least one number and one special character',
  })
  @ApiProperty({
    example: '23.fSj82l@@3rfd',
    description:
      "User's password min length of 8 max of 20. has at least a number, and one special character)",
  })
  password: string;
}

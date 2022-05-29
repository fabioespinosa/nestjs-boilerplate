import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { NoteStatus } from '../note-status.enum';
import { ApiProperty } from '@nestjs/swagger';

export class CreateNoteDto {
  @IsNotEmpty()
  @ApiProperty({
    example: 'First note title to be used from the swagger api ',
    description: "This is the note's title",
  })
  title: string;

  @IsNotEmpty()
  @ApiProperty({
    example: 'First note content to be used from the swagger api ',
    description: "This is the note's content",
  })
  content: string;

  @IsEnum(NoteStatus)
  @IsOptional()
  status?: NoteStatus;
}

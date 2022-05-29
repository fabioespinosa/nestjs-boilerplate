import { IsEnum } from 'class-validator';
import { NoteStatus } from '../note-status.enum';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateNoteStatusDto {
  @IsEnum(NoteStatus)
  @ApiProperty({
    description: `The value of the new status (can be: ${Object.keys(
      NoteStatus,
    )})`,
    example: NoteStatus.PUBLISHED,
  })
  status: NoteStatus;
}

import { IsEnum, IsOptional, IsString } from 'class-validator';
import { NoteStatus } from '../note-status.enum';

export class GetNotesFilterDto {
  @IsOptional()
  @IsEnum(NoteStatus)
  status?: NoteStatus;

  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsString()
  id_user?: string;
}

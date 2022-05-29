import { IsNotEmpty } from 'class-validator';
export class UpdateNoteDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  content: string;
}

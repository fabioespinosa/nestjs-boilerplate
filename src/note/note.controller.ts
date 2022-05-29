import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { NoteService } from './note.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { GetNotesFilterDto } from './dto/get-notes-filter.dto';
import { UpdateNoteStatusDto } from './dto/update-note-status.dto';
import { Note } from './note.entity';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { GetUser } from '../auth/get-user.decorator';
import { User } from '../auth/user.entity';

@ApiBearerAuth()
@Controller('notes')
@UseGuards(AuthGuard())
export class NoteController {
  constructor(private noteService: NoteService) {}

  @Get()
  @ApiOperation({
    summary:
      "Gets all notes in the db. TODO: paginate. (this comment regarding this endpoint will serve for programmers and for Swagger's OpenAPI notes users)",
  })
  getNotes(@Query() filterDto: GetNotesFilterDto): Promise<Note[]> {
    return this.noteService.getNotes(filterDto);
  }

  @Get('/my-notes')
  @ApiOperation({
    summary: 'Gets user notes. TODO: paginate',
  })
  getUserNotes(
    @Query() filterDto: GetNotesFilterDto,
    @GetUser() user: User,
  ): Promise<Note[]> {
    return this.noteService.getUserNotes(filterDto, user);
  }

  @Get('/:id')
  getNoteById(@Param('id') id: string): Promise<Note> {
    return this.noteService.getNoteById(id);
  }

  @Post()
  createNote(
    @Body() createNoteDto: CreateNoteDto,
    @GetUser() user: User,
  ): Promise<Note> {
    return this.noteService.createNote(createNoteDto, user);
  }

  @Delete('/:id')
  deleteNote(@Param('id') id: string, @GetUser() user: User): Promise<Note> {
    return this.noteService.deleteNote(id, user);
  }

  @Patch('/:id/status')
  updateNoteStatus(
    @Param('id') id: string,
    @Body() updateNoteStatusDto: UpdateNoteStatusDto,
    @GetUser() user: User,
  ): Promise<Note> {
    const { status } = updateNoteStatusDto;
    return this.noteService.updateNote(id, status, user);
  }
}

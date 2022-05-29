import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { NoteStatus } from './note-status.enum';
import { CreateNoteDto } from './dto/create-note.dto';
import { GetNotesFilterDto } from './dto/get-notes-filter.dto';
import { Note } from './note.entity';
import { NoteRepository, NoteRepositoryTORM } from './note.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../auth/user.entity';

@Injectable()
export class NoteService {
  constructor(
    @InjectRepository(NoteRepositoryTORM)
    private noteRepository: NoteRepository,
  ) {}

  getNotes(filterDto: GetNotesFilterDto): Promise<Note[]> {
    return this.noteRepository.getNotes(filterDto);
  }

  getUserNotes(filterDto: GetNotesFilterDto, user: User): Promise<Note[]> {
    filterDto.id_user = user.id;
    return this.noteRepository.getNotes(filterDto);
  }

  async getNoteById(id: string): Promise<Note> {
    const found = await this.noteRepository.findOne(id);
    if (!found) {
      throw new NotFoundException(`Note with ID "${id}" not found`);
    }
    return found;
  }

  createNote(createNoteDto: CreateNoteDto, user: User): Promise<Note> {
    createNoteDto.status = createNoteDto.status || NoteStatus.DRAFT;
    return this.noteRepository.createNote(createNoteDto, user);
  }

  async deleteNote(id: string, user: User): Promise<Note> {
    const note = await this.getNoteById(id);
    if (note.user.id !== user.id) {
      throw new UnauthorizedException();
    }
    return this.noteRepository.remove(note);
  }

  async updateNote(id: string, status: NoteStatus, user: User): Promise<Note> {
    const note = await this.getNoteById(id);
    if (note.id_user !== user.id) {
      throw new UnauthorizedException();
    }
    note.status = status;
    return this.noteRepository.save(note);
  }
}

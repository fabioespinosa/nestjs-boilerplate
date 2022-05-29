import { Repository, EntityRepository } from 'typeorm';
import { CreateNoteDto } from './dto/create-note.dto';
import { GetNotesFilterDto } from './dto/get-notes-filter.dto';
import { Note } from './note.entity';
import { User } from '../auth/user.entity';

export interface NoteRepository {
  findOne(id: string): Promise<Note>;
  createNote(createNoteDto: CreateNoteDto, user: User): Promise<Note>;
  remove(note: Note): Promise<Note>;
  getNotes(filterDto: GetNotesFilterDto): Promise<Note[]>;
  save(note: Note): Promise<Note>;
}

@EntityRepository(Note)
export class NoteRepositoryTORM
  extends Repository<Note>
  implements NoteRepository
{
  async getNotes(filterDto: GetNotesFilterDto): Promise<Note[]> {
    const { status, search, id_user } = filterDto;
    const query = this.createQueryBuilder('note');

    if (id_user) {
      query.andWhere('note.user = :id_user', { id_user });
    }

    if (status) {
      query.andWhere('note.status = :status', { status });
    }

    if (search) {
      query.andWhere(
        '(LOWER(note.title) LIKE LOWER(:search) OR LOWER(note.content) LIKE LOWER(:search))',
        {
          search: `%${search}%`,
        },
      );
    }

    const notes = await query.getMany();
    return notes;
  }

  async createNote(createNoteDto: CreateNoteDto, user: User): Promise<Note> {
    const { title, content, status } = createNoteDto;
    const note = this.create({
      title,
      content,
      status: status,
      user,
    });
    return this.save(note);
  }
}

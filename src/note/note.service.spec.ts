import { Test, TestingModule } from '@nestjs/testing';
import { NoteService } from './note.service';
import { NoteRepositoryTORM } from './note.repository';
import { NoteRepository } from '../../dist/note/note.repository';
import { NoteStatus } from './note-status.enum';
import { NotFoundException } from '@nestjs/common';

const mockNoteRepository = () => ({
  getNotes: jest.fn(),
  findOne: jest.fn(),
});

const mockUser = {
  username: 'fabioespinosa',
  id: 'an_id',
  password: 'a_password',
  notes: [],
};

describe('NoteService', () => {
  let service: NoteService;
  let noteRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NoteService,
        {
          provide: NoteRepositoryTORM,
          useFactory: mockNoteRepository,
        },
      ],
    }).compile();

    service = module.get<NoteService>(NoteService);
    noteRepository = module.get<NoteRepository>(NoteRepositoryTORM);
  });

  describe('Get Notes', () => {
    it('calls repository.getNotes and returns them', async () => {
      noteRepository.getNotes.mockResolvedValue('test');
      const result = await service.getUserNotes({}, mockUser);
      expect(result).toEqual('test');
    });
  });

  describe('getTaskById', () => {
    it('calls findone and returns the result', async () => {
      const mockTask = {
        id: 'ff',
        title: 'Test title',
        content: 'Test content',
        status: NoteStatus.DRAFT,
      };
      noteRepository.findOne.mockResolvedValue(mockTask);
      const result = await service.getNoteById('someId');
      expect(result).toEqual(mockTask);
    });

    it('throws an error if the note is not found', async () => {
      noteRepository.findOne.mockResolvedValue(null);
      expect(service.getNoteById('someId')).rejects.toThrow(NotFoundException);
    });
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

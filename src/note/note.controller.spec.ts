import { Test, TestingModule } from '@nestjs/testing';
import { NoteController } from './note.controller';
import { NoteService } from './note.service';
import { AuthModule } from '../auth/auth.module';
import { UserRepositoryTORM } from '../auth/user.repository';

const mockNoteService = () => ({});

const mockUserRepository = () => ({});

describe('NoteController', () => {
  let controller: NoteController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      // imports: [AuthModule],
      controllers: [NoteController],
      providers: [
        {
          provide: NoteService,
          useFactory: mockNoteService,
        },
        // {
        //   provide: UserRepositoryTORM,
        //   useFactory: mockUserRepository,
        // },
      ],
    }).compile();

    controller = module.get<NoteController>(NoteController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UserRepositoryTORM } from './user.repository';
import { JwtService } from '@nestjs/jwt';

const mockUserRepository = () => ({});
const mockJwtService = () => ({});

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UserRepositoryTORM,
          useFactory: mockUserRepository,
        },
        {
          provide: JwtService,
          useFactory: mockJwtService,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

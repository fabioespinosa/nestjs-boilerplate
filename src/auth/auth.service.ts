import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';
import { UserRepository, UserRepositoryTORM } from './user.repository';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from './user.entity';
import { Logger } from '@nestjs/common';

@Injectable()
export class AuthService {
  private logger = new Logger('AuthService', { timestamp: true });
  constructor(
    @InjectRepository(UserRepositoryTORM)
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async signIn(
    authCredentials: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    const { username, password } = authCredentials;
    const user = await this.userRepository.findOne({ username });
    if (user && (await bcrypt.compare(password, user.password))) {
      const payload: JwtPayload = { username };
      const accessToken = this.jwtService.sign(payload);
      return { accessToken };
    } else {
      throw new UnauthorizedException('Invalid credentials');
    }
  }

  async signUp(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    try {
      await this.userRepository.createUser(authCredentialsDto);
      return this.signIn(authCredentialsDto);
    } catch (error) {
      this.logger.error(
        `Error while creating user: ${error.message}`,
        error.stack,
      );
      if (error instanceof ConflictException) {
        throw new ConflictException('Username already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}

import { EntityRepository, Repository } from 'typeorm';
import { ConflictException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { User } from './user.entity';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

export interface UserRepository {
  createUser(authCredentialsDto: AuthCredentialsDto): Promise<User>;
  findOne(query: Partial<User>): Promise<User>;
}

@EntityRepository(User)
export class UserRepositoryTORM
  extends Repository<User>
  implements UserRepository
{
  async createUser(authCredentialsDto: AuthCredentialsDto): Promise<User> {
    const { username, password } = authCredentialsDto;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = this.create({ username, password: hashedPassword });
    try {
      await this.save(user);
      return user;
    } catch (err) {
      if (err.code === '23505') {
        throw new ConflictException();
      } else {
        throw err;
      }
    }
  }
}

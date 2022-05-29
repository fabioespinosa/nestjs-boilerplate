import { Module } from '@nestjs/common';
import { NoteController } from './note.controller';
import { NoteService } from './note.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NoteRepositoryTORM } from './note.repository';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([NoteRepositoryTORM]), AuthModule],
  controllers: [NoteController],
  providers: [NoteService],
})
export class NoteModule {}

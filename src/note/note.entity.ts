import { Exclude } from 'class-transformer';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { NoteStatus } from './note-status.enum';
import { User } from '../auth/user.entity';

@Entity()
export class Note {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column()
  status: NoteStatus;

  @Column()
  id_user: string;

  // Relations:
  @ManyToOne((_) => User, (user) => user.notes)
  @JoinColumn({ name: 'id_user' })
  @Exclude({ toPlainOnly: true })
  user: User;
}

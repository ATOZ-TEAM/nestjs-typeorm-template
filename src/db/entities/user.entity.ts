import { BasicEntity } from './abstracts/typeorm.entity';
import { Column, Entity } from 'typeorm';

@Entity('users')
export class User extends BasicEntity {
  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;
}

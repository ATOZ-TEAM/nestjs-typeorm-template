import { Entity, PrimaryGeneratedColumn } from 'typeorm';
import { TypeOrmEntity } from '../typeorm.entity';

@Entity('posts')
export class Post extends TypeOrmEntity {
  @PrimaryGeneratedColumn()
  id: number;
}

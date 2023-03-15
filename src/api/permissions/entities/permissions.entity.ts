import User from '../../users/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Board } from '../../boards/entities/board.entity';

@Entity({ name: 'permissions' })
export default class Permissions {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ type: 'varchar', length: 20 })
  public name: string;

  @CreateDateColumn({ type: 'timestamp' })
  public created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  public updated_at: Date;

  @Column({ name: 'user_id' })
  public user_id: number;

  @ManyToOne(() => User, (user: User) => user.permission, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'user_id' })
  public user: User;

  @Column({ name: 'board_id' })
  public board_id: number;

  @ManyToOne(() => Board, (board: Board) => board.columns, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'board_id' })
  public board: Board;
}

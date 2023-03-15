import {
  Entity,
  PrimaryGeneratedColumn,
  Column as Colmn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Board } from './board.entity';
import { Card } from './card.entity';

@Entity({ name: 'columns' })
export class Column {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Colmn({ type: 'varchar', length: 120 })
  public name: string;

  @CreateDateColumn({ type: 'timestamp' })
  public created_at!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  public updated_at!: Date;

  @ManyToOne(() => Board, (board: Board) => board.columns, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'board_id' })
  board_id: number;

  @OneToMany('Card', (card: Card) => card.column, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  cards: Array<Card>;
}

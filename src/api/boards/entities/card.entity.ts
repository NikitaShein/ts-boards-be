import {
  Entity,
  PrimaryGeneratedColumn,
  Column as Colmn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Column } from './column.entity';

@Entity({ name: 'cards' })
export class Card {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Colmn({ type: 'varchar', length: 120 })
  public name: string;

  @Colmn({ type: 'text' })
  public text: string;

  @Colmn()
  public position: number;

  @CreateDateColumn({ type: 'timestamp' })
  public created_at!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  public updated_at!: Date;

  @Colmn({ name: 'column_id' })
  public column_id: number;

  @ManyToOne(() => Column, (column: Column) => column.cards, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'column_id' })
  public column: Column;
}

import Permissions from 'src/api/permissions/entities/permissions.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column as Clmn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Column } from './column.entity';

@Entity({ name: 'boards' })
export class Board {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Clmn({ type: 'varchar', length: 120 })
  public name: string;

  @CreateDateColumn({ type: 'timestamp' })
  public created_at!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  public updated_at!: Date;

  @OneToMany('Column', (column: Column) => column.board_id, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  columns: Array<Column>;

  @OneToMany('Permissions', (permission: Permissions) => permission.board_id, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  permission: Array<Permissions>;
}

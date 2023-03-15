import Permissions from 'src/api/permissions/entities/permissions.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity({ name: 'users' })
export default class User {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ type: 'varchar', length: 20 })
  public first_name: string;

  @Column({ type: 'varchar', length: 20 })
  public second_name: string;

  @Column({ type: 'varchar', unique: true })
  public email: string;

  @Column({ type: 'varchar', unique: false })
  public password: string;

  @CreateDateColumn({ type: 'timestamp' })
  public created_at!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  public updated_at!: Date;

  @OneToMany('Permissions', (permission: Permissions) => permission.user, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  permission: Array<Permissions>;
}

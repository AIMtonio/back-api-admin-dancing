import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
//import { CatUser } from 'src/cat_user/entities/cat_user.entity';

@Entity('user')
export class User {

  @PrimaryGeneratedColumn()
  id_user: number;

  @Column({ type: 'varchar', length: 36, nullable: true, default: null })
  uuid?: string;

  @Column({ type: 'varchar', length: 45, nullable: false })
  username: string;

  @Column({ type: 'varchar', length: 45, nullable: true, default: null })
  password?: string;

  @Column({ type: 'varchar', length: 45, nullable: false })
  email: string;

  @Column({ type: 'int', nullable: true, default: null })
  id_cat_user?: number;

  @Column({ type: 'int', width: 1, default: 0 })
  status: number;

  @Column({ type: 'varchar', length: 45, nullable: true, default: null })
  create_by?: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  create_at?: Date;

  @Column({ type: 'varchar', length: 45, nullable: true, default: null })
  update_by?: string;

  @Column({ type: 'datetime', nullable: true, default: null })
  update_at?: Date;
}
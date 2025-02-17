import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('client')
export class Client {

  @PrimaryGeneratedColumn()
  id_client: number;

  @Column({ type: 'varchar', length: 45, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 45, nullable: true })
  surname?: string;

  @Column({ type: 'varchar', length: 45, nullable: true })
  lastname?: string;

  @Column({ type: 'date', nullable: false })
  birthdate: Date;

  @Column({ type: 'varchar', length: 12, nullable: false })
  phone: string;

  @Column({ type: 'varchar', length: 50, nullable: false })
  email: string;

  @Column({ type: 'varchar', length: 36, nullable: false })
  uuid: string;

  @Column({ type: 'int', width: 1, default: 1 })
  status: number;

  @Column({ type: 'varchar', length: 45, nullable: true })
  create_by?: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  create_at?: Date;

  @Column({ type: 'varchar', length: 45, nullable: true })
  update_by?: string;

  @Column({ type: 'datetime', nullable: true })
  update_at?: Date;
}
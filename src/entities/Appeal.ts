import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


export enum AppealStatus {
  NEW = 'new',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}

@Entity()
export class Appeal {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  subject!: string;

  @Column('text')
  description!: string;

  @Column({
    type: 'enum',
    enum: AppealStatus,
    default: AppealStatus.NEW,
  })
  status!: AppealStatus;

  @Column({ type: 'text', nullable: true })
  resolution!: string | null;

  @Column({ type: 'text', nullable: true })
  cancellationReason!: string | null;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
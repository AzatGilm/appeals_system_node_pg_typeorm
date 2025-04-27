import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Appeal, AppealStatus } from "../entities/Appeal";

export class AppealRepository {
  private repository: Repository<Appeal>;

  constructor() {
    this.repository = AppDataSource.getRepository(Appeal);
  }

  async save(appeal: Appeal): Promise<Appeal> {
    return this.repository.save(appeal);
  }

  async findOne(id: number): Promise<Appeal | null> {
    return this.repository.findOneBy({ id });
  }

  async findAll(): Promise<Appeal[]> {
    return this.repository.find();
  }
  async findByStatus(status: AppealStatus): Promise<Appeal[]> {
    return this.repository.findBy({ status });
  }

  async findByDate(date: Date): Promise<Appeal[]> {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);
    
    return this.repository
      .createQueryBuilder('appeal')
      .where('appeal.createdAt BETWEEN :start AND :end', {
        start: startOfDay,
        end: endOfDay,
      })
      .getMany();
  }

  async findByDateRange(startDate: Date, endDate: Date): Promise<Appeal[]> {
    return this.repository
      .createQueryBuilder('appeal')
      .where('appeal.createdAt BETWEEN :start AND :end', {
        start: startDate,
        end: endDate,
      })
      .getMany();
  }
}

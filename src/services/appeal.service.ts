import { Appeal, AppealStatus } from "../entities/Appeal";
import { AppealRepository } from "../repositories/appeal.repository";

export class AppealService {
  private appealRepository: AppealRepository;

  constructor() {
    this.appealRepository = new AppealRepository();
  }

  async createAppeal(subject: string, description: string) : Promise<Appeal> {
    const appeal = new Appeal();
    appeal.subject = subject;
    appeal.description = description;
    appeal.status = AppealStatus.NEW;
    return this.appealRepository.save(appeal);
  }

  async takeAppealToWork(id: number): Promise<Appeal> {
    const appeal = await this.appealRepository.findOne(id);
    if (!appeal) {
      throw new Error("Appeal not found");
    }
    if (appeal.status !== AppealStatus.NEW) {
      throw new Error("Appeal cannot be taken to work from current status");
    }

    appeal.status = AppealStatus.IN_PROGRESS;
    return this.appealRepository.save(appeal);
  }

  async completeAppeal(id: number, resolution: string): Promise<Appeal> {
    const appeal = await this.appealRepository.findOne(id);
    if (!appeal) {
      throw new Error("Appeal not found");
    }
    if (appeal.status !== AppealStatus.IN_PROGRESS) {
      throw new Error("Only appeals in progress can be completed");
    }
    appeal.status = AppealStatus.COMPLETED;
    appeal.resolution = resolution;
    return this.appealRepository.save(appeal);
  }

  async cancelAppeal(id: number, cancellationReason: string) {
    const appeal = await this.appealRepository.findOne(id);
    if (!appeal) {
      throw new Error("Appeal not found");
    }
    if (appeal.status == AppealStatus.COMPLETED) {
      throw new Error("Cannot cancel appealwhith such status");
    }
    appeal.status = AppealStatus.CANCELLED;
    appeal.cancellationReason = cancellationReason;
    return this.appealRepository.save(appeal);
  }

  async getAppeals(date?: string, startDate?: string, endDate?: string): Promise<Appeal[]> {
    if (date) {
      return this.appealRepository.findByDate(new Date(date));
    } else if (startDate && endDate) {
      return this.appealRepository.findByDateRange(new Date(startDate), new Date(endDate));
    } else {
      return this.appealRepository.findAll();
    }
  }

  async cancelAllInProgress(cancellationReason: string): Promise<{ count: number }> {
    const appeals = await this.appealRepository.findByStatus(AppealStatus.IN_PROGRESS);
    const updatedAppeals = await Promise.all(
      appeals.map(async (appeal) => {
        appeal.status = AppealStatus.CANCELLED;
        appeal.cancellationReason = cancellationReason;
        return this.appealRepository.save(appeal);
      })
    );
    return { count: updatedAppeals.length };
  }
}

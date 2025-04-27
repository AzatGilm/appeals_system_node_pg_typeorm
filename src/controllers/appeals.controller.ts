import { Request, Response } from "express";
import { Appeal } from "../entities/Appeal";
import { AppealService } from "../services/appeal.service";

// interface CreateAppealRequestBody {
//   subject: string;
//   description: string;
// }

export class AppealsController {
  private appealService: AppealService;

  constructor() {
    this.appealService = new AppealService();
  }

  async createAppeal(req: Request, res: Response) {
    try {
      const { subject, description } = req.body;
      const appeal = await this.appealService.createAppeal(
        subject,
        description
      );
      res.status(201).json(appeal);
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(500).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Неизвестная ошибка" });
      }
    }
  }

  async takeAppealToWork(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const appeal = await this.appealService.takeAppealToWork(parseInt(id));
      res.json(appeal);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Неизвестная ошибка" });
      }
    }
  }

  async completeAppeal(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { resolution } = req.body;
      const appeal = await this.appealService.completeAppeal(
        parseInt(id),
        resolution
      );
      res.json(appeal);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Неизвестная ошибка" });
      }
    }
  }

  async cancelAppeal(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { cancellationReason } = req.body;
      const appeal = await this.appealService.cancelAppeal(
        parseInt(id),
        cancellationReason
      );
      res.json(appeal);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Неизвестная ошибка" });
      }
    }
  }

  async getAppeals(req: Request, res: Response) {
    try {
      const { date, startDate, endDate } = req.query;
      const appeals = await this.appealService.getAppeals(
        date as string,
        startDate as string,
        endDate as string
      );
      res.json(appeals);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Неизвестная ошибка" });
      }
    }
  }

  async cancelAllInProgress(req: Request, res: Response) {
    try {
      const { cancellationReason } = req.body;
      const result = await this.appealService.cancelAllInProgress(
        cancellationReason
      );
      res.json(result);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Неизвестная ошибка" });
      }
    }
  }
}

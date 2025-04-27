import { Router } from "express";
import { AppealsController } from "../controllers/appeals.controller";

const router = Router();
const appealController = new AppealsController();

router.post("/", appealController.createAppeal.bind(appealController));
router.patch("/:id/take-to-work", appealController.takeAppealToWork.bind(appealController));
router.patch("/:id/complete", appealController.completeAppeal.bind(appealController));
router.patch("/:id/cancel", appealController.cancelAppeal.bind(appealController));
// Получить все для фильтрации
router.get("/", appealController.getAppeals.bind(appealController));
// Получить те, которые в работе и отменить
router.patch("/cancel-all-in-progress", appealController.cancelAllInProgress.bind(appealController));

export { router as appealsRouter };

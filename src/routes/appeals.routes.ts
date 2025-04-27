import { Router } from "express";


const router = Router();

router.post('/', )
router.patch('/:id/take-to-work', )
router.patch('/:id/complete', )
router.patch('/:id/cancel', )
// Получить все для фильтрации
router.get('/', )
// Получить те, которые в работе и отменить
router.patch('/cancel-all-in-progress',)

export { router as appealsRouter };
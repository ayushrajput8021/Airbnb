import express, { Request, Response } from 'express';

import { validateRequestBody } from '../../validators';
import { createBookingSchema } from '../../validators/booking.validator';
import { confirmBookingHandler, createBookingHandler } from '../../controllers/booking.controller';

const bookingRouter = express.Router();

bookingRouter.post('/', validateRequestBody(createBookingSchema), createBookingHandler);
bookingRouter.post('/confirm/:idempotencyKey', confirmBookingHandler);

bookingRouter.get('/health', (req: Request, res: Response) => {
  res.status(200).send('OK');
});

export default bookingRouter;

import { Request, Response } from 'express';
import { confirmBookingService, createBookingService } from '../services/booking.service';
import { StatusCodes } from 'http-status-codes';

export async function createBookingHandler(req: Request, res: Response) {
  const { userId, hotelId, totalGuests, bookingAmount } = req.body;
  const { booking, idempotencyKey } = await createBookingService({ userId, hotelId, totalGuests, bookingAmount });
  res.status(StatusCodes.CREATED).json({ booking, idempotencyKey });
}

export async function confirmBookingHandler(req: Request, res: Response) {
  const idempotencyKey = req.params.idempotencyKey;
  const booking = await confirmBookingService(idempotencyKey);
  res.status(StatusCodes.OK).json({ booking });
}

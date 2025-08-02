import {
  confirmBooking,
  createBooking,
  createIdempotencyKey,
  finalizeIdempotencyKey,
  getIdempotencyKeyWithLock,
} from '../repositories/booking';
import { BadRequestError, NotFoundError } from '../utils/errors/app.error';
import { generateIdempotencyKey } from '../utils/generateIdempotencyKey';
import { CreateBookingDTO } from '../dtos/booking.dto';
import PrismaClient from '../prisma/client';
import { Prisma } from '@prisma/client';

export async function createBookingService(createBookingDTO: CreateBookingDTO) {
  // This should be here : booking amount should come from calling the hotelapi and not from the client
  const booking = await createBooking({
    userId: createBookingDTO.userId,
    hotelId: createBookingDTO.hotelId,
    totalGuests: createBookingDTO.totalGuests,
    bookingAmount: createBookingDTO.bookingAmount,
  });
  const idempotencyKey = await createIdempotencyKey(booking.id, generateIdempotencyKey());
  return { booking, idempotencyKey };
}

export async function confirmBookingService(idempotencyKey: string) {
  return await PrismaClient.$transaction(async (tx: Prisma.TransactionClient) => {
    const idempotencyKeyData = await getIdempotencyKeyWithLock(tx, idempotencyKey);
    if (!idempotencyKeyData) {
      throw new NotFoundError('Idempotency key not found');
    }

    if (idempotencyKeyData.finalized) {
      throw new BadRequestError('Idempotency key already finalized');
    }

    const booking = await confirmBooking(tx, idempotencyKeyData.bookingId!);
    await finalizeIdempotencyKey(tx, idempotencyKey);
    return booking;
  });
}

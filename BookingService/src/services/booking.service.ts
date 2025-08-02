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
import { redlock } from '../config/redis.config';
import { serverConfig } from '../config';

export async function createBookingService(createBookingDTO: CreateBookingDTO) {
  // This is the ttl for the lock
  const ttl = serverConfig.REDIS_LOCK_TTL;

  // This is the resource that will be locked for the booking process
  const bookingResource = `hotel:${createBookingDTO.hotelId}`;

  try {
    await redlock.acquire([bookingResource], ttl);
    const booking = await createBooking({
      userId: createBookingDTO.userId,
      hotelId: createBookingDTO.hotelId,
      totalGuests: createBookingDTO.totalGuests,
      bookingAmount: createBookingDTO.bookingAmount,
    });
    const idempotencyKey = await createIdempotencyKey(booking.id, generateIdempotencyKey());
    return { booking, idempotencyKey };
  } catch (error) {
    throw new BadRequestError('Hotel is not available');
  }
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

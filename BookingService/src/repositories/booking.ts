import prismaClient from '../prisma/client';
import { Prisma, BookingStatus, IdempotencyKey } from '@prisma/client';
import { validate } from 'uuid';
import { BadRequestError, NotFoundError } from '../utils/errors/app.error';

export async function createBooking(bookingInput: Prisma.BookingCreateInput) {
  const booking = await prismaClient.booking.create({
    data: bookingInput,
  });
  return booking;
}

export async function createIdempotencyKey(bookingId: number, key: string) {
  const idempotencyKey = await prismaClient.idempotencyKey.create({
    data: {
      idemKey: key,
      booking: {
        connect: { id: bookingId },
      },
    },
  });
  return idempotencyKey;
}

export async function getIdempotencyKeyWithLock(tx: Prisma.TransactionClient, key: string) {
  if (!validate(key)) {
    throw new BadRequestError('Invalid idempotency key');
  }
  const idempotencyKey: Array<IdempotencyKey> = await tx.$queryRaw(
    Prisma.sql`SELECT * FROM IdempotencyKey WHERE idemKey = ${key} FOR UPDATE`
  );

  if (!idempotencyKey || idempotencyKey.length === 0) {
    throw new NotFoundError('Idempotency key not found');
  }
  return idempotencyKey[0];
}

export async function getBookingById(id: number) {
  const booking = await prismaClient.booking.findUnique({
    where: { id },
  });
  return booking;
}

// Use State Design pattern for this function
export async function changeBookingStatus(id: number, status: BookingStatus) {
  const booking = await prismaClient.booking.update({
    where: { id },
    data: { status },
  });
  return booking;
}

export async function confirmBooking(tx: Prisma.TransactionClient, id: number) {
  const booking = await tx.booking.update({
    where: { id },
    data: { status: 'CONFIRMED' },
  });
  return booking;
}

export async function cancelBooking(id: number) {
  const booking = await prismaClient.booking.update({
    where: { id },
    data: { status: 'CANCELLED' },
  });
  return booking;
}

export async function finalizeIdempotencyKey(tx: Prisma.TransactionClient, key: string) {
  const idempotencyKey = await tx.idempotencyKey.update({
    where: { idemKey: key },
    data: { finalized: true },
  });
  return idempotencyKey;
}

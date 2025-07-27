import prismaClient from '../prisma/client';
import { Prisma } from '@prisma/client';

export async function createBooking(bookingInput: Prisma.BookingCreateInput) {
  const booking = await prismaClient.booking.create({
    data: bookingInput,
  });
  return booking;
}

import { z } from 'zod';

export const createBookingDTO = z.object({
  userId: z.number(),
  hotelId: z.number(),
  totalGuests: z.number(),
  bookingAmount: z.number(),
});

export type CreateBookingDTO = z.infer<typeof createBookingDTO>;

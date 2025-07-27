import { z } from 'zod';

export const createBookingSchema = z.object({
  userId: z.number({
    required_error: 'User ID is required',
  }),
  hotelId: z.number({
    required_error: 'Hotel ID is required',
  }),
  totalGuests: z
    .number({
      required_error: 'Total guests is required',
    })
    .min(1, {
      message: 'Total guests must be at least 1',
    }),
  bookingAmount: z
    .number({
      required_error: 'Booking amount is required',
    })
    .min(1, {
      message: 'Booking amount must be at least 1',
    }),
});

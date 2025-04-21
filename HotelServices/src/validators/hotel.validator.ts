import { z } from 'zod';

export const HotelSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(1),
  address: z.string().min(1),
  location: z.string().min(1),
  rating: z.number().optional(),
  ratingCount: z.number().optional(),
});

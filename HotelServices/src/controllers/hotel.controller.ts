import { Request, Response } from 'express';
import { createHotelService, getHotelByIdService } from '../services/hotel.service';

export async function createHotelHandler(req: Request, res: Response) {
  const hotelData = req.body;
  const hotelResponse = await createHotelService(hotelData);
  res.status(201).json({
    success: true,
    message: 'Hotel created successfully',
    data: hotelResponse,
  });
}

export async function getHotelByIdHandler(req: Request, res: Response) {
  const { id } = req.params;
  const hotelResponse = await getHotelByIdService(Number(id));
  res.status(200).json({
    success: true,
    message: 'Hotel fetched successfully',
    data: hotelResponse,
  });
}

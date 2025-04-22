import { Request, Response } from 'express';
import {
  createHotelService,
  deleteHotelByIdService,
  getHotelByIdService,
  getHotelsService,
  updateHotelByIdService,
} from '../services/hotel.service';
import { StatusCodes } from 'http-status-codes';

export async function createHotelHandler(req: Request, res: Response) {
  const hotelData = req.body;
  const hotelResponse = await createHotelService(hotelData);

  res.status(StatusCodes.CREATED).json({
    success: true,
    message: 'Hotel created successfully',
    data: hotelResponse,
  });
}

export async function getHotelByIdHandler(req: Request, res: Response) {
  const { id } = req.params;
  const hotelResponse = await getHotelByIdService(Number(id));

  res.status(StatusCodes.OK).json({
    success: true,
    message: 'Hotel fetched successfully',
    data: hotelResponse,
  });
}

export async function updateHotelByIdHandler(req: Request, res: Response) {
  const { id } = req.params;
  const hotelData = req.body;
  const hotelResponse = await updateHotelByIdService(Number(id), hotelData);

  res.status(StatusCodes.OK).json({
    success: true,
    message: 'Hotel updated successfully',
    data: hotelResponse,
  });
}

export async function deleteHotelByIdHandler(req: Request, res: Response) {
  const { id } = req.params;
  await deleteHotelByIdService(Number(id));

  res.status(StatusCodes.OK).json({
    success: true,
    message: 'Hotel deleted successfully',
  });
}

export async function getHotelsHandler(req: Request, res: Response) {
  const hotels = await getHotelsService();

  res.status(StatusCodes.OK).json({
    success: true,
    message: 'Hotels fetched successfully',
    data: hotels,
  });
}

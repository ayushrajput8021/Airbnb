import {
  createHotel,
  getHotelById,
  getAllHotels,
  softDeleteHotelById,
  updateHotelById,
} from '../repositories/hotel.repository';
import { createHotelDTO } from '../dto/hotel.dto';
import { BadRequestError } from '../utils/errors/app.error';
import logger from '../config/logger.config';

export async function createHotelService(hotelData: createHotelDTO) {
  const hotel = await createHotel(hotelData);
  logger.info(`Hotel created successfully`);
  return hotel;
}

export async function getHotelByIdService(id: number) {
  if (!id) {
    throw new BadRequestError('Hotel ID is required');
  }
  const hotel = await getHotelById(id);
  logger.info(`Hotel with id ${id} fetched successfully`);
  return hotel;
}

export async function updateHotelByIdService(id: number, hotelData: createHotelDTO) {
  if (!id) {
    throw new BadRequestError('Hotel ID is required');
  }
  const hotel = await updateHotelById(id, hotelData);
  logger.info(`Hotel with id ${id} updated successfully`);
  return hotel;
}

export async function getAllHotelsService() {
  const hotels = await getAllHotels();
  return hotels;
}

export async function softDeleteHotelByIdService(id: number) {
  if (!id) {
    throw new BadRequestError('Hotel ID is required');
  }
  await softDeleteHotelById(id);
  logger.info(`Hotel with id ${id} soft deleted successfully`);
  return true;
}

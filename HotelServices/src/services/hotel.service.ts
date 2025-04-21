import {
  createHotel,
  deleteHotelById,
  getHotelById,
  getHotels,
  updateHotelById,
} from '../repositories/hotel.repository';
import { createHotelDTO } from '../dto/hotel.dto';
import { BadRequestError } from '../utils/errors/app.error';

export async function createHotelService(hotelData: createHotelDTO) {
  const hotel = await createHotel(hotelData);
  return hotel;
}

export async function getHotelByIdService(id: number) {
  const hotel = await getHotelById(id);
  return hotel;
}

export async function updateHotelByIdService(id: number, hotelData: createHotelDTO) {
  if (!id) {
    throw new BadRequestError('Hotel ID is required');
  }
  const hotel = await updateHotelById(id, hotelData);
  return hotel;
}

export async function deleteHotelByIdService(id: number) {
  if (!id) {
    throw new BadRequestError('Hotel ID is required');
  }
  await deleteHotelById(id);
}

export async function getHotelsService() {
  const hotels = await getHotels();
  return hotels;
}
